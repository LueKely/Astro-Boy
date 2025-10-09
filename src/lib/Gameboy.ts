import { GameBoyCatridge } from './Cartridge/Cartridge';
import { Ram } from './Ram/Ram';
import { Register_File } from './Cpu/Register_File';
import { Cpu_Scheduler } from './Cpu/CPU_Scheduler';
import { PPU } from './Ppu/PPU';

export class Gameboy {
    readonly registerFile: Register_File;
    readonly ram: Ram;
    readonly cartridge: GameBoyCatridge;
    readonly scheduler: Cpu_Scheduler;
    readonly PPU: PPU;
    pause = false;
    // TODO create a class for timer

    constructor(game: ArrayBuffer) {
        this.registerFile = new Register_File();
        this.ram = new Ram();
        this.cartridge = new GameBoyCatridge(game);
        this.ram.copyROM(this.cartridge.CartDataToBytes);
        this.scheduler = new Cpu_Scheduler(this);
        this.PPU = new PPU(this.ram);
        // timer
    }

    log() {
        const systemState = {
            'Program Counter': this.registerFile.pointers.PC.getRegister(),
            'Stack Pointer': this.registerFile.pointers.SP.getRegister(),
            'Register A': this.registerFile.A.getRegister(),
            'Register B': this.registerFile.B.getRegister(),
            'Register C': this.registerFile.C.getRegister(),
            'Register D': this.registerFile.D.getRegister(),
            'Register E': this.registerFile.E.getRegister(),
            'Register H': this.registerFile.H.getRegister(),
            'Register L': this.registerFile.L.getRegister(),
            'Register F': this.registerFile.F.getRegister().toString(2),

            // IME: this.registerFile.IME,
            // IF: this.ram.getIF(),
            // IE: this.ram.getIE(),
            // HALT_BUG: this.registerFile.HALT_BUG,
            // HALT: this.registerFile.HALT,
            // STOP: this.registerFile.STOP,
            'Memory 0xFF01': this.ram.getMemoryAt(0xff01),
            'Memory 0xFF02': this.ram.getMemoryAt(0xff02),
        };
        console.table(systemState);
    }

    stop() {
        this.pause = !this.pause;
    }

    list: string[] = [];

    addToList(opcode: string) {
        if (this.list.includes(opcode)) {
            return;
        }
        this.list.push(opcode);
    }

    run() {
        let totalCycleCount = 0;
        const limit = 69905;

        while (totalCycleCount < limit) {
            this.scheduler.tick();
            this.PPU.step(this.scheduler.currentMachineCycles);
            // todo init ppu here to sync with the cpu clock
            // this.listALL();
        }
    }
    listALL() {
        console.log('ALL THE OPCODES');
        console.log(this.list);
        console.log('0XFF01: 0x' + this.ram.getMemoryAt(0xff01).toString(16));
        console.log('0XFF02: 0x' + this.ram.getMemoryAt(0xff02).toString(16));
        console.log('TILE DATA');
        console.log(this.ram.getMemory().slice(0x8000, 0x97ff));
    }
}

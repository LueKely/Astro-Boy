import { GameBoyCatridge } from './Cartridge/Cartridge';
import { Ram } from './Ram/Ram';
import { Register_File } from './Cpu/Register_File';
import { Cpu_Scheduler } from './Cpu/CPU_Scheduler';
import { PPU } from './Ppu/PPU';
import { GameboyCanvas } from './Ppu/Canvas';

export class Gameboy {
    readonly registerFile: Register_File;
    readonly ram: Ram;
    readonly cartridge: GameBoyCatridge;
    readonly scheduler: Cpu_Scheduler;
    pause = false;

    constructor(ram: Ram, cartridge: GameBoyCatridge, registerFile: Register_File) {
        this.registerFile = registerFile;
        this.ram = ram;
        // this.log();
        this.cartridge = cartridge;
        this.ram.copyROM(this.cartridge.CartDataToBytes);
        this.scheduler = new Cpu_Scheduler(this);
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

            'Memory 0xFF01': this.ram.read(0xff01),
            'Memory 0xFF02': this.ram.read(0xff02),
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
        this.cycle();
    }

    cycle() {
        if (!this.registerFile.STOP) {
            this.scheduler.tick();
        }
    }
}

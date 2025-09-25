import { GameBoyCatridge } from './Cartridge/Cartridge';
import { Ram } from './Ram/Ram';
import { Register_File } from './Cpu/Register_File';
import { Cpu_Scheduler } from './Cpu/CPU_Scheduler';

export class Gameboy {
    readonly registers: Register_File;
    readonly ram: Ram;
    readonly cartridge: GameBoyCatridge;
    readonly scheduler: Cpu_Scheduler;
    pause = false;
    // TODO create a class for timer
    cycleBudget = 0;
    lastTime = 0;

    constructor(game: ArrayBuffer) {
        this.registers = new Register_File();
        this.ram = new Ram();
        this.cartridge = new GameBoyCatridge(game);
        this.ram.copyROM(this.cartridge.CartDataToBytes);
        this.scheduler = new Cpu_Scheduler(this);
        // timer
        this.cycleBudget = 0;
        this.lastTime = performance.now();
    }

    log() {
        const systemState = {
            'Program Counter': this.registers.pointers.PC.getRegister(),
            'Stack Pointer': this.registers.pointers.SP.getRegister(),
            'Register A': this.registers.register.A.getRegister(),
            'Register B': this.registers.register.B.getRegister(),
            'Register C': this.registers.register.C.getRegister(),
            'Register D': this.registers.register.D.getRegister(),
            'Register E': this.registers.register.E.getRegister(),
            'Register H': this.registers.register.H.getRegister(),
            'Register L': this.registers.register.L.getRegister(),
            'Register F': this.registers.register.F.getRegister().toString(2),

            // IME: this.registers.IME.getValue(),
            // IF: this.ram.getIF(),
            // IE: this.ram.getIE(),
            // HALT_BUG: this.registers.HALT_BUG,
            // HALT: this.registers.HALT,
            // STOP: this.registers.STOP,
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
        if (this.pause) return;

        // for (let i = 0; i < 50000; i++) {
        //   this.scheduler.tick();
        // }

        // requestAnimationFrame(() => this.run());

        for (let i = 0; i < 41_000; i++) {
            this.scheduler.tick();
        }
        this.listALL();
        // console.log(this.ram.getMemory()[49700]);
        // console.log(this.ram.getMemory()[49701]);
        // console.log(this.ram.getMemory()[49702]);
    }
    listALL() {
        console.log('ALL THE OPCODES');
        console.log(this.list);
        // console.log('0XFF01: ' + String.fromCharCode(this.ram.getMemoryAt(0xff01)));
        // console.log('0XFF02: ' + String.fromCharCode(this.ram.getMemoryAt(0xff02)));
        console.log('0XFF01: 0x' + this.ram.getMemoryAt(0xff01).toString(16));
        console.log('0XFF02: 0x' + this.ram.getMemoryAt(0xff02).toString(16));
        console.log('TILE DATA');
        console.log(this.ram.getMemory().slice(0x8000, 0x97ff));
    }
}

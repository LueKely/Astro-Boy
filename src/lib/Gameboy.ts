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
    readonly PPU: PPU;
    readonly canvas: GameboyCanvas;
    pause = false;
    // TODO create a class for timer

    constructor(game: ArrayBuffer) {
        this.registerFile = new Register_File();
        this.ram = new Ram();
        this.cartridge = new GameBoyCatridge(game);
        this.ram.copyROM(this.cartridge.CartDataToBytes);
        this.scheduler = new Cpu_Scheduler(this);
        this.canvas = new GameboyCanvas();
        this.PPU = new PPU(this.ram, this.canvas);
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
        requestAnimationFrame(() => {
            this.run();
        });
    }

    cycle() {
        // TODO: Implement a way to ignore ticks when the register STOP is true
        const limit = 70224;
        let totalCycleBudget = 0;
        while (totalCycleBudget < limit) {
            if (!this.registerFile.STOP) {
                this.scheduler.tick();
                this.PPU.step(this.scheduler.currentMachineCycles);
            }
            totalCycleBudget += this.scheduler.currentMachineCycles * 4;
        }
    }
}

import { GameBoyCatridge } from './Cartridge/Cartridge';
import { Ram } from './Ram/Ram';
import { Cpu_Register_File } from './Cpu/CPU_Register_File';
import { Cpu_Scheduler } from './Cpu/CPU_Scheduler';

export class Gameboy {
  readonly registers: Cpu_Register_File;
  readonly ram: Ram;
  readonly cartridge: GameBoyCatridge;
  readonly scheduler: Cpu_Scheduler;

  constructor(game: ArrayBuffer) {
    this.registers = new Cpu_Register_File();
    this.ram = new Ram();
    this.cartridge = new GameBoyCatridge(game);
    console.log(this.cartridge.CartDataToBytes);
    this.scheduler = new Cpu_Scheduler(this);
  }

  log() {
    // this looks like ass i regret doing registers.register
    console.log('A: ', this.registers.register.A.getRegister());
    console.log('B: ', this.registers.register.B.getRegister());
    console.log('C: ', this.registers.register.C.getRegister());
    console.log('D: ', this.registers.register.D.getRegister());
    console.log('E: ', this.registers.register.E.getRegister());
    console.log('H: ', this.registers.register.H.getRegister());
    console.log('L: ', this.registers.register.L.getRegister());
    console.log('F: ', this.registers.register.F.getRegister());
    console.log('TempByte: ', this.registers.getTempByte());
    console.log('Lowerbyte: ', this.registers.getLowerByte());
    console.log('Upperbyte: ', this.registers.getUpperByte());
    console.log('Program Counter: ', this.registers.pointers.PC.getRegister());
    console.log('Stack Pointer: ', this.registers.pointers.SP.getRegister());

    // INTERRUPTS
    console.log('IME: ', this.registers.IME.getValue());
    console.log('IF: ', this.ram.getIF());
    console.log('IE: ', this.ram.getIE());

    // HALTS
    console.log('HALT_BUG: ', this.registers.HALT_BUG);
    console.log('HALT: ', this.registers.HALT);
    console.log('STOP: ', this.registers.STOP);
  }
  run() {
    for (let index = 0; index < 1000; index++) {
      this.scheduler.tick();
    }
  }
}

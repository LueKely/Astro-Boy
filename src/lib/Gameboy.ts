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
    const systemState = {
      'Register A': this.registers.register.A.getRegister(),
      'Register B': this.registers.register.B.getRegister(),
      'Register C': this.registers.register.C.getRegister(),
      'Register D': this.registers.register.D.getRegister(),
      'Register E': this.registers.register.E.getRegister(),
      'Register H': this.registers.register.H.getRegister(),
      'Register L': this.registers.register.L.getRegister(),
      'Register F': this.registers.register.F.getRegister().toString(2),
      TempByte: this.registers.getTempByte(),
      LowerByte: this.registers.getLowerByte(),
      UpperByte: this.registers.getUpperByte(),
      'Program Counter': this.registers.pointers.PC.getRegister(),
      'Stack Pointer': this.registers.pointers.SP.getRegister(),
      IME: this.registers.IME.getValue(),
      IF: this.ram.getIF(),
      IE: this.ram.getIE(),
      HALT_BUG: this.registers.HALT_BUG,
      HALT: this.registers.HALT,
      STOP: this.registers.STOP,
      'Memory 0xFF01': this.ram.getMemoryAt(0xff01),
      'Memory 0xFF02': this.ram.getMemoryAt(0xff02),
    };
    console.table(systemState);
  }
  run() {
    for (let index = 0; index < 1000; index++) {
      this.scheduler.tick();
    }
  }
}

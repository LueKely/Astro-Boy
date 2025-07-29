import { GameBoyCatridge } from "./Cartridge/Cartridge";
import { Ram } from "./Ram/Ram";
import { Cpu_Register_File } from "./Cpu/CPU_Register_File";
import { Cpu_Scheduler } from "./Cpu/CPU_Scheduler";

export class Gameboy {
  readonly registers: Cpu_Register_File;
  readonly ram: Ram;
  readonly cartridge: GameBoyCatridge;
  readonly scheduler: Cpu_Scheduler;

  constructor(game: ArrayBuffer) {
    this.registers = new Cpu_Register_File();
    this.ram = new Ram();
    this.cartridge = new GameBoyCatridge(game);
    this.scheduler = new Cpu_Scheduler(this);
  }

  run() {
    this.scheduler.tick();
    this.scheduler.tick();
  }
}

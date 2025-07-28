import { GameBoyCatridge } from "./Cartridge/Cartridge";
import { Ram } from "./Ram/Ram";
import { Cpu_Register_File } from "./Cpu/CPU_Register_File";
import { Cpu_Scheduler } from "./Cpu/CPU_Scheduler";

export class Gameboy {
  readonly registers = new Cpu_Register_File();
  readonly ram = new Ram();
  readonly scheduler = new Cpu_Scheduler(this);
  readonly cartridge: GameBoyCatridge;

  constructor(game: ArrayBuffer) {
    this.cartridge = new GameBoyCatridge(game);
  }

  run() {
    this.scheduler.tick();
  }
}

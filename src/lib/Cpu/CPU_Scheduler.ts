import type { Gameboy } from "../Gameboy";
import { CpuOpcodeRecord } from "./CPU_Opcode_Record";
import type { IOpCodeEntry } from "./types/Opcode";

// TODO:
// Interupt Handling
// HALT Opcode Support
// Memory bus?
// OMA DMA
// tracking
// Error Handling

export class Cpu_Scheduler {
  private dmg: Gameboy;
  private machineCycle: Array<(dmg: Gameboy) => void> = [];
  private opCodes: Record<number, IOpCodeEntry>;
  currentOpcode!: IOpCodeEntry;

  constructor(gameboy: Gameboy) {
    this.dmg = gameboy;
    this.opCodes = CpuOpcodeRecord();
    this.currentOpcode = this.opCodes[this.readByte()];
  }

  private readByte() {
    return this.dmg.cartridge.CartDataToBytes[
      this.dmg.registers.pointers.PC.getRegister()
    ];
  }

  private schedule() {
    this.currentOpcode.jobs.forEach((entry, index) => {
      // check if this is the last
      if (this.currentOpcode.cycles == index + 1) {
        //TODO Add prefetching logic here
        this.machineCycle.push(entry);
        return;
      }
      this.machineCycle.push(entry);
    });
  }

  tick() {
    if (this.machineCycle.length == 0) {
      this.currentOpcode = this.opCodes[this.readByte()];
      this.schedule();
    }

    const job = this.machineCycle.shift();
    if (job) {
      job(this.dmg);
    }
  }
}

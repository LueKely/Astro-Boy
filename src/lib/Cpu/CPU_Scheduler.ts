import type { Gameboy } from "../Gameboy";
import { CpuOpcodeRecord } from "./CPU_Opcode_Record";
import type { IOpCodeEntry } from "./types/Opcode";

export class Cpu_Scheduler {
  private dmg: Gameboy;
  private machineCycle: Array<() => void> = [];
  private opCodes: Record<number, IOpCodeEntry>;
  currentOpcode!: IOpCodeEntry;

  constructor(gameboy: Gameboy) {
    this.dmg = gameboy;
    this.opCodes = CpuOpcodeRecord(this.dmg);
    this.currentOpcode = this.opCodes[this.readByte()];
  }

  private readByte() {
    // this will always point to 0x0100
    return this.dmg.cartridge.CartDataToBytes[
      this.dmg.registers.pointers.PC.getRegister()
    ];
  }

  schedule() {
    this.currentOpcode.jobs.forEach((entry, index) => {
      // check if this is the last
      if (this.currentOpcode.cycles == index + 1) {
        this.machineCycle.push(entry);
        this.currentOpcode = this.opCodes[this.readByte()];
      } else {
        this.machineCycle.push(entry);
      }
    });
  }

  tick() {
    if (this.machineCycle.length > 0) {
      const job = this.machineCycle.shift();
      if (job) {
        job();
      }
    }
  }
}

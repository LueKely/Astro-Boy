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

  private schedule() {
    console.log("current operation", this.opCodes[this.readByte()]);

    this.currentOpcode.jobs.forEach((entry, index) => {
      // check if this is the last
      if (this.currentOpcode.cycles == index + 1) {
        this.machineCycle.push(entry);
        this.currentOpcode = this.opCodes[this.readByte()];
        console.log(
          "next operation",
          this.dmg.registers.pointers.PC.getRegister()
        );
      } else {
        this.machineCycle.push(entry);
      }
    });
  }

  tick() {
    if (this.machineCycle.length == 0) {
      this.schedule();
    }

    const job = this.machineCycle.shift();
    if (job) {
      console.log("TICK!");
      job();
    }
  }
}

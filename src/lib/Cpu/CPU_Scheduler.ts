import type { Gameboy } from "../Gameboy";
import { CpuOpcodeRecord } from "./CPU_Opcode_Record";
import type { IOpCodeEntry } from "./types/Opcode";

// TODO:
// Interupt Handling
// HALT Opcode Support
// Memory bus?
// OMA DMA?
// tracking
// Error Handling

export class Cpu_Scheduler {
  private dmg: Gameboy;
  private machineCycle: Array<(dmg: Gameboy) => void> = [];
  private opCodes: Record<number, IOpCodeEntry>;
  currentOpcode!: IOpCodeEntry;

  constructor(gameboy: Gameboy) {
    this.dmg = gameboy;
    this.opCodes = CpuOpcodeRecord(this.dmg.registers.register.F);
    this.currentOpcode = this.opCodes[this.readByte()];
  }

  private readByte(increment: number = 0) {
    return this.dmg.cartridge.CartDataToBytes[
      this.dmg.registers.pointers.PC.getRegister() + increment
    ];
  }

  private schedule() {
    this.currentOpcode.jobs.forEach((entry, index) => {
      // i can't really prefetch yet
      //
      // if (this.currentOpcode.cycles == index + 1) {
      //   console.log("Next Instruction is:", this.readByte(1));
      //   this.machineCycle.push(entry);
      //   return;
      // }
      this.machineCycle.push(entry);
    });
  }

  tick() {
    if (this.machineCycle.length == 0) {
      // FIX ME: this might be very very slow since there are atleast 200 of these opcodes
      this.opCodes = CpuOpcodeRecord(this.dmg.registers.register.F);
      this.currentOpcode = this.opCodes[this.readByte()];
      this.schedule();
    }

    const job = this.machineCycle.shift();
    if (job) {
      job(this.dmg);
    }
  }
}

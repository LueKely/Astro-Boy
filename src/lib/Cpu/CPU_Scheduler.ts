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
  private opCodes: CpuOpcodeRecord;
  currentOpcode: IOpCodeEntry;

  constructor(gameboy: Gameboy) {
    this.dmg = gameboy;
    this.opCodes = new CpuOpcodeRecord(this.dmg.registers.register.F);
    this.currentOpcode = this.opCodes.get(this.readByte());
  }

  private readByte() {
    return this.dmg.cartridge.CartDataToBytes[
      this.dmg.registers.pointers.PC.getRegister()
    ];
  }

  private schedule() {
    console.log("The Current Opcode is:", this.currentOpcode.name);
    this.currentOpcode.jobs.forEach((entry) => {
      this.machineCycle.push(entry);
    });
  }

  tick() {
    if (this.machineCycle.length == 0) {
      this.currentOpcode = this.opCodes.get(this.readByte());
      this.schedule();
    }

    const job = this.machineCycle.shift();
    if (job) {
      job(this.dmg);
      if (this.machineCycle.length == 1) {
        console.log(
          "The next Opcode is:",
          this.opCodes.get(this.readByte()).name
        );
      }
    }
  }
}

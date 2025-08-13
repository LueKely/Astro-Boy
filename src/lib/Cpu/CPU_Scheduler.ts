import type { Gameboy } from "../Gameboy";
import { CpuOpcodeRecord } from "./CPU_Opcode_Record";
import { Interrupt_Handler } from "./Interrupt_Handler";
import type { IOpCodeEntry } from "./types/OpcodeTypes";

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
  private interruptHandler: Interrupt_Handler;
  currentOpcode: IOpCodeEntry;

  constructor(gameboy: Gameboy) {
    this.dmg = gameboy;
    this.opCodes = new CpuOpcodeRecord(this.dmg.registers.register.F);
    this.interruptHandler = new Interrupt_Handler(this.dmg);
    this.currentOpcode = this.opCodes.get(this.readByte());
  }

  private readByte() {
    return this.dmg.cartridge.CartDataToBytes[
      this.dmg.registers.pointers.PC.getRegister()
    ];
  }

  private schedule() {
    if (
      this.dmg.registers.IME.getValue() &&
      this.dmg.ram.isAllowedToInterrupt()
    ) {
      const interruptCycles = this.interruptHandler.createCycles();
      interruptCycles.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    } else {
      console.log("The Current Opcode is:", this.currentOpcode.name);
      this.currentOpcode.jobs.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    }
  }

  tick() {
    try {
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
    } catch {
      const notImplemented =
        this.dmg.cartridge.CartDataToBytes[
          this.dmg.registers.pointers.PC.getRegister()
        ];

      throw new Error(
        "OP CODE NOT Implemented " + notImplemented + " Please Check LOGS"
      );
    } finally {
      this.dmg.log();
    }
  }
}

import type { Gameboy } from '../Gameboy';
import { CpuOpcodeRecord } from './CPU_Opcode_Record';
import { CpuPrefixOpCodeRecord } from './CPU_Opcode_Record_Prefix';
import { Interrupt_Handler } from './Interrupt_Handler';
import type { IOpCodeEntry } from './types/OpcodeTypes';

// TODO:
// Interupt Handling - DONE
// HALT AND STOP Handling (with the IF & IE)
// OMA DMA?

export class Cpu_Scheduler {
  private dmg: Gameboy;
  private machineCycle: Array<(dmg: Gameboy) => void> = [];
  private opCodes: CpuOpcodeRecord;
  private opCodesPrefixed = new CpuPrefixOpCodeRecord();
  private interruptHandler: Interrupt_Handler;
  currentOpcode: IOpCodeEntry;

  constructor(gameboy: Gameboy) {
    this.dmg = gameboy;
    this.opCodes = new CpuOpcodeRecord(this.dmg.registers.register.F);
    this.interruptHandler = new Interrupt_Handler(this.dmg);
    this.currentOpcode = this.opCodes.get(this.readByte());
  }
  // 0xcb
  private readByte() {
    return this.dmg.cartridge.CartDataToBytes[
      this.dmg.registers.pointers.PC.getRegister()
    ];
  }

  // PROBLEMS: somethign about fetchign the currentOpcode and shit
  private schedule() {
    // STOP - this should return afterwards if the condition is true
    if (this.dmg.registers.STOP) {
      this.stopHandler();
      return;
    }
    // HALT - this should return afterwards if the condition is true
    if (this.dmg.registers.HALT) {
      this.haltHandler();
      return;
    }
    if (
      this.dmg.registers.IME.getValue() &&
      this.dmg.ram.isAllowedToInterrupt()
    ) {
      console.log('INTERRUPT IS TRIGGERED');
      const interruptCycles = this.interruptHandler.createCycles();
      interruptCycles.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    } else {
      //   console.log('The Current Opcode is:', this.currentOpcode.name);
      this.currentOpcode.jobs.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    }
  }
  // TODO: implement halt bug
  private haltHandler() {
    // this the first cc on the schedule function
    // if not increment pc and fetch the next opcode
    // and read byte
    if (
      this.dmg.registers.IME.getValue() &&
      this.dmg.ram.isAllowedToInterrupt()
    ) {
      const interruptCycles = this.interruptHandler.createCycles();
      this.dmg.registers.HALT = false;

      interruptCycles.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    } else {
      this.fetchOpcode();
      this.currentOpcode.jobs.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    }
  }
  private stopHandler() {
    if (this.dmg.registers.IME.getValue() && this.dmg.ram.stopValidation()) {
      const interruptCycles = this.interruptHandler.createCycles();
      this.dmg.registers.STOP = false;

      interruptCycles.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    } else {
      this.fetchOpcode();
      this.currentOpcode.jobs.forEach((entry) => {
        this.machineCycle.push(entry);
      });
    }
  }

  private fetchOpcode() {
    if (this.readByte() == 0xcb) {
      if (this.dmg.registers.HALT_BUG) {
        console.log('BUG triggered');

        this.dmg.registers.HALT_BUG = false;
      } else {
        this.dmg.registers.pointers.PC.increment();
      }
      this.currentOpcode = this.opCodesPrefixed.get(this.readByte());
    } else {
      this.currentOpcode = this.opCodes.get(this.readByte());
    }
  }

  tick() {
    try {
      if (this.machineCycle.length == 0) {
        this.fetchOpcode();
        this.schedule();

        console.log('PC: ', this.dmg.registers.pointers.PC.getRegister());
        console.log('SP: ', this.dmg.registers.pointers.SP.getRegister());
      }
      const job = this.machineCycle.shift();
      if (job) {
        job(this.dmg);
      }
    } catch {
      const notImplemented =
        this.dmg.cartridge.CartDataToBytes[
          this.dmg.registers.pointers.PC.getRegister()
        ];
      this.dmg.log();
      throw new Error(
        'OP CODE NOT Implemented ' + notImplemented + ' Please Check LOGS'
      );
    } finally {
      // STUPID AH AH DEBUGGER
      // this.dmg.log();
      //   console.log('PC: ', this.dmg.registers.pointers.PC.getRegister());
      //   console.log('SP: ', this.dmg.registers.pointers.SP.getRegister());

      console.log(this.dmg.ram.getMemoryAt(0xff01));
      console.log(this.dmg.ram.getMemoryAt(0xff02));
    }
  }
}

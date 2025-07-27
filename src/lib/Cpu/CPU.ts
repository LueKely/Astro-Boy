import { Ram } from "../Ram/Ram";
import { CpuOpcodeRecord } from "./CPU_Opcode_Record";
import { Cpu_Register_File } from "./CPU_Register_File";

export class CPU {
  readonly registers = new Cpu_Register_File();
  readonly ram = new Ram();

  private lowByte = 0;
  private highByte = 0;
  private opCodes = CpuOpcodeRecord(this);

  readByte(pointer: number, cartridge: []) {
    return cartridge[pointer];
  }

  setLowByte(value: number) {
    this.lowByte = value & 0b0000_0011;
  }

  setHighByte(value: number) {
    this.highByte = (value & 0b0000_1100) >> 2;
  }

  getLowByte() {
    return this.lowByte;
  }

  getHighByte() {
    return this.highByte;
  }
}

import type { Ram } from "../../Ram/Ram";
import { validateBitFlagOperation } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";

// BIT U3,r8
function BITU3R8(u3: number, r8: Cpu_Register<any>, f: Cpu_Flag_Register) {
  const testBit = (r8.getRegister() >>> u3) & 0b1;
  validateBitFlagOperation(testBit, f);
  //   add validation flag here
}

// BIT U3, [HL]
function BITU3HL(
  u3: number,
  HL: Cpu_Register_16Bit<"HL">,
  ram: Ram,
  f: Cpu_Flag_Register
) {
  const testBit = (ram.getMemoryAt(HL.getRegister()) >>> u3) & 0b1;
  validateBitFlagOperation(testBit, f);
  //   add validation flag here
}

// RES U3,r8
function RESU3R8(u3: number, r8: Cpu_Register<any>) {
  const testBit = r8.getRegister() & ~(0b01 << u3);

  r8.setRegister(testBit);
}
// RES U3, [HL]
function RESU3HL(u3: number, HL: Cpu_Register_16Bit<"HL">, ram: Ram) {
  const testBit = ram.getMemoryAt(HL.getRegister()) & ~(0b01 << u3);
  ram.setMemoryAt(HL.getRegister(), testBit);
}

// SET U3,r8
function SETU3R8(u3: number, r8: Cpu_Register<any>) {
  const testBit = r8.getRegister() | (0b01 << u3);

  r8.setRegister(testBit);
}
// SET U3, [HL]
function SETU3HL(u3: number, HL: Cpu_Register_16Bit<"HL">, ram: Ram) {
  const testBit = ram.getMemoryAt(HL.getRegister()) | (0b01 << u3);
  ram.setMemoryAt(HL.getRegister(), testBit);
}

export { BITU3R8, BITU3HL, RESU3R8, RESU3HL, SETU3R8, SETU3HL };

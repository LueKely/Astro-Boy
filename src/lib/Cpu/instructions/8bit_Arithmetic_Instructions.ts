import type { Ram } from "../../Ram/Ram";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";

function ADCAR8(
  register8: Cpu_Register,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    register8.getRegister() + registerF.getCYFlag() + registerA.getRegister();

  //  set the flag registers

  // Raise z flag if result is zero.
  if (sum == 0) {
    registerF.setZFlag();
  } else {
    registerF.clearZFlag();
  }

  // Clear N flag to during this operation.
  registerF.clearNFlag();

  // Raise Half Carry flag if overlow from bit 3.
  if (sum > 0xf) {
    registerF.setHFlag();
  } else {
    registerF.clearHFlag();
  }

  // Raise Carry flag if overlow from bit 7.
  if (sum > 0xff) {
    registerF.setCYFlag();
  } else {
    registerF.clearCYFlag();
  }

  registerA.setRegister(sum);
}

function ADCAHL(
  pointer: Cpu_Register_16Bit,
  memory: Ram,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    (memory.getMemoryAt(pointer.getRegister()) +
      registerF.getCYFlag() +
      registerA.getRegister()) &
    0xff;

  //  set the flag registers

  // Raise z flag if result is zero.
  if (sum == 0) {
    registerF.setZFlag();
  } else {
    registerF.clearZFlag();
  }

  // Clear N flag to during this operation.
  registerF.clearNFlag();

  // Raise Half Carry flag if overlow from bit 3.
  if (sum > 0xf) {
    registerF.setHFlag();
  } else {
    registerF.clearHFlag();
  }

  // Raise Carry flag if overlow from bit 7.
  if (sum > 0xff) {
    registerF.setCYFlag();
  } else {
    registerF.clearCYFlag();
  }

  registerA.setRegister(sum);
}

export { ADCAR8, ADCAHL };

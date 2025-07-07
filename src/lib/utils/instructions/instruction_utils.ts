import type { Cpu_Flag_Register } from "../../Cpu/CPU_Flag_Register";

/**
 * @description this will validate the sum and raise the appropriate flags during R8
 * operations
 **/
function validateR8Arithmetic(
  sum: number,
  hflagSum: number,
  flagRegister: Cpu_Flag_Register
) {
  // Raise z flag if result is zero.
  if (sum == 0) {
    flagRegister.setZFlag();
  } else {
    flagRegister.clearZFlag();
  }

  // Clear N flag to during this operation.
  flagRegister.clearNFlag();

  // Raise Half Carry flag if overlow from bit 3.
  if (hflagSum > 0xf) {
    flagRegister.setHFlag();
  } else {
    flagRegister.clearHFlag();
  }

  // Raise Carry flag if overlow from bit 7.
  if (sum > 0xff) {
    flagRegister.setCYFlag();
  } else {
    flagRegister.clearCYFlag();
  }
}

/**
 * @description this will validate the sum and raise the appropriate flags
 * during R16 operations
 **/
function validateR16Arithmetic(sum: number, flagRegister: Cpu_Flag_Register) {
  // Clear N flag to during this operation.
  flagRegister.clearNFlag();

  // Raise Half Carry flag if overlow from bit 11.
  if (sum > 0xfff) {
    flagRegister.setHFlag();
  } else {
    flagRegister.clearHFlag();
  }

  // Raise Carry flag if overlow from bit 15.
  if (sum > 0xffff) {
    flagRegister.setCYFlag();
  } else {
    flagRegister.clearCYFlag();
  }
}

function validateCompareArithmetic(
  registerF: Cpu_Flag_Register,
  minuen: number,
  subtrahen: number
) {
  const difference = minuen - subtrahen;
  if (difference == 0) {
    registerF.setZFlag();
  } else {
    registerF.clearZFlag();
  }

  registerF.setNFlag();

  if ((subtrahen & 0x0f) > (minuen & 0x0f)) {
    registerF.setHFlag();
  } else {
    registerF.clearHFlag();
  }

  if (subtrahen > minuen) {
    registerF.setCYFlag();
  } else {
    registerF.clearCYFlag();
  }
}

export {
  validateR8Arithmetic,
  validateR16Arithmetic,
  validateCompareArithmetic,
};

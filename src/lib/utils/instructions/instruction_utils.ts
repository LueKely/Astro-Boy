import type { Cpu_Flag_Register } from "../../Cpu/CPU_Flag_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../../Cpu/CPU_Register";

/**
 * @description this will validate the sum and raise the appropriate flags during R8
 * operations
 **/
function validateR8Addition(
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
function validateR16Addition(sum: number, flagRegister: Cpu_Flag_Register) {
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

function validateR8Subtraction(
  registerF: Cpu_Flag_Register,
  minuend: number,
  subtrahen: number,
  carry: number = 0
) {
  const difference = minuend - subtrahen - carry;

  // flag conditions below
  if (difference == 0) {
    registerF.setZFlag();
  } else {
    registerF.clearZFlag();
  }

  registerF.setNFlag();

  if (((subtrahen + carry) & 0x0f) > (minuend & 0x0f)) {
    registerF.setHFlag();
  } else {
    registerF.clearHFlag();
  }

  if (subtrahen + carry > minuend) {
    registerF.setCYFlag();
  } else {
    registerF.clearCYFlag();
  }
}

function validateR8Decrement(registerF: Cpu_Flag_Register, value: number) {
  const difference = value - 1;
  // flag conditions below
  registerF.setNFlag();

  if (difference == 0) {
    registerF.setZFlag();
  } else {
    registerF.clearZFlag();
  }

  if (0x1 > (value & 0x0f)) {
    registerF.setHFlag();
  } else {
    registerF.clearHFlag();
  }
}

function validateR8Increment(sum: number, flagRegister: Cpu_Flag_Register) {
  // Raise z flag if result is zero.
  if (sum == 0) {
    flagRegister.setZFlag();
  } else {
    flagRegister.clearZFlag();
  }

  // Clear N flag to during this operation.
  flagRegister.clearNFlag();

  // Raise Half Carry flag if overlow from bit 3.
  if (sum > 0xf) {
    flagRegister.setHFlag();
  } else {
    flagRegister.clearHFlag();
  }
}

export {
  validateR8Addition,
  validateR16Addition,
  validateR8Subtraction,
  validateR8Decrement,
  validateR8Increment,
};

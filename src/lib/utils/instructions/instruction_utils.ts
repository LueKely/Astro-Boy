import type { Cpu_Flag_Register } from "../../Cpu/CPU_Flag_Register";

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
  subtrahend: number,
  carry: number = 0
) {
  const difference = minuend - subtrahend - carry;

  // flag conditions below
  if (difference == 0) {
    registerF.setZFlag();
  } else {
    registerF.clearZFlag();
  }

  registerF.setNFlag();

  if ((minuend & 0x0f) < (subtrahend & 0x0f) + carry) {
    registerF.setHFlag();
  } else {
    registerF.clearHFlag();
  }
  if (subtrahend + carry > minuend) {
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

function validateAndOperation(result: number, flagRegister: Cpu_Flag_Register) {
  if (result == 0) {
    flagRegister.setZFlag();
  } else {
    flagRegister.clearZFlag();
  }
  flagRegister.clearNFlag();
  flagRegister.setHFlag();
  flagRegister.clearCYFlag();
}

// used both by XOR and OR operations
function validateOrOperation(result: number, F: Cpu_Flag_Register) {
  if (result == 0) {
    F.setZFlag();
  } else {
    F.clearZFlag();
  }
  F.clearNFlag();
  F.clearHFlag();
  F.clearCYFlag();
}

function validateBitFlagOperation(testBit: number, F: Cpu_Flag_Register) {
  if (testBit == 0) {
    F.setZFlag();
  } else {
    F.clearZFlag();
  }

  F.clearNFlag();
  F.setHFlag();
}

function validateBitShiftAccOperation(carryBit: number, F: Cpu_Flag_Register) {
  if (carryBit == 1) {
    F.setCYFlag();
  } else {
    F.clearCYFlag();
  }

  F.clearHFlag();
  F.clearNFlag();
  F.clearZFlag();
}

function validateBitShiftOperation(
  carryBit: number,
  result: number,
  F: Cpu_Flag_Register
) {
  if (carryBit == 1) {
    F.setCYFlag();
  } else {
    F.clearCYFlag();
  }

  if ((result & 0b1111_1111) == 0) {
    F.setZFlag();
  } else {
    F.clearZFlag();
  }

  F.clearHFlag();
  F.clearNFlag();
}

function validateSwapOperation(result: number, F: Cpu_Flag_Register) {
  if ((result & 0b1111_1111) == 0) {
    F.setZFlag();
  } else {
    F.clearZFlag();
  }

  F.clearCYFlag();
  F.clearHFlag();
  F.clearNFlag();
}

export {
  validateR8Addition,
  validateR16Addition,
  validateR8Subtraction,
  validateR8Decrement,
  validateR8Increment,
  validateAndOperation,
  validateOrOperation,
  validateBitFlagOperation,
  validateBitShiftAccOperation,
  validateBitShiftOperation,
  validateSwapOperation,
};

import type { Cpu_Flag_Register } from "../../Cpu/CPU_Flag_Register";

/**
 * @description this will validate the sum and raise the appropriate flags
 **/
function validateR8Arythmatic(sum: number, flagRegister: Cpu_Flag_Register) {
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

  // Raise Carry flag if overlow from bit 7.
  if (sum > 0xff) {
    flagRegister.setCYFlag();
  } else {
    flagRegister.clearCYFlag();
  }
}

export { validateR8Arythmatic };

import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register } from "../CPU_Register";

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

  // Raise N flag to zero.
  if (sum) {
    registerF.clearNFlag();
  } else {
    registerF.clearNFlag();
  }

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

export { ADCAR8 };

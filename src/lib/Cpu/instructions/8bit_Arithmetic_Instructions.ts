import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register } from "../CPU_Register";

function ADCAR8(
  register8: Cpu_Register,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    register8.getRegister() + registerF.getCYFlag() + registerA.getRegister();
  3;
  registerA.setRegister(sum);
  //  set the flag registers

  // Raise z flag if result is zero.
  if (sum == 0) {
    registerF.setZFlag();
  }
  // Raise N flag to zero.
  if (sum) {
    registerF.setRegister(registerF.getFRegister() & 0b1011_0000);
  }

  // Raise Half Carry flag if overlow from bit 3.
  if (
    (register8.getRegister() & 0xf) +
      (registerA.getRegister() & 0xf) +
      registerF.getHFlag() >
    0xf
  ) {
    registerF.setHFlag();
  }

  // Raise Carry flag if overlow from bit 7.
  if (
    (register8.getRegister() & 0xff) +
      (registerA.getRegister() & 0xff) +
      registerF.getCYFlag() >
    0xff
  ) {
    registerF.setCYFlag();
  }
}

export { ADCAR8 };

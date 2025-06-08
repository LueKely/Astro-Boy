import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register } from "../CPU_Register";

function ADCAR8(
  register8: Cpu_Register,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    register8.getRegister() +
    registerF.getFRegister() +
    registerA.getRegister();

  registerA.setRegister(sum);
  //  set the flag register
  if (sum == 0) {
    registerF.getZFlag();
  }
  if (sum) {
    console.log(0b0000_1111);
  }
}

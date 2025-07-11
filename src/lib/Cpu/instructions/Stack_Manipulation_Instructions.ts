//  ADD HL, SP - untested

import { validateR16Addition } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Pointer_Register } from "../CPU_Pointer_Register";
import type { Cpu_Register_16Bit } from "../CPU_Register";

// untested
/**
 * @description Add the value in SP to HL.
 **/
function ADDHLSP(
  registerHL: Cpu_Register_16Bit<any>,
  registerSP: Cpu_Pointer_Register,
  registerF: Cpu_Flag_Register
) {
  const sum = registerHL.getRegister() + registerSP.getRegister();

  validateR16Addition(sum, registerF);
  registerHL.setRegister(sum);
}
// untested
// not sure about this will gather information about this
function ADDSPE8(
  e8: number,
  SP: Cpu_Pointer_Register,
  registerF: Cpu_Flag_Register
) {
  const sum = e8 + SP.getRegister();
  // validate sum
  registerF.clearZFlag();
  registerF.clearNFlag();
  if (sum > 0xf) {
    registerF.setHFlag();
  } else {
    registerF.clearHFlag();
  }
  if (sum > 0xff) {
    registerF.setCYFlag();
  } else {
    registerF.clearCYFlag();
  }

  SP.setRegister(sum);
}

export { ADDHLSP, ADDSPE8 };

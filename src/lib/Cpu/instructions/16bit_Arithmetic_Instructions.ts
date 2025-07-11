//  ADD HL, R16 - tested

import { validateR16Addition } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register_16Bit } from "../CPU_Register";

/**
 * @description Add the value in r16 to HL.
 **/
function ADDHLR16(
  r16: number,
  registerHL: Cpu_Register_16Bit<"HL">,
  flagRegister: Cpu_Flag_Register
) {
  const sum = r16 + registerHL.getRegister();

  validateR16Addition(sum, flagRegister);

  registerHL.setRegister(sum);
}

export { ADDHLR16 };

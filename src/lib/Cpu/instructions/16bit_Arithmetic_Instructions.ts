import { validateR16Addition } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register_16Bit } from "../CPU_Register";

//  ADD HL, R16
/**
 * @description Add the value in r16 to HL.
 **/
function ADDHLR16(
  r16: Cpu_Register_16Bit<any>,
  registerHL: Cpu_Register_16Bit<"HL">,
  flagRegister: Cpu_Flag_Register
) {
  const sum = r16.getRegister() + registerHL.getRegister();

  validateR16Addition(sum, flagRegister);

  registerHL.setRegister(sum);
}

//  INC R16
/**
 * @description Increase the value of r16 by 1.
 **/

function INCR16(r16: Cpu_Register_16Bit<any>) {
  const sum = 1 + r16.getRegister();
  r16.setRegister(sum);
}

//  DEC R16
/**
 * @description decrease the value of r16 by 1.
 **/
function DECR16(r16: Cpu_Register_16Bit<any>) {
  const difference = r16.getRegister() - 1;
  r16.setRegister(difference);
}

export { ADDHLR16, INCR16, DECR16 };

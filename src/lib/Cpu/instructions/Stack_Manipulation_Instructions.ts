//  ADD HL, SP - untested

import type { Ram } from "../../Ram/Ram";
import { validateR16Addition } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Program_Counter_Register } from "../CPU_Pointer_Register";
import type { Cpu_Register_16Bit } from "../CPU_Register";

// untested this shit is wrong
// not sure about this will gather information about this
function ADDSPE8(
  e8: number,
  SP: Program_Counter_Register,
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

// DONE WITH INC SP And DEC SP
// DONE LD SP NN (LD r16 nn)
// WORKING ON LD NN SP

export { ADDSPE8 };

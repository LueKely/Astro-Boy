import type { Ram } from "../../Ram/Ram";
import { validateR8Arythmatic } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";

function ADCAR8(
  register8: Cpu_Register,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    register8.getRegister() + registerF.getCYFlag() + registerA.getRegister();

  //  validate sum with the flag registers
  validateR8Arythmatic(sum, registerF);

  registerA.setRegister(sum);
}

function ADCAHL(
  pointer: Cpu_Register_16Bit,
  memory: Ram,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    (memory.getMemoryAt(pointer.getRegister()) +
      registerF.getCYFlag() +
      registerA.getRegister()) &
    0xff;

  //  validate sum with the flag registers
  validateR8Arythmatic(sum, registerF);
  registerA.setRegister(sum);
}

function ADCAN8(
  value: number,
  registerA: Cpu_Register,
  registerF: Cpu_Flag_Register
) {
  const sum = (value + registerA.getRegister() + registerF.getCYFlag()) & 0xff;
  validateR8Arythmatic(sum, registerF);
  registerA.setRegister(sum);
}

export { ADCAR8, ADCAHL, ADCAN8 };

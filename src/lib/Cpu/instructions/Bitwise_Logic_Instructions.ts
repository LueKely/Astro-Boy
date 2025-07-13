import type { Ram } from "../../Ram/Ram";
import { validateAndOperation } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";

// AND A, R8
function ANDAR8(
  registerA: Cpu_Register<"A">,
  r8: Cpu_Register<any>,
  registerF: Cpu_Flag_Register
) {
  const operation = registerA.getRegister() & r8.getRegister();
  validateAndOperation(operation, registerF);
  registerA.setRegister(operation);
}

// AND A, [HL]
function ANDAHL(
  registerA: Cpu_Register<"A">,
  HL: Cpu_Register_16Bit<"HL">,
  registerF: Cpu_Flag_Register,
  ram: Ram
) {
  const operation = registerA.getRegister() & ram.getMemoryAt(HL.getRegister());
  validateAndOperation(operation, registerF);
  registerA.setRegister(operation);
}

// AND A, N8
function ANDAN8(
  registerA: Cpu_Register<"A">,
  n8: number,
  registerF: Cpu_Flag_Register
) {
  const operation = registerA.getRegister() & n8;
  validateAndOperation(operation, registerF);
  registerA.setRegister(operation);
}

export { ANDAR8, ANDAHL, ANDAN8 };

import type { Ram } from "../../Ram/Ram";
import {
  validateR16Arithmetic,
  validateR8Arithmetic,
} from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";

// ADC A, r8  - tested
/**
 * @description add the value in r8
 * the carry flag to A
 **/
function ADCAR8(
  register8: Cpu_Register,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    register8.getRegister() + registerF.getCYFlag() + registerA.getRegister();

  //  validate sum with the flag registers
  validateR8Arithmetic(sum, registerF);

  registerA.setRegister(sum);
}
/**
 * @description Add the byte pointed to by HL
 *  plus the carry flag to A.
 **/
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
  validateR8Arithmetic(sum, registerF);
  registerA.setRegister(sum);
}

// ADC A, [HL] - tested
/**
 * @description Add the value n8 plus the carry flag to A.
 **/
function ADCAN8(
  value: number,
  registerA: Cpu_Register,
  registerF: Cpu_Flag_Register
) {
  const sum = (value + registerA.getRegister() + registerF.getCYFlag()) & 0xff;
  validateR8Arithmetic(sum, registerF);
  registerA.setRegister(sum);
}

// no carry flag functions

// ADD A, R8 - tested
/**
 * @description Add the value in r8 to A.
 **/
function ADDAR8(
  register8: Cpu_Register,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum = (register8.getRegister() + registerA.getRegister()) & 0xff;

  //  validate sum with the flag registers
  validateR8Arithmetic(sum, registerF);

  registerA.setRegister(sum);
}

// ADD A,[HL] - tested
/**
 * @description Add the byte pointed to by HL to A.
 **/
function ADDAHL(
  pointer: Cpu_Register_16Bit,
  memory: Ram,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register
) {
  const sum =
    (memory.getMemoryAt(pointer.getRegister()) + registerA.getRegister()) &
    0xff;

  //  validate sum with the flag registers
  validateR8Arithmetic(sum, registerF);
  registerA.setRegister(sum);
}

// ADD A,n8 - tested
/**
 * @description Add the value n8 to A.
 **/
function ADDAN8(
  value: number,
  registerA: Cpu_Register,
  registerF: Cpu_Flag_Register
) {
  const sum = (value + registerA.getRegister()) & 0xff;

  //  validate sum with the flag registers
  validateR8Arithmetic(sum, registerF);
  registerA.setRegister(sum);
}

// 16bit arithmetic

//  ADD HL, R16 - tested
/**
 * @description Add the value in r16 to HL.
 **/
function ADDHLR16(
  r16: number,
  registerHL: Cpu_Register_16Bit,
  flagRegister: Cpu_Flag_Register
) {
  const sum = r16 + registerHL.getRegister();

  validateR16Arithmetic(sum, flagRegister);

  registerHL.setRegister(sum);
}

function ADDHLSP(registerHL:Cpu_Register_16Bit, registerSP:){}

export { ADCAR8, ADCAHL, ADCAN8, ADDAHL, ADDAN8, ADDAR8, ADDHLR16 };

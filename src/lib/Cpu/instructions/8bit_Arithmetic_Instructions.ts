import type { Ram } from "../../Ram/Ram";
import {
  validateR8Subtraction,
  validateR8Addition,
  validateR8Decrement,
  validateR8Increment,
} from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";

// ADC A, r8  - tested
/**
 * @description add the value in r8
 * the carry flag to A
 **/
function ADCAR8(
  register8: Cpu_Register<any>,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register<"A">
) {
  const sum =
    register8.getRegister() + registerF.getCYFlag() + registerA.getRegister();
  const hflagSum =
    (register8.getRegister() & 0x0f) +
    (registerA.getRegister() & 0x0f) +
    registerF.getCYFlag();

  //  validate sum with the flag registers
  validateR8Addition(sum, hflagSum, registerF);

  registerA.setRegister(sum);
}
/**
 * @description Add the byte pointed to by HL
 *  plus the carry flag to A.
 **/
function ADCAHL(
  pointer: Cpu_Register_16Bit<"HL">,
  memory: Ram,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register<"A">
) {
  const sum =
    (memory.getMemoryAt(pointer.getRegister()) +
      registerF.getCYFlag() +
      registerA.getRegister()) &
    0xff;

  const hflagSum =
    (memory.getMemoryAt(pointer.getRegister()) & 0x0f) +
    (registerA.getRegister() & 0x0f) +
    registerF.getCYFlag();

  //  validate sum with the flag registers
  validateR8Addition(sum, hflagSum, registerF);
  registerA.setRegister(sum);
}

// ADC A, [HL] - tested
/**
 * @description Add the value n8 plus the carry flag to A.
 **/
function ADCAN8(
  value: number,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  const sum = (value + registerA.getRegister() + registerF.getCYFlag()) & 0xff;
  const hflagSum =
    (value & 0x0f) + (registerA.getRegister() & 0x0f) + registerF.getCYFlag();

  validateR8Addition(sum, hflagSum, registerF);
  registerA.setRegister(sum);
}

// no carry flag functions

// ADD A, R8 - tested
/**
 * @description Add the value in r8 to A.
 **/
function ADDAR8(
  register8: Cpu_Register<any>,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register<"A">
) {
  const sum = (register8.getRegister() + registerA.getRegister()) & 0xff;
  const hflagSum =
    (register8.getRegister() & 0x0f) + (registerA.getRegister() & 0x0f);

  //  validate sum with the flag registers
  validateR8Addition(sum, hflagSum, registerF);

  registerA.setRegister(sum);
}

// ADD A,[HL] - tested
/**
 * @description Add the byte pointed to by HL to A.
 **/
function ADDAHL(
  pointer: Cpu_Register_16Bit<"HL">,
  memory: Ram,
  registerF: Cpu_Flag_Register,
  registerA: Cpu_Register<"A">
) {
  const sum =
    (memory.getMemoryAt(pointer.getRegister()) + registerA.getRegister()) &
    0xff;
  const hflagSum =
    (memory.getMemoryAt(pointer.getRegister()) & 0x0f) +
    (registerA.getRegister() & 0x0f);

  //  validate sum with the flag registers
  validateR8Addition(sum, hflagSum, registerF);
  registerA.setRegister(sum);
}

// ADD A,n8 - tested
/**
 * @description Add the value n8 to A.
 **/
function ADDAN8(
  value: number,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  const sum = (value + registerA.getRegister()) & 0xff;
  const hflagSum = (value & 0x0f) + (registerA.getRegister() & 0x0f);

  //  validate sum with the flag registers
  validateR8Addition(sum, hflagSum, registerF);
  registerA.setRegister(sum);
}

// CP A, R8
/**
 * @description Compares the value in A with the value in r8 - DOES NOT STORE THE RESULT
 **/
function CPAR8(
  r8: Cpu_Register<any>,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  validateR8Subtraction(registerF, registerA.getRegister(), r8.getRegister());
}
// CP A, [HL]
/**
 * @description Compares the value in A with the value in [HL] - DOES NOT STORE THE RESULT
 **/
function CPAHL(
  memory: Ram,
  registerA: Cpu_Register<"A">,
  registerHL: Cpu_Register_16Bit<"HL">,
  registerF: Cpu_Flag_Register
) {
  validateR8Subtraction(
    registerF,
    registerA.getRegister(),
    memory.getMemoryAt(registerHL.getRegister())
  );
}
// CP A, N8
/**
 * @description Compares the value in A with the value in n8 - DOES NOT STORE THE RESULT
 **/
function CPAN8(
  n8: number,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  validateR8Subtraction(registerF, registerA.getRegister(), n8);
}

// DEC r8
/**
 * @description Decrement the value in register r8 by 1
 **/
function DECR8(r8: Cpu_Register<any>, flagRegister: Cpu_Flag_Register) {
  const difference = r8.getRegister() - 1;
  validateR8Decrement(flagRegister, r8.getRegister());
  r8.setRegister(difference);
}
// DEC [HL]
/**
 * @description Decrement the value in pointed by HL  by 1
 **/
function DECHL(
  registerHL: Cpu_Register_16Bit<"HL">,
  ram: Ram,
  flagRegister: Cpu_Flag_Register
) {
  const difference = ram.getMemoryAt(registerHL.getRegister()) - 1;
  validateR8Decrement(flagRegister, ram.getMemoryAt(registerHL.getRegister()));
  ram.setMemoryAt(registerHL.getRegister(), difference);
}

//  INC r8
/**
 * @description Increment the value in register r8 by 1
 **/
function INCR8(register: Cpu_Register<any>, flagRegister: Cpu_Flag_Register) {
  const sum = register.getRegister() + 1;
  validateR8Increment(sum, flagRegister);
  register.setRegister(sum);
}

// INC HL
/**
 * @description Increment the value in pointed by HL  by 1
 **/
function INCHL(
  registerHL: Cpu_Register_16Bit<"HL">,
  ram: Ram,
  flagRegister: Cpu_Flag_Register
) {
  const sum = ram.getMemoryAt(registerHL.getRegister()) + 1;
  validateR8Increment(sum, flagRegister);
  ram.setMemoryAt(registerHL.getRegister(), sum);
}

// SBC A, R8
/**
 * @description Subtracts the value in A with the value
 * in r8 plus the carry and stores it in A
 **/
function SBCAR8(
  r8: Cpu_Register<any>,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  const difference =
    registerA.getRegister() - r8.getRegister() - registerF.getCYFlag();

  validateR8Subtraction(
    registerF,
    registerA.getRegister(),
    r8.getRegister(),
    registerF.getCYFlag()
  );

  registerA.setRegister(difference);
}
// SBC A, [HL]
/**
 * @description Subtracts the value in A with the value in
 * [HL] plus the carry and stores it in A
 **/
function SBCAHL(
  memory: Ram,
  registerA: Cpu_Register<"A">,
  registerHL: Cpu_Register_16Bit<"HL">,
  registerF: Cpu_Flag_Register
) {
  const difference =
    registerA.getRegister() -
    (memory.getMemoryAt(registerHL.getRegister()) + registerF.getCYFlag());

  validateR8Subtraction(
    registerF,
    registerA.getRegister(),
    memory.getMemoryAt(registerHL.getRegister()),
    registerF.getCYFlag()
  );

  registerA.setRegister(difference);
}
// SBC A, N8 - untested
/**
 * @description Subtracts the value in A with the value in n8
 * plus the carry and stores it in A
 **/
function SBCAN8(
  n8: number,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  const difference = registerA.getRegister() - n8 - registerF.getCYFlag();

  validateR8Subtraction(
    registerF,
    registerA.getRegister(),
    n8,
    registerF.getCYFlag()
  );

  registerA.setRegister(difference);
}

// SUB A, R8 - untested
/**
 * @description Subtracts the value in A with the value in r8 and
 * stores it in A
 **/
function SUBAR8(
  r8: Cpu_Register<any>,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  const difference = registerA.getRegister() - r8.getRegister();

  validateR8Subtraction(
    registerF,
    registerA.getRegister(),
    r8.getRegister(),
    registerF.getCYFlag()
  );

  registerA.setRegister(difference);
}
// SBC A, [HL]
/**
 * @description Subtracts the value in A with the value in [HL]
 *  and stores it in A
 **/
function SUBAHL(
  memory: Ram,
  registerA: Cpu_Register<"A">,
  registerHL: Cpu_Register_16Bit<"HL">,
  registerF: Cpu_Flag_Register
) {
  const difference =
    registerA.getRegister() - memory.getMemoryAt(registerHL.getRegister());

  validateR8Subtraction(
    registerF,
    registerA.getRegister(),
    memory.getMemoryAt(registerHL.getRegister())
  );

  registerA.setRegister(difference);
}
// SBC A, N8
/**
 * @description Subtracts the value in A with the value in
 * n8 and stores it in A
 **/
function SUBAN8(
  n8: number,
  registerA: Cpu_Register<"A">,
  registerF: Cpu_Flag_Register
) {
  const difference = registerA.getRegister() - n8;
  validateR8Subtraction(
    registerF,
    registerA.getRegister(),
    n8 + registerF.getCYFlag()
  );
  registerA.setRegister(difference);
}

export {
  ADCAR8,
  ADCAHL,
  ADCAN8,
  ADDAHL,
  ADDAN8,
  ADDAR8,
  CPAR8,
  CPAHL,
  CPAN8,
  DECR8,
  DECHL,
  INCR8,
  INCHL,
  SBCAR8,
  SBCAHL,
  SBCAN8,
  SUBAR8,
  SUBAHL,
  SUBAN8,
};

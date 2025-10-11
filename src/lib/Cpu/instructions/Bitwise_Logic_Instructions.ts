import type { Ram } from '../../Ram/Ram';
import {
    validateAndOperation,
    validateOrOperation,
} from '../../utils/instructions/instruction_utils';
import type { Cpu_Flag_Register } from '../CPU_Flag_Register';
import type { Cpu_Register, Cpu_Register_16Bit } from '../CPU_Register';

// AND A, R8
function ANDAR8(A: Cpu_Register<'A'>, r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
    const operation = A.getRegister() & r8.getRegister();
    validateAndOperation(operation, F);
    A.setRegister(operation);
}

// AND A, [HL]
function ANDAHL(
    A: Cpu_Register<'A'>,
    HL: Cpu_Register_16Bit<'HL'>,
    F: Cpu_Flag_Register,
    ram: Ram
) {
    const operation = A.getRegister() & ram.read(HL.getRegister());
    validateAndOperation(operation, F);
    A.setRegister(operation);
}

// AND A, N8
function ANDAN8(A: Cpu_Register<'A'>, n8: number, F: Cpu_Flag_Register) {
    const operation = A.getRegister() & n8;
    validateAndOperation(operation, F);
    A.setRegister(operation);
}

// CPL
function CPL(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
    A.setRegister(~A.getRegister());

    F.setNFlag();
    F.setHFlag();
}

// OR A, R8
function ORAR8(A: Cpu_Register<'A'>, r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
    const operation = A.getRegister() | r8.getRegister();
    validateOrOperation(operation, F);
    A.setRegister(operation);
}

// OR A, [HL]
function ORAHL(A: Cpu_Register<'A'>, HL: Cpu_Register_16Bit<'HL'>, F: Cpu_Flag_Register, ram: Ram) {
    const operation = A.getRegister() | ram.read(HL.getRegister());
    validateOrOperation(operation, F);
    A.setRegister(operation);
}

// OR A, N8
function ORAN8(A: Cpu_Register<'A'>, n8: number, F: Cpu_Flag_Register) {
    const operation = A.getRegister() | n8;
    validateOrOperation(operation, F);
    A.setRegister(operation);
}

// XOR A, R8
function XORAR8(A: Cpu_Register<'A'>, r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
    const operation = A.getRegister() ^ r8.getRegister();
    validateOrOperation(operation, F);
    A.setRegister(operation);
}

// XOR A, [HL]
function XORAHL(
    A: Cpu_Register<'A'>,
    HL: Cpu_Register_16Bit<'HL'>,
    F: Cpu_Flag_Register,
    ram: Ram
) {
    const operation = A.getRegister() ^ ram.read(HL.getRegister());
    validateOrOperation(operation, F);
    A.setRegister(operation);
}

// XOR A, N8
function XORAN8(A: Cpu_Register<'A'>, n8: number, F: Cpu_Flag_Register) {
    const operation = A.getRegister() ^ n8;
    validateOrOperation(operation, F);
    A.setRegister(operation);
}

export { ANDAR8, ANDAHL, ANDAN8, CPL, ORAR8, ORAHL, ORAN8, XORAR8, XORAN8, XORAHL };

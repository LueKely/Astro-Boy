import type { Ram } from '../../Ram/Ram';
import {
	validateBitShiftAccOperation,
	validateBitShiftOperation,
	validateSwapOperation,
} from '../../utils/instructions/instruction_utils';
import type { Cpu_Flag_Register } from '../CPU_Flag_Register';
import type { Cpu_Register, Cpu_Register_16Bit } from '../CPU_Register';

// RL, R8
function RLR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const bit7 = r8.getRegister() >>> 7;
	const oldCarry = F.getCYFlag();
	const result = (r8.getRegister() << 1) | oldCarry;

	validateBitShiftOperation(bit7, result, F);

	r8.setRegister(result);
}

// RL, [HL]
function RLHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const bit7 = ram.getMemoryAt(HL.getRegister()) >>> 7;
	const oldCarry = F.getCYFlag();
	const result = (ram.getMemoryAt(HL.getRegister()) << 1) | oldCarry;

	validateBitShiftOperation(bit7, result, F);

	ram.setMemoryAt(HL.getRegister(), result);
}

function RLA(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
	const bit7 = A.getRegister() >>> 7;
	const oldCarry = F.getCYFlag();
	const result = (A.getRegister() << 1) | oldCarry;

	validateBitShiftAccOperation(bit7, F);

	A.setRegister(result);
}

// RLC, R8
function RLCR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const bit7 = r8.getRegister() >>> 7;
	const result = (r8.getRegister() << 1) | bit7;

	validateBitShiftOperation(bit7, result, F);

	r8.setRegister(result);
}
// RLC, [HL]
function RLCHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const bit7 = ram.getMemoryAt(HL.getRegister()) >>> 7;
	const result = (ram.getMemoryAt(HL.getRegister()) >>> 7) | bit7;

	validateBitShiftOperation(bit7, result, F);

	ram.setMemoryAt(HL.getRegister(), result);
}

// RLC, A
function RLCA(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
	const bit7 = A.getRegister() >>> 7;
	const result = (A.getRegister() << 1) | bit7;

	validateBitShiftAccOperation(bit7, F);

	A.setRegister(result);
}

// RR, R8
function RRR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const bit0 = r8.getRegister() & 0b0000_0001;

	const oldCarry = F.getCYFlag();

	const result = (r8.getRegister() >> 1) | (oldCarry << 7);

	validateBitShiftOperation(bit0, result, F);

	r8.setRegister(result);
}

// RR, [HL]
function RRHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const bit0 = ram.getMemoryAt(HL.getRegister()) & 0b0000_0001;

	const oldCarry = F.getCYFlag();

	const result = (ram.getMemoryAt(HL.getRegister()) >> 1) | (oldCarry << 7);
	validateBitShiftOperation(bit0, result, F);

	ram.setMemoryAt(HL.getRegister(), result);
}

// RR, A
function RRA(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
	const bit0 = A.getRegister() & 0b0000_0001;

	const oldCarry = F.getCYFlag();

	const result = (A.getRegister() >> 1) | (oldCarry << 7);

	validateBitShiftAccOperation(bit0, F);

	A.setRegister(result);
}

// RRC, R8
function RRCR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const bit0 = r8.getRegister() & 0b0000_0001;
	const result = (r8.getRegister() >> 1) | (bit0 << 7);

	validateBitShiftOperation(bit0, result, F);

	r8.setRegister(result);
}

// RRC, [HL]
function RRCHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const bit0 = ram.getMemoryAt(HL.getRegister()) & 0b0000_0001;

	const result = (ram.getMemoryAt(HL.getRegister()) >> 1) | (bit0 << 7);
	validateBitShiftOperation(bit0, result, F);

	ram.setMemoryAt(HL.getRegister(), result);
}

// RRC, A
function RRCA(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
	const bit0 = A.getRegister() & 0b0000_0001;
	const result = (A.getRegister() >> 1) | (bit0 << 7);
	validateBitShiftAccOperation(bit0, F);
	A.setRegister(result);
}

// SLA, R8
function SLAR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const bit7 = r8.getRegister() >>> 7;
	const result = r8.getRegister() << 1;
	r8.setRegister(result);
	validateBitShiftOperation(bit7, result, F);
}

// SLA, [HL]
function SLAHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const bit7 = ram.getMemoryAt(HL.getRegister()) >>> 7;
	const result = ram.getMemoryAt(HL.getRegister()) << 1;

	validateBitShiftOperation(bit7, result, F);

	ram.setMemoryAt(HL.getRegister(), result);
}

// SRA, R8
function SRAR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const bit7 = r8.getRegister() & 0b1000_0000;
	const bit0 = r8.getRegister() & 0b0000_0001;
	const result = (r8.getRegister() >> 1) | bit7;

	r8.setRegister(result);
	validateBitShiftOperation(bit0, result, F);
}

// SRA, [HL]
function SRAHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const bit7 = ram.getMemoryAt(HL.getRegister()) & 0b1000_0000;
	const bit0 = ram.getMemoryAt(HL.getRegister()) & 0b0000_0001;
	const result = (ram.getMemoryAt(HL.getRegister()) >> 1) | bit7;

	validateBitShiftOperation(bit0, result, F);

	ram.setMemoryAt(HL.getRegister(), result);
}

// SRL, R8
function SRLR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const bit0 = r8.getRegister() & 0b0000_0001;
	const result = r8.getRegister() >> 1;

	r8.setRegister(result);
	validateBitShiftOperation(bit0, result, F);
}

// SRL, [HL]
function SRLHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const bit0 = ram.getMemoryAt(HL.getRegister()) & 0b0000_0001;
	const result = ram.getMemoryAt(HL.getRegister()) >> 1;
	validateBitShiftOperation(bit0, result, F);

	ram.setMemoryAt(HL.getRegister(), result);
}

// SWAP, R8
function SWAPR8(r8: Cpu_Register<any>, F: Cpu_Flag_Register) {
	const upperBit = (r8.getRegister() & 0b1111_0000) >> 4;
	const lowerBit = (r8.getRegister() & 0b0000_1111) << 4;
	const result = upperBit | lowerBit;

	r8.setRegister(result);
	validateSwapOperation(result, F);
}

function SWAPHL(HL: Cpu_Register_16Bit<'HL'>, ram: Ram, F: Cpu_Flag_Register) {
	const upperBit = (ram.getMemoryAt(HL.getRegister()) & 0b1111_0000) >> 4;
	const lowerBit = (ram.getMemoryAt(HL.getRegister()) & 0b0000_1111) << 4;
	const result = upperBit | lowerBit;
	ram.setMemoryAt(HL.getRegister(), result);

	validateSwapOperation(result, F);
}

export {
	RLR8,
	RLHL,
	RLA,
	RLCR8,
	RLCHL,
	RLCA,
	RRR8,
	RRHL,
	RRCR8,
	RRCA,
	RRCHL,
	SLAR8,
	SLAHL,
	SRLR8,
	SRLHL,
	SWAPR8,
	SWAPHL,
};

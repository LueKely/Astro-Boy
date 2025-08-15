import type { Gameboy } from '../Gameboy';
import { BITU3HL, BITU3R8 } from './instructions/Bit_Flag_Instructions';
import {
	RLA,
	RLCA,
	RLCHL,
	RLCR8,
	RLHL,
	RLR8,
	RRA,
	RRCA,
	RRCHL,
	RRCR8,
	RRHL,
	RRR8,
	SLAHL,
	SLAR8,
	SRAHL,
	SRAR8,
	SRLHL,
	SRLR8,
	SWAPHL,
	SWAPR8,
} from './instructions/Bit_Shift_Logic_Instructions';
import type { IOpCodeEntry } from './types/OpcodeTypes';

export class CpuPrefixOpCodeRecord {
	get(index: number): IOpCodeEntry {
		return this.record()[index];
	}

	private record(): Record<number, IOpCodeEntry> {
		return {
			0x0: {
				name: 'RLC B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLCR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x1: {
				name: 'RLC C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLCR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x2: {
				name: 'RLC D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLCR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x3: {
				name: 'RLC E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLCR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x4: {
				name: 'RLC H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLCR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x5: {
				name: 'RLC L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLCR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},

			0x6: {
				name: 'RLC (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						RLCHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x7: {
				name: 'RLC A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLCA(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x8: {
				name: 'RRC B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x9: {
				name: 'RRC C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0xa: {
				name: 'RRC D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0xb: {
				name: 'RRC E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0xc: {
				name: 'RRC H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0xd: {
				name: 'RRC L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0xe: {
				name: 'RRC (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						RRCHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0xf: {
				name: 'RRC A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCA(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x10: {
				name: 'RL B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x11: {
				name: 'RL C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x12: {
				name: 'RL D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x13: {
				name: 'RL E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x14: {
				name: 'RL H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x15: {
				name: 'RL L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},

			0x16: {
				name: 'RL (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						RLHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x17: {
				name: 'RL A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RLA(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x18: {
				name: 'RR B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x19: {
				name: 'RR C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x1a: {
				name: 'RR D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x1b: {
				name: 'RR E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x1c: {
				name: 'RR H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRCR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x1d: {
				name: 'RR L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x1e: {
				name: 'RR (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						RRHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x1f: {
				name: 'RR A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRA(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x20: {
				name: 'SLA B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x21: {
				name: 'SLA C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x22: {
				name: 'SLA D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x23: {
				name: 'SLA E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x24: {
				name: 'SLA H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x25: {
				name: 'SLA L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},

			0x26: {
				name: 'SLA (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						SLAHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x27: {
				name: 'SLA A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x28: {
				name: 'SRA B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRAR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x29: {
				name: 'SRA C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						RRR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x2a: {
				name: 'SRA D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRAR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x2b: {
				name: 'SRA E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRAR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x2c: {
				name: 'SRA H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRAR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x2d: {
				name: 'SRA L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRAR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x2e: {
				name: 'SRA (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						SRAHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x2f: {
				name: 'SRA A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRAR8(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x30: {
				name: 'SWAP B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SWAPR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x31: {
				name: 'SWAP C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SWAPR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x32: {
				name: 'SWAP D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SWAPR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x33: {
				name: 'SWAP E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SWAPR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x34: {
				name: 'SWAP H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SWAPR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x35: {
				name: 'SWAP L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SLAR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},

			0x36: {
				name: 'SLA (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						SWAPHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x37: {
				name: 'SWAP A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SWAPR8(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x38: {
				name: 'SRL B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRLR8(dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x39: {
				name: 'SRL C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRLR8(dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x3a: {
				name: 'SRL D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRLR8(dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x3b: {
				name: 'SRL E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRAR8(dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x3c: {
				name: 'SRL H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRLR8(dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x3d: {
				name: 'SRL L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRLR8(dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x3e: {
				name: 'SRL (HL)',
				length: 2,
				cycles: 4,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						SRLHL(
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
					},
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x3f: {
				name: 'SRL A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						SRLR8(dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x40: {
				name: 'BIT 0, B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(0, dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x41: {
				name: 'BIT 0, C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(0, dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x42: {
				name: 'BIT 0, D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(0, dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x43: {
				name: 'BIT 0, E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(0, dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x44: {
				name: 'BIT 0, H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(0, dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x45: {
				name: 'BIT 0, L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(0, dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x46: {
				name: 'BIT 0, (HL)',
				length: 2,
				cycles: 3,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						BITU3HL(
							0,
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x47: {
				name: 'BIT 0, A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(0, dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x48: {
				name: 'BIT 1, B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(1, dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x49: {
				name: 'BIT 1, C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(1, dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x4a: {
				name: 'BIT 1, D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(1, dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x4b: {
				name: 'BIT 1, E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(1, dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x4c: {
				name: 'BIT 1, H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(1, dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x4d: {
				name: 'BIT 1, L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(1, dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x4e: {
				name: 'BIT 1, (HL)',
				length: 2,
				cycles: 3,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						BITU3HL(
							1,
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x4f: {
				name: 'BIT 1, A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(1, dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x50: {
				name: 'BIT 2, B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(2, dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x51: {
				name: 'BIT 2, C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(2, dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x52: {
				name: 'BIT 2, D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(2, dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x53: {
				name: 'BIT 2, E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(2, dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x54: {
				name: 'BIT 2, H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(2, dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x55: {
				name: 'BIT 2, L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(2, dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x56: {
				name: 'BIT 2, (HL)',
				length: 2,
				cycles: 3,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						BITU3HL(
							2,
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x57: {
				name: 'BIT 2, A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(2, dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x58: {
				name: 'BIT 3, B',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(3, dmg.registers.register.B, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x59: {
				name: 'BIT 3, C',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(3, dmg.registers.register.C, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x5a: {
				name: 'BIT 3, D',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(3, dmg.registers.register.D, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x5b: {
				name: 'BIT 3, E',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(3, dmg.registers.register.E, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x5c: {
				name: 'BIT 3, H',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(3, dmg.registers.register.H, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x5d: {
				name: 'BIT 3, L',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(3, dmg.registers.register.L, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x5e: {
				name: 'BIT 3, (HL)',
				length: 2,
				cycles: 3,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						console.log(
							'Value at HL',
							dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
						);
					},
					(dmg: Gameboy) => {
						BITU3HL(
							3,
							dmg.registers.register16Bit.HL,
							dmg.ram,
							dmg.registers.register.F
						);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
			0x5f: {
				name: 'BIT 3, A',
				length: 2,
				cycles: 2,
				jobs: [
					(dmg: Gameboy) => {
						console.log('CB PREFIX DETECTED');
					},
					(dmg: Gameboy) => {
						BITU3R8(3, dmg.registers.register.A, dmg.registers.register.F);
						dmg.registers.pointers.PC.increment();
					},
				],
			},
		};
	}
}

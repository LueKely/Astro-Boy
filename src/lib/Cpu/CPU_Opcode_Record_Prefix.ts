import type { Gameboy } from '../Gameboy';
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
		};
	}
}

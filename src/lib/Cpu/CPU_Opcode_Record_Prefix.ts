import type { Gameboy } from '../Gameboy';
import {
	RLCA,
	RLCHL,
	RLCR8,
	RRCA,
	RRCHL,
	RRCR8,
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
		};
	}
}

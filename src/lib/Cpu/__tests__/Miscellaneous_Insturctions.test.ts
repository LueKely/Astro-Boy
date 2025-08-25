import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('DAA', () => {
	const testCases = [
		{ a_before: 0x15, f_before: 0b0000, a_after: 0x15, f_after: 0b0000 },

		{ a_before: 0x00, f_before: 0b0000, a_after: 0x00, f_after: 0b1000 },

		{ a_before: 0x1a, f_before: 0b0000, a_after: 0x20, f_after: 0b0000 },

		{ a_before: 0x2b, f_before: 0x20, a_after: 0x31, f_after: 0b0000 },

		{ a_before: 0x9a, f_before: 0x10, a_after: 0x00, f_after: 0x90 },

		{ a_before: 0x45, f_before: 0x40, a_after: 0x45, f_after: 0x40 },
	];

	testCases.forEach((values) => {
		test('Add then use DAA', () => {
			const dummyRom = new ArrayBuffer(1024);

			// init gameboy
			const gameboy = new Gameboy(dummyRom);
			gameboy.registers.pointers.PC.setRegister(0x0100);

			const { A, F } = gameboy.registers.register;

			A.setRegister(values.a_before);
			F.setRegister(values.f_before);

			gameboy.ram.setMemoryAt(0x100, 0x27);

			gameboy.scheduler.tick();

			expect(A.getRegister()).toBe(values.a_after);
			expect(F.getRegister()).toBe(values.f_after);
		});
	});
});

import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('PUSH R8', () => {
	test('PUSH BC', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { B, C } = gameboy.registers.register;

		B.setRegister(0x12);
		C.setRegister(0x34);

		gameboy.ram.setMemoryAt(0x100, 0xc5);
		gameboy.registers.pointers.SP.setRegister(0xfffe);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xfffc);
		expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x12);
		expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x34);
	});
	test('PUSH DE', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { D, E } = gameboy.registers.register;

		D.setRegister(0x12);
		E.setRegister(0x34);

		gameboy.ram.setMemoryAt(0x100, 0xd5);
		gameboy.registers.pointers.SP.setRegister(0xfffe);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xfffc);
		expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x12);
		expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x34);
		expect(D.getRegister()).toBe(0x12);
		expect(E.getRegister()).toBe(0x34);
	});
	test('PUSH HL', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { H, L } = gameboy.registers.register;

		H.setRegister(0x12);
		L.setRegister(0x34);

		gameboy.ram.setMemoryAt(0x100, 0xe5);
		gameboy.registers.pointers.SP.setRegister(0xfffe);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xfffc);
		expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x12);
		expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x34);
		expect(H.getRegister()).toBe(0x12);
		expect(L.getRegister()).toBe(0x34);
	});

	test('PUSH AF', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { A, F } = gameboy.registers.register;

		A.setRegister(0x12);
		F.setRegister(0x34);

		gameboy.ram.setMemoryAt(0x100, 0xf5);
		gameboy.registers.pointers.SP.setRegister(0xfffe);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xfffc);
		expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x12);
		expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x34);
		expect(A.getRegister()).toBe(0x12);
		expect(F.getRegister()).toBe(0x34);
	});
});

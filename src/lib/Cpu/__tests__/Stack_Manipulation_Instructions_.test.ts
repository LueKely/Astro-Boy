import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('PUSH R16', () => {
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

		H.setRegister(0x55);
		L.setRegister(0xaa);

		gameboy.ram.setMemoryAt(0x100, 0xe5);
		gameboy.registers.pointers.SP.setRegister(0x0002);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0x0000);
		expect(gameboy.ram.getMemoryAt(0x0001)).toBe(0x55);
		expect(gameboy.ram.getMemoryAt(0x000)).toBe(0xaa);
		expect(H.getRegister()).toBe(0x55);
		expect(L.getRegister()).toBe(0xaa);
	});

	test('PUSH AF', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { A, F } = gameboy.registers.register;

		A.setRegister(0xff);
		F.setRegister(0xff);

		gameboy.ram.setMemoryAt(0x100, 0xf5);
		gameboy.registers.pointers.SP.setRegister(0xc000);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xbffe);
		expect(gameboy.ram.getMemoryAt(0xbfff)).toBe(0xff);
		expect(gameboy.ram.getMemoryAt(0xbffe)).toBe(0xff);
		expect(A.getRegister()).toBe(0xff);
		expect(F.getRegister()).toBe(0xff);
	});
});

describe('POP R16', () => {
	test('POP BC', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { B, C } = gameboy.registers.register;

		gameboy.ram.setMemoryAt(0x100, 0xc1);
		gameboy.registers.pointers.SP.setRegister(0xfffc);
		gameboy.ram.setMemoryAt(0xfffc, 0x34);
		gameboy.ram.setMemoryAt(0xfffd, 0x12);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xfffe);
		expect(B.getRegister()).toBe(0x12);
		expect(C.getRegister()).toBe(0x34);
	});

	test('POP DE', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { D, E } = gameboy.registers.register;

		gameboy.ram.setMemoryAt(0x100, 0xd1);
		gameboy.registers.pointers.SP.setRegister(0xd000);
		gameboy.ram.setMemoryAt(0xd000, 0xab);
		gameboy.ram.setMemoryAt(0xd001, 0xcd);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xd002);
		expect(D.getRegister()).toBe(0xcd);
		expect(E.getRegister()).toBe(0xab);
	});

	test('POP DE', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { D, E } = gameboy.registers.register;

		gameboy.ram.setMemoryAt(0x100, 0xd1);
		gameboy.registers.pointers.SP.setRegister(0xd000);
		gameboy.ram.setMemoryAt(0xd000, 0xab);
		gameboy.ram.setMemoryAt(0xd001, 0xcd);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xd002);
		expect(D.getRegister()).toBe(0xcd);
		expect(E.getRegister()).toBe(0xab);
	});

	test('POP HL', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { H, L } = gameboy.registers.register;

		gameboy.ram.setMemoryAt(0x100, 0xe1);
		gameboy.registers.pointers.SP.setRegister(0xfffe);
		gameboy.ram.setMemoryAt(0xfffe, 0x00);
		gameboy.ram.setMemoryAt(0xffff, 0x80);

		H.setRegister(0x55);
		L.setRegister(0xaa);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0x0000);
		expect(H.getRegister()).toBe(0x80);
		expect(L.getRegister()).toBe(0x00);
		expect(gameboy.registers.register16Bit.HL.getRegister()).toBe(0x8000);
	});

	test('POP AF', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x0100);

		const { A, F } = gameboy.registers.register;

		gameboy.ram.setMemoryAt(0x100, 0xf1);
		gameboy.registers.pointers.SP.setRegister(0xd000);
		gameboy.ram.setMemoryAt(0xd000, 0xab);
		gameboy.ram.setMemoryAt(0xd001, 0xcd);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xd002);
		expect(A.getRegister()).toBe(0xcd);
		expect(F.getRegister()).toBe(0xab);
	});
});

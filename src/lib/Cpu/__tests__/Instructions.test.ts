import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('Opcodes non prefix', () => {
	test('0x0 - NOP', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x0);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
	});

	test('0x01 - LD BC, nn', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x01);
		gameboy.ram.setMemoryAt(0x101, 0x34);
		gameboy.ram.setMemoryAt(0x102, 0x12);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
		expect(gameboy.registers.register16Bit.BC.getRegister()).toBe(0x1234);
	});

	test('0x02 - LD (BC), A', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { A } = gameboy.registers.register;
		const { ram } = gameboy;

		A.setRegister(0x12);
		gameboy.registers.register16Bit.BC.setRegister(0x11);

		gameboy.ram.setMemoryAt(0x100, 0x02);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(
			ram.getMemoryAt(gameboy.registers.register16Bit.BC.getRegister())
		).toBe(0x12);
	});

	test('0x03 - INC BC', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x03);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register16Bit.BC.getRegister()).toBe(0x01);
	});

	test('0x04 - INC B', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x04);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.B.getRegister()).toBe(0x01);
		expect(gameboy.registers.register.D.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.H.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.A.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.C.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.L.getRegister()).toBe(0x00);
	});

	test('0x05 - DEC B', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x05);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.B.getRegister()).toBe(0b1111_1111);
	});

	test('0x06 - LD B, n', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x06);
		gameboy.ram.setMemoryAt(0x101, 0xff);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
		expect(gameboy.registers.register.B.getRegister()).toBe(0b1111_1111);
	});

	test('0x07 - RLCA', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.register.A.setRegister(0x81);
		gameboy.ram.setMemoryAt(0x100, 0x07);

		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.A.getRegister()).toBe(0x03);
		expect(gameboy.registers.register.F.getRegister()).toBe(0b0001_0000);
	});

	test('0x08 - LD (nn), SP', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.registers.pointers.SP.setRegister(0xfffe);
		gameboy.ram.setMemoryAt(0x100, 0x08);
		gameboy.ram.setMemoryAt(0x101, 0x34);
		gameboy.ram.setMemoryAt(0x102, 0x12);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
		expect(gameboy.ram.getMemoryAt(0x1234)).toBe(
			gameboy.registers.pointers.SP.getRegister() & 0xff
		);
		expect(gameboy.ram.getMemoryAt(0x1234 + 1)).toBe(
			gameboy.registers.pointers.SP.getRegister() >> 8
		);
	});

	test('0x09 - ADD HL, BC', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;

		BC.setRegister(0x00ff);
		HL.setRegister(0xff00);
		gameboy.ram.setMemoryAt(0x100, 0x09);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(HL.getRegister()).toBe(0xffff);
	});

	test('0x0a - LD A, (BC)', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { A } = gameboy.registers.register;
		const { ram } = gameboy;
		BC.setRegister(0xf);
		ram.setMemoryAt(0x100, 0x0a);
		ram.setMemoryAt(BC.getRegister(), 0xff);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(A.getRegister()).toBe(0xff);
	});

	test('0x0b - DEC BC', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { A } = gameboy.registers.register;
		const { ram } = gameboy;
		BC.setRegister(0xf);

		ram.setMemoryAt(0x100, 0x0b);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(BC.getRegister()).toBe(0xf - 1);
	});

	test('0x0c - INC C', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { C } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x0c);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(C.getRegister()).toBe(0x1);
	});

	test('0x0d - DEC D', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { C, F } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x0d);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(C.getRegister()).toBe(0xff);
		expect(F.getRegister()).toBe(0b0110_0000);
	});

	test('0x0e - LD C, n', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { C, F } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x0e);
		ram.setMemoryAt(0x101, 0x12);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
		expect(C.getRegister()).toBe(0x12);
	});

	test('0x0f - RRCA', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		A.setRegister(0b0000_1111);
		ram.setMemoryAt(0x100, 0x0f);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(A.getRegister()).toBe(0b1000_0111);
		expect(F.getRegister()).toBe(0b0001_0000);
	});

	test('0x10 - STOP', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		A.setRegister(0b0000_1111);
		ram.setMemoryAt(0x100, 0x10);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.STOP).toBe(true);
	});

	test('0x11 - LD DE, nn', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		A.setRegister(0b0000_1111);
		ram.setMemoryAt(0x100, 0x11);
		ram.setMemoryAt(0x101, 0x34);
		ram.setMemoryAt(0x102, 0x12);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
		expect(DE.getRegister()).toBe(0x1234);
	});

	test('0x12 - LD (DE), A', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		DE.setRegister(0x1234);
		A.setRegister(0b0000_1111);
		ram.setMemoryAt(0x100, 0x12);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(ram.getMemoryAt(0x1234)).toBe(0b0000_1111);
	});

	test('0x13 - INC DE', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x13);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register16Bit.DE.getRegister()).toBe(0x01);
	});

	test('0x14 - INC D', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x14);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.D.getRegister()).toBe(0x01);
		expect(gameboy.registers.register.H.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.A.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.B.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.C.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.L.getRegister()).toBe(0x00);
	});
	test('0x15 - DEC D', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x15);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.D.getRegister()).toBe(0b1111_1111);
	});

	test('0x16 - LD D, n', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x16);
		gameboy.ram.setMemoryAt(0x101, 0xff);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
		expect(gameboy.registers.register.D.getRegister()).toBe(0b1111_1111);
	});

	test('0x17 - RLA', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.register.A.setRegister(0b1000_0001);
		gameboy.registers.register.F.setCYFlag();
		gameboy.ram.setMemoryAt(0x100, 0x17);

		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.A.getRegister()).toBe(0b0000_0011);
		expect(gameboy.registers.register.F.getRegister()).toBe(0b0001_0000);
	});

	test('0x18 - JR e', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x1000);
		gameboy.ram.setMemoryAt(0x1001, 0x05);
		gameboy.ram.setMemoryAt(0x1000, 0x18);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1007);
	});

	test('0x19 - ADD HL, DE', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;

		DE.setRegister(0x00ff);
		HL.setRegister(0xff00);
		gameboy.ram.setMemoryAt(0x100, 0x19);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(HL.getRegister()).toBe(0xffff);
	});
	test('0x1a - LD A, (DE)', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;
		const { A } = gameboy.registers.register;
		const { ram } = gameboy;
		DE.setRegister(0xf);
		ram.setMemoryAt(0x100, 0x1a);
		ram.setMemoryAt(DE.getRegister(), 0xff);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(A.getRegister()).toBe(0xff);
	});

	test('0x1b - DEC DE', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;
		const { A } = gameboy.registers.register;
		const { ram } = gameboy;
		DE.setRegister(0xf);

		ram.setMemoryAt(0x100, 0x1b);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(DE.getRegister()).toBe(0xf - 1);
	});

	test('0x1c - INC E', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { E } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x1c);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(E.getRegister()).toBe(0x1);
	});

	test('0x1d - DEC E', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { E, F } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x1d);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(E.getRegister()).toBe(0xff);
		expect(F.getRegister()).toBe(0b0110_0000);
	});

	test('0x1e - LD E, n', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { E, F } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x1e);
		ram.setMemoryAt(0x101, 0x12);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
		expect(E.getRegister()).toBe(0x12);
	});

	test('0x1f - RRA', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		A.setRegister(0b0000_0001);
		F.setCYFlag();
		ram.setMemoryAt(0x100, 0x1f);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(A.getRegister()).toBe(0b1000_0000);
		expect(F.getRegister()).toBe(0b0001_0000);
	});

	test('0x20 JR NZ, e: TRUE', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x100);
		gameboy.ram.setMemoryAt(0x100, 0x20);

		gameboy.ram.setMemoryAt(0x101, 0x05);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x107);
	});

	test('0x20 - JR NZ, e: false', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x100);
		gameboy.ram.setMemoryAt(0x100, 0x20);

		gameboy.ram.setMemoryAt(0x101, 0x05);
		gameboy.registers.register.F.setZFlag();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
	});

	test('0x21 - LD HL, nn', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		A.setRegister(0b0000_1111);
		ram.setMemoryAt(0x100, 0x21);
		ram.setMemoryAt(0x101, 0x34);
		ram.setMemoryAt(0x102, 0x12);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
		expect(HL.getRegister()).toBe(0x1234);
	});

	test('0x22 - LD (HL+), A', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		HL.setRegister(0x1234);
		A.setRegister(0b0000_1111);
		ram.setMemoryAt(0x100, 0x22);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(ram.getMemoryAt(0x1234)).toBe(0b0000_1111);
		expect(HL.getRegister()).toBe(0x1234 + 1);
	});

	test('0x23 - INC HL', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x23);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register16Bit.HL.getRegister()).toBe(0x01);
	});

	test('0x24 - INC H', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x24);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.H.getRegister()).toBe(0x01);
		expect(gameboy.registers.register.A.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.B.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.C.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.D.getRegister()).toBe(0x00);
		expect(gameboy.registers.register.L.getRegister()).toBe(0x00);
	});

	test('0x25 - DEC H', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x25);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.H.getRegister()).toBe(0b1111_1111);
	});

	test('0x26 - LD H, n', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x26);
		gameboy.ram.setMemoryAt(0x101, 0xff);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
		expect(gameboy.registers.register.H.getRegister()).toBe(0b1111_1111);
	});

	test('0x27 - DAA', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);

		gameboy.ram.setMemoryAt(0x100, 0x27);
		gameboy.registers.register.F.setHFlag();
		gameboy.registers.register.A.setRegister(0x09);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(gameboy.registers.register.A.getRegister()).toBe(0x0f);
		expect(gameboy.registers.register.F.getRegister()).toBe(0b0000_0000);
	});

	test('0x28 - JR Z, e: true', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x100);
		gameboy.ram.setMemoryAt(0x100, 0x28);

		gameboy.ram.setMemoryAt(0x101, 0x05);
		gameboy.registers.register.F.setZFlag();

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x107);
	});

	test('0x28 - JR Z, e: false', () => {
		const dummyRom = new ArrayBuffer(1024);

		// init gameboy
		const gameboy = new Gameboy(dummyRom);
		gameboy.registers.pointers.PC.setRegister(0x100);
		gameboy.ram.setMemoryAt(0x100, 0x28);

		gameboy.ram.setMemoryAt(0x101, 0x05);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
	});

	test('0x29 - ADD HL, HL', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL } = gameboy.registers.register16Bit;

		HL.setRegister(0x1234);
		gameboy.ram.setMemoryAt(0x100, 0x29);

		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(HL.getRegister()).toBe(0x1234 + 0x1234);
	});

	test('0x2a - LD A, (HL+)', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL } = gameboy.registers.register16Bit;
		const { A } = gameboy.registers.register;
		const { ram } = gameboy;
		HL.setRegister(0xf);
		ram.setMemoryAt(0x100, 0x2a);
		ram.setMemoryAt(HL.getRegister(), 0xff);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(A.getRegister()).toBe(0xff);
		expect(HL.getRegister()).toBe(0xf + 1);
	});

	test('0x2b - DEC HL', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, DE } = gameboy.registers.register16Bit;
		const { A } = gameboy.registers.register;
		const { ram } = gameboy;
		HL.setRegister(0xf);

		ram.setMemoryAt(0x100, 0x2b);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(HL.getRegister()).toBe(0xf - 1);
	});

	test('0x2c - INC L', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { L } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x2c);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(L.getRegister()).toBe(0x1);
	});

	test('0x2d - DEC L', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { L, F } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x2d);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(L.getRegister()).toBe(0xff);
		expect(F.getRegister()).toBe(0b0110_0000);
	});

	test('0x2e - LD L, n', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { L, F } = gameboy.registers.register;
		const { ram } = gameboy;

		ram.setMemoryAt(0x100, 0x2e);
		ram.setMemoryAt(0x101, 0x12);
		gameboy.scheduler.tick();
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
		expect(L.getRegister()).toBe(0x12);
	});

	test('0x2f - CPL', () => {
		const dummyRom = new ArrayBuffer(1024);
		const gameboy = new Gameboy(dummyRom);
		const { HL, BC } = gameboy.registers.register16Bit;
		const { A, F } = gameboy.registers.register;
		const { ram } = gameboy;

		A.setRegister(0x3c);
		F.setCYFlag();
		ram.setMemoryAt(0x100, 0x2f);
		gameboy.scheduler.tick();

		expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
		expect(A.getRegister()).toBe(0xc3);
		expect(F.getRegister()).toBe(0b0111_0000);
	});
});

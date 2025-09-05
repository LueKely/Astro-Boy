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

  test('0x30 - JR NC, e: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);
    gameboy.registers.register.F.getHFlag();
    gameboy.registers.pointers.PC.setRegister(0x100);
    gameboy.ram.setMemoryAt(0x100, 0x30);

    gameboy.ram.setMemoryAt(0x101, 0x05);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x107);
  });

  test('0x30 - JR NZ, e: false', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);
    gameboy.registers.pointers.PC.setRegister(0x100);
    gameboy.ram.setMemoryAt(0x100, 0x30);

    gameboy.ram.setMemoryAt(0x101, 0x05);
    gameboy.registers.register.F.setCYFlag();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
  });

  test('0x31 - LD SP, nn', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { DE } = gameboy.registers.register16Bit;
    const { SP } = gameboy.registers.pointers;
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0000_1111);
    ram.setMemoryAt(0x100, 0x31);
    ram.setMemoryAt(0x101, 0x34);
    ram.setMemoryAt(0x102, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
    expect(SP.getRegister()).toBe(0x1234);
  });

  test('0x32 - LD (HL-), A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { HL, DE } = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    A.setRegister(0b0000_1111);
    ram.setMemoryAt(0x100, 0x32);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(0x1234)).toBe(0b0000_1111);
    expect(HL.getRegister()).toBe(0x1234 - 1);
  });

  test('0x33 - INC SP', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    gameboy.registers.pointers.SP.setRegister(0x0);
    gameboy.ram.setMemoryAt(0x100, 0x33);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(gameboy.registers.pointers.SP.getRegister()).toBe(1);
  });

  test('0x34 - INC (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.register16Bit.HL.setRegister(0xffff);
    gameboy.ram.setMemoryAt(0x100, 0x34);
    gameboy.ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(gameboy.ram.getMemoryAt(0xffff)).toBe(0x0);
    expect(gameboy.registers.register.A.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.B.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.C.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.D.getRegister()).toBe(0x00);
  });

  test('0x35 - DEC (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.register16Bit.HL.setRegister(0xffff);
    gameboy.ram.setMemoryAt(0x100, 0x35);
    gameboy.ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(gameboy.ram.getMemoryAt(0xffff)).toBe(0xff - 1);
    expect(gameboy.registers.register.A.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.B.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.C.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.D.getRegister()).toBe(0x00);
  });

  test('0x36 - LD (HL), n', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.register16Bit.HL.setRegister(0x1234);
    gameboy.ram.setMemoryAt(0x100, 0x36);
    gameboy.ram.setMemoryAt(0x101, 0x42);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(gameboy.ram.getMemoryAt(0x1234)).toBe(0x42);
    expect(gameboy.registers.register.A.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.B.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.C.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.D.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.F.getRegister()).toBe(0x00);
  });

  test('0x37 - SCF', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.register16Bit.HL.setRegister(0x1234);
    gameboy.ram.setMemoryAt(0x100, 0x37);

    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);

    expect(gameboy.registers.register.A.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.B.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.C.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.D.getRegister()).toBe(0x00);
    expect(gameboy.registers.register.F.getRegister()).toBe(0b0001_0000);
  });

  test('0x38 - JR C, e: true', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);
    gameboy.registers.pointers.PC.setRegister(0x100);
    gameboy.ram.setMemoryAt(0x100, 0x38);

    gameboy.ram.setMemoryAt(0x101, 0x05);
    gameboy.registers.register.F.setCYFlag();

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x107);
  });

  test('0x38 - JR C, e: false', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);
    gameboy.registers.pointers.PC.setRegister(0x100);
    gameboy.ram.setMemoryAt(0x100, 0x38);

    gameboy.ram.setMemoryAt(0x101, 0x05);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
  });

  test('0x39 - ADD HL, SP', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { HL, DE } = gameboy.registers.register16Bit;
    const { SP } = gameboy.registers.pointers;
    SP.setRegister(0xffff);
    HL.setRegister(0x0001);
    gameboy.ram.setMemoryAt(0x100, 0x39);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(HL.getRegister()).toBe(0x0);
    expect(gameboy.registers.register.F.getRegister()).toBe(0b0011_0000);
  });

  test('0x3a - LD A, (HL-)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { HL } = gameboy.registers.register16Bit;
    const { A } = gameboy.registers.register;
    const { ram } = gameboy;
    HL.setRegister(0xf);
    ram.setMemoryAt(0x100, 0x3a);
    ram.setMemoryAt(HL.getRegister(), 0xff);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(HL.getRegister()).toBe(0xf - 1);
  });

  test('0x3b - DEC SP', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { DE } = gameboy.registers.register16Bit;
    const { SP } = gameboy.registers.pointers;
    const { A } = gameboy.registers.register;
    const { ram } = gameboy;
    SP.setRegister(0xf);

    ram.setMemoryAt(0x100, 0x3b);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(SP.getRegister()).toBe(0xf - 1);
  });

  test('0x3c - INC A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { HL, BC } = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;

    ram.setMemoryAt(0x100, 0x3c);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x1);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x3d - DEC A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { HL, BC } = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;

    ram.setMemoryAt(0x100, 0x3d);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0110_0000);
  });

  test('0x3e - LD A, n', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { HL, BC } = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;

    ram.setMemoryAt(0x100, 0x3e);
    ram.setMemoryAt(0x101, 0xff);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0xff);
  });

  test('0x3f - CCF', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    F.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x3f);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x40 - LD B, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B } = gameboy.registers.register;
    const { ram } = gameboy;

    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x40);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0b0010_0000);
  });

  test('0x41 - LD B, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, C } = gameboy.registers.register;
    const { ram } = gameboy;

    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x41);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0b0010_0000);
  });

  test('0x42 - LD B, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, D } = gameboy.registers.register;
    const { ram } = gameboy;

    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x42);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0b0010_0000);
  });
  test('0x43 - LD B, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, E } = gameboy.registers.register;
    const { ram } = gameboy;

    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x43);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0b0010_0000);
  });
  test('0x44 - LD B, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, H } = gameboy.registers.register;
    const { ram } = gameboy;

    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x44);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0b0010_0000);
  });

  test('0x45 - LD B, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, L } = gameboy.registers.register;
    const { ram } = gameboy;

    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x45);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0b0010_0000);
  });

  test('0x56 - LD B, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0xffff);
    ram.setMemoryAt(0x100, 0x46);
    ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0xff);
  });
  test('0x47 - LD B, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, A } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x47);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(B.getRegister()).toBe(0b0010_0000);
  });

  test('0x48 - LD C, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, B } = gameboy.registers.register;
    const { ram } = gameboy;

    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x48);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0b0010_0000);
  });

  test('0x49 - LD C, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C } = gameboy.registers.register;
    const { ram } = gameboy;

    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x49);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0b0010_0000);
  });

  test('0x4a - LD C, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, D } = gameboy.registers.register;
    const { ram } = gameboy;

    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x4a);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0b0010_0000);
  });

  test('0x4b - LD C, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, E } = gameboy.registers.register;
    const { ram } = gameboy;

    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x4b);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0b0010_0000);
  });
  test('0x4c - LD C, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, H } = gameboy.registers.register;
    const { ram } = gameboy;

    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x4c);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0b0010_0000);
  });

  test('0x4d - LD C, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, L } = gameboy.registers.register;
    const { ram } = gameboy;

    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x4d);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0b0010_0000);
  });

  test('0x4e - LD C, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0xffff);
    ram.setMemoryAt(0x100, 0x4e);
    ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0xff);
  });
  test('0x4f - LD C, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, A } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x4f);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(C.getRegister()).toBe(0b0010_0000);
  });

  test('0x50 - LD D, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, D } = gameboy.registers.register;
    const { ram } = gameboy;

    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x50);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0b0010_0000);
  });

  test('0x51 - LD D, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D, C } = gameboy.registers.register;
    const { ram } = gameboy;

    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x51);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0b0010_0000);
  });

  test('0x52 - LD D, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D } = gameboy.registers.register;
    const { ram } = gameboy;

    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x52);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0b0010_0000);
  });
  test('0x53 - LD D, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D, E } = gameboy.registers.register;
    const { ram } = gameboy;

    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x53);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0b0010_0000);
  });
  test('0x54 - LD D, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D, H } = gameboy.registers.register;
    const { ram } = gameboy;

    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x54);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0b0010_0000);
  });

  test('0x55 - LD D, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D, L } = gameboy.registers.register;
    const { ram } = gameboy;

    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x55);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0b0010_0000);
  });

  test('0x56 - LD D, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0xffff);
    ram.setMemoryAt(0x100, 0x56);
    ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0xff);
  });
  test('0x57 - LD D, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D, A } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x57);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(D.getRegister()).toBe(0b0010_0000);
  });

  test('0x58 - LD E, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E, B } = gameboy.registers.register;
    const { ram } = gameboy;

    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x58);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0b0010_0000);
  });

  test('0x59 - LD E, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, E } = gameboy.registers.register;
    const { ram } = gameboy;

    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x59);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0b0010_0000);
  });

  test('0x5a - LD E, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E, D } = gameboy.registers.register;
    const { ram } = gameboy;

    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x5a);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0b0010_0000);
  });

  test('0x5b - LD E, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E } = gameboy.registers.register;
    const { ram } = gameboy;

    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x5b);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0b0010_0000);
  });
  test('0x5c - LD E, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E, H } = gameboy.registers.register;
    const { ram } = gameboy;

    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x5c);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0b0010_0000);
  });

  test('0x5d - LD E, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E, L } = gameboy.registers.register;
    const { ram } = gameboy;

    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x5d);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0b0010_0000);
  });

  test('0x5e - LD E, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0xffff);
    ram.setMemoryAt(0x100, 0x5e);
    ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0xff);
  });
  test('0x5f - LD E, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E, A } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x5f);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(E.getRegister()).toBe(0b0010_0000);
  });

  test('0x60 - LD H, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, H } = gameboy.registers.register;
    const { ram } = gameboy;

    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x60);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0b0010_0000);
  });

  test('0x61 - LD H, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H, C } = gameboy.registers.register;
    const { ram } = gameboy;

    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x61);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0b0010_0000);
  });

  test('0x62 - LD H, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D, H } = gameboy.registers.register;
    const { ram } = gameboy;

    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x62);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0b0010_0000);
  });
  test('0x63 - LD H, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H, E } = gameboy.registers.register;
    const { ram } = gameboy;

    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x63);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0b0010_0000);
  });
  test('0x64 - LD H, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H } = gameboy.registers.register;
    const { ram } = gameboy;

    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x64);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0b0010_0000);
  });

  test('0x65 - LD H, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H, L } = gameboy.registers.register;
    const { ram } = gameboy;

    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x65);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0b0010_0000);
  });

  test('0x66 - LD H, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0xffff);
    ram.setMemoryAt(0x100, 0x56);
    ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0xff);
  });
  test('0x67 - LD H, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H, A } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x67);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(H.getRegister()).toBe(0b0010_0000);
  });

  test('0x68 - LD L, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { L, B } = gameboy.registers.register;
    const { ram } = gameboy;

    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x68);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0b0010_0000);
  });

  test('0x69 - LD L, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, L } = gameboy.registers.register;
    const { ram } = gameboy;

    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x69);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0b0010_0000);
  });

  test('0x6a - LD L, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { L, D } = gameboy.registers.register;
    const { ram } = gameboy;

    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x6a);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0b0010_0000);
  });

  test('0x6b - LD L, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E, L } = gameboy.registers.register;
    const { ram } = gameboy;

    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x6b);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0b0010_0000);
  });
  test('0x6c - LD L, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { L, H } = gameboy.registers.register;
    const { ram } = gameboy;

    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x6c);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0b0010_0000);
  });

  test('0x6d - LD L, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { L } = gameboy.registers.register;
    const { ram } = gameboy;

    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x6d);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0b0010_0000);
  });

  test('0x6e - LD L, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { L } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0xffff);
    ram.setMemoryAt(0x100, 0x6e);
    ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0xff);
  });

  test('0x6f - LD L, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { L, A } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x6f);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(L.getRegister()).toBe(0b0010_0000);
  });

  test('0x70 - LD (HL), B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x70);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0010_0000);
  });

  test('0x71 - LD (HL), C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x71);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0010_0000);
  });

  test('0x72 - LD (HL), D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x72);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0010_0000);
  });

  test('0x73 - LD (HL), E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { E } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x73);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0010_0000);
  });

  test('0x74 - LD (HL), H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x74);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0010_0000);
  });

  test('0x75 - LD (HL), L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { L } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x75);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0010_0000);
  });

  test('0x76 - HALT', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram } = gameboy;

    ram.setMemoryAt(0x100, 0x76);
    gameboy.scheduler.tick();

    expect(gameboy.registers.HALT).toBe(true);
  });

  test('0x77 - LD (HL), A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0x1234);
    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x77);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0010_0000);
  });

  test('0x78 - LD A, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B } = gameboy.registers.register;
    const { ram } = gameboy;

    B.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x78);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b0010_0000);
  });

  test('0x79 - LD A, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { C, A } = gameboy.registers.register;
    const { ram } = gameboy;

    C.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x79);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b0010_0000);
  });

  test('0x7a - LD A, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D } = gameboy.registers.register;
    const { ram } = gameboy;

    D.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x7a);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b0010_0000);
  });

  test('0x7b - LD A, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E } = gameboy.registers.register;
    const { ram } = gameboy;

    E.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x7b);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b0010_0000);
  });
  test('0x7c - LD A, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H } = gameboy.registers.register;
    const { ram } = gameboy;

    H.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x7c);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b0010_0000);
  });

  test('0x7d - LD A, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L } = gameboy.registers.register;
    const { ram } = gameboy;

    L.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x7d);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b0010_0000);
  });

  test('0x7e - LD A, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;

    HL.setRegister(0xffff);
    ram.setMemoryAt(0x100, 0x7e);
    ram.setMemoryAt(0xffff, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
  });

  test('0x7f - LD A, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0010_0000);

    ram.setMemoryAt(0x100, 0x6f);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b0010_0000);
  });

  test('0x80 - ADD B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    B.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x80);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0);
  });

  test('0x81 - ADD C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xfe);
    C.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x81);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
  });

  test('0x82 - ADD D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xfe);
    D.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x82);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
  });

  test('0x83 - ADD E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xfe);
    E.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x83);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
  });

  test('0x84 - ADD H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xfe);
    H.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x84);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
  });

  test('0x85 - ADD L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xfe);
    L.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x85);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
  });

  test('0x86 - ADD (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0xfe);
    HL.setRegister(0xff);

    ram.setMemoryAt(0x100, 0x86);
    ram.setMemoryAt(HL.getRegister(), 0x1);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(HL.getRegister()).toBe(0xff);
  });

  test('0x87 - ADD A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x87);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x2);
  });

  test('0x88 - ADC B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    B.setRegister(0x20 - 1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x88);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x10);
    expect(F.getRegister()).toBe(0b0011_0000);
  });

  test('0x89 - ADC C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    C.setRegister(0x20 - 1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x89);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x10);
    expect(F.getRegister()).toBe(0b0011_0000);
  });
  test('0x8a - ADC D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    D.setRegister(0x20 - 1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x8a);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x10);
    expect(F.getRegister()).toBe(0b0011_0000);
  });
  test('0x8b - ADC E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    E.setRegister(0x20 - 1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x8b);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x10);
    expect(F.getRegister()).toBe(0b0011_0000);
  });

  test('0x8c - ADC H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    H.setRegister(0x20 - 1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x8c);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x10);
    expect(F.getRegister()).toBe(0b0011_0000);
  });
  test('0x8d - ADC L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    L.setRegister(0x20 - 1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x8d);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x10);
    expect(F.getRegister()).toBe(0b0011_0000);
  });

  test('0x8e - ADC (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0xff);
    HL.setRegister(0x00);
    F.setCYFlag();

    ram.setMemoryAt(0x100, 0x8e);
    ram.setMemoryAt(HL.getRegister(), 0);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(HL.getRegister()).toBe(0x00);
    expect(F.getRegister()).toBe(0b1011_0000);
  });

  test('0x8f - ADC A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x8f);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(3);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x90 - SUB B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    B.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x90);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xfe);
  });
  test('0x91 - SUB C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    C.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x91);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xfe);
  });

  test('0x92 - SUB D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    D.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x92);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xfe);
  });
  test('0x93 - SUB E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    E.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x93);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xfe);
  });

  test('0x94 - SUB H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    H.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x94);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xfe);
  });

  test('0x95 - SUB L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    L.setRegister(0x1);

    ram.setMemoryAt(0x100, 0x95);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xfe);
  });

  test('0x96 - SUB (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0x00);
    HL.setRegister(0xff);

    ram.setMemoryAt(0x100, 0x96);
    ram.setMemoryAt(HL.getRegister(), 0x1);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(HL.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0111_0000);
  });

  test('0x97 - SUB A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);

    ram.setMemoryAt(0x100, 0x97);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0b1100_0000);
  });

  test('0x98 - SBC B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x00);
    B.setRegister(0x00);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x98);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0111_0000);
  });

  test('0x99 - SBC C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x10);
    C.setRegister(0x0f);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x99);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x00);
    expect(F.getRegister()).toBe(0b1110_0000);
  });

  test('0x9a - SBC D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x01);
    D.setRegister(0x01);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x9a);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0111_0000);
  });
  test('0x9b - SBC E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x01);
    E.setRegister(0x01);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x9b);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0111_0000);
  });

  test('0x9c - SBC H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x01);
    H.setRegister(0x01);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x9c);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0111_0000);
  });
  test('0x9d - SBC L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x01);
    L.setRegister(0x01);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x9d);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0111_0000);
  });

  test('0x9e - SBC (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0x01);
    HL.setRegister(0x00);
    F.setCYFlag();

    ram.setMemoryAt(0x100, 0x9e);
    ram.setMemoryAt(HL.getRegister(), 0x1);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(HL.getRegister()).toBe(0x00);
    expect(F.getRegister()).toBe(0b0111_0000);
  });

  test('0x9f - SBC A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x1);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0x9f);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0b0111_0000);
  });
});

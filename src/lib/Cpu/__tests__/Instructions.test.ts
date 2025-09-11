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

  test('0xa0 - AND B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    B.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa0);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa1 - AND C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    C.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa1);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa2 - AND D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    D.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa2);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa3 - AND E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    E.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa3);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa4 - AND H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    H.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa4);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa5 - AND L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    L.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa5);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa6 - AND (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    HL.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa6);
    ram.setMemoryAt(HL.getRegister(), 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa7 - AND A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);

    ram.setMemoryAt(0x100, 0xa7);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xf0);
    expect(F.getRegister()).toBe(0x20);
  });

  test('0xa8 - XOR B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    B.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa8);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xa9 - XOR C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    C.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xa9);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xaa - XOR D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    D.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xaa);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xab - XOR E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    E.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xab);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x00);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xac - XOR H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    H.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xac);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xad - XOR L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);
    L.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xad);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x00);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xae - XOR (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0xff);
    HL.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xae);
    ram.setMemoryAt(HL.getRegister(), 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xaf - XOR A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xaf);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x80);
  });

  test('0xb0 - OR B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    B.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xb0);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb1 - OR C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    C.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xb1);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb2 - OR D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    D.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xb2);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb3 - OR E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    E.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xb3);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb4 - OR H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    H.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xb4);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb5 - OR L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    L.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xb5);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb6 - OR (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0xf0);
    HL.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xb6);
    ram.setMemoryAt(HL.getRegister(), 0x0f);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb7 - OR A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xb7);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xb8 - CP B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, B, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x3c);
    B.setRegister(0x3c);

    ram.setMemoryAt(0x100, 0xb8);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x3c);
    expect(F.getRegister()).toBe(0xc0);
  });

  test('0xb9 - CP C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x50);
    C.setRegister(0x20);

    ram.setMemoryAt(0x100, 0xb9);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x50);
    expect(F.getRegister()).toBe(0x40);
  });

  test('0xba - CP D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, D, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x00);
    D.setRegister(0x01);

    ram.setMemoryAt(0x100, 0xba);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x00);
    expect(F.getRegister()).toBe(0x70);
  });

  test('0xbb - CP E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, E, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x0f);
    E.setRegister(0x10);

    ram.setMemoryAt(0x100, 0xbb);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0f);
    expect(F.getRegister()).toBe(0x50);
  });

  test('0xbc - CP H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, H, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x10);
    H.setRegister(0x11);

    ram.setMemoryAt(0x100, 0xbc);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x10);
    expect(F.getRegister()).toBe(0x70);
  });

  test('0xbd - CP L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, L, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x1);
    L.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xbd);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x01);
    expect(F.getRegister()).toBe(0x70);
  });

  test('0xbe - CP (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0x0);
    HL.setRegister(0xff);

    ram.setMemoryAt(0x100, 0xbe);
    ram.setMemoryAt(HL.getRegister(), 0x0);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0xc0);
  });

  test('0xbf - CP A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x3c);

    ram.setMemoryAt(0x100, 0xbf);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x3c);
    expect(F.getRegister()).toBe(0xc0);
  });

  test('0xc0 - RET NZ: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    F.setRegister(0x40);

    ram.setMemoryAt(0x1234, 0xc0);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x7856);
    expect(SP.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x40);
  });

  test('0xc0 - RET NZ: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    F.setZFlag();

    ram.setMemoryAt(0x1234, 0xc0);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234 + 1);

    expect(SP.getRegister()).toBe(0xfffe);
    expect(F.getRegister()).toBe(0b1000_0000);
  });

  test('0xc1 - POP BC', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { B, C, F } = gameboy.registers.register;
    const { BC } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    const { PC, SP } = gameboy.registers.pointers;

    SP.setRegister(0xfffe);

    ram.setMemoryAt(0x100, 0xc1);

    ram.setMemoryAt(0xfffe, 0x34);
    ram.setMemoryAt(0xffff, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(PC.getRegister()).toBe(0x101);
    expect(BC.getRegister()).toBe(0x1234);
    expect(B.getRegister()).toBe(0x12);
    expect(C.getRegister()).toBe(0x34);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xc2 - JP NZ : false', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    F.setZFlag();
    ram.setMemoryAt(0x100, 0xc2);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
  });

  test('0xc2 - JP NZ : TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    ram.setMemoryAt(0x100, 0xc2);
    ram.setMemoryAt(0x101, 0x34);
    ram.setMemoryAt(0x102, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234);
  });

  test('0xc3 - JP NN', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    F.setZFlag();

    ram.setMemoryAt(0x100, 0xc3);
    ram.setMemoryAt(0x101, 0x34);
    ram.setMemoryAt(0x102, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234);
    expect(F.getRegister()).toBe(0b1000_0000);
  });

  test('0xc4 - Call NZ, nn: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xc4);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffe);
    expect(PC.getRegister()).toBe(0x1234);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xc4 - Call NZ, nn: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    F.setZFlag();

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xc4);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0x0);
    expect(PC.getRegister()).toBe(0x1003);
  });

  test('0xc5 - PUSH BC', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    const { BC } = gameboy.registers.register16Bit;
    const { PC, SP } = gameboy.registers.pointers;
    BC.setRegister(0x0ff0);
    SP.setRegister(0xc000);
    ram.setMemoryAt(0x100, 0xc5);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(SP.getRegister()).toBe(0xbffe);
    expect(ram.getMemoryAt(0xbffe)).toBe(0xf0);
    expect(ram.getMemoryAt(0xbfff)).toBe(0x0f);

    expect(F.getRegister()).toBe(0x0);
  });

  test('0xc6 - ADD N', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    A.setRegister(0x80);
    HL.setRegister(0x0f);

    ram.setMemoryAt(0x100, 0xc6);
    ram.setMemoryAt(0x101, 0x80);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0x00);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0xc7 - RST 0x00', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    F.setZFlag();

    PC.setRegister(0x100);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x100, 0xc7);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffe);
    expect(PC.getRegister()).toBe(0x0000);
    expect(ram.getMemoryAt(0xfffe)).toBe(0x01);
    expect(ram.getMemoryAt(0xffff)).toBe(0x01);
  });

  test('0xc8 - RET Z: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    F.setRegister(0x40);
    F.setZFlag();
    ram.setMemoryAt(0x1234, 0xc8);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x7856);
    expect(SP.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0b1100_0000);
  });

  test('0xc8 - RET Z: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);

    ram.setMemoryAt(0x1234, 0xc8);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234 + 1);

    expect(SP.getRegister()).toBe(0xfffe);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0xc9 - RET ', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);

    ram.setMemoryAt(0x1234, 0xc9);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x7856);
    expect(SP.getRegister()).toBe(0x0);
  });

  test('0xca - JP Z : TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    F.setZFlag();
    ram.setMemoryAt(0x100, 0xca);
    ram.setMemoryAt(0x101, 0x34);
    ram.setMemoryAt(0x102, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234);
  });

  test('0xca - JP Z : false', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    ram.setMemoryAt(0x100, 0xca);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
  });

  test('0xcb - CB PREFIX TEST', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F, C } = gameboy.registers.register;
    const { ram } = gameboy;
    C.setRegister(0x10);

    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x19);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0x08);
  });

  test('0xcc - Call Z, nn: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;
    F.setZFlag();

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xcc);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffe);
    expect(PC.getRegister()).toBe(0x1234);
    expect(F.getRegister()).toBe(0b1000_0000);
  });

  test('0xcc - Call Z, nn: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xcc);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0x0);
    expect(PC.getRegister()).toBe(0x1003);
  });

  test('0xcd - Call nn', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;
    F.setZFlag();

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xcd);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffe);
    expect(PC.getRegister()).toBe(0x1234);
    expect(F.getRegister()).toBe(0b1000_0000);
  });

  test('0xce - ADC N', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;

    const { ram } = gameboy;
    A.setRegister(0xff);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0xce);
    ram.setMemoryAt(0x101, 0x0f);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0x0f);
    expect(F.getRegister()).toBe(0x30);
  });

  test('0xcf - RST 0x08', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    F.setZFlag();

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    ram.setMemoryAt(0x1234, 0xcf);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffc);
    expect(PC.getRegister()).toBe(0x0008);
    expect(ram.getMemoryAt(0xfffd)).toBe(0x012);
    expect(ram.getMemoryAt(0xfffc)).toBe(0x035);
  });

  test('0xd0 - RET NC: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    F.setRegister(0x40);

    ram.setMemoryAt(0x1234, 0xd0);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x7856);
    expect(SP.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0x40);
  });

  test('0xd0 - RET NC: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    F.setCYFlag();

    ram.setMemoryAt(0x1234, 0xd0);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234 + 1);

    expect(SP.getRegister()).toBe(0xfffe);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0xd1 - POP DE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { D, E, F } = gameboy.registers.register;
    const { DE } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    const { PC, SP } = gameboy.registers.pointers;

    SP.setRegister(0xfffe);

    ram.setMemoryAt(0x100, 0xd1);

    ram.setMemoryAt(0xfffe, 0x34);
    ram.setMemoryAt(0xffff, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(PC.getRegister()).toBe(0x101);
    expect(DE.getRegister()).toBe(0x1234);
    expect(D.getRegister()).toBe(0x12);
    expect(E.getRegister()).toBe(0x34);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xd2 - JP NC : false', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0xd2);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
  });

  test('0xd2 - JP NC : TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    ram.setMemoryAt(0x100, 0xd2);
    ram.setMemoryAt(0x101, 0x34);
    ram.setMemoryAt(0x102, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234);
  });

  test('0xd4 - Call NC, nn: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xd4);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffe);
    expect(PC.getRegister()).toBe(0x1234);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xd4 - Call NC, nn: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    F.setCYFlag();

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xd4);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0x0);
    expect(PC.getRegister()).toBe(0x1003);
  });

  test('0xd5 - PUSH DE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    const { DE } = gameboy.registers.register16Bit;
    const { PC, SP } = gameboy.registers.pointers;
    DE.setRegister(0x0ff0);
    SP.setRegister(0xc000);
    ram.setMemoryAt(0x100, 0xd5);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(SP.getRegister()).toBe(0xbffe);
    expect(ram.getMemoryAt(0xbffe)).toBe(0xf0);
    expect(ram.getMemoryAt(0xbfff)).toBe(0x0f);

    expect(F.getRegister()).toBe(0x0);
  });

  test('0xd6 - SUB N', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;
    A.setRegister(0x10);

    ram.setMemoryAt(0x100, 0xd6);
    ram.setMemoryAt(0x101, 0x01);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0x0f);
    expect(F.getRegister()).toBe(0b0110_0000);
  });

  test('0xd7 - RST 0x10', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    F.setZFlag();

    PC.setRegister(0xc000);
    SP.setRegister(0xdfff);
    ram.setMemoryAt(0xc000, 0xd7);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xdffd);
    expect(PC.getRegister()).toBe(0x10);
    expect(ram.getMemoryAt(0xdffe)).toBe(0xc0);
    expect(ram.getMemoryAt(0xdffd)).toBe(0x01);
  });

  test('0xd8 - RET C: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    F.setRegister(0x40);
    F.setCYFlag();
    ram.setMemoryAt(0x1234, 0xd8);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x7856);
    expect(SP.getRegister()).toBe(0x0);
    expect(F.getRegister()).toBe(0b0101_0000);
  });

  test('0xd8 - RET C: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    F.setZFlag();
    ram.setMemoryAt(0x1234, 0xd8);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234 + 1);

    expect(SP.getRegister()).toBe(0xfffe);
    expect(F.getRegister()).toBe(0b1000_0000);
  });
  test('0xd9 - RETI ', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { PC, SP } = gameboy.registers.pointers;
    const { ram } = gameboy;

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    expect(gameboy.registers.IME.getValue()).toBe(0);

    ram.setMemoryAt(0x1234, 0xd9);
    ram.setMemoryAt(0xfffe, 0x56);
    ram.setMemoryAt(0xffff, 0x78);
    gameboy.scheduler.tick();

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x7856);
    expect(SP.getRegister()).toBe(0x0);
    expect(gameboy.registers.IME.getValue()).toBe(1);
  });

  test('0xda - JP C : true', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    ram.setMemoryAt(0x100, 0xda);
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
  });

  test('0xda - JP C : TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    F.setCYFlag();

    ram.setMemoryAt(0x100, 0xda);
    ram.setMemoryAt(0x101, 0x34);
    ram.setMemoryAt(0x102, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234);
  });

  test('0xdc - Call C, nn: TRUE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;
    F.setCYFlag();

    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xdc);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffe);
    expect(PC.getRegister()).toBe(0x1234);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0xdc - Call C, nn: FALSE', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;
    F.setZFlag();
    PC.setRegister(0x1000);
    SP.setRegister(0x0000);
    ram.setMemoryAt(0x1000, 0xdc);
    ram.setMemoryAt(0x1001, 0x34);
    ram.setMemoryAt(0x1002, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0x0);
    expect(PC.getRegister()).toBe(0x1003);
  });

  test('0xde - SBC N', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, F } = gameboy.registers.register;

    const { ram } = gameboy;
    A.setRegister(0xff);
    F.setCYFlag();
    ram.setMemoryAt(0x100, 0xde);
    ram.setMemoryAt(0x101, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0xff);
    expect(F.getRegister()).toBe(0x70);
  });

  test('0xdf - RST 0x18', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;

    const { PC, SP } = gameboy.registers.pointers;

    F.setZFlag();

    PC.setRegister(0x1234);
    SP.setRegister(0xfffe);
    ram.setMemoryAt(0x1234, 0xdf);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(SP.getRegister()).toBe(0xfffc);
    expect(PC.getRegister()).toBe(0x0018);
    expect(ram.getMemoryAt(0xfffd)).toBe(0x012);
    expect(ram.getMemoryAt(0xfffc)).toBe(0x035);
  });

  test('0xe0 - LDH (n), A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A } = gameboy.registers.register;
    const { ram } = gameboy;
    const { PC } = gameboy.registers.pointers;
    A.setRegister(0x42);

    gameboy.ram.setMemoryAt(0x100, 0xe0);
    gameboy.ram.setMemoryAt(0x101, 0x80);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0x42);
    expect(ram.getMemoryAt(0xff80)).toBe(0x42);
  });

  test('0xe1 - POP HL', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { H, L, F } = gameboy.registers.register;
    const { HL } = gameboy.registers.register16Bit;
    const { ram } = gameboy;
    const { PC, SP } = gameboy.registers.pointers;

    SP.setRegister(0xfffe);

    ram.setMemoryAt(0x100, 0xe1);

    ram.setMemoryAt(0xfffe, 0x34);
    ram.setMemoryAt(0xffff, 0x12);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(PC.getRegister()).toBe(0x101);
    expect(HL.getRegister()).toBe(0x1234);
    expect(H.getRegister()).toBe(0x12);
    expect(L.getRegister()).toBe(0x34);
    expect(F.getRegister()).toBe(0x0);
  });

  test('0xe2 - LDH (C), A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { A, C } = gameboy.registers.register;
    const { ram } = gameboy;
    const { PC } = gameboy.registers.pointers;
    A.setRegister(0x42);
    C.setRegister(0x80);
    gameboy.ram.setMemoryAt(0x100, 0xe2);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0x42);
    expect(ram.getMemoryAt(0xff80)).toBe(0x42);
  });

  test('0xe5 - PUSH HL', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { F } = gameboy.registers.register;
    const { ram } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { PC, SP } = gameboy.registers.pointers;
    HL.setRegister(0x0ff0);
    SP.setRegister(0xc000);
    ram.setMemoryAt(0x100, 0xe5);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(SP.getRegister()).toBe(0xbffe);
    expect(ram.getMemoryAt(0xbffe)).toBe(0xf0);
    expect(ram.getMemoryAt(0xbfff)).toBe(0x0f);

    expect(F.getRegister()).toBe(0x0);
  });
});

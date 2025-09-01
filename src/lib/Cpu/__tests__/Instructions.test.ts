import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('Opcodes non prefix', () => {
  test('0x0', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.ram.setMemoryAt(0x100, 0x0);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
  });

  test('0x01', () => {
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

  test('0x02', () => {
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

  test('0x03', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.ram.setMemoryAt(0x100, 0x03);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(gameboy.registers.register16Bit.BC.getRegister()).toBe(0x01);
  });

  test('0x04', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.ram.setMemoryAt(0x100, 0x04);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(gameboy.registers.register.B.getRegister()).toBe(0x01);
  });

  test('0x05', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.ram.setMemoryAt(0x100, 0x05);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(gameboy.registers.register.B.getRegister()).toBe(0b1111_1111);
  });

  test('0x06', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);

    gameboy.ram.setMemoryAt(0x100, 0x06);
    gameboy.ram.setMemoryAt(0x101, 0xff);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x102);
    expect(gameboy.registers.register.B.getRegister()).toBe(0b1111_1111);
  });

  test('0x07', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    gameboy.registers.register.A.setRegister(0x81);
    gameboy.ram.setMemoryAt(0x100, 0x07);

    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(gameboy.registers.register.A.getRegister()).toBe(0x03);
    expect(gameboy.registers.register.F.getRegister()).toBe(0b0001_0000);
  });

  test('0x08', () => {
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

  test('0x09', () => {
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

  test('0x0a', () => {
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

  test('0x0b', () => {
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

  test('0x0c', () => {
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

  test('0x0d', () => {
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

  test('0x0e', () => {
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

  test('0x0f', () => {
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

  test('0x10 STOP', () => {
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

  test('0x11', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { HL, BC } = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { ram } = gameboy;

    A.setRegister(0b0000_1111);
    ram.setMemoryAt(0x100, 0x11);
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x101);
    expect(A.getRegister()).toBe(0b1000_0111);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

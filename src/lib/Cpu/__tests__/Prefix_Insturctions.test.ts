import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

//template
// const dummyRom = new ArrayBuffer(1024);
// const gameboy = new Gameboy(dummyRom);
// const { ram, scheduler } = gameboy;
// const {} = gameboy.registers.register16Bit;
// const {} = gameboy.registers;
// const { PC } = gameboy.registers.pointers;

describe('Opcodes with prefixes', () => {
  test('0x0 - RLC B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x00);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x01 - RLC C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x01);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x02 - RLC D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x02);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x03 - RLC E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x03);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x04 - RLC H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x04);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x05 - RLC L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x05);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x06 - RLC (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x06);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0x01);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x07 - RLC A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x07);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x08 - RRC B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x08);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x09 - RRC C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x09);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x0a - RRC D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x0a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x0b - RRC E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x0b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x0c - RRC H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x0c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x0d - RRC L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x0d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x0e - RRC (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x0e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0x80);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x0f - RRC A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x0f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x10 - RL B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    B.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x10);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x11 - RL C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    C.setRegister(0b0000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x11);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x12 - RL D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    D.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x12);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x13 - RL E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    E.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x13);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x14 - RL H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    H.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x14);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x15 - RL L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    L.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x15);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x16 - RL (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    F.setCYFlag();
    ram.setMemoryAt(HL.getRegister(), 0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x16);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0x01);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x17 - RL A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    A.setRegister(0b0000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x17);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x18 - RR B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    F.setCYFlag();
    B.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x18);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x19 - RR C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    C.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x19);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x1a - RR D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    D.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x1a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x1b - RR E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    E.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x1b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x1c - RR H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    H.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x1c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x1d - RR L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    L.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x1d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x1e - RR (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x1e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0x80);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x1f - RR A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    A.setRegister(0b0000_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x1f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x20 - SLA B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    B.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x20);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0x21 - SLA C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    C.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x21);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0x22 - SLA D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1100_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x22);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x23 - SLA E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();
    E.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x23);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0x24 - SLA H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    H.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x24);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0x25 - SLA L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    L.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x25);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0x26 - SLA (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x26);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0x00);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0x27 - SLA A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    A.setRegister(0b1000_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x27);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test('0x28 - SRA B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x28);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x29 - SRA C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x29);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x2a - SRA D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x2a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x2b - SRA E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x2b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x2c - SRA H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x2c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x2d - SRA L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x2d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x2e - SRA (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    F.setCYFlag();

    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x2e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test('0x2f - SRA A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x2f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x30 - SWAP B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x30);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x31 - SWAP C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x31);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x32 - SWAP D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x32);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x33 - SWAP E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x33);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x34 - SWAP H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x34);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x35 - SWAP L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x35);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x36 - SWAP (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x36);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test('0x37 - SWAP A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_0000);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x37);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0000_0000);
  });
});

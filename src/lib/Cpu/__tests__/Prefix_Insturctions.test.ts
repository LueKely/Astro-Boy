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

  test('0x38 - SRL B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x38);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x39 - SRL C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x39);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x3a - SRL D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x3a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x3b - SRL E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x3b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test('0x3c - SRL H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x3c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x3d - SRL L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x3d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x3e - SRL (HL)', () => {
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
    ram.setMemoryAt(0x101, 0x3e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x3f - SRL A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1100_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x3f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b0110_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test('0x40 - BIT 0, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_1110);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x40);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_1110);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x41 - BIT 0, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_1110);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x41);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_1110);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x42 - BIT 0, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_1110);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x42);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_1110);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x43 - BIT 0, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_1110);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x43);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_1110);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x44 - BIT 0, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x44);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_0001);
    expect(F.getRegister()).toBe(0b0010_0000);
  });

  test('0x45 - BIT 0, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x45);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_0001);
    expect(F.getRegister()).toBe(0b0010_0000);
  });

  test('0x46 - BIT 0, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x46);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_0001);
    expect(F.getRegister()).toBe(0b0010_0000);
  });

  test('0x47 - BIT 0, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_0001);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x47);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_0001);
    expect(F.getRegister()).toBe(0b0010_0000);
  });

  test('0x48 - BIT 1, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x48);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x49 - BIT 1, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x49);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x4a - BIT 1, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x4a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x4b - BIT 1, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x4b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x4c - BIT 1, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x4c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x4d - BIT 1, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x4d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x4e - BIT 1, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x4e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x4f - BIT 1, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_1101);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x4f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_1101);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x50 - BIT 2, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x50);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x51 - BIT 2, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x51);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x52 - BIT 2, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x52);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x53 - BIT 2, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x53);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x54 - BIT 2, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x54);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x55 - BIT 2, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x55);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x56 - BIT 2, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x56);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x57 - BIT 2, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_1011);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x57);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_1011);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x58 - BIT 3, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x58);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x59 - BIT 3, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x59);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x5a - BIT 3, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x5a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x5b - BIT 3, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x5b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x5c - BIT 3, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x5c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x5d - BIT 3, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x5d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x5e - BIT 3, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x5e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x5f - BIT 3, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_0111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x5f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_0111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x60 - BIT 4, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x60);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x61 - BIT 4, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x61);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x62 - BIT 4, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x62);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x63 - BIT 4, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x63);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x64 - BIT 4, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x64);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x65 - BIT 4, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x65);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x66 - BIT 4, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x66);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x67 - BIT 4, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1110_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x67);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1110_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x68 - BIT 5, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x68);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x69 - BIT 5, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x69);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x6a - BIT 5, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x6a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x6b - BIT 5, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x6b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x6c - BIT 5, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x6c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x6d - BIT 5, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x6d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x6e - BIT 5, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x6e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x6f - BIT 5, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1101_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x6f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1101_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x70 - BIT 6, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x70);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x71 - BIT 6, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x71);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x72 - BIT 6, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x72);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x73 - BIT 6, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x73);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x74 - BIT 6, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x74);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x75 - BIT 6, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x75);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x76 - BIT 6, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x76);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x77 - BIT 6, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1011_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x77);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1011_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x78 - BIT 7, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x78);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x79 - BIT 7, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x79);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x7a - BIT 7, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x7a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x7b - BIT 7, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x7b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x7c - BIT 7, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x7c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x7d - BIT 7, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x7d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x7e - BIT 7, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x7e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x7f - BIT 7, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b0111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x7f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b0111_1111);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test('0x80 - RES 0, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x80);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_1110);
  });

  test('0x81 - RES 0, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x81);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_1110);
  });

  test('0x82 - RES 0, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x82);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_1110);
  });

  test('0x83 - RES 0, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x83);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_1110);
  });

  test('0x84 - RES 0, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x84);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_1110);
  });

  test('0x85 - RES 0, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x85);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_1110);
  });

  test('0x86 - RES 0, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x86);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_1110);
  });

  test('0x87 - RES 0, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x87);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_1110);
  });

  test('0x88 - RES 1, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x88);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_1101);
  });

  test('0x89 - RES 1, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x89);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_1101);
  });

  test('0x8a - RES 1, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x8a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_1101);
  });

  test('0x8b - RES 1, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x8b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_1101);
  });

  test('0x8c - RES 1, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x8c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_1101);
  });

  test('0x8d - RES 1, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x8d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_1101);
  });

  test('0x8e - RES 1, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x8e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_1101);
  });

  test('0x8f - RES 1, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x8f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_1101);
  });

  test('0x90 - RES 2, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x90);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_1011);
  });

  test('0x91 - RES 2, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x91);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_1011);
  });

  test('0x92 - RES 2, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x92);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_1011);
  });

  test('0x93 - RES 2, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x93);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_1011);
  });

  test('0x94 - RES 2, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x94);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_1011);
  });

  test('0x95 - RES 2, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x95);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_1011);
  });

  test('0x96 - RES 2, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x96);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_1011);
  });

  test('0x97 - RES 2, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x97);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_1011);
  });

  test('0x98 - RES 3, B', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { B, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    B.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x98);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(B.getRegister()).toBe(0b1111_0111);
  });

  test('0x99 - RES 3, C', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { C, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    C.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x99);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(C.getRegister()).toBe(0b1111_0111);
  });

  test('0x9a - RES 3, D', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { D, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    D.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x9a);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(D.getRegister()).toBe(0b1111_0111);
  });

  test('0x9b - RES 3, E', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { E, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    E.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x9b);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(E.getRegister()).toBe(0b1111_0111);
  });

  test('0x9c - RES 3, H', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { H, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    H.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x9c);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(H.getRegister()).toBe(0b1111_0111);
  });

  test('0x9d - RES 3, L', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { L, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    L.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x9d);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(L.getRegister()).toBe(0b1111_0111);
  });

  test('0x9e - RES 3, (HL)', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const { HL } = gameboy.registers.register16Bit;
    const { F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;
    HL.setRegister(0xff);
    ram.setMemoryAt(HL.getRegister(), 0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x9e);

    scheduler.tick();
    scheduler.tick();
    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(HL.getRegister()).toBe(0xff);
    expect(ram.getMemoryAt(HL.getRegister())).toBe(0b1111_0111);
  });

  test('0x9f - RES 3, A', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const { A, F } = gameboy.registers.register;
    const { PC } = gameboy.registers.pointers;

    A.setRegister(0b1111_1111);
    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x9f);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
    expect(A.getRegister()).toBe(0b1111_0111);
  });
});

import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';
import {
  CALLCCN16,
  CALLN16,
  JPHL,
  JPN16,
} from '../instructions/Jumps_And _Subroutine_Instructions';

describe('Tests for CALL NN', () => {
  test(' first ', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0150);
    gameboy.registers.pointers.SP.setRegister(0xfffe);

    gameboy.ram.setMemoryAt(0x0151, 0x34);
    gameboy.ram.setMemoryAt(0x0152, 0x12);

    const callNN = CALLN16();

    callNN.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xfffc);
    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x1234);
    expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x01);
    expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x53);
  });

  test(' second ', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0200);
    gameboy.registers.pointers.SP.setRegister(0xd000);

    gameboy.ram.setMemoryAt(0x0201, 0x00);
    gameboy.ram.setMemoryAt(0x0202, 0xc0);

    const callNN = CALLN16();

    callNN.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0xc000);
    expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xcffe);
    expect(gameboy.ram.getMemoryAt(0xcffe)).toBe(0x03);
    expect(gameboy.ram.getMemoryAt(0xcfff)).toBe(0x02);
  });

  test(' third ', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0150);
    gameboy.registers.pointers.SP.setRegister(0xfffe);

    gameboy.ram.setMemoryAt(0x0151, 0x00);
    gameboy.ram.setMemoryAt(0x0152, 0x00);

    const callNN = CALLN16();

    callNN.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x0000);
    expect(gameboy.registers.pointers.SP.getRegister()).toBe(0xfffc);
    expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x53);
    expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x01);
  });
});

describe('Tests for JUMP N16', () => {
  test(' JUMP FROM 0x100 to 0x200 ', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0100);

    gameboy.ram.setMemoryAt(0x0101, 0x00);
    gameboy.ram.setMemoryAt(0x0102, 0x02);

    const jumpN16 = JPN16();

    jumpN16.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x200);
  });

  test(' JUMP FROM 0x500 to 0x100 ', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0500);

    gameboy.ram.setMemoryAt(0x0501, 0x00);
    gameboy.ram.setMemoryAt(0x0502, 0x01);

    const jumpN16 = JPN16();

    jumpN16.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x100);
  });

  test(' JUMP FROM 0x150 to 0x150 (infinite loop)', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0150);

    gameboy.ram.setMemoryAt(0x0151, 0x50);
    gameboy.ram.setMemoryAt(0x0152, 0x01);

    const jumpN16 = JPN16();

    jumpN16.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x150);
  });

  test(' JUMP FROM ROM to RAM ', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0150);

    gameboy.ram.setMemoryAt(0x0151, 0x00);
    gameboy.ram.setMemoryAt(0x0152, 0xc0);

    const jumpN16 = JPN16();

    jumpN16.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0xc000);
  });
});
describe('Tests for JP [HL]', () => {
  test('Set HL to 0x200, PC should be 0x200 as well', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);

    gameboy.registers.pointers.PC.setRegister(0x0150);
    gameboy.registers.register16Bit.HL.setRegister(0x200);

    const jobs = [
      (dmg: Gameboy) => {
        JPHL(dmg.registers.register16Bit.HL, dmg.registers.pointers.PC);
      },
    ];

    jobs.forEach((callback) => {
      callback(gameboy);
    });

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x200);
  });
});

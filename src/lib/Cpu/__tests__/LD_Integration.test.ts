import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('lD R16', () => {
  test('LD BC, NN', () => {
    const dummyRom = new ArrayBuffer(1024);

    // init gameboy
    const gameboy = new Gameboy(dummyRom);
    gameboy.registers.pointers.PC.setRegister(0x0100);

    const { SP } = gameboy.registers.pointers;

    const targetValue = 0x2 | (0x03 << 8);

    gameboy.ram.setMemoryAt(0x100, 0x31);
    gameboy.ram.setMemoryAt(0x101, 0x02);
    gameboy.ram.setMemoryAt(0x102, 0x03);

    gameboy.scheduler.tick();
    gameboy.scheduler.tick();
    gameboy.scheduler.tick();

    expect(gameboy.registers.pointers.PC.getRegister()).toBe(0x103);
    expect(SP.getRegister()).toBe(targetValue);
    expect(SP.getRegister() >>> 8).toBe(0x03);
    expect(SP.getRegister() & 0xff).toBe(0x02);
  });
});

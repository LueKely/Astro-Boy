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
  test('0x0 - RRLC', () => {
    const dummyRom = new ArrayBuffer(1024);
    const gameboy = new Gameboy(dummyRom);
    const { ram, scheduler } = gameboy;
    const {} = gameboy.registers.register16Bit;
    const {} = gameboy.registers;
    const { PC } = gameboy.registers.pointers;

    ram.setMemoryAt(0x100, 0xcb);
    ram.setMemoryAt(0x101, 0x00);

    scheduler.tick();
    scheduler.tick();

    expect(PC.getRegister()).toBe(0x102);
  });
});

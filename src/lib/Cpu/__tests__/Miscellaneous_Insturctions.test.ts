import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('DAA', () => {
  const testCasesAddition = [
    { a_before: 0x09, f_before: 0b0000_0000, a_after: 0x9, f_after: 0x00 },
    { a_before: 0x0a, f_before: 0b0010_0000, a_after: 0x10, f_after: 0x00 },
    {
      a_before: 0xaf,
      f_before: 0b0000_0000,
      a_after: 0x15,
      f_after: 0b0001_0000,
    },
    {
      a_before: 0x05,
      f_before: 0b0011_0000,
      a_after: 0x6b,
      f_after: 0b0001_0000,
    },
    {
      a_before: 0x9a,
      f_before: 0b0000_0000,
      a_after: 0x00,
      f_after: 0b1001_0000,
    },
  ];

  const testCasesSubtraction = [
    {
      a_before: 0x00,
      f_before: 0b0100_0000,
      a_after: 0x00,
      f_after: 0b1100_0000,
    },
    {
      a_before: 0x09,
      f_before: 0b0100_0000,
      a_after: 0x09,
      f_after: 0b0100_0000,
    },
    {
      a_before: 0x00,
      f_before: 0b0101_0000,
      a_after: 0xa0,
      f_after: 0b0101_0000,
    },
    {
      a_before: 0x10,
      f_before: 0b0101_0000,
      a_after: 0xb0,
      f_after: 0b0101_0000,
    },
    {
      a_before: 0x60,
      f_before: 0b0101_0000,
      a_after: 0x00,
      f_after: 0b1101_0000,
    },
  ];

  const testCasesEdge = [
    {
      a_before: 0x00,
      f_before: 0b0000_0000,
      a_after: 0x00,
      f_after: 0b1000_0000,
    },
    {
      a_before: 0x66,
      f_before: 0b0011_0000,
      a_after: 0xcc,
      f_after: 0b0001_0000,
    },
    {
      a_before: 0x90,
      f_before: 0b0110_0000,
      a_after: 0x8a,
      f_after: 0b0100_0000,
    },
  ];

  testCasesAddition.forEach((values) => {
    test(
      ' Addition Test, A is:' +
        values.a_before +
        ' then use DAA A should be:' +
        values.a_after,
      () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registers.pointers.PC.setRegister(0x0100);

        const { A, F } = gameboy.registers.register;

        A.setRegister(values.a_before);
        F.setRegister(values.f_before);

        gameboy.ram.setMemoryAt(0x100, 0x27);

        gameboy.scheduler.tick();

        expect(A.getRegister()).toBe(values.a_after);
        expect(F.getRegister()).toBe(values.f_after);
      }
    );
  });

  testCasesSubtraction.forEach((values) => {
    test(
      ' Subtraction Test, A is:' +
        values.a_before +
        ' then use DAA A should be:' +
        values.a_after,
      () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registers.pointers.PC.setRegister(0x0100);

        const { A, F } = gameboy.registers.register;

        A.setRegister(values.a_before);
        F.setRegister(values.f_before);

        gameboy.ram.setMemoryAt(0x100, 0x27);

        gameboy.scheduler.tick();

        expect(A.getRegister()).toBe(values.a_after);
        expect(F.getRegister()).toBe(values.f_after);
      }
    );
  });

  testCasesEdge.forEach((values) => {
    test(
      ' Edge cases Test, A is:' +
        values.a_before +
        ' then use DAA A should be:' +
        values.a_after,
      () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registers.pointers.PC.setRegister(0x0100);

        const { A, F } = gameboy.registers.register;

        A.setRegister(values.a_before);
        F.setRegister(values.f_before);

        gameboy.ram.setMemoryAt(0x100, 0x27);

        gameboy.scheduler.tick();

        expect(A.getRegister()).toBe(values.a_after);
        expect(F.getRegister()).toBe(values.f_after);
      }
    );
  });
});

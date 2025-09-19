import { describe, expect, test } from 'vitest';
import { PPU } from '../PPU';

describe('2BPP', () => {
  test('msb and lsb is 0b1111_1111', () => {
    const APU = new PPU();
    const lsb = 0b1111_1111;
    const msb = 0b1111_1111;

    const result = APU.twoBitPixelProcessing(lsb, msb);
    expect(result).toStrictEqual([3, 3, 3, 3, 3, 3, 3, 3]);
  });

  test('msb and lsb is 0x7c', () => {
    const APU = new PPU();
    const lsb = 0x7c;
    const msb = 0x7c;

    const result = APU.twoBitPixelProcessing(lsb, msb);
    expect(result.length).toBe(8);
    expect(result).toStrictEqual([0, 3, 3, 3, 3, 3, 0, 0]);
  });
  test('msb and lsb is 0x7c', () => {
    const APU = new PPU();
    const lsb = 0x7c;
    const msb = 0x7c;

    const result = APU.twoBitPixelProcessing(lsb, msb);
    expect(result.length).toBe(8);
    expect(result).toStrictEqual([0, 3, 3, 3, 3, 3, 0, 0]);
  });
});

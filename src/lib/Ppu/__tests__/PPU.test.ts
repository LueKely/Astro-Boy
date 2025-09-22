import { describe, expect, test } from 'vitest';
import { PPU } from '../PPU';

describe('2BPP', () => {
    test('msb and lsb is 0b1111_1111', () => {
        const lsb = 0b1111_1111;
        const msb = 0b1111_1111;

        const result = PPU.decodeTo2bpp(lsb, msb);
        expect(result).toStrictEqual([3, 3, 3, 3, 3, 3, 3, 3]);
    });

    test('msb and lsb is 0x7c', () => {
        const lsb = 0x7c;
        const msb = 0x7c;

        const result = PPU.decodeTo2bpp(lsb, msb);
        expect(result.length).toBe(8);
        expect(result).toStrictEqual([0, 3, 3, 3, 3, 3, 0, 0]);
    });

    test('msb and lsb is 0x7c', () => {
        const lsb = 0x7c;
        const msb = 0x7c;

        const result = PPU.decodeTo2bpp(lsb, msb);
        expect(result.length).toBe(8);
        expect(result).toStrictEqual([0, 3, 3, 3, 3, 3, 0, 0]);
    });
});

describe('renderTileData', () => {
    test('Test #1', () => {
        const vram: Uint8Array = new Uint8Array([
            0x7c, 0x7c, 0x0, 0xc6, 0xc6, 0x00, 0x00, 0xfe, 0xc6, 0xc6, 0x0, 0xc6, 0xc6, 0x0, 0x0,
            0x0,
        ]);

        const expectedResult = [
            [0, 3, 3, 3, 3, 3, 0, 0],
            [2, 2, 0, 0, 0, 2, 2, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [2, 2, 2, 2, 2, 2, 2, 0],
            [3, 3, 0, 0, 0, 3, 3, 0],
            [2, 2, 0, 0, 0, 2, 2, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        const expectedResult2 = [
            [
                [0, 3, 3, 3, 3, 3, 0, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [2, 2, 2, 2, 2, 2, 2, 0],
                [3, 3, 0, 0, 0, 3, 3, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
        ];

        const cache = PPU.decodeATile(vram);
        const tileData = PPU.decodeTileData(vram);
        console.log(tileData);

        expect(cache).toStrictEqual(expectedResult);
        expect(tileData).toStrictEqual(expectedResult2);
    });

    test('Should decode the Tile Data', () => {
        const vram: Uint8Array = new Uint8Array([
            0x7c, 0x7c, 0x0, 0xc6, 0xc6, 0x00, 0x00, 0xfe, 0xc6, 0xc6, 0x0, 0xc6, 0xc6, 0x0, 0x0,
            0x0, 0x7c, 0x7c, 0x0, 0xc6, 0xc6, 0x00, 0x00, 0xfe, 0xc6, 0xc6, 0x0, 0xc6, 0xc6, 0x0,
            0x0, 0x0, 0x7c, 0x7c, 0x0, 0xc6, 0xc6, 0x00, 0x00, 0xfe, 0xc6, 0xc6, 0x0, 0xc6, 0xc6,
            0x0, 0x0, 0x0, 0x7c, 0x7c, 0x0, 0xc6, 0xc6, 0x00, 0x00, 0xfe, 0xc6, 0xc6, 0x0, 0xc6,
            0xc6, 0x0, 0x0, 0x0,
        ]);

        const expectedResult = [
            [
                [0, 3, 3, 3, 3, 3, 0, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [2, 2, 2, 2, 2, 2, 2, 0],
                [3, 3, 0, 0, 0, 3, 3, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                [0, 3, 3, 3, 3, 3, 0, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [2, 2, 2, 2, 2, 2, 2, 0],
                [3, 3, 0, 0, 0, 3, 3, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                [0, 3, 3, 3, 3, 3, 0, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [2, 2, 2, 2, 2, 2, 2, 0],
                [3, 3, 0, 0, 0, 3, 3, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
            [
                [0, 3, 3, 3, 3, 3, 0, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [2, 2, 2, 2, 2, 2, 2, 0],
                [3, 3, 0, 0, 0, 3, 3, 0],
                [2, 2, 0, 0, 0, 2, 2, 0],
                [1, 1, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
        ];

        const tileData = PPU.decodeTileData(vram);

        expect(tileData).toStrictEqual(expectedResult);
    });
});

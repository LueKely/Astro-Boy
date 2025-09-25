import { describe, expect, test } from 'vitest';
import { GameboyCanvas } from '../Canvas';

describe('Gameboy Canvas Functions', () => {
    test('Render Tile', () => {
        const canvas = document.createElement('canvas');
        const gbCanvas = new GameboyCanvas(canvas);
        const { renderTile, tileDataBuffer } = gbCanvas;
        const tileDecoded = [
            [0, 3, 3, 3, 3, 3, 0, 0],
            [2, 2, 0, 0, 0, 2, 2, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [2, 2, 2, 2, 2, 2, 2, 0],
            [3, 3, 0, 0, 0, 3, 3, 0],
            [2, 2, 0, 0, 0, 2, 2, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        renderTile(gbCanvas.ctx, tileDecoded);
        expect(tileDataBuffer.length).toBeGreaterThan(0);
        expect(tileDataBuffer[0].data[4]).toBe(0);
    });

    test('Render TileData', () => {
        const canvas = document.createElement('canvas');
        const gbCanvas = new GameboyCanvas(canvas);
        const { renderTileData } = gbCanvas;
        const tileDataDecoded = [
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
                [0, 3, 3, 3, 3, 3, 0, 0], //0-7
                [2, 2, 0, 0, 0, 2, 2, 0], //8-15
                [1, 1, 0, 0, 0, 1, 1, 0], //16-24
                [2, 2, 2, 2, 2, 2, 2, 0], //24-31
                [3, 3, 0, 0, 0, 3, 3, 0], //32-39
                [2, 2, 0, 0, 0, 2, 2, 0], //40-47
                [1, 1, 0, 0, 0, 1, 1, 0], //48-63
                [0, 0, 0, 0, 0, 0, 0, 0], //64-71
            ],
        ];

        renderTileData(tileDataDecoded);
        expect(gbCanvas.tileDataBuffer.length).toBeGreaterThan(1);
        expect(gbCanvas.tileDataBuffer[0].data[4]).toBe(0);
        expect(gbCanvas.tileDataBuffer[1].data[0]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[1]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[2]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[3]).toBe(255);
        // 2nd bit
        expect(gbCanvas.tileDataBuffer[1].data[160]).toBe(96);
        expect(gbCanvas.tileDataBuffer[1].data[161]).toBe(96);
        expect(gbCanvas.tileDataBuffer[1].data[162]).toBe(96);
        expect(gbCanvas.tileDataBuffer[1].data[163]).toBe(255);
        // row 7th col 3rd bit 48-63
        expect(gbCanvas.tileDataBuffer[1].data[200]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[201]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[202]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[203]).toBe(255);

        // row 8th
        expect(gbCanvas.tileDataBuffer[1].data[252]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[253]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[254]).toBe(255);
        expect(gbCanvas.tileDataBuffer[1].data[255]).toBe(255);
    });
});

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

        renderTileData(tileDataDecoded);
        expect(gbCanvas.tileDataBuffer.length).toBeGreaterThan(1);
        expect(gbCanvas.tileDataBuffer[0].data[4]).toBe(0);
        expect(gbCanvas.tileDataBuffer[1].data[4]).toBe(0);
    });
});

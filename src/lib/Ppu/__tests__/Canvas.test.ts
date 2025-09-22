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
        expect(gbCanvas.tileDataBuffer.length).toBeGreaterThan(0);
        expect(gbCanvas.tileDataBuffer[0].data[4]).toBe(0);
    });
});

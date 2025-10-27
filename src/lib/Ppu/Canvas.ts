// TODO:
//  add test for tileDataBuffer if it works or not - done
// coordinates for the map - done
// i guess i'll load all the tiles form the rom into the tile map
// LATER
// later on i need to research on ways to clear things in the canvas
// many solutions but all have different purposes

// REWRITE LOL HAHAHAHAHA
import type { ICoordinates } from './types/Tile_Types';

export class GameboyCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    private static defaultPalette = [
        // vro.. i miss vec4
        [255, 255, 255, 255], // color0
        [192, 192, 192, 255], // color1
        [96, 96, 96, 255], // color2
        [0, 0, 0, 255], // color3
    ];

    paletteContext;

    constructor(palette?: number[][]) {
        this.paletteContext = palette != undefined ? palette : GameboyCanvas.defaultPalette;
        const canvas = document.getElementById('canvas') as HTMLElement | null;
        if (canvas && canvas instanceof HTMLCanvasElement) {
            console.log('Canvas Initiated');
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        } else {
            throw Error('Canvas Does Not Exist M8');
        }
    }

    renderScanline(scanlineData: number[]) {
        const scanline = this.ctx.createImageData(160, 1);

        for (let i = 0; i < scanlineData.length; i++) {
            const pixelValue = scanlineData[i];
            const [r, g, b, a] = this.paletteContext[pixelValue];

            scanline.data[i] = r;
            scanline.data[i + 1] = g;
            scanline.data[i + 2] = b;
            scanline.data[i + 3] = a;
        }

        return scanline;
    }

    placeScanline(tileDataBuffer: ImageData, LY: number) {
        this.ctx.putImageData(tileDataBuffer, 0, LY);
    }
    clear() {
        this.ctx.clearRect(0, 0, 160, 144);
    }
}

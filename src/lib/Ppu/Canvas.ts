import type { PPU } from './PPU';

interface ICoordinates {
    x: number;
    y: number;
}

export class GameboyCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    tileDataBuffer: ImageData[] = [];

    static Scale = 1.5;

    // add option to change palette
    paletteContext = [
        // vro.. i miss vec4
        [255, 255, 255, 255], // color0
        [192, 192, 192, 255], // color1
        [96, 96, 96, 255], // color2
        [0, 0, 0, 255], // color3
    ];

    //   seems like drawing this canvas is a bit weird
    //   and pixels for 144x160 is tad small i need to scale this bigger!
    constructor(canvas: HTMLElement | null) {
        if (canvas && canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');
        } else {
            throw Error('Canvas Does Not Exist M8');
        }
    }

    renderTile(ctx: CanvasRenderingContext2D, tileSource: number[][]) {
        const tileSize = 8;
        const tile = ctx.createImageData(tileSize, tileSize);

        // i want to test this
        for (let col = 0; col < tileSource.length; col++) {
            for (let row = 0; row < tileSource[col].length; row++) {
                for (let imagePixel = 0; imagePixel < tile.data.length; imagePixel += 4) {
                    const pixelValue = tileSource[col][row];
                    const [r, g, b, a] = this.paletteContext[pixelValue];
                    tile.data[imagePixel] = r;
                    tile.data[imagePixel + 1] = g;
                    tile.data[imagePixel + 2] = b;
                    tile.data[imagePixel + 3] = a;
                }
            }
        }

        this.tileDataBuffer.push(tile);
    }

    renderTileData(tileDataSource: number[][][]) {
        tileDataSource.forEach((tileSource) => {
            if (this.ctx == null) {
                throw Error('context not defined');
            }
            this.renderTile(this.ctx, tileSource);
        });
    }

    placeTile(
        ctx: CanvasRenderingContext2D,
        coordinates: ICoordinates[],
        tileDataBuffer: ImageData[]
    ) {
        tileDataBuffer.forEach((tileBuffer, index) => {
            const { x, y } = coordinates[index];
            ctx.putImageData(tileBuffer, x, y);
        });
    }

    // i need an option to enlarge the thing i am rendering
    // solution ^ : i need this context to be temporary
    //
    draw() {
        if (this.ctx == null) {
            throw Error('context not defined');
        }

        // this.placeTile(this.ctx, [{ x: 5, y: 5 }], this.tileDataBuffer);
        // this.ctx.scale(GameboyCanvas.Scale, GameboyCanvas.Scale);
        // this.ctx.drawImage(this.canvas, 0, 0);

        const imgData = this.ctx.createImageData(8, 8);

        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i + 0] = 255;
            imgData.data[i + 1] = 0;
            imgData.data[i + 2] = 0;
            imgData.data[i + 3] = 255;
        }
        this.ctx.putImageData(imgData, 10, 10);
    }
}

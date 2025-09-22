import type { PPU } from './PPU';

interface ICoordinates {
    x: number;
    y: number;
}
// TODO:
//  add test for tileDataBuffer if it works or not
// LATER:
// later on i need to research on ways to clear things in the canvas
// many solutions but all have different purposes

export class GameboyCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
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

    constructor(canvas: HTMLElement | null) {
        if (canvas && canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
            // you have to bind this into this function such that -
            // it won't forget the variable it depends on -
            // if you want to destruct that is you can totally not destruct
            this.renderTile = this.renderTile.bind(this);
            this.renderTileData = this.renderTileData.bind(this);
        } else {
            throw Error('Canvas Does Not Exist M8');
        }
    }

    renderTile(ctx: CanvasRenderingContext2D, tileSource: number[][]) {
        const tileSize = 8;
        const tile = ctx.createImageData(tileSize, tileSize);
        const offset = 4;
        // i want to test this - sept 21
        // may mali dito - sept 22
        // fixed bitch!
        for (let col = 0; col < tileSource.length; col++) {
            for (let row = 0; row < tileSource[col].length; row++) {
                const pixelValue = tileSource[row][col];

                const [r, g, b, a] = this.paletteContext[pixelValue];
                const flatIndex = row * 8 + col;
                const index = flatIndex * offset;
                tile.data[index] = r;
                tile.data[index + 1] = g;
                tile.data[index + 2] = b;
                tile.data[index + 3] = a;
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

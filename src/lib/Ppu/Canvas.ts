import { PPU } from './PPU';
import { Tile_Mapper } from './Tile_Mapper';

interface ICoordinates {
    x: number;
    y: number;
}
// TODO:
//  add test for tileDataBuffer if it works or not - done
// coordinates for the map
// LATER:
// later on i need to research on ways to clear things in the canvas
// many solutions but all have different purposes

export class GameboyCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    tileDataBuffer: ImageData[] = [];
    private static defaultPalette = [
        // vro.. i miss vec4
        [255, 255, 255, 255], // color0
        [192, 192, 192, 255], // color1
        [96, 96, 96, 255], // color2
        [0, 0, 0, 255], // color3
    ];

    paletteContext;

    constructor(canvas: HTMLElement | null, palette?: number[][]) {
        this.paletteContext = palette != undefined ? palette : GameboyCanvas.defaultPalette;
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
        for (let row = 0; row < tileSource.length; row++) {
            for (let col = 0; col < tileSource[row].length; col++) {
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

    // placement is wrong
    placeTile(
        ctx: CanvasRenderingContext2D,
        coordinates: ICoordinates[],
        tileDataBuffer: ImageData[]
    ) {
        tileDataBuffer.forEach((tileBuffer, index) => {
            const { x, y } = coordinates[index];
            ctx.putImageData(tileDataBuffer[0], x, y);
        });
    }

    // i just need to map the tiles first

    draw() {
        if (this.ctx == null) {
            throw Error('context not defined');
        }

        const map = new Tile_Mapper();
        this.ctx.imageSmoothingEnabled = false;
        this.placeTile(this.ctx, map.create(), this.tileDataBuffer);
    }
}

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
    tileDataBuffer: ImageData[] = [];
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
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

            // look up bind method to understand
            // i think eto ung problema kaya mali render
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

    placeTile(
        ctx: CanvasRenderingContext2D,
        coordinates: ICoordinates[],
        tileDataBuffer: ImageData[],
        tileMapIndices: Uint8Array
    ) {
        tileMapIndices.forEach((tileMapIndex, index) => {
            const { x, y } = coordinates[index];
            ctx.putImageData(tileDataBuffer[tileMapIndex], x, y);
        });
    }

    draw(coordinates: ICoordinates[], tileMapIndices: Uint8Array) {
        if (this.ctx == null) {
            throw Error('context not defined');
        }
        // clean slate

        this.ctx.imageSmoothingEnabled = false;
        this.placeTile(this.ctx, coordinates, this.tileDataBuffer, tileMapIndices);
    }

    clear() {
        this.ctx.clearRect(0, 0, 256, 256);
    }
}

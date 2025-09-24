import type { ICoordinates } from './types/Tile_Types';

export class PPU {
    // this should store 384 tiles
    tileCoordinates: ICoordinates[] = [];
    tileDataCache: number[][][] = [];

    constructor() {}
}

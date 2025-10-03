import type { ICoordinates } from './types/Tile_Types';

export class PPU {
    // this should store 384 tiles
    tileCoordinates: ICoordinates[] = [];
    tileDataCache: number[][][] = [];
    tileMapIndices1: Uint8Array = new Uint8Array();
    tileMapIndices2: Uint8Array = new Uint8Array();
    oamCache: number[][][] = [];

    constructor() {}
}

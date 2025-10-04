import type { Ram } from '../Ram/Ram';
import type { ICoordinates } from './types/Tile_Types';

export class PPU {
    // this should store 384 tiles
    tileCoordinates: ICoordinates[] = [];
    tileDataCache: number[][][] = [];
    tileMapIndices1: Uint8Array = new Uint8Array();
    tileMapIndices2: Uint8Array = new Uint8Array();
    oamCache: number[] = [];
    // so the registers for the ppu
    // are the things stored in the ram
    // todo: comebine all the stuff here

    constructor(ram: Ram) {}
}

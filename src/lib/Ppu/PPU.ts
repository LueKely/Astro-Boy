import type { Ram } from '../Ram/Ram';
import type { ICoordinates } from './types/Tile_Types';

export class PPU {
    // Tile relatad data
    static tileMapA = [0x9800, 0x9bff];
    static timeMapB = [0x9c00, 0x9fff];
    static OAM = [0xfe00, 0xfe9f];

    // scroll
    static SCY = 0xff43;
    static SCX = 0xff42;

    // modifiers
    static LCDC = 0xff40;
    static STAT = 0xff41;

    // i need to compare this
    static LYC = 0xff45;
    static LY = 0xff44;

    // this should store 384 tiles
    tileCoordinates: ICoordinates[] = [];
    tileDataCache: number[][][] = [];
    tileMapIndices1: Uint8Array = new Uint8Array();
    tileMapIndices2: Uint8Array = new Uint8Array();
    oamCache: number[] = [];

    private ram: Ram;
    // so the registers for the ppu
    // are the things stored in the ram
    // todo: comebine all the stuff here

    constructor(ram: Ram) {
        this.ram = ram;
        this.ram.setMemoryAt(PPU.STAT, PPU.STAT | 0b0000_0010);
    }

    flagCheck() {
        // check for STAT
        const LYC = this.ram.getMemoryAt(PPU.LYC);
        const LY = this.ram.getMemoryAt(PPU.LY);
        const LCDC = this.ram.getMemoryAt(PPU.LCDC);

        // init STAT
        if (LY == LYC) {
            this.ram.setMemoryAt(PPU.LCDC, LCDC | 0b0000_0010);
        }

        // init vblank interrupt
        if (LY == 144) {
        }
    }

    // LCDC Dictates what are placed and shi cuh!
    //
    oamScan() {}
    drawRow() {}
    horizontalBlank() {}

    pipeLine() {}
    step() {
        switch (this.ram.getMemoryAt(PPU.STAT) & 0b0000_0011) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                throw new Error('This should not happen');
                break;
        }
        // consumes MCycles during what state
    }
}

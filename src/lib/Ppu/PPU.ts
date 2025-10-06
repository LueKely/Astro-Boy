import type { Ram } from '../Ram/Ram';
import type { ICoordinates } from './types/Tile_Types';
// DONT FORGET
// STAT INTERRUPTS
// STAT has bits for modes 0,1,2 that will trigger interrupts
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
    private oamScan() {
        const LCDC = this.ram.getMemoryAt(PPU.LCDC);
        const STAT = this.ram.getMemoryAt(PPU.STAT);
        const objMode = 0;

        // check if is allowed to raise IF register
        if (STAT & 0b0001_0000) {
            this.ram.setMemoryAt(0xff, this.ram.getIF() | 0b0000_0010);
        }
        if ((LCDC & 0b0000_0010) == 0b0000_00010) {
            // check if enabled to create objects
        }
        // check if objects can be drawn
        // check what type if 8by8 for 8by16

        this.ram.setMemoryAt(PPU.STAT, this.ram.getMemoryAt(PPU.STAT) | 0b0000_0011);
    }
    private drawRow() {
        // mode 3
        // apply scrolling here
        this.ram.setMemoryAt(PPU.STAT, this.ram.getMemoryAt(PPU.STAT) & 0);
    }
    private horizontalBlank() {
        this.ram.setMemoryAt(PPU.STAT, this.ram.getMemoryAt(PPU.STAT) | 0b0000_0001);
    }
    private vBlank() {
        this.ram.setMemoryAt(PPU.STAT, this.ram.getMemoryAt(PPU.STAT) | 0b0000_0010);
    }
    step() {
        switch (this.ram.getMemoryAt(PPU.STAT) & 0b0000_0011) {
            case 0:
                this.horizontalBlank();
                break;
            case 1:
                this.vBlank();
                break;
            case 2:
                this.oamScan();
                break;
            case 3:
                this.drawRow();
                break;
            default:
                throw new Error('This should not happen');
        }
        // consumes MCycles during what state
    }
}

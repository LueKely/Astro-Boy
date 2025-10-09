import type { Ram } from '../Ram/Ram';
import { Address } from '../utils/Address_Pointers';
import type { ICoordinates } from './types/Tile_Types';
// DONT FORGET
// STAT INTERRUPTS
// STAT has bits for modes 0,1,2 that will trigger interrupts
export class PPU {
    // Tile relatad data

    // this should store 384 tiles
    tileCoordinates: ICoordinates[] = [];
    tileDataCache: number[][][] = [];
    tileMapIndices1: Uint8Array = new Uint8Array();
    tileMapIndices2: Uint8Array = new Uint8Array();
    oamCache: number[] = [];
    private dot = 0;
    private ram: Ram;
    // so the registers for the Address
    // are the things stored in the ram
    // todo: comebine all the stuff here

    constructor(ram: Ram) {
        this.ram = ram;
        this.ram.setMemoryAt(Address.STAT, Address.STAT | 0b0000_0010);
    }

    private flagCheck() {
        // check for STAT
        const LYC = this.ram.getMemoryAt(Address.LYC);
        const LY = this.ram.getMemoryAt(Address.LY);
        const LCDC = this.ram.getMemoryAt(Address.LCDC);
        const STAT = this.ram.getMemoryAt(Address.STAT);
        // init STAT INT
        if (LY == LYC) {
            this.ram.setMemoryAt(Address.LCDC, LCDC | 0b0000_0010);
        }

        // init vblank interrupt INT
        if (LY == 144) {
            const IF = this.ram.getMemoryAt(Address.IF) | 0b0000_0001;
            this.ram.setMemoryAt(Address.IF, IF);
        }
    }

    // LCDC Dictates what are placed and shi cuh!
    // TODO:
    // LOOP Through the 40 sprites
    // Check if they are contained in the Scan line
    // if so proceed to push them to the conveyer belt

    private oamScan() {
        //  mode 2
        const LCDC = this.ram.getMemoryAt(Address.LCDC);
        const STAT = this.ram.getMemoryAt(Address.STAT);
        const offSetX = 0;
        const offSetY = 0;
        // check if is allowed to raise IF register
        if ((STAT & 0b0010_0000) == 0b0010_0000) {
            this.ram.setMemoryAt(Address.IF, this.ram.getIF() | 0b0000_0010);
        }
        // OBJ SIZE CHECKER
        if ((STAT & 0b0000_0100) == 0b0000_0100) {
        }
        // Is allowed to create objects
        if ((LCDC & 0b0000_0010) == 0b0000_00010) {
        }
        this.ram.setMemoryAt(Address.STAT, this.ram.getMemoryAt(Address.STAT) | 0b0000_0011);
    }
    private drawRow() {
        // mode 3
        // apply scrolling here

        this.ram.setMemoryAt(Address.STAT, this.ram.getMemoryAt(Address.STAT) & 0b1111_1100);
    }
    private horizontalBlank() {
        // mode 0
        const STAT = this.ram.getMemoryAt(Address.STAT);
        if ((STAT & 0b0000_1000) == 0b0000_1000) {
            this.ram.setMemoryAt(Address.IF, this.ram.getIF() | 0b0000_0010);
        }
        this.ram.setMemoryAt(Address.STAT, this.ram.getMemoryAt(Address.STAT) | 0b0000_0010);
    }

    private vBlank() {
        // mode 1
        const STAT = this.ram.getMemoryAt(Address.STAT);
        if ((STAT & 0b0001_0000) == 0b0001_0000) {
            this.ram.setMemoryAt(Address.IF, this.ram.getIF() | 0b0000_0001);
        }
        this.ram.setMemoryAt(Address.STAT, this.ram.getMemoryAt(Address.STAT) | 0b0000_0010);
    }

    step(tCycle: number) {
        const PPU_MODE = this.ram.getMemoryAt(Address.STAT) & 0b0000_0011;
        this.dot += tCycle;
        switch (PPU_MODE) {
            case 0:
                if (this.dot < 204) return;
                this.horizontalBlank();
                this.dot -= 204;
                break;
            case 1:
                if (this.dot < 456) return;
                this.vBlank();
                this.dot -= 456;
                break;
            case 2:
                if (this.dot < 80) return;
                this.oamScan();
                this.dot -= 80;
                break;
            case 3:
                if (this.dot < 172) return;
                this.drawRow();
                this.dot -= 172;
                break;
            default:
                throw new Error('This should not happen');
        }
        this.flagCheck();
    }
}

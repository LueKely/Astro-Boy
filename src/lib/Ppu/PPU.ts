import type { Ram } from '../Ram/Ram';
import { Address } from '../utils/Address_Pointers';
import type { TOam } from './types/OAM';
import type { ICoordinates } from './types/Tile_Types';

//TODO:
// during MODE 2 and 3 it says that Figure this shit out:
// "While the PPU is accessing some video-related memory, that
// memory is inaccessible to the CPU (writes are ignored, and reads
//  return garbage values, usually $FF)."

export class PPU {
    tileCoordinates: ICoordinates[] = [];
    tileDataCache: number[][][] = [];
    tileMapIndices1: Uint8Array = new Uint8Array();
    tileMapIndices2: Uint8Array = new Uint8Array();

    private oamCache: TOam[] = [];
    private dot = 0;
    private ram: Ram;

    constructor(ram: Ram) {
        this.ram = ram;
        this.ram.write(Address.STAT, Address.STAT | 0b0000_0010);
    }

    private flagCheck() {
        // check for STAT
        const LYC = this.ram.memory[Address.LYC];
        const LY = this.ram.memory[Address.LY];
        const LCDC = this.ram.memory[Address.LCDC];
        const STAT = this.ram.memory[Address.STAT];
        // init STAT INT
        if (LY == LYC) {
            this.ram.write(Address.LCDC, LCDC | 0b0000_0010);
        }

        // init vblank interrupt INT
        if (LY == 144) {
            const IF = this.ram.read(Address.IF) | 0b0000_0001;
            this.ram.write(Address.IF, IF);
        }
    }

    private oamScan() {
        //  mode 2
        const LCDC = this.ram.read(Address.LCDC);
        const STAT = this.ram.read(Address.STAT);
        const LY = this.ram.memory[Address.LY];

        const interruptFlag = (STAT & 0b0010_0000) == 0b0010_0000;
        const isOn = LCDC >>> 7;
        const isAllowed = (LCDC & 0b0000_0010) == 0b0000_00010;
        const spriteHeight = LCDC & 0b0000_0100 ? 16 : 8;

        if (interruptFlag) {
            this.ram.write(Address.IF, this.ram.getIF() | 0b0000_0010);
        }

        // check on this is cycles are consumed during this time
        if (!isOn || !isAllowed) {
            return;
        }

        for (let i = 0; i < 40; i++) {
            const oamAddress = Address.oamStart + i * 4;
            const sprite = this.ram.memory[oamAddress] - 16;
            const topSprite = LY >= sprite;
            const bottomSprite  = LY < sprite + spriteHeight;

            if (topSprite && bottomSprite) {
                const object: TOam = {
                    yPos: this.ram.memory[Address.oamStart + i],
                    xPos: this.ram.memory[Address.oamStart + i + 1],
                    tileIndex: this.ram.memory[Address.oamStart + i + 2],
                    attributes: this.ram.memory[Address.oamStart + i + 3],
                };
                this.oamCache.push(object);
                if (this.oamCache.length == 10) break;
            }
        }
        // change to mode 3
        this.ram.write(Address.STAT, this.ram.read(Address.STAT) | 0b0000_0011);
    }

    private drawRow() {
        // mode 3
        this.ram.write(Address.STAT, this.ram.read(Address.STAT) & 0b1111_1100);
    }

    private horizontalBlank() {
        // mode 0
        const STAT = this.ram.read(Address.STAT);
        if ((STAT & 0b0000_1000) == 0b0000_1000) {
            this.ram.write(Address.IF, this.ram.getIF() | 0b0000_0010);
        }
        this.ram.write(Address.STAT, this.ram.read(Address.STAT) | 0b0000_0010);
    }

    private vBlank() {
        // mode 1
        const STAT = this.ram.read(Address.STAT);
        if ((STAT & 0b0001_0000) == 0b0001_0000) {
            this.ram.write(Address.IF, this.ram.getIF() | 0b0000_0001);
        }
        this.ram.write(Address.STAT, this.ram.read(Address.STAT) | 0b0000_0010);
    }

    step(tCycle: number) {
        const PPU_MODE = this.ram.read(Address.STAT) & 0b0000_0011;
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

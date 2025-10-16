import type { Ram } from '../Ram/Ram';
import { Address } from '../utils/Address_Pointers';
import { Tile_Decoder_Utils } from './Tile_Decoder_Utils';
import type { TOam } from './types/OAM';
import type { ICoordinates } from './types/Tile_Types';

//TODO:
// during MODE 2 and 3 it says that Figure this shit out:
// "While the PPU is accessing some video-related memory, that
// memory is inaccessible to the CPU (writes are ignored, and reads
//  return garbage values, usually $FF)."
// testing the thing

export class PPU {
    // hmm i don't actually need this other than for shit posting reasons
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

    private inferLCDC() {
        const LCDC = this.ram.read(Address.LCDC);
        return {
            isEnabled: LCDC >>> 7,
            windowTileMap:
                (LCDC & 0b0100_0000) == 0b0100_0000 ? [0x9c00, 0x9fff] : [0x9800, 0x9bff],
            isWindowEnabled: (LCDC & 0b0010_0000) == 0b0010_0000,
            bgAndWindowTilesData:
                (LCDC & 0b0001_0000) == 0b0001_0000 ? [0x8000, 0x8fff] : [0x9000, 0x97ff],
            bgTileMapArea:
                (LCDC & 0b0000_1000) == 0b0000_1000 ? [0x9c00, 0x9fff] : [0x9800, 0x9bff],
            objSize: (LCDC & 0b0000_0100) == 0b0000_0100 ? 16 : 8,
            isObjAllowed: (LCDC & 0b0000_0010) == 0b0000_0010,
            isBgAndWindowEnabled: (LCDC & 0b1) == 0b1,
        };
    }

    private flagCheck() {
        // check for STAT
        const LYC = this.ram.memory[Address.LYC];
        const LY = this.ram.memory[Address.LY];
        // init STAT INT
        if (LY == LYC) {
            this.ram.write(Address.STAT, this.ram.memory[Address.STAT] | 0b0000_0010);
        }

        // init vblank interrupt INT
        if (LY == 144) {
            const IF = this.ram.read(Address.IF) | 0b0000_0001;
            this.ram.write(Address.IF, IF);
        }
    }

    private oamScan() {
        //  mode 2
        const { isEnabled, isObjAllowed, objSize } = this.inferLCDC();
        const STAT = this.ram.read(Address.STAT);
        const LY = this.ram.memory[Address.LY];

        const interruptFlag = (STAT & 0b0010_0000) == 0b0010_0000;

        if (interruptFlag) {
            this.ram.write(Address.IF, this.ram.getIF() | 0b0000_0010);
        }

        // check on this is cycles are consumed during this time
        if (!isEnabled || !isObjAllowed) {
            return;
        }

        for (let i = 0; i < 40; i++) {
            const oamAddress = Address.oamStart + i * 4;
            const sprite = this.ram.memory[oamAddress] - 16;
            const topSprite = LY >= sprite;
            const bottomSprite = LY < sprite + objSize;

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
        // check for LCDC
        // check for traversal mode

        const LCDC = this.inferLCDC();
        const LY = this.ram.memory[Address.LY];
        const SCY = this.ram.memory[Address.SCY];
        const SCX = this.ram.memory[Address.SCX];

        const tileMapAddressingMode = (this.ram.memory[Address.LCDC] & 0b0001_0000) == 0b0001_0000;
        const scanLineRow = (SCY + LY) % 256;
        const tileMapRow = Math.floor(scanLineRow / 8);
        const pixelScanLineRow = [];

        // get pixel on each tile i guess
        for (let x = 0; x < 160; x += 8) {
            const tileMapCol = Math.floor(((SCX + x) % 256) / 8);
            const currentTileIndex =
                this.ram.memory[tileMapRow * 32 + tileMapCol + LCDC.bgTileMapArea[0]];
            const flattenedTileIndex = this.transformToUnsigned(
                currentTileIndex,
                tileMapAddressingMode
            );
            const pixelTileRowOffest = (scanLineRow % 8) * 2;
            const pixelIndex = flattenedTileIndex * 16 + pixelTileRowOffest;
            const pixelTileRowData = [
                this.ram.memory[pixelIndex + LCDC.bgAndWindowTilesData[0]],
                this.ram.memory[pixelIndex + 1 + LCDC.bgAndWindowTilesData[0]],
            ];
            // 2bit pixels here
            const flattendPixelRow = Tile_Decoder_Utils.decodeTo2bpp(
                pixelTileRowData[0],
                pixelTileRowData[1]
            );
            pixelScanLineRow.push(flattendPixelRow);
        }
        // mode 3
        this.ram.write(Address.STAT, this.ram.memory[Address.STAT] & 0b1111_1100);
    }

    private transformToUnsigned(tileIndex: number, mode: boolean) {
        if (!mode) {
            if (tileIndex & 0x80) {
                return tileIndex - 256; // Convert to negative
            }
            return tileIndex;
        } else return tileIndex;
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

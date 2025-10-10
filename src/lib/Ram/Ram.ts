// features to do
// logging feature
// making some addresses readonly prolly make this some sort of hook

import { Address } from '../utils/Address_Pointers';

export class Ram {
    memory: Uint8Array;
    TRANSFER = false;
    constructor() {
        this.memory = new Uint8Array(0x10000);
        // this ain't accurate chief
        // this.memory.fill(0);
    }

    getIE() {
        return this.memory[0xffff];
    }
    getIF() {
        return this.memory[0xff0f];
    }

    isAllowedToInterrupt() {
        return (this.getIE() & this.getIF()) != 0;
    }

    stopValidation() {
        return ((this.getIE() && 0b1_0000) & (this.getIF() && 0b1_0000)) != 0;
    }

    getMemory() {
        return this.memory;
    }

    getMemoryAt(index: number) {
        const ppuMode = this.memory[Address.STAT] & 0b0000_0011;
        const mode2 = ppuMode == 2;
        const mode3 = ppuMode == 3;
        const vramPointer = index >= Address.vramStart && index <= Address.vramEnd;
        const oamPointer = index >= Address.oamStart && index <= Address.oamEnd;

        if (this.memory[index] == undefined) throw new Error('INVALID VALUE');

        if (vramPointer && mode3) {
            return 0xff;
        }
        if (oamPointer && (mode2 || mode3)) {
            return 0xff;
        }
        return this.memory[index];
    }

    setMemoryAt(pointer: number, value: number) {
        const ppuMode = this.memory[Address.STAT] & 0b0000_0011;
        const mode2 = ppuMode == 2;
        const mode3 = ppuMode == 3;
        const vramPointer = pointer >= Address.vramStart && pointer <= Address.vramEnd;
        const oamPointer = pointer >= Address.oamStart && pointer <= Address.oamEnd;
        if (pointer == 0xff46) {
            this.TRANSFER = true;
        }

        if (vramPointer && mode3) {
            return;
        }
        if (oamPointer && (mode2 || mode3)) {
            return;
        }
        this.memory[pointer] = value & 0xff;
    }

    copyROM(raw: Uint8Array) {
        raw.forEach((value, index) => {
            this.setMemoryAt(index, value);
        });
    }
}

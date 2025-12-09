// features to do
// logging feature
// making some addresses readonly prolly make this some sort of hook

import type { IOpcodeSearch } from '../../components/composables/selectSearch';
import type { TFormKey } from '../../store/formDataStore';
import { Address } from '../utils/Address_Pointers';

export class Ram {
    memory: Uint8Array;
    TRANSFER = false;
    constructor(register?: Record<TFormKey, string>) {
        this.memory = new Uint8Array(0x10000);
        if (!register) return;

        // check first if prefix

        const poop: IOpcodeSearch = JSON.parse(register.opcodeName);
        if (poop.isPrefix) {
            this.memory[parseInt(register.pc, 16)] = 0xcb;
            this.memory[parseInt(register.pc, 16) + 1] = poop.value;
            this.memory[parseInt(register.pc, 16) + 2] = parseInt(register.ub, 16);
            this.memory[parseInt(register.pc, 16) + 3] = parseInt(register.lb, 16);
        } else {
            this.memory[parseInt(register.pc, 16)] = poop.value;
            this.memory[parseInt(register.pc, 16) + 1] = parseInt(register.ub, 16);
            this.memory[parseInt(register.pc, 16) + 2] = parseInt(register.lb, 16);
        }
        this.memory[parseInt(register.addressPointer, 16)] = parseInt(register.addressValue, 16);

        // this ain't accurate chief
        // this.memory.fill(0);
    }

    getIE() {
        return this.memory[Address.IE];
    }
    getIF() {
        return this.memory[Address.IF];
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

    read(index: number) {
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

    write(pointer: number, value: number) {
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
            this.write(index, value);
        });
    }
}

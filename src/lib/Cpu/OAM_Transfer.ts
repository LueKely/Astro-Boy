import type { Gameboy } from '../Gameboy';
import type { IOpCodeEntry } from './types/OpcodeTypes';

export function oamTransfer(): IOpCodeEntry {
    return {
        name: 'OAM Transfer',
        cycles: 160,
        length: 1,
        execute: (dmg: Gameboy) => {
            for (let index = 0; index < 160; index++) {
                const element = dmg.ram.getMemoryAt(index);
                dmg.ram.setMemoryAt(0xfe00 + index, element);
            }
        },
    };
}

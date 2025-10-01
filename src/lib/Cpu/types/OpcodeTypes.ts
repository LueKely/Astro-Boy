import type { Gameboy } from '../../Gameboy';

export interface IOpCodeEntry {
    name: string;
    cycles: number;
    length: number;
    execute: (dmg: Gameboy) => void;
}

// Pre-conditions (must all be true):
// Find highest priority interrupt
// CPU executes interrupt service routine (5 M-cycles total):
// Routine is ba  sed on the prioritized opcode to be cleared

// todo handle timer inside gb
import type { Gameboy } from '../Gameboy';
import type { IOpCodeEntry } from './types/OpcodeTypes';

export class Interrupt_Handler {
    dmg: Gameboy;
    priorityBit: number = 0;

    private static LookUpTable: Record<number, number> = {
        // vblank interrupt
        0: 0x40,
        // stat interrupt
        1: 0x48,
        // timer Interrupt
        2: 0x50,
        // Serial Interrupt
        3: 0x58,
        // joypad Interrupt
        4: 0x60,
    };

    constructor(dmg: Gameboy) {
        this.dmg = dmg;
    }

    private prioritize() {
        const IF = this.dmg.ram.getIF();

        if (IF & 0b00001) return 0; // VBlank
        if (IF & 0b00010) return 1; // LCD
        if (IF & 0b00100) return 2; // Timer
        if (IF & 0b01000) return 3; // Serial
        if (IF & 0b10000) return 4; // Joypad

        return 0;
    }

    createCycles(): IOpCodeEntry {
        this.priorityBit = this.prioritize();
        return {
            length: 1,
            name: 'Interrupt',
            cycles: 5,
            execute: (dmg: Gameboy) => {
                dmg.registerFile.pointers.SP.decrement();
                dmg.ram.setMemoryAt(
                    dmg.registerFile.pointers.SP.getRegister(),
                    dmg.registerFile.pointers.PC.getRegister() >>> 8
                );
                dmg.registerFile.pointers.SP.decrement();
                dmg.ram.setMemoryAt(
                    dmg.registerFile.pointers.SP.getRegister(),
                    dmg.registerFile.pointers.PC.getRegister() & 0xff
                );
                //  Clear interrupt flag
                dmg.ram.setMemoryAt(0xff0f, dmg.ram.getIF() & ~(0b0_0001 << this.priorityBit));

                dmg.registerFile.IME = false;

                //  Jump to 0x40, 0x48, 0x50, 0x58, or 0x60
                dmg.registerFile.pointers.PC.setRegister(
                    Interrupt_Handler.LookUpTable[this.priorityBit]
                );
            },
        };
    }
}

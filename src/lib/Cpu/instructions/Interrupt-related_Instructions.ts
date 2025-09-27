import type { Gameboy } from '../../Gameboy';
// TODO: TEST ALL

function EI() {
    return (dmg: Gameboy) => {
        dmg.registerFile.IME = true;
        dmg.registerFile.pointers.PC.increment();
    };
}

function DI() {
    return (dmg: Gameboy) => {
        dmg.registerFile.IME = false;
        dmg.registerFile.pointers.PC.increment();
    };
}

function HALT() {
    return (dmg: Gameboy) => {
        dmg.registerFile.HALT = true;
    };
}

function STOP() {
    return (dmg: Gameboy) => {
        dmg.registerFile.STOP = true;
        dmg.registerFile.pointers.PC.increment();
    };
}

// insert halt here
export { EI, DI, HALT, STOP };

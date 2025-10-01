import type { Gameboy } from '../../Gameboy';
import type { Ram } from '../../Ram/Ram';
import type { Program_Counter_Register } from '../CPU_Pointer_Register';
import type { Cpu_Register_16Bit } from '../CPU_Register';
// TODO :TEST ALL

// THIS IS FINE
function CALLN16() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();

        const lowerByte = dmg.ram.getMemoryAt(dmg.registerFile.pointers.PC.getRegister());

        dmg.registerFile.pointers.PC.increment();

        const upperByte = dmg.ram.getMemoryAt(dmg.registerFile.pointers.PC.getRegister());

        dmg.registerFile.pointers.SP.decrement();
        dmg.registerFile.pointers.PC.increment();
        dmg.ram.setMemoryAt(
            dmg.registerFile.pointers.SP.getRegister(),
            (dmg.registerFile.pointers.PC.getRegister() >> 8) & 0xff
        );
        dmg.registerFile.pointers.SP.decrement();

        dmg.ram.setMemoryAt(
            dmg.registerFile.pointers.SP.getRegister(),
            dmg.registerFile.pointers.PC.getRegister() & 0xff
        );
        dmg.registerFile.pointers.PC.setRegister((upperByte << 8) | (lowerByte & 0xff));
    };
}
// TESTED
function CALLCCN16() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        dmg.registerFile.pointers.PC.increment();
        dmg.registerFile.pointers.PC.increment();
    };
}

//TESTED
function JPN16() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        const lowerByte = dmg.ram.getMemoryAt(dmg.registerFile.pointers.PC.getRegister());
        dmg.registerFile.pointers.PC.increment();
        const upperByte = dmg.ram.getMemoryAt(dmg.registerFile.pointers.PC.getRegister());
        const nn = (upperByte << 8) | lowerByte;
        dmg.registerFile.pointers.PC.setRegister(nn);
    };
}
// TESTED
function JPCCN16() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        dmg.registerFile.pointers.PC.increment();
        dmg.registerFile.pointers.PC.increment();
    };
}

// TESTED
function JPHL(HL: Cpu_Register_16Bit<'HL'>, PC: Program_Counter_Register) {
    PC.setRegister(HL.getRegister());
}
// TESTED
function RET() {
    return (dmg: Gameboy) => {
        const n = dmg.ram.getMemoryAt(dmg.registerFile.pointers.SP.getRegister());
        dmg.registerFile.pointers.SP.increment();
        const n2 = dmg.ram.getMemoryAt(dmg.registerFile.pointers.SP.getRegister());
        dmg.registerFile.pointers.SP.increment();
        const nn = n | (n2 << 8);
        dmg.registerFile.pointers.PC.setRegister(nn);
    };
}

// TESTED
function RETI() {
    return (dmg: Gameboy) => {
        const n = dmg.ram.getMemoryAt(dmg.registerFile.pointers.SP.getRegister());
        dmg.registerFile.pointers.SP.increment();
        const n2 = dmg.ram.getMemoryAt(dmg.registerFile.pointers.SP.getRegister());
        dmg.registerFile.pointers.SP.increment();

        const nn = n | (n2 << 8);
        dmg.registerFile.pointers.PC.setRegister(nn);
        dmg.registerFile.IME = true;
    };
}

// TESTED
function RETCC() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
    };
}
//TESTED - questionable - okay lang pala
function RSTN(n: number) {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.SP.decrement();
        dmg.registerFile.pointers.PC.increment();
        const msb = dmg.registerFile.pointers.PC.getRegister() >>> 8;
        dmg.ram.setMemoryAt(dmg.registerFile.pointers.SP.getRegister(), msb);
        dmg.registerFile.pointers.SP.decrement();
        const lsb = dmg.registerFile.pointers.PC.getRegister() & 0xff;
        dmg.ram.setMemoryAt(dmg.registerFile.pointers.SP.getRegister(), lsb);
        dmg.registerFile.pointers.PC.setRegister(n);
    };
}
// TESTED
function JRE() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        // Get current PC and increment to operand
        let e = dmg.ram.getMemoryAt(dmg.registerFile.pointers.PC.getRegister());

        // Convert to signed 8-bit and add to PC+1
        if (e > 127) e -= 256;
        const newPC = (dmg.registerFile.pointers.PC.getRegister() + e) & 0xffff;
        dmg.registerFile.pointers.PC.increment();

        dmg.registerFile.pointers.PC.setRegister(newPC + 1);
    };
}

// TESTED
function JREFALSE() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        dmg.registerFile.pointers.PC.increment();
    };
}

export { CALLN16, CALLCCN16, JPN16, JPCCN16, RET, JPHL, RETCC, RSTN, RETI, JREFALSE, JRE };

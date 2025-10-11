//  ADD HL, SP - untested

import type { Gameboy } from '../../Gameboy';
import { validateADDSPe } from '../../utils/instructions/instruction_utils';
// TODO - TEST ALL
// DONE WITH INC SP And DEC SP
// DONE LD SP NN (LD r16 nn)

// Tested
function ADDSPe() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        const e = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());
        // settig up e
        const eSigned = e > 127 ? e - 256 : e;
        const SP = dmg.registerFile.pointers.SP.getRegister();
        validateADDSPe(SP, eSigned, dmg.registerFile.F);
        const result = SP + eSigned;
        dmg.registerFile.pointers.SP.setRegister(result);
        dmg.registerFile.pointers.PC.increment();
    };
}
// TESTED
function LDNNSP() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        const lsb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());
        dmg.registerFile.pointers.PC.increment();
        const msb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());
        dmg.ram.write(lsb | (msb << 8), dmg.registerFile.pointers.SP.getRegister() & 0xff);

        dmg.ram.write(
            lsb | ((msb << 8) + 1),

            dmg.registerFile.pointers.SP.getRegister() >> 8
        );
        dmg.registerFile.pointers.PC.increment();
    };
}
// TESTED
function LDHLSPe() {
    return (dmg: Gameboy) => {
        dmg.registerFile.pointers.PC.increment();
        const pc = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());

        const SP = dmg.registerFile.pointers.SP.getRegister();

        // this is the e

        const eSigned = pc > 127 ? pc - 256 : pc;
        const result = eSigned + SP;

        validateADDSPe(SP, eSigned, dmg.registerFile.F);
        dmg.registerFile.register16Bit.HL.setRegister(result);
        dmg.registerFile.pointers.PC.increment();
    };
}

export { LDNNSP, ADDSPe, LDHLSPe };

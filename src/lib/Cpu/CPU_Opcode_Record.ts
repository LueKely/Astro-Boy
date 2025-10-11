import type { Gameboy } from '../Gameboy';
import type { Cpu_Flag_Register } from './CPU_Flag_Register';
import { ADDHLR16, DECR16, INCR16 } from './instructions/16bit_Arithmetic_Instructions';
import {
    ADCAHL,
    ADCAN8,
    ADCAR8,
    ADDAHL,
    ADDAN8,
    ADDAR8,
    CPAHL,
    CPAN8,
    CPAR8,
    DECHL,
    DECR8,
    INCHL,
    INCR8,
    SBCAHL,
    SBCAN8,
    SBCAR8,
    SUBAHL,
    SUBAN8,
    SUBAR8,
} from './instructions/8bit_Arithmetic_Instructions';
import { RLA, RLCA, RRA, RRCA } from './instructions/Bit_Shift_Logic_Instructions';
import {
    ANDAHL,
    ANDAN8,
    ANDAR8,
    CPL,
    ORAHL,
    ORAN8,
    ORAR8,
    XORAHL,
    XORAN8,
    XORAR8,
} from './instructions/Bitwise_Logic_Instructions';
import { CCF, SCF } from './instructions/Carry_Flag_Instructions';
import { DI, EI, HALT, STOP } from './instructions/Interrupt-related_Instructions';
import {
    CALLCCN16,
    CALLN16,
    JPCCN16,
    JPHL,
    JPN16,
    JRE,
    JREFALSE,
    RET,
    RETCC,
    RETI,
    RSTN,
} from './instructions/Jumps_And _Subroutine_Instructions';
import {
    LDAHLD,
    LDAHLI,
    LDAN16,
    LDAR16,
    LDHAC,
    LDHAN8,
    LDHCA,
    LDHLDA,
    LDHLIA,
    LDHLN8,
    LDHLR8,
    LDHN16A,
    LDN16A,
    LDR16A,
    LDR16N16,
    LDR8HL,
    LDR8N8,
    LDR8R8,
} from './instructions/LD_Instructions';
import { DAA } from './instructions/Miscellaneous_Instructions';
import { ADDSPe, LDHLSPe, LDNNSP } from './instructions/Stack_Manipulation_Instructions';
import type { IOpCodeEntry } from './types/OpcodeTypes';

// AUTHOR'S NOTE:
//  BEHOLD!!!!!!!!!!!

// i havent implemented
//  DAA
// TODO MAKE THIS INTO A CLASS
export class CpuOpcodeRecord {
    private f: Cpu_Flag_Register;
    constructor(f: Cpu_Flag_Register) {
        this.f = f;
    }

    get(index: number): IOpCodeEntry {
        switch (index) {
            case 0x20:
                if (this.f.getZFlag() ^ 1) {
                    return {
                        name: 'JR NZ, e',
                        length: 2,
                        cycles: 3,
                        execute: JRE(),
                    };
                } else {
                    return {
                        name: 'JR NZ, e',
                        length: 2,
                        cycles: 2,
                        execute: JREFALSE(),
                    };
                }
            case 0x30:
                if (this.f.getCYFlag() ^ 1) {
                    return {
                        name: 'JR NC, e',
                        length: 2,
                        cycles: 3,
                        execute: JRE(),
                    };
                } else {
                    return {
                        name: 'JR NC, e',
                        length: 2,
                        cycles: 3,
                        execute: JREFALSE(),
                    };
                }
            case 0x28:
                if (this.f.getZFlag()) {
                    return {
                        name: 'JR Z, e',
                        length: 2,
                        cycles: 3,
                        execute: JRE(),
                    };
                } else {
                    return {
                        name: 'JR Z, e',
                        length: 2,
                        cycles: 3,
                        execute: JREFALSE(),
                    };
                }
            case 0x38:
                if (this.f.getCYFlag()) {
                    return {
                        name: 'JR C, e',
                        length: 2,
                        cycles: 3,
                        execute: JRE(),
                    };
                } else {
                    return {
                        name: 'JR C, e',
                        length: 2,
                        cycles: 3,
                        execute: JREFALSE(),
                    };
                }

            case 0xc0:
                if (this.f.getZFlag() ^ 1) {
                    return {
                        name: 'RET NZ',
                        cycles: 4,
                        length: 1,
                        execute: RET(),
                    };
                }
                return {
                    name: 'RET NZ',
                    cycles: 2,
                    length: 1,
                    execute: RETCC(),
                };

            case 0xd0:
                if (this.f.getCYFlag() ^ 1) {
                    return {
                        name: 'RET NC',
                        cycles: 4,
                        length: 1,
                        execute: RET(),
                    };
                }
                return {
                    name: 'RET NC',
                    cycles: 2,
                    length: 1,
                    execute: RETCC(),
                };
            case 0xc8:
                if (this.f.getZFlag()) {
                    return {
                        name: 'RET Z',
                        cycles: 4,
                        length: 1,
                        execute: RET(),
                    };
                }
                return {
                    name: 'RET Z',
                    cycles: 2,
                    length: 1,
                    execute: RETCC(),
                };
            case 0xd8:
                if (this.f.getCYFlag()) {
                    return {
                        name: 'RET C',
                        cycles: 4,
                        length: 1,
                        execute: RET(),
                    };
                }
                return {
                    name: 'RET C',
                    cycles: 2,
                    length: 1,
                    execute: RETCC(),
                };

            case 0xc2:
                if ((this.f.getZFlag() ^ 1) != 0) {
                    return {
                        name: 'JP NZ, nn',
                        cycles: 4,
                        length: 3,
                        execute: JPN16(),
                    };
                } else {
                    return {
                        name: 'JP NZ, nn',
                        cycles: 3,
                        length: 3,
                        execute: JPCCN16(),
                    };
                }
            case 0xd2:
                if ((this.f.getCYFlag() ^ 1) != 0) {
                    return {
                        name: 'JP NC, nn',
                        cycles: 4,
                        length: 3,
                        execute: JPN16(),
                    };
                } else {
                    return {
                        name: 'JP NC, nn',
                        cycles: 3,
                        length: 3,
                        execute: JPCCN16(),
                    };
                }
            case 0xca:
                if (this.f.getZFlag() != 0) {
                    return {
                        name: 'JP Z, nn',
                        cycles: 4,
                        length: 3,
                        execute: JPN16(),
                    };
                } else {
                    return {
                        name: 'JP Z, nn',
                        cycles: 3,
                        length: 3,
                        execute: JPCCN16(),
                    };
                }
            case 0xda:
                if (this.f.getCYFlag() != 0) {
                    return {
                        name: 'JP CY, nn',
                        cycles: 4,
                        length: 3,
                        execute: JPN16(),
                    };
                } else {
                    return {
                        name: 'JP CY, nn',
                        cycles: 3,
                        length: 3,
                        execute: JPCCN16(),
                    };
                }
            case 0xc4:
                if ((this.f.getZFlag() ^ 1) != 0) {
                    return {
                        name: 'Call NZ, nn',
                        cycles: 4,
                        length: 3,
                        execute: CALLN16(),
                    };
                } else {
                    return {
                        name: 'Call NZ, nn',
                        cycles: 4,
                        length: 3,
                        execute: CALLCCN16(),
                    };
                }
            case 0xd4:
                if ((this.f.getCYFlag() ^ 1) != 0) {
                    return {
                        name: 'Call NC, nn',
                        cycles: 4,
                        length: 3,
                        execute: CALLN16(),
                    };
                } else {
                    return {
                        name: 'Call NC, nn',
                        cycles: 6,
                        length: 3,
                        execute: CALLCCN16(),
                    };
                }
            case 0xcc:
                if (this.f.getZFlag() != 0) {
                    return {
                        name: 'Call Z, nn',
                        cycles: 3,
                        length: 3,
                        execute: CALLN16(),
                    };
                } else {
                    return {
                        name: 'Call Z, nn',
                        cycles: 6,
                        length: 3,
                        execute: CALLCCN16(),
                    };
                }
            case 0xdc:
                if (this.f.getCYFlag() != 0) {
                    return {
                        name: 'Call C, nn',
                        cycles: 6,
                        length: 3,
                        execute: CALLN16(),
                    };
                } else {
                    return {
                        name: 'Call C, nn',
                        cycles: 3,
                        length: 3,
                        execute: CALLCCN16(),
                    };
                }
            default:
                return this.record()[index];
        }
    }

    private record(): Record<number, IOpCodeEntry> {
        return {
            // ALU STUFF
            0x0: {
                name: 'NOP',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x4: {
                name: 'INC B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR8(dmg.registerFile.B, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x5: {
                name: 'DEC B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR8(dmg.registerFile.B, dmg.registerFile.F);

                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x14: {
                name: 'INC D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR8(dmg.registerFile.D, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x15: {
                name: 'DEC D',
                cycles: 1,
                length: 1,

                execute: (dmg: Gameboy) => {
                    DECR8(dmg.registerFile.D, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x0c: {
                name: 'INC C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR8(dmg.registerFile.C, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x0d: {
                name: 'DEC C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR8(dmg.registerFile.C, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x1c: {
                name: 'INC E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR8(dmg.registerFile.E, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x1d: {
                name: 'DEC E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR8(dmg.registerFile.E, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x24: {
                name: 'INC H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR8(dmg.registerFile.H, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x25: {
                name: 'DEC H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR8(dmg.registerFile.H, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x2c: {
                name: 'INC L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR8(dmg.registerFile.L, dmg.registerFile.F);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x2d: {
                name: 'DEC L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR8(dmg.registerFile.L, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x34: {
                name: 'INC [HL]',
                cycles: 3,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCHL(dmg.registerFile.register16Bit.HL, dmg.ram, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x35: {
                name: 'DEC [HL]',
                cycles: 3,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECHL(dmg.registerFile.register16Bit.HL, dmg.ram, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x3c: {
                name: 'INC A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR8(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x3d: {
                name: 'DEC A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR8(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x2f: {
                name: 'CPL',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPL(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x80: {
                name: 'ADD B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAR8(dmg.registerFile.B, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x81: {
                name: 'ADD C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAR8(dmg.registerFile.C, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x82: {
                name: 'ADD D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAR8(dmg.registerFile.D, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x83: {
                name: 'ADD E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAR8(dmg.registerFile.E, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x84: {
                name: 'ADD H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAR8(dmg.registerFile.H, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x85: {
                name: 'ADD L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAR8(dmg.registerFile.L, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x86: {
                name: 'ADD [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAHL(
                        dmg.registerFile.register16Bit.HL,
                        dmg.ram,
                        dmg.registerFile.F,
                        dmg.registerFile.A
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x87: {
                name: 'ADD A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDAR8(dmg.registerFile.A, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x88: {
                name: 'ADC B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAR8(dmg.registerFile.B, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x89: {
                name: 'ADC C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAR8(dmg.registerFile.C, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x8a: {
                name: 'ADC D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAR8(dmg.registerFile.D, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x8b: {
                name: 'ADC E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAR8(dmg.registerFile.E, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x8c: {
                name: 'ADC H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAR8(dmg.registerFile.H, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x8d: {
                name: 'ADC L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAR8(dmg.registerFile.L, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x8e: {
                name: 'ADC [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAHL(
                        dmg.registerFile.register16Bit.HL,
                        dmg.ram,
                        dmg.registerFile.F,
                        dmg.registerFile.A
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x8f: {
                name: 'ADC A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADCAR8(dmg.registerFile.A, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            // SUB

            0x90: {
                name: 'SUB B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAR8(dmg.registerFile.B, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x91: {
                name: 'SUB C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAR8(dmg.registerFile.C, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x92: {
                name: 'SUB D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAR8(dmg.registerFile.D, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x93: {
                name: 'SUB E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAR8(dmg.registerFile.E, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x94: {
                name: 'SUB H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAR8(dmg.registerFile.H, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x95: {
                name: 'SUB L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAR8(dmg.registerFile.L, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x96: {
                name: 'SUB [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAHL(
                        dmg.registerFile.register16Bit.HL,
                        dmg.ram,
                        dmg.registerFile.F,
                        dmg.registerFile.A
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x97: {
                name: 'SUB A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SUBAR8(dmg.registerFile.A, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x98: {
                name: 'SUBC B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAR8(dmg.registerFile.B, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x99: {
                name: 'SUBC C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAR8(dmg.registerFile.C, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x9a: {
                name: 'SUBC D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAR8(dmg.registerFile.D, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x9b: {
                name: 'SUBC E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAR8(dmg.registerFile.E, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x9c: {
                name: 'SUBC H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAR8(dmg.registerFile.H, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x9d: {
                name: 'SUBC D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAR8(dmg.registerFile.L, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x9e: {
                name: 'SUBC [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAHL(
                        dmg.registerFile.register16Bit.HL,
                        dmg.ram,
                        dmg.registerFile.F,
                        dmg.registerFile.A
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x9f: {
                name: 'SUBC A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SBCAR8(dmg.registerFile.A, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa0: {
                name: 'AND B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAR8(dmg.registerFile.A, dmg.registerFile.B, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa1: {
                name: 'AND C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAR8(dmg.registerFile.A, dmg.registerFile.C, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa2: {
                name: 'AND D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAR8(dmg.registerFile.A, dmg.registerFile.D, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa3: {
                name: 'AND E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAR8(dmg.registerFile.A, dmg.registerFile.E, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa4: {
                name: 'AND H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAR8(dmg.registerFile.A, dmg.registerFile.H, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa5: {
                name: 'AND L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAR8(dmg.registerFile.A, dmg.registerFile.L, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa6: {
                name: 'AND [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAHL(
                        dmg.registerFile.A,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F,
                        dmg.ram
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa7: {
                name: 'AND A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ANDAR8(dmg.registerFile.A, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa8: {
                name: 'XOR B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAR8(dmg.registerFile.A, dmg.registerFile.B, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xa9: {
                name: 'XOR C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAR8(dmg.registerFile.A, dmg.registerFile.C, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xaa: {
                name: 'XOR D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAR8(dmg.registerFile.A, dmg.registerFile.D, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xab: {
                name: 'XOR E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAR8(dmg.registerFile.A, dmg.registerFile.E, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xac: {
                name: 'XOR H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAR8(dmg.registerFile.A, dmg.registerFile.H, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xad: {
                name: 'XOR L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAR8(dmg.registerFile.A, dmg.registerFile.L, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xae: {
                name: 'XOR [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAHL(
                        dmg.registerFile.A,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F,
                        dmg.ram
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xaf: {
                name: 'XOR A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    XORAR8(dmg.registerFile.A, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb0: {
                name: 'OR B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAR8(dmg.registerFile.A, dmg.registerFile.B, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb1: {
                name: 'OR C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAR8(dmg.registerFile.A, dmg.registerFile.C, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb2: {
                name: 'OR D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAR8(dmg.registerFile.A, dmg.registerFile.D, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb3: {
                name: 'OR E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAR8(dmg.registerFile.A, dmg.registerFile.E, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb4: {
                name: 'OR H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAR8(dmg.registerFile.A, dmg.registerFile.H, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb5: {
                name: 'OR L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAR8(dmg.registerFile.A, dmg.registerFile.L, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb6: {
                name: 'OR [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAHL(
                        dmg.registerFile.A,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F,
                        dmg.ram
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb7: {
                name: 'OR A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ORAR8(dmg.registerFile.A, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb8: {
                name: 'CP B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAR8(dmg.registerFile.B, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xb9: {
                name: 'CP C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAR8(dmg.registerFile.C, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xba: {
                name: 'CP D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAR8(dmg.registerFile.D, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xbb: {
                name: 'CP E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAR8(dmg.registerFile.E, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0xbc: {
                name: 'CP H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAR8(dmg.registerFile.H, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xbd: {
                name: 'CP L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAR8(dmg.registerFile.L, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xbe: {
                name: 'CP [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAHL(
                        dmg.ram,
                        dmg.registerFile.A,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xbf: {
                name: 'CP A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CPAR8(dmg.registerFile.A, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xc6: {
                name: 'ADD N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    ADDAN8(n, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xd6: {
                name: 'SUB N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    SUBAN8(n, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xe6: {
                name: 'AND N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    ANDAN8(dmg.registerFile.A, n, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xf6: {
                name: 'OR N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    ORAN8(dmg.registerFile.A, n, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xce: {
                name: 'ADC N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    ADCAN8(
                        n,
                        dmg.registerFile.A,

                        dmg.registerFile.F
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xde: {
                name: 'SBC N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    SBCAN8(n, dmg.registerFile.F, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xee: {
                name: 'XOR N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    XORAN8(dmg.registerFile.A, n, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xfe: {
                name: 'CP N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);
                    dmg.registerFile.pointers.PC.increment();
                    CPAN8(n, dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            // LOAD INSTRUCTIONS 16bit
            0x01: {
                name: 'LD BC NN',
                cycles: 3,
                length: 3,
                execute: (dmg: Gameboy) => {
                    // get lower byte
                    const lb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    // get upper byte
                    const ub = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    const n = (ub << 8) | lb;
                    LDR16N16(dmg.registerFile.register16Bit.BC, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x11: {
                name: 'LD DE, NN',
                cycles: 3,
                length: 3,
                execute: (dmg: Gameboy) => {
                    // get lower byte
                    const lb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    // get upper byte
                    const ub = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    const n = (ub << 8) | lb;
                    LDR16N16(dmg.registerFile.register16Bit.DE, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x21: {
                name: 'LD HL NN',
                cycles: 3,
                length: 3,
                execute: (dmg: Gameboy) => {
                    // get lower byte
                    const lb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    // get upper byte
                    const ub = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    const n = (ub << 8) | lb;
                    LDR16N16(dmg.registerFile.register16Bit.HL, n);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x31: {
                name: 'LD SP, NN',
                cycles: 3,
                length: 3,
                execute: (dmg: Gameboy) => {
                    // get lower byte
                    const lb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    // get upper byte
                    const ub = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    const n = (ub << 8) | lb;

                    LDR16N16(dmg.registerFile.pointers.SP, n);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            // Load instruction 8bit
            0x0a: {
                name: 'LD A, (BC)',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDAR16(dmg.registerFile.A, dmg.registerFile.register16Bit.BC, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x1a: {
                name: 'LD A,(DE)',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDAR16(dmg.registerFile.A, dmg.registerFile.register16Bit.DE, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x2a: {
                name: 'LD A, (HL+)',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDAHLI(dmg.registerFile.A, dmg.registerFile.register16Bit.HL, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x3a: {
                name: 'LD  A, (HL-)',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDAHLD(dmg.registerFile.A, dmg.registerFile.register16Bit.HL, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            // IMPLEMENT ME LD [r16 A
            0x02: {
                name: 'LD (BC),A',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR16A(dmg.registerFile.register16Bit.BC, dmg.registerFile.A, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x12: {
                name: 'LD (DE),A',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR16A(dmg.registerFile.register16Bit.DE, dmg.registerFile.A, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x22: {
                name: 'LD (HL+), A',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLIA(dmg.ram, dmg.registerFile.register16Bit.HL, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x32: {
                name: 'LD (HL-), A ',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLDA(dmg.ram, dmg.registerFile.register16Bit.HL, dmg.registerFile.A);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x40: {
                name: 'LD B B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.B, dmg.registerFile.B);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x41: {
                name: 'LD B C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.B, dmg.registerFile.C);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x42: {
                name: 'LD B D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.B, dmg.registerFile.D);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x43: {
                name: 'LD B E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.B, dmg.registerFile.E);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x44: {
                name: 'LD B H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.B, dmg.registerFile.H);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x45: {
                name: 'LD B L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.B, dmg.registerFile.L);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x46: {
                name: 'LD B [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8HL(dmg.registerFile.B, dmg.registerFile.register16Bit.HL, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x47: {
                name: 'LD B A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.B, dmg.registerFile.A);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x48: {
                name: 'LD C B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.C, dmg.registerFile.B);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x49: {
                name: 'LD C C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.C, dmg.registerFile.C);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x4a: {
                name: 'LD C D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.C, dmg.registerFile.D);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x4b: {
                name: 'LD C E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.C, dmg.registerFile.E);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x4c: {
                name: 'LD C H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.C, dmg.registerFile.H);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x4d: {
                name: 'LD C L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.C, dmg.registerFile.L);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x4e: {
                name: 'LD C [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8HL(dmg.registerFile.C, dmg.registerFile.register16Bit.HL, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x4f: {
                name: 'LD C A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.C, dmg.registerFile.A);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x50: {
                name: 'LD D B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.D, dmg.registerFile.B);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x51: {
                name: 'LD D C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.D, dmg.registerFile.C);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x52: {
                name: 'LD D D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.D, dmg.registerFile.D);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x53: {
                name: 'LD D E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.D, dmg.registerFile.E);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x54: {
                name: 'LD D H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.D, dmg.registerFile.H);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x55: {
                name: 'LD D L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.D, dmg.registerFile.L);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x56: {
                name: 'LD D [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8HL(dmg.registerFile.D, dmg.registerFile.register16Bit.HL, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x57: {
                name: 'LD D A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.D, dmg.registerFile.A);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x58: {
                name: 'LD E B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.E, dmg.registerFile.B);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x59: {
                name: 'LD E C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.E, dmg.registerFile.C);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x5a: {
                name: 'LD E D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.E, dmg.registerFile.D);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x5b: {
                name: 'LD E E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.E, dmg.registerFile.E);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x5c: {
                name: 'LD E H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.E, dmg.registerFile.H);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x5d: {
                name: 'LD E L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.E, dmg.registerFile.L);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x5e: {
                name: 'LD E [HL]',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8HL(dmg.registerFile.E, dmg.registerFile.register16Bit.HL, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x5f: {
                name: 'LD E A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.E, dmg.registerFile.A);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x60: {
                name: 'LD H B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.H, dmg.registerFile.B);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x61: {
                name: 'LD H C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.H, dmg.registerFile.C);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x62: {
                name: 'LD H D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.H, dmg.registerFile.D);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x63: {
                name: 'LD H E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.H, dmg.registerFile.E);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x64: {
                name: 'LD H H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.H, dmg.registerFile.H);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x65: {
                name: 'LD H L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.H, dmg.registerFile.L);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x66: {
                name: 'LD H [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8HL(dmg.registerFile.H, dmg.registerFile.register16Bit.HL, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x67: {
                name: 'LD H A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.H, dmg.registerFile.A);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x68: {
                name: 'LD L B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.L, dmg.registerFile.B);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x69: {
                name: 'LD L C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.L, dmg.registerFile.C);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x6a: {
                name: 'LD L D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.L, dmg.registerFile.D);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x6b: {
                name: 'LD L E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.L, dmg.registerFile.E);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x6c: {
                name: 'LD L H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.L, dmg.registerFile.H);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x6d: {
                name: 'LD L L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.L, dmg.registerFile.L);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x6e: {
                name: 'LD L [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8HL(dmg.registerFile.L, dmg.registerFile.register16Bit.HL, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x6f: {
                name: 'LD L A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.L, dmg.registerFile.A);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x70: {
                name: 'LD [HL] B',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLR8(dmg.registerFile.register16Bit.HL, dmg.registerFile.B, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x71: {
                name: 'LD [HL] C',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLR8(dmg.registerFile.register16Bit.HL, dmg.registerFile.C, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x72: {
                name: 'LD [HL] D',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLR8(dmg.registerFile.register16Bit.HL, dmg.registerFile.D, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x73: {
                name: 'LD [HL] E',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLR8(dmg.registerFile.register16Bit.HL, dmg.registerFile.E, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x74: {
                name: 'LD [HL] H',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLR8(dmg.registerFile.register16Bit.HL, dmg.registerFile.H, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x75: {
                name: 'LD [HL] L',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLR8(dmg.registerFile.register16Bit.HL, dmg.registerFile.L, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x77: {
                name: 'LD [HL] A',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHLR8(dmg.registerFile.register16Bit.HL, dmg.registerFile.A, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x78: {
                name: 'LD A B',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.A, dmg.registerFile.B);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x79: {
                name: 'LD A C',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.A, dmg.registerFile.C);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x7a: {
                name: 'LD A D',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.A, dmg.registerFile.D);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x7b: {
                name: 'LD A E',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.A, dmg.registerFile.E);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x7c: {
                name: 'LD A, H',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.A, dmg.registerFile.H);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x7d: {
                name: 'LD A, L',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.A, dmg.registerFile.L);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x7e: {
                name: 'LD A, [HL]',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8HL(dmg.registerFile.A, dmg.registerFile.register16Bit.HL, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x7f: {
                name: 'LD A A',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDR8R8(dmg.registerFile.A, dmg.registerFile.A);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x06: {
                name: 'LD B N',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDR8N8(dmg.registerFile.B, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x16: {
                name: 'LD D N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDR8N8(dmg.registerFile.D, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x26: {
                name: 'LD H, N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDR8N8(dmg.registerFile.H, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x36: {
                name: 'LD [HL] N',
                cycles: 3,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDHLN8(dmg.registerFile.register16Bit.HL, n, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x0e: {
                name: 'LD C N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDR8N8(dmg.registerFile.C, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x1e: {
                name: 'LD E N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDR8N8(dmg.registerFile.E, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x2e: {
                name: 'LD L N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDR8N8(dmg.registerFile.L, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x3e: {
                name: 'LD A N',
                cycles: 2,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDR8N8(dmg.registerFile.A, n);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0xea: {
                name: 'LD (NN), A',
                cycles: 4,
                length: 3,
                execute: (dmg: Gameboy) => {
                    // get lower byte

                    dmg.registerFile.pointers.PC.increment();

                    const lb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());
                    // get upper byte

                    dmg.registerFile.pointers.PC.increment();

                    const ub = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());
                    const n = (ub << 8) | lb;

                    LDN16A(n, dmg.registerFile.A, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xfa: {
                name: 'LD  A, (NN)',
                cycles: 4,
                length: 3,
                execute: (dmg: Gameboy) => {
                    // get lower byte

                    dmg.registerFile.pointers.PC.increment();
                    const lb = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());

                    // get upper byte

                    dmg.registerFile.pointers.PC.increment();
                    const ub = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());

                    const n = (ub << 8) | lb;

                    LDAN16(dmg.registerFile.A, n, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xe0: {
                name: 'LDH (n), A',
                cycles: 3,
                length: 2,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.PC.increment();
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister());

                    LDHN16A(n, dmg.registerFile.A, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xf0: {
                name: 'LDH A, N',
                cycles: 3,
                length: 2,
                execute: (dmg: Gameboy) => {
                    const n = dmg.ram.read(dmg.registerFile.pointers.PC.getRegister() + 1);

                    dmg.registerFile.pointers.PC.increment();
                    LDHAN8(n, dmg.registerFile.A, dmg.ram);

                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xe2: {
                name: 'LDH (C), A',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHCA(dmg.ram, dmg.registerFile.A, dmg.registerFile.C);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xf2: {
                name: 'LDH A, (C)',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    LDHAC(dmg.registerFile.C, dmg.registerFile.A, dmg.ram);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            // ROUTINE INSTRUCTIONS
            0xcd: {
                name: 'Call nn',
                cycles: 6,
                length: 3,
                execute: CALLN16(),
            },

            0xc3: {
                name: 'JP nn',
                cycles: 4,
                length: 3,
                execute: JPN16(),
            },

            0xc9: {
                name: 'RET',
                cycles: 4,
                length: 1,
                execute: RET(),
            },
            0xe9: {
                name: 'JP [HL]',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    JPHL(dmg.registerFile.register16Bit.HL, dmg.registerFile.pointers.PC);
                },
            },

            0xc7: {
                name: 'RST 0x00',
                cycles: 4,
                length: 1,
                execute: RSTN(0x00),
            },
            0xd7: {
                name: 'RST 0x10',
                cycles: 4,
                length: 1,
                execute: RSTN(0x10),
            },
            0xe7: {
                name: 'RST 0x20',
                cycles: 4,
                length: 1,
                execute: RSTN(0x20),
            },
            0xf7: {
                name: 'RST 0x30',
                cycles: 4,
                length: 1,
                execute: RSTN(0x30),
            },
            0xcf: {
                name: 'RST 0x08',
                cycles: 4,
                length: 1,
                execute: RSTN(0x08),
            },
            0xdf: {
                name: 'RST 0x18',
                cycles: 4,
                length: 1,
                execute: RSTN(0x18),
            },
            0xef: {
                name: 'RST 0x28',
                cycles: 4,
                length: 1,
                execute: RSTN(0x28),
            },
            0xff: {
                name: 'RST 0x38',
                cycles: 4,
                length: 1,
                execute: RSTN(0x38),
            },
            0x3f: {
                name: 'CCF',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    CCF(dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x37: {
                name: 'SCF',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    SCF(dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            //16bit arithmetic
            0x03: {
                name: 'INC BC',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR16(dmg.registerFile.register16Bit.BC);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x13: {
                name: 'INC DE',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR16(dmg.registerFile.register16Bit.DE);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x23: {
                name: 'INC HL',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    INCR16(dmg.registerFile.register16Bit.HL);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x33: {
                name: 'INC SP',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.SP.increment();
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x0b: {
                name: 'DEC BC',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR16(dmg.registerFile.register16Bit.BC);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x1b: {
                name: 'DEC DE',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR16(dmg.registerFile.register16Bit.DE);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x2b: {
                name: 'DEC HL',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR16(dmg.registerFile.register16Bit.HL);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x3b: {
                name: 'DEC SP',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DECR16(dmg.registerFile.pointers.SP);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x09: {
                name: 'ADD HL BC',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDHLR16(
                        dmg.registerFile.register16Bit.BC,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x19: {
                name: 'ADD HL, DE',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDHLR16(
                        dmg.registerFile.register16Bit.DE,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x29: {
                name: 'ADD HL HL',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDHLR16(
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x39: {
                name: 'ADD HL, SP',
                cycles: 2,
                length: 1,
                execute: (dmg: Gameboy) => {
                    ADDHLR16(
                        dmg.registerFile.pointers.SP,
                        dmg.registerFile.register16Bit.HL,
                        dmg.registerFile.F
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0xe8: {
                name: 'ADD SP, e',
                cycles: 4,
                length: 2,
                execute: ADDSPe(),
            },

            0x08: {
                name: 'LD (nn), SP',
                cycles: 5,
                length: 3,
                execute: LDNNSP(),
            },
            0xf8: {
                name: 'LD HL, SP+e',
                cycles: 3,
                length: 2,
                execute: LDHLSPe(),
            },
            0xf9: {
                name: 'LD SP, HL',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.SP.setRegister(
                        dmg.registerFile.register16Bit.HL.getRegister()
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xc1: {
                name: 'POP BC',
                cycles: 3,
                length: 1,
                execute: (dmg: Gameboy) => {
                    const lsb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());

                    dmg.registerFile.pointers.SP.increment();
                    const msb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());

                    dmg.registerFile.pointers.SP.increment();
                    const WZ = lsb | (msb << 8);
                    dmg.registerFile.register16Bit.BC.setRegister(WZ);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xd1: {
                name: 'POP DE',
                cycles: 3,
                length: 1,
                execute: (dmg: Gameboy) => {
                    const lsb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());

                    dmg.registerFile.pointers.SP.increment();
                    const msb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());

                    dmg.registerFile.pointers.SP.increment();

                    const WZ = lsb | (msb << 8);
                    dmg.registerFile.register16Bit.BC.setRegister(WZ);
                    dmg.registerFile.register16Bit.DE.setRegister(WZ);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xe1: {
                name: 'POP HL ',
                cycles: 3,
                length: 1,
                execute: (dmg: Gameboy) => {
                    const lsb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());

                    dmg.registerFile.pointers.SP.increment();
                    const msb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());

                    dmg.registerFile.pointers.SP.increment();
                    const WZ = lsb | (msb << 8);
                    dmg.registerFile.register16Bit.HL.setRegister(WZ);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xf1: {
                name: 'POP AF ',
                cycles: 3,
                length: 1,
                execute: (dmg: Gameboy) => {
                    const lsb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());
                    dmg.registerFile.pointers.SP.increment();
                    const msb = dmg.ram.read(dmg.registerFile.pointers.SP.getRegister());
                    dmg.registerFile.pointers.SP.increment();
                    const WZ = lsb | (msb << 8);
                    dmg.registerFile.register16Bit.AF.setRegister(WZ);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xc5: {
                name: 'PUSH BC ',
                cycles: 4,
                length: 1,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.B.getRegister()
                    );
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.C.getRegister()
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xd5: {
                name: 'PUSH DE ',
                cycles: 4,
                length: 1,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.D.getRegister()
                    );
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.E.getRegister()
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xe5: {
                name: 'PUSH HL ',
                cycles: 4,
                length: 1,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.H.getRegister()
                    );
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.L.getRegister()
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xf5: {
                name: 'PUSH AF ',
                cycles: 4,
                length: 1,
                execute: (dmg: Gameboy) => {
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.A.getRegister()
                    );
                    dmg.registerFile.pointers.SP.decrement();
                    dmg.ram.write(
                        dmg.registerFile.pointers.SP.getRegister(),
                        dmg.registerFile.F.getRegister()
                    );
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0xfb: {
                name: 'Enable Interrupt (EI)',
                cycles: 1,
                length: 1,
                execute: EI(),
            },
            0xf3: {
                name: 'Disable Interrupt (DI)',
                cycles: 1,
                length: 1,
                execute: DI(),
            },
            0xd9: {
                name: 'RETI',
                cycles: 4,
                length: 1,
                execute: RETI(),
            },
            0x76: {
                name: 'HALT',
                cycles: 1,
                length: 1,
                execute: HALT(),
            },
            0x10: {
                name: 'STOP',
                cycles: 1,
                length: 1,
                execute: STOP(),
            },
            0x27: {
                name: 'DAA',
                cycles: 1,
                length: 1,
                execute: (dmg: Gameboy) => {
                    DAA(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },

            0x18: {
                name: 'JR, e',
                length: 2,
                cycles: 3,
                execute: JRE(),
            },

            0x07: {
                name: 'RLCA',
                length: 1,
                cycles: 1,
                execute: (dmg: Gameboy) => {
                    RLCA(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x17: {
                name: 'RLA',
                length: 1,
                cycles: 1,
                execute: (dmg: Gameboy) => {
                    RLA(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x0f: {
                name: 'RRCA',
                length: 1,
                cycles: 1,
                execute: (dmg: Gameboy) => {
                    RRCA(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            0x1f: {
                name: 'RRA',
                length: 1,
                cycles: 1,
                execute: (dmg: Gameboy) => {
                    RRA(dmg.registerFile.A, dmg.registerFile.F);
                    dmg.registerFile.pointers.PC.increment();
                },
            },
            // not implemented - 0xd3, 0xe3, 0xe4, 0xf4, 0xdb, 0xeb, 0xec, 0xfc, 0xdd, 0xed, 0xfd
        };
    }
}

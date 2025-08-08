import type { Gameboy } from "../Gameboy";
import { validateADDSPe } from "../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "./CPU_Flag_Register";
import {
  ADDHLR16,
  DECR16,
  INCR16,
} from "./instructions/16bit_Arithmetic_Instructions";
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
} from "./instructions/8bit_Arithmetic_Instructions";
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
} from "./instructions/Bitwise_Logic_Instructions";
import { CCF, SCF } from "./instructions/Carry_Flag_Instructions";
import {
  CALLCCN16,
  CALLN16,
  JPCCN16,
  JPHL,
  JPN16,
  RET,
  RETCC,
  RSTN,
} from "./instructions/Jumps_And _Subroutine_Instructions";
import {
  LDAHLD,
  LDAHLI,
  LDAN16,
  LDAR16,
  LDHAC,
  LDHAN16,
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
} from "./instructions/LD_Instructions";
import {
  ADDSPe,
  LDHLSPe,
  LDNNSP,
} from "./instructions/Stack_Manipulation_Instructions";
import type { IOpCodeEntry } from "./types/OpcodeTypes";

// AUTHOR'S NOTE:
//  BEHOLD!!!!!!!!!!!

// i havent implemented
//  HALT, RETI
// TODO MAKE THIS INTO A CLASS
export class CpuOpcodeRecord {
  private f: Cpu_Flag_Register;
  constructor(f: Cpu_Flag_Register) {
    this.f = f;
  }

  get(index: number): IOpCodeEntry {
    return this.record()[index];
  }

  private record(): Record<number, IOpCodeEntry> {
    return {
      // ALU STUFF
      0x0: {
        name: "NOP",
        cycles: 1,
        length: 1,
        jobs: [
          // M1
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x4: {
        name: "INC B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR8(dmg.registers.register.B, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x5: {
        name: "DEC B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR8(dmg.registers.register.B, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0x14: {
        name: "INC D",
        cycles: 1,
        length: 1,

        jobs: [
          (dmg: Gameboy) => {
            INCR8(dmg.registers.register.D, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x15: {
        name: "DEC D",
        cycles: 1,
        length: 1,

        jobs: [
          (dmg: Gameboy) => {
            DECR8(dmg.registers.register.D, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0x0c: {
        name: "INC C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR8(dmg.registers.register.C, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x0d: {
        name: "DEC C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR8(dmg.registers.register.C, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x1c: {
        name: "INC E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR8(dmg.registers.register.E, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x1d: {
        name: "DEC E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR8(dmg.registers.register.E, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x24: {
        name: "INC H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR8(dmg.registers.register.H, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x25: {
        name: "DEC H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR8(dmg.registers.register.H, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x2c: {
        name: "INC L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR8(dmg.registers.register.L, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x2d: {
        name: "DEC L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR8(dmg.registers.register.L, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x34: {
        name: "INC [HL]",
        cycles: 3,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            INCHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x35: {
        name: "DEC [HL]",
        cycles: 3,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            DECHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x3c: {
        name: "INC A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR8(dmg.registers.register.A, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x3d: {
        name: "DEC A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR8(dmg.registers.register.A, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0x2f: {
        name: "CPL",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPL(dmg.registers.register.A, dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0x80: {
        name: "ADD B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADDAR8(
              dmg.registers.register.B,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x81: {
        name: "ADD C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADDAR8(
              dmg.registers.register.C,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x82: {
        name: "ADD D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADDAR8(
              dmg.registers.register.D,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x83: {
        name: "ADD E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADDAR8(
              dmg.registers.register.E,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x84: {
        name: "ADD H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADDAR8(
              dmg.registers.register.H,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x85: {
        name: "ADD L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADDAR8(
              dmg.registers.register.D,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x86: {
        name: "ADD [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            ADDAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x87: {
        name: "ADD A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADDAR8(
              dmg.registers.register.A,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x88: {
        name: "ADC B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADCAR8(
              dmg.registers.register.B,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x89: {
        name: "ADC C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADCAR8(
              dmg.registers.register.C,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x8a: {
        name: "ADC D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADCAR8(
              dmg.registers.register.D,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x8b: {
        name: "ADC E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADCAR8(
              dmg.registers.register.E,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x8c: {
        name: "ADC H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADCAR8(
              dmg.registers.register.H,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x8d: {
        name: "ADC D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADCAR8(
              dmg.registers.register.L,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x8e: {
        name: "ADC [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            ADCAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x8f: {
        name: "ADC A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ADCAR8(
              dmg.registers.register.A,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      // SUB

      0x90: {
        name: "SUB B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SUBAR8(
              dmg.registers.register.B,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0x91: {
        name: "SUB C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SUBAR8(
              dmg.registers.register.C,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x92: {
        name: "SUB D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SUBAR8(
              dmg.registers.register.D,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x93: {
        name: "SUB E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SUBAR8(
              dmg.registers.register.E,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x94: {
        name: "SUB H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SUBAR8(
              dmg.registers.register.H,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x95: {
        name: "SUB L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SUBAR8(
              dmg.registers.register.L,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x96: {
        name: "SUB [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SUBAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x97: {
        name: "SUB A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SUBAR8(
              dmg.registers.register.A,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x98: {
        name: "SUBC B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SBCAR8(
              dmg.registers.register.B,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x99: {
        name: "SUBC C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SBCAR8(
              dmg.registers.register.C,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x9a: {
        name: "SUBC D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SBCAR8(
              dmg.registers.register.D,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x9b: {
        name: "SUBC E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SBCAR8(
              dmg.registers.register.E,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x9c: {
        name: "SUBC H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SBCAR8(
              dmg.registers.register.H,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x9d: {
        name: "SUBC D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SBCAR8(
              dmg.registers.register.L,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x9e: {
        name: "SUBC [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SBCAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x9f: {
        name: "SUBC A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SBCAR8(
              dmg.registers.register.A,
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa0: {
        name: "AND B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ANDAR8(
              dmg.registers.register.A,
              dmg.registers.register.B,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa1: {
        name: "AND C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ANDAR8(
              dmg.registers.register.A,
              dmg.registers.register.C,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa2: {
        name: "AND D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ANDAR8(
              dmg.registers.register.A,
              dmg.registers.register.D,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa3: {
        name: "AND E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ANDAR8(
              dmg.registers.register.A,
              dmg.registers.register.E,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa4: {
        name: "AND H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ANDAR8(
              dmg.registers.register.A,
              dmg.registers.register.H,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa5: {
        name: "AND L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ANDAR8(
              dmg.registers.register.A,
              dmg.registers.register.L,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa6: {
        name: "AND [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            ANDAHL(
              dmg.registers.register.A,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa7: {
        name: "AND A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ANDAR8(
              dmg.registers.register.A,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa8: {
        name: "XOR B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            XORAR8(
              dmg.registers.register.A,
              dmg.registers.register.B,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xa9: {
        name: "XOR C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            XORAR8(
              dmg.registers.register.A,
              dmg.registers.register.C,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xaa: {
        name: "XOR D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            XORAR8(
              dmg.registers.register.A,
              dmg.registers.register.D,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xab: {
        name: "XOR E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            XORAR8(
              dmg.registers.register.A,
              dmg.registers.register.E,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xac: {
        name: "XOR H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            XORAR8(
              dmg.registers.register.A,
              dmg.registers.register.H,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xad: {
        name: "XOR L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            XORAR8(
              dmg.registers.register.A,
              dmg.registers.register.L,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xae: {
        name: "XOR [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            XORAHL(
              dmg.registers.register.A,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xaf: {
        name: "XOR A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            XORAR8(
              dmg.registers.register.A,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb0: {
        name: "OR B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ORAR8(
              dmg.registers.register.A,
              dmg.registers.register.B,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb1: {
        name: "OR C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ORAR8(
              dmg.registers.register.A,
              dmg.registers.register.C,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb2: {
        name: "OR D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ORAR8(
              dmg.registers.register.A,
              dmg.registers.register.D,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb3: {
        name: "OR E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ORAR8(
              dmg.registers.register.A,
              dmg.registers.register.E,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb4: {
        name: "OR H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ORAR8(
              dmg.registers.register.A,
              dmg.registers.register.H,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb5: {
        name: "OR L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ORAR8(
              dmg.registers.register.A,
              dmg.registers.register.L,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb6: {
        name: "OR [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            ORAHL(
              dmg.registers.register.A,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb7: {
        name: "OR A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            ORAR8(
              dmg.registers.register.A,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb8: {
        name: "CP B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPAR8(
              dmg.registers.register.B,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xb9: {
        name: "CP C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPAR8(
              dmg.registers.register.C,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xba: {
        name: "CP D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPAR8(
              dmg.registers.register.D,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xbb: {
        name: "CP E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPAR8(
              dmg.registers.register.E,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xbc: {
        name: "CP H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPAR8(
              dmg.registers.register.H,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xbd: {
        name: "CP L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPAR8(
              dmg.registers.register.L,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xbe: {
        name: "CP [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            CPAHL(
              dmg.ram,
              dmg.registers.register.A,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xbf: {
        name: "CP A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CPAR8(
              dmg.registers.register.A,
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xc6: {
        name: "ADD N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            ADDAN8(
              dmg.registers.getTempByte(),
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0xd6: {
        name: "SUB N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            SUBAN8(
              dmg.registers.getTempByte(),
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0xe6: {
        name: "AND N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            ANDAN8(
              dmg.registers.register.A,
              dmg.registers.getTempByte(),
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0xf6: {
        name: "OR N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            ORAN8(
              dmg.registers.register.A,
              dmg.registers.getTempByte(),
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0xce: {
        name: "ADC N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            ADCAN8(
              dmg.registers.getTempByte(),
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0xde: {
        name: "SBC N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            SBCAN8(
              dmg.registers.getTempByte(),
              dmg.registers.register.F,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0xee: {
        name: "XOR N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            XORAN8(
              dmg.registers.register.A,
              dmg.registers.getTempByte(),
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0xfe: {
        name: "CP N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            CPAN8(
              dmg.registers.getTempByte(),
              dmg.registers.register.A,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },

      // LOAD INSTRUCTIONS 16bit
      0x01: {
        name: "LD BC NN",
        cycles: 3,
        length: 3,
        jobs: [
          (dmg: Gameboy) => {
            // get lower byte
            const lb =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setLowerByte(lb);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            // get upper byte
            const ub =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setUpperByte(ub);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            const n =
              (dmg.registers.getUpperByte() << 8) |
              dmg.registers.getLowerByte();
            LDR16N16(dmg.registers.register16Bit.BC, n);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0x11: {
        name: "LD DE, NN",
        cycles: 3,
        length: 3,
        jobs: [
          (dmg: Gameboy) => {
            // get lower byte
            const lb =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setLowerByte(lb);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            // get upper byte
            const ub =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setUpperByte(ub);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            const n =
              (dmg.registers.getUpperByte() << 8) |
              dmg.registers.getLowerByte();
            LDR16N16(dmg.registers.register16Bit.DE, n);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x21: {
        name: "LD HL NN",
        cycles: 3,
        length: 3,
        jobs: [
          (dmg: Gameboy) => {
            // get lower byte
            const lb =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setLowerByte(lb);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            // get upper byte
            const ub =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setUpperByte(ub);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            const n =
              (dmg.registers.getUpperByte() << 8) |
              dmg.registers.getLowerByte();
            LDR16N16(dmg.registers.register16Bit.HL, n);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x31: {
        name: "LD SP, NN",
        cycles: 3,
        length: 3,
        jobs: [
          (dmg: Gameboy) => {
            // get lower byte
            const lb =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setLowerByte(lb);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            // get upper byte
            const ub =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setUpperByte(ub);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            const n =
              (dmg.registers.getUpperByte() << 8) |
              dmg.registers.getLowerByte();
            LDR16N16(dmg.registers.pointers.SP, n);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      // Load instruction 8bit
      0x0a: {
        name: "LD A, (BC)",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.BC.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDAR16(
              dmg.registers.register.A,
              dmg.registers.register16Bit.BC,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x1a: {
        name: "LD A,(DE)",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.DE.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDAR16(
              dmg.registers.register.A,
              dmg.registers.register16Bit.DE,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x2a: {
        name: "LD A, (HL+)",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(
                dmg.registers.register16Bit.HL.getRegister() + 1
              )
            );
          },
          (dmg: Gameboy) => {
            LDAHLI(
              dmg.registers.register.A,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x3a: {
        name: "LD  A, (HL-)",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(
                dmg.registers.register16Bit.HL.getRegister() - 1
              )
            );
          },
          (dmg: Gameboy) => {
            LDAHLD(
              dmg.registers.register.A,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      // IMPLEMENT ME LD [r16], A
      0x02: {
        name: "LD (BC),A",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.BC.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR16A(
              dmg.registers.register16Bit.BC,
              dmg.registers.register.A,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x12: {
        name: "LD (DE),A",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.DE.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR16A(
              dmg.registers.register16Bit.DE,
              dmg.registers.register.A,
              dmg.ram
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x22: {
        name: "LD (HL+), A",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(
                dmg.registers.register16Bit.HL.getRegister() + 1
              )
            );
          },
          (dmg: Gameboy) => {
            LDHLIA(
              dmg.ram,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x32: {
        name: "LD (HL-), A ",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(
                dmg.registers.register16Bit.HL.getRegister() - 1
              )
            );
          },
          (dmg: Gameboy) => {
            LDHLDA(
              dmg.ram,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.A
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x40: {
        name: "LD B B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.B, dmg.registers.register.B);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x41: {
        name: "LD B C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.B, dmg.registers.register.C);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x42: {
        name: "LD B D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.B, dmg.registers.register.D);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x43: {
        name: "LD B E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.B, dmg.registers.register.E);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x44: {
        name: "LD B H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.B, dmg.registers.register.H);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x45: {
        name: "LD B L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.B, dmg.registers.register.L);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x46: {
        name: "LD B [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR8HL(
              dmg.registers.register.B,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x47: {
        name: "LD B A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.B, dmg.registers.register.A);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x48: {
        name: "LD C B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.C, dmg.registers.register.B);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x49: {
        name: "LD C C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.C, dmg.registers.register.C);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x4a: {
        name: "LD C D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.C, dmg.registers.register.D);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x4b: {
        name: "LD C E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.C, dmg.registers.register.E);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x4c: {
        name: "LD C H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.C, dmg.registers.register.H);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x4d: {
        name: "LD C L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.C, dmg.registers.register.L);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x4e: {
        name: "LD C [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR8HL(
              dmg.registers.register.C,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x4f: {
        name: "LD C A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.C, dmg.registers.register.A);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x50: {
        name: "LD D B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.D, dmg.registers.register.B);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x51: {
        name: "LD D C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.D, dmg.registers.register.C);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x52: {
        name: "LD D D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.D, dmg.registers.register.D);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x53: {
        name: "LD D E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.D, dmg.registers.register.E);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x54: {
        name: "LD D H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.D, dmg.registers.register.H);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x55: {
        name: "LD D L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.D, dmg.registers.register.L);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x56: {
        name: "LD D [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR8HL(
              dmg.registers.register.D,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x57: {
        name: "LD D A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.D, dmg.registers.register.A);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x58: {
        name: "LD E B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.E, dmg.registers.register.B);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x59: {
        name: "LD D C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.E, dmg.registers.register.C);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x5a: {
        name: "LD E D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.E, dmg.registers.register.D);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x5b: {
        name: "LD E E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.E, dmg.registers.register.E);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x5c: {
        name: "LD E H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.E, dmg.registers.register.H);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x5d: {
        name: "LD E L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.E, dmg.registers.register.L);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x5e: {
        name: "LD E [HL]",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8HL(
              dmg.registers.register.E,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x5f: {
        name: "LD E A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.E, dmg.registers.register.A);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x60: {
        name: "LD H B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.H, dmg.registers.register.B);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x61: {
        name: "LD H C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.H, dmg.registers.register.C);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x62: {
        name: "LD H D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.H, dmg.registers.register.D);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x63: {
        name: "LD H E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.H, dmg.registers.register.E);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x64: {
        name: "LD H H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.H, dmg.registers.register.H);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x65: {
        name: "LD H L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.H, dmg.registers.register.L);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x66: {
        name: "LD H [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR8HL(
              dmg.registers.register.H,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x67: {
        name: "LD H A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.H, dmg.registers.register.A);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x68: {
        name: "LD L B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.L, dmg.registers.register.B);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x69: {
        name: "LD L C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.L, dmg.registers.register.C);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x6a: {
        name: "LD L D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.L, dmg.registers.register.D);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x6b: {
        name: "LD L E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.L, dmg.registers.register.E);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x6c: {
        name: "LD L H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.L, dmg.registers.register.H);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x6d: {
        name: "LD L L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.L, dmg.registers.register.L);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x6e: {
        name: "LD L [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR8HL(
              dmg.registers.register.L,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x6f: {
        name: "LD L A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.L, dmg.registers.register.A);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x70: {
        name: "LD [HL] B",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDHLR8(
              dmg.registers.register16Bit.HL,
              dmg.registers.register.B,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x71: {
        name: "LD [HL] C",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDHLR8(
              dmg.registers.register16Bit.HL,
              dmg.registers.register.C,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x72: {
        name: "LD [HL] D",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDHLR8(
              dmg.registers.register16Bit.HL,
              dmg.registers.register.D,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x73: {
        name: "LD [HL] E",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDHLR8(
              dmg.registers.register16Bit.HL,
              dmg.registers.register.E,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x74: {
        name: "LD [HL] H",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDHLR8(
              dmg.registers.register16Bit.HL,
              dmg.registers.register.H,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x75: {
        name: "LD [HL] L",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDHLR8(
              dmg.registers.register16Bit.HL,
              dmg.registers.register.L,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x77: {
        name: "LD [HL] A",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDHLR8(
              dmg.registers.register16Bit.HL,
              dmg.registers.register.A,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x78: {
        name: "LD A B",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.A, dmg.registers.register.B);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x79: {
        name: "LD A C",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.A, dmg.registers.register.C);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x7a: {
        name: "LD A D",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.A, dmg.registers.register.D);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x7b: {
        name: "LD A E",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.A, dmg.registers.register.E);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x7c: {
        name: "LD A, H",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.A, dmg.registers.register.H);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x7d: {
        name: "LD A, L",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.A, dmg.registers.register.L);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x7e: {
        name: "LD A, [HL]",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log(
              "MemAdd Value:",
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            LDR8HL(
              dmg.registers.register.A,
              dmg.registers.register16Bit.HL,
              dmg.ram
            );

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x7f: {
        name: "LD A A",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDR8R8(dmg.registers.register.A, dmg.registers.register.A);

            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x06: {
        name: "LD B N",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDR8N8(dmg.registers.register.B, dmg.registers.getTempByte());
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0x16: {
        name: "LD C N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDR8N8(dmg.registers.register.C, dmg.registers.getTempByte());
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0x26: {
        name: "LD D N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDR8N8(dmg.registers.register.D, dmg.registers.getTempByte());
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0x36: {
        name: "LD [HL] N",
        cycles: 3,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDHLN8(
              dmg.registers.register16Bit.HL,
              dmg.registers.getTempByte(),
              dmg.ram
            );
            dmg.registers.setTempByte(0);
          },
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0x0e: {
        name: "LD C N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDR8N8(dmg.registers.register.C, dmg.registers.getTempByte());
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0x1e: {
        name: "LD E N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDR8N8(dmg.registers.register.E, dmg.registers.getTempByte());
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0x2e: {
        name: "LD L N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDR8N8(dmg.registers.register.L, dmg.registers.getTempByte());
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },
      0x3e: {
        name: "LD A N",
        cycles: 2,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDR8N8(dmg.registers.register.A, dmg.registers.getTempByte());
            dmg.registers.pointers.PC.increment();
            dmg.registers.setTempByte(0);
          },
        ],
      },

      0xea: {
        name: "LD (NN), A",
        cycles: 4,
        length: 3,
        jobs: [
          (dmg: Gameboy) => {
            // get lower byte
            const lb =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setLowerByte(lb);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            // get upper byte
            const ub =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setUpperByte(ub);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            const n =
              (dmg.registers.getUpperByte() << 8) |
              dmg.registers.getLowerByte();
            LDN16A(n, dmg.registers.register.A, dmg.ram);
          },
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xfa: {
        name: "LD  A, (NN)",
        cycles: 4,
        length: 3,
        jobs: [
          (dmg: Gameboy) => {
            // get lower byte
            const lb =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setLowerByte(lb);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            // get upper byte
            const ub =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setUpperByte(ub);

            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            const n =
              (dmg.registers.getUpperByte() << 8) |
              dmg.registers.getLowerByte();
            LDAN16(dmg.registers.register.A, n, dmg.ram);
          },
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xe0: {
        name: "LDH (n), A",
        cycles: 3,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDHN16A(
              dmg.registers.getTempByte(),
              dmg.registers.register.A,
              dmg.ram
            );
          },
          (dmg: Gameboy) => {
            dmg.registers.setTempByte(0);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xf0: {
        name: "LDH A, N",
        cycles: 3,
        length: 2,
        jobs: [
          (dmg: Gameboy) => {
            const n =
              dmg.cartridge.CartDataToBytes[
                dmg.registers.pointers.PC.getRegister() + 1
              ];
            dmg.registers.setTempByte(n);
            dmg.registers.pointers.PC.increment();
          },
          (dmg: Gameboy) => {
            LDHAN16(
              dmg.registers.getTempByte(),
              dmg.registers.register.A,
              dmg.ram
            );
          },
          (dmg: Gameboy) => {
            dmg.registers.setTempByte(0);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xe2: {
        name: "LDH (C), A",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDHCA(dmg.ram, dmg.registers.register.A, dmg.registers.register.C);
          },
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0xf2: {
        name: "LDH A, (C)",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            LDHAC(dmg.registers.register.C, dmg.registers.register.A, dmg.ram);
          },
          (dmg: Gameboy) => {
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      // ROUTINE INSTRUCTIONS
      0xcd: {
        name: "Call nn",
        cycles: 6,
        length: 3,
        jobs: CALLN16(),
      },

      0xc4: {
        name: "Call NZ, nn",
        cycles: "if CC is True: 6 else 3",
        length: 3,
        jobs: CALLCCN16(this.f.getZFlag() ^ 1),
      },
      0xd4: {
        name: "Call NC, nn",
        cycles: "if CC is True: 6 else 3",
        length: 3,
        jobs: CALLCCN16(this.f.getCYFlag() ^ 1),
      },
      0xcc: {
        name: "Call Z, nn",
        cycles: "if CC is True: 6 else 3",
        length: 3,
        jobs: CALLCCN16(this.f.getZFlag()),
      },
      0xdc: {
        name: "Call C, nn",
        cycles: "if CC is True: 6 else 3",
        length: 3,
        jobs: CALLCCN16(this.f.getCYFlag()),
      },
      0xc3: {
        name: "JP nn",
        cycles: 4,
        length: 3,
        jobs: JPN16(),
      },
      0xc2: {
        name: "JP NZ, nn",
        cycles: "4 cycles if CC is true; 3",
        length: 3,
        jobs: JPCCN16(this.f.getZFlag() ^ 1),
      },
      0xd2: {
        name: "JP NC, nn",
        cycles: "4 cycles if CC is true; 3",
        length: 3,
        jobs: JPCCN16(this.f.getCYFlag() ^ 1),
      },
      0xca: {
        name: "JP Z, nn",
        cycles: "4 cycles if CC is true; 3",
        length: 3,
        jobs: JPCCN16(this.f.getZFlag()),
      },
      0xda: {
        name: "JP C, nn",
        cycles: "4 cycles if CC is true; 3",
        length: 3,
        jobs: JPCCN16(this.f.getCYFlag()),
      },
      0xc9: {
        name: "RET",
        cycles: 4,
        length: 1,
        jobs: RET(),
      },
      0xe9: {
        name: "JP HL",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            JPHL(dmg.registers.register16Bit.HL, dmg.registers.pointers.PC);
          },
        ],
      },
      0xc0: {
        name: "RET NZ",
        cycles: "4 if CC is true; 2",
        length: 1,
        jobs: RETCC(this.f.getZFlag() ^ 1),
      },
      0xd0: {
        name: "RET NC",
        cycles: "4 if CC is true; 2",
        length: 1,
        jobs: RETCC(this.f.getCYFlag() ^ 1),
      },
      0xc8: {
        name: "RET Z",
        cycles: "4 if CC is true; 2",
        length: 1,
        jobs: RETCC(this.f.getZFlag()),
      },
      0xd8: {
        name: "RET C",
        cycles: "4 if CC is true; 2",
        length: 1,
        jobs: RETCC(this.f.getCYFlag()),
      },
      0xc7: {
        name: "RST 0x00",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x00),
      },
      0xd7: {
        name: "RST 0x10",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x10),
      },
      0xe7: {
        name: "RST 0x20",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x20),
      },
      0xf7: {
        name: "RST 0x30",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x30),
      },
      0xcf: {
        name: "RST 0x08",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x08),
      },
      0xdf: {
        name: "RST 0x18",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x18),
      },
      0xef: {
        name: "RST 0x28",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x28),
      },
      0xff: {
        name: "RST 0x38",
        cycles: 4,
        length: 1,
        jobs: RSTN(0x38),
      },
      0x3f: {
        name: "CCF",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            CCF(dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x37: {
        name: "SCF",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            SCF(dmg.registers.register.F);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      //16bit arithmetic
      0x03: {
        name: "INC BC",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR16(dmg.registers.register16Bit.BC);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x13: {
        name: "INC DE",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR16(dmg.registers.register16Bit.DE);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x23: {
        name: "INC HL",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR16(dmg.registers.register16Bit.HL);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x33: {
        name: "INC SP",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            INCR16(dmg.registers.pointers.SP);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x0b: {
        name: "DEC BC",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR16(dmg.registers.register16Bit.BC);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x1b: {
        name: "DEC DE",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR16(dmg.registers.register16Bit.DE);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x2b: {
        name: "DEC HL",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR16(dmg.registers.register16Bit.HL);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x3b: {
        name: "DEC SP",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            DECR16(dmg.registers.pointers.SP);
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x09: {
        name: "ADD HL BC",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log("ADD HL, BC");
          },
          (dmg: Gameboy) => {
            ADDHLR16(
              dmg.registers.register16Bit.BC,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x19: {
        name: "ADD HL, DE",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log("ADD HL DE");
          },
          (dmg: Gameboy) => {
            ADDHLR16(
              dmg.registers.register16Bit.DE,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x29: {
        name: "ADD HL HL",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log("ADD HL, HL");
          },
          (dmg: Gameboy) => {
            ADDHLR16(
              dmg.registers.register16Bit.HL,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
      0x39: {
        name: "ADD HL, SP",
        cycles: 2,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            console.log("ADD HL, SP");
          },
          (dmg: Gameboy) => {
            ADDHLR16(
              dmg.registers.register16Bit.DE,
              dmg.registers.register16Bit.HL,
              dmg.registers.register.F
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },

      0xe8: {
        name: "ADD SP, e",
        cycles: 4,
        length: 2,
        jobs: ADDSPe(),
      },

      0x08: {
        name: "LD (nn), SP",
        cycles: 5,
        length: 3,
        jobs: LDNNSP(),
      },
      0xf8: {
        name: "LD HL, SP+e",
        cycles: 3,
        length: 2,
        jobs: LDHLSPe(),
      },
      0xf9: {
        name: "LD SP, HL",
        cycles: 1,
        length: 1,
        jobs: [
          (dmg: Gameboy) => {
            dmg.registers.pointers.SP.setRegister(
              dmg.registers.register16Bit.HL.getRegister()
            );
            dmg.registers.pointers.PC.increment();
          },
        ],
      },
    };
  }
}

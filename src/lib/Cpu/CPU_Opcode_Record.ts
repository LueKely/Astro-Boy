import type { Gameboy } from "../Gameboy";
import {
  ADCAHL,
  ADCAR8,
  ADDAHL,
  ADDAR8,
  DECHL,
  DECR8,
  INCHL,
  INCR8,
  SBCAHL,
  SBCAR8,
  SUBAHL,
  SUBAR8,
} from "./instructions/8bit_Arithmetic_Instructions";
import { CPL } from "./instructions/Bitwise_Logic_Instructions";
import type { IOpCodeEntry } from "./types/Opcode";

export function CpuOpcodeRecord(): Record<number, IOpCodeEntry> {
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
  };
}

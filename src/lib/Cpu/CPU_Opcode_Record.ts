import type { Gameboy } from "../Gameboy";
import {
  DECR8,
  INCHL,
  INCR8,
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
    // 0x3f: {
    //   name: "CCF",
    //   cycles: 1,
    //   length: 1,
    //   jobs: [
    //     (dmg: Gameboy) => {
    //       CCF(dmg.registers.register.A, dmg.registers.register.F);
    //       dmg.registers.pointers.PC.increment();
    //     },
    //   ],
    // },
  };
}

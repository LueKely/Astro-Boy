import type { Gameboy } from "../Gameboy";
import {
  DECHL,
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

    0x24: {
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
    0x25: {
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

    0x14: {
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
    0x15: {
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
    0x34: {
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
    0x35: {
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
    0x44: {
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
    0x45: {
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
    0x54: {
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
    0x55: {
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
    0x64: {
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
    0x65: {
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
    0x74: {
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
    0x75: {
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

    0x57: {
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
  };
}

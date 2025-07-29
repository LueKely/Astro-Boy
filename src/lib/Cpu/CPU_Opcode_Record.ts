import type { Gameboy } from "../Gameboy";
import {
  DECR8,
  INCHL,
  INCR8,
} from "./instructions/8bit_Arithmetic_Instructions";
import type { IOpCodeEntry } from "./types/Opcode";

export function CpuOpcodeRecord(): Record<number, IOpCodeEntry> {
  function incrementPC(dmg: Gameboy) {
    dmg.registers.pointers.PC.setRegister(
      dmg.registers.pointers.PC.getRegister() + 1
    );
  }

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
    0x34: {
      name: "INC HL",
      cycles: 3,
      length: 1,
      jobs: [
        // M3
        (dmg: Gameboy) => {
          INCHL(
            dmg.registers.register16Bit.HL,
            dmg.ram,
            dmg.registers.register.F
          );
          dmg.registers.pointers.PC.increment();
        },
        // M4/M1
        () => {},
      ],
    },
  };
}

//     0x24: {
//       name: "INC H",
//       cycles: 1,
//       length: 1,

//       jobs: [
//         () => {
//           INCR8(cpu.register.H, cpu.register.F);
//         },
//       ],
//     },
//     0x25: {
//       name: "DEC H",
//       cycles: 1,
//       length: 1,

//       jobs: [
//         () => {
//           DECR8(cpu.register.H, cpu.register.F);
//         },
//       ],
//     },
//     0x34: {
//       name: "INC HL",
//       cycles: 3,
//       length: 1,
//       jobs: [
//         () => {
//           INCHL(cpu.register16Bit.HL, ram, cpu.register.F);
//         },
//       ],
//     },
//   };
// }

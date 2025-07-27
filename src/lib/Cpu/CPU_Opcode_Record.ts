import { Ram } from "../Ram/Ram";
import type { CPU } from "./CPU";
import type { Cpu_Register_File } from "./CPU_Register_File";
import {
  DECR8,
  INCHL,
  INCR8,
} from "./instructions/8bit_Arithmetic_Instructions";
import type { IOpCodeEntry } from "./types/Opcode";

export function CpuOpcodeRecord(CPU: CPU): Record<number, IOpCodeEntry> {
  const { registers: cpu, ram } = CPU;

  return {
    // ALU STUFF
    0x4: {
      name: "INC B",
      cycles: 1,
      length: 1,
      jobs: [
        () => {
          INCR8(cpu.register.B, cpu.register.F);
        },
      ],
    },
    //  comment theres
  };
}
//     0x5: {
//       name: "DEC B",
//       cycles: 1,
//       length: 1,

//       jobs: [
//         () => {
//           DECR8(cpu.register.B, cpu.register.F);
//         },
//       ],
//     },
//     0x14: {
//       name: "INC D",
//       cycles: 1,
//       length: 1,

//       jobs: [
//         () => {
//           INCR8(cpu.register.D, cpu.register.F);
//         },
//       ],
//     },
//     0x15: {
//       name: "DEC D",
//       cycles: 1,
//       length: 1,

//       jobs: [
//         () => {
//           DECR8(cpu.register.D, cpu.register.F);
//         },
//       ],
//     },
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

import type { Cpu_Register } from "./CPU_Register";
import type { CPU_Registers_Group } from "./CPU_Registers_Group";
import {
  DECR8,
  INCHL,
  INCR8,
} from "./instructions/8bit_Arithmetic_Instructions";

interface IOpCodeEntry {
  name: string;
  cycles: number;
  jobs: (() => void)[];
}
export function CpuOpcodeTable(
  CPU: CPU_Registers_Group
): Record<number, IOpCodeEntry> {
  return {
    // ALU STUFF
    0x4: {
      name: "INC B",
      cycles: 1,
      jobs: [
        () => {
          INCR8(CPU.register.B, CPU.register.F);
        },
      ],
    },
    0x5: {
      name: "DEC B",
      cycles: 1,
      jobs: [
        () => {
          DECR8(CPU.register.B, CPU.register.F);
        },
      ],
    },
    0x14: {
      name: "INC D",
      cycles: 1,
      jobs: [
        () => {
          INCR8(CPU.register.D, CPU.register.F);
        },
      ],
    },
    0x15: {
      name: "DEC D",
      cycles: 1,
      jobs: [
        () => {
          DECR8(CPU.register.D, CPU.register.F);
        },
      ],
    },
    0x24: {
      name: "INC H",
      cycles: 1,
      jobs: [
        () => {
          INCR8(CPU.register.H, CPU.register.F);
        },
      ],
    },
    0x25: {
      name: "DEC H",
      cycles: 1,
      jobs: [
        () => {
          DECR8(CPU.register.H, CPU.register.F);
        },
      ],
    },
    0x34: {
      name: "INC HL",
      cycles: 3,
      jobs: [
        () => {
          INCHL(CPU.register16Bit.HL, CPU.Ram, CPU.register.F);
        },
      ],
    },
  };
}

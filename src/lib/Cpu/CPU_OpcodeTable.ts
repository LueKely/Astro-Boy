import type { Cpu_Register } from "./CPU_Register";
import type { CPU_Registers_Group } from "./CPU_Registers_Group";
import { INCR8 } from "./instructions/8bit_Arithmetic_Instructions";

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
    0x5: { name: "DEC B", cycles: 1, jobs: [] },
    0x14: { name: "INC D", cycles: 1, jobs: [] },
    0x15: { name: "DEC D", cycles: 1, jobs: [] },
  };
}

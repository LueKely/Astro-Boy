import type { CPU_Flag_Register } from "../CPU_Flag_Register";

export interface IRegisters {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: CPU_Flag_Register;
  G: number;
  H: number;
  L: number;
  PC: number;
}

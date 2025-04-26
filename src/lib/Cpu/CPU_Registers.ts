import type { HexRegisters, IRegisters } from "./types/CPU_Register_Types";

export class CPU_Registers {
  register: IRegisters = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    L: 0,
  };

  constructor() {}
}

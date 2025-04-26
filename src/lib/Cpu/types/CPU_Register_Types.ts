export interface IRegisters {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
  H: number;
  L: number;
}

export interface HexRegisters {
  AF: Uint8Array;
  BC: Uint8Array;
  DE: Uint8Array;
  HL: Uint8Array;
  SP: Uint8Array;
  PC: Uint8Array;
}

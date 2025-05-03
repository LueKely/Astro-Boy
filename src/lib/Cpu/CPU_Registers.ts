import type { IRegisters } from "./types/CPU_Register_Types";

/*
 * The CPU REGISTER
 * Please refer to https://gbdev.io/pandocs/CPU_Registers_and_Flags.html
 * 7-------07-------0
 * |   A   ||   F   |  => Acumulator & Flags
 * |   B   ||   C   |
 * |   D   ||   E   |
 * |   H   ||   L   |
 * 15---------------0
 * |       SP       |  => Stack Pointer
 * |       PC       |  => Program Counter/Pointer
 * |----------------|
 */

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
    PC: 0, // 16 bit register
  };

  constructor() {}
  getAF() {
    return (this.register.A << 8) | this.register.F;
  }

  getBC() {
    return (this.register.B << 8) | this.register.C;
  }

  setBC(value: number) {
    this.register.B = (value & 0xff0) >> 8;
    this.register.C = value & 0xff;
  }
  getDE() {
    return (this.register.D << 8) | this.register.E;
  }

  setDE(value: number) {
    this.register.D = (value & 0xff0) >> 8;
    this.register.E = value & 0xff;
  }

  getHL() {
    return (this.register.H << 8) | this.register.L;
  }
  setHL(value: number) {
    this.register.H = (value & 0xff0) >> 8;
    this.register.L = value & 0xff;
  }
}

import { CPU_Flag_Register } from "./CPU_Flag_Register";
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
  /**
   * @description
   *  These are the Registers that our gameboy cpu will use.
   *	These 8bit Registers we can also combine into 16bit
   *  using bitshifting and other bitwise operations
   **/
  register: IRegisters = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: new CPU_Flag_Register(0),
    G: 0,
    H: 0,
    L: 0,
    PC: 0, // 16 bit register
  };

  constructor() {}
  /**
   * @returns a 16bit Address of AF by bit shifting Register A to
   * the left by 8 increments and using the OR(|) bitwise operator
   * to combine both addresses
   */
  getAF() {
    return (this.register.A << 8) | this.register.F.getFRegister();
  }
  /**
   * @returns a 16bit Address of BC by bit shifting Register B to
   * the left by 8 increments and using the OR(|) bitwise operator
   * to combine both addresses
   */
  getBC() {
    return (this.register.B << 8) | this.register.C;
  }

  /**
   *
   * @param {number} value - value of Register BC
   * this function sets the value of Register BC
   * it gets the param value and splits it into 2 parts
   * Register BC
   * 15------8 7-------0
   * 0000 0000 0000 0000
   * Bits 15-8 are set to register B
   * Bits 7-0 are set to register
   * for further details of bit masking check out
   * @link https://www.geeksforgeeks.org/what-is-bitmasking/
   **/
  setBC(value: number) {
    // mask out the bits 7-0 and shift bits 15-8 to the right by 8bits
    // to make it 8bits
    this.register.B = (value & 0xff00) >> 8;
    //mask out the bits 15-8 to get only bits 8-0
    this.register.C = value & 0xff;
  }
  getDE() {
    return (this.register.D << 8) | this.register.E;
  }

  setDE(value: number) {
    this.register.D = (value & 0xff00) >> 8;
    this.register.E = value & 0xff;
  }

  getHL() {
    return (this.register.H << 8) | this.register.L;
  }
  setHL(value: number) {
    this.register.H = (value & 0xff00) >> 8;
    this.register.L = value & 0xff;
  }
}

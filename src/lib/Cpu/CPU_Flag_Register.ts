import { Cpu_Register } from "./CPU_Register";

export class Cpu_Flag_Register extends Cpu_Register {
  static #zeroFlagPosition = 0b1000_0000;
  static #subtractionFlagPosition = 0b0100_0000;
  static #halfCarryFlagPosition = 0b0010_0000;
  static #carryFlagPosition = 0b0001_0000;

  // 0000 0000
  //   #flag = { Z: 0, N: 0, H: 0, CY: 0 };

  //  bits 0-3 are not needed for used in the Flag

  // note to lue
  // this flag should only be handled by the instruction set
  // not the actual class itself

  getZFlag() {
    const value = this.value & Cpu_Flag_Register.#zeroFlagPosition;
    return value != 0 ? 1 : 0;
  }

  getNFlag() {
    const value = this.value & Cpu_Flag_Register.#subtractionFlagPosition;
    return value != 0 ? 1 : 0;
  }

  getHFlag() {
    const value = this.value & Cpu_Flag_Register.#halfCarryFlagPosition;
    return value != 0 ? 1 : 0;
  }

  getCYFlag() {
    const value = this.value & Cpu_Flag_Register.#carryFlagPosition;
    return value != 0 ? 1 : 0;
  }

  getFRegister() {
    return this.value;
  }

  setZFlag() {
    // check if the output of the operation is zero
    //  if it is zero mark the flag as 1

    this.value ^= 0b10000000;
  }
  //   when raising the subtraction flag, it will only be raised when the last operation is subtraction
  setNFlag() {
    this.value ^= 0b01000000;
  }
  setHFlag() {
    this.value ^= 0b00100000;
  }
  setCYFlag() {
    this.value ^= 0b00010000;
  }
}

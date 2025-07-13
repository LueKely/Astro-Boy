import { Cpu_Register } from "./CPU_Register";

export class Cpu_Flag_Register extends Cpu_Register<"F"> {
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

  setZFlag() {
    this.value |= Cpu_Flag_Register.#zeroFlagPosition;
  }

  //   when raising the subtraction flag, it will only be raised when the last operation is subtraction
  setNFlag() {
    this.value |= Cpu_Flag_Register.#subtractionFlagPosition;
  }

  setHFlag() {
    this.value |= Cpu_Flag_Register.#halfCarryFlagPosition;
  }

  setCYFlag() {
    this.value |= Cpu_Flag_Register.#carryFlagPosition;
  }

  clearZFlag() {
    this.value &= ~Cpu_Flag_Register.#zeroFlagPosition;
  }
  clearNFlag() {
    this.value &= ~Cpu_Flag_Register.#subtractionFlagPosition;
  }
  clearHFlag() {
    this.value &= ~Cpu_Flag_Register.#halfCarryFlagPosition;
  }
  clearCYFlag() {
    this.value &= ~Cpu_Flag_Register.#carryFlagPosition;
  }
}

export class CPU_Flag_Register {
  static #zeroFlagPosition = 7;
  static #subtractionFlagPosition = 6;
  static #halfCarryFlagPosition = 5;
  static #carryFlagPosition = 4;
  #register: number = 0;
  // 0000 0000
  //   #flag = { Z: 0, N: 0, H: 0, CY: 0 };

  //  bits 0-3 are not needed for used in the Flag

  // note to lue
  // this flag should only be handled by the instruction set
  // not the actual class itself
  constructor(register: number) {
    this.#register = register;
  }
  // FIX ME/UNDERSTAND ME: Clearly lue you kinda don't know how this works
  getZFlag() {
    return this.#register >> CPU_Flag_Register.#zeroFlagPosition;
  }

  getNFlag() {
    return this.#register >> CPU_Flag_Register.#subtractionFlagPosition;
  }

  getHFlag() {
    return this.#register >> CPU_Flag_Register.#halfCarryFlagPosition;
  }

  getCYFlag() {
    return this.#register >> CPU_Flag_Register.#carryFlagPosition;
  }

  getFRegister() {
    return this.#register;
  }

  setZFlag() {
    // check if the output of the operation is zero
    //  if it is zero mark the flag as 1

    this.#register ^= 0b10000000;
  }
  //   when raising the subtraction flag, it will only be raised when the last operation is subtraction
  setNFlag() {
    this.#register ^= 0b01000000;
  }
  setHFlag() {
    this.#register ^= 0b00100000;
  }
  setCYFlag() {
    this.#register ^= 0b00010000;
  }
}

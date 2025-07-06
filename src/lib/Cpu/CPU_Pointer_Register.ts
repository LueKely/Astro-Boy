// note not tested will test later
export class Cpu_Pointer_Register {
  #value: number;

  constructor(value: number) {
    this.#value = value;
  }

  getRegister() {
    return this.#value;
  }

  setRegister(value: number) {
    // sanitize value with and operand
    this.#value = value & 0xffff;
  }
}

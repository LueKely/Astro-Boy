// note not tested will test later
export class CPU_Pointer_Register {
  #value: number;

  constructor(value: number) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  setValue(value: number) {
    // sanitize value with and operand
    this.#value = value & 0xffff;
  }
}

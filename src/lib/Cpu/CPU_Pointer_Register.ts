// note not tested will test later
type PointerType = "SP" | "PC";

export class Cpu_Pointer_Register<T extends PointerType> {
  #value: number;
  private readonly __brand!: T;

  constructor(value: number) {
    this.#value = value;
  }

  getRegister() {
    console.log(this.#value);

    return this.#value;
  }

  setRegister(value: number) {
    // sanitize value with and operand
    this.#value = value & 0xffff;
  }
  getBrand() {
    return this.__brand;
  }
}

type T8BitRegisters = "A" | "B" | "C" | "D" | "E" | "F" | "H" | "L";
type T16BitRegisters = "AF" | "BC" | "DE" | "HL";

export class Cpu_Register<T extends T8BitRegisters> {
  protected value: number = 0;
  // will use this brand for error throwing but no errors just yet
  private readonly __brand!: T;

  constructor(value: number) {
    this.value = value;
  }
  getRegister() {
    return this.value;
  }
  setRegister(value: number) {
    // sanitize our value to only store 8bits
    this.value = value & 0xff;
  }

  getBrand() {
    return this.__brand;
  }
}

export class Cpu_Register_16Bit<T extends T16BitRegisters> {
  protected firstRegister: Cpu_Register<any>;
  protected secondRegister: Cpu_Register<any>;
  private readonly __brand!: T;
  constructor(
    firstRegister: Cpu_Register<any>,
    secondRegister: Cpu_Register<any>
  ) {
    this.firstRegister = firstRegister;
    this.secondRegister = secondRegister;
  }
  /**
   * @returns a 16bit Address of BC by bit shifting Register B to
   * the left by 8 increments and using the OR(|) bitwise operator
   * to combine both addresses
   */
  getRegister() {
    return (
      (this.firstRegister.getRegister() << 8) |
      this.secondRegister.getRegister()
    );
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
   * Bits 7-0 are set to register C
   * for further details of bit masking check out
   * @link https://www.geeksforgeeks.org/what-is-bitmasking/
   **/
  setRegister(value: number) {
    // mask out the bits 7-0 and shift bits 15-8 to the right by 8bits
    // to make it 8bit

    // sanitize our value to only store up to 16bits
    const value16 = value & 0xffff;

    this.firstRegister.setRegister((value16 & 0xff00) >> 8);
    //mask out the bits 15-8 to get only bits 8-0
    this.secondRegister.setRegister(value16 & 0xff);
  }

  getBrand() {
    return this.__brand;
  }
}

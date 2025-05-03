export class CPU_Flag_Register {
  static #zeroFlagPosition = 7;
  static #subtractionFlagPosition = 6;
  static #halfCarryFlagPosition = 5;
  static #carryFlagPosition = 4;
  register: number = 0;
  #flag = { Z: 0, N: 0, H: 0, CY: 0 };

  constuctor(register: number) {
    this.register = register;
  }
  // 0000 0000

  // convert to carry flag and back to 8 bits again
  //   get and set all flags

  setZFlag(output: number) {
    // check if the output of the operation
  }
  setNFlag(condition: boolean) {}
  setHFlag(condition: boolean) {}
  setCYFlag(condition: boolean) {}
}

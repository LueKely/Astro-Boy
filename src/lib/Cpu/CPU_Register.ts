export class Cpu_Register {
  protected value: number = 0;
  constructor(value: number) {
    this.value = value;
  }
  getRegister() {
    return this.value;
  }
  setRegister(value: number) {
    this.value = value;
  }
}

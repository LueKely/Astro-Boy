// note not tested will test later

import { Cpu_Register_16Bit } from "./CPU_Register";
export class Program_Counter_Register extends Cpu_Register_16Bit<"PC"> {
  increment() {
    this.setRegister(this.getRegister() + 1);
  }
}
export class Stack_Pointer_Register extends Cpu_Register_16Bit<"SP"> {
  decrement() {
    this.setRegister(this.getRegister() - 1);
  }
  increment() {
    this.setRegister(this.getRegister() + 1);
  }
}

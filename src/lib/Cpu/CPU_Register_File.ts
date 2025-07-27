import { Ram } from "../Ram/Ram";
import { Cpu_Flag_Register } from "./CPU_Flag_Register";
import { Cpu_Pointer_Register } from "./CPU_Pointer_Register";
import { Cpu_Register, Cpu_Register_16Bit } from "./CPU_Register";

/*
 * The CPU REGISTER
 * Please refer to https://gbdev.io/pandocs/CPU_Registers_and_Flags.html
 * 7-------07-------0
 * |   A   ||   F   |  => Acumulator & Flags
 * |   B   ||   C   |
 * |   D   ||   E   |
 * |   H   ||   L   |
 * 15---------------0
 * |       SP       |  => Stack Pointer
 * |       PC       |  => Program Counter/Pointer
 * |----------------|
 */

export class Cpu_Register_File {
  readonly register = {
    A: new Cpu_Register<"A">(0),
    B: new Cpu_Register<"B">(0),
    C: new Cpu_Register<"C">(0),
    D: new Cpu_Register<"D">(0),
    E: new Cpu_Register<"E">(0),
    F: new Cpu_Flag_Register(0),
    H: new Cpu_Register<"H">(0),
    L: new Cpu_Register<"L">(0),
  };

  readonly pointers = {
    PC: new Cpu_Pointer_Register<"SP">(0),
    SP: new Cpu_Pointer_Register<"PC">(0),
  };

  readonly register16Bit = {
    AF: new Cpu_Register_16Bit<"AF">(this.register.A, this.register.F),
    BC: new Cpu_Register_16Bit<"BC">(this.register.B, this.register.C),
    DE: new Cpu_Register_16Bit<"DE">(this.register.D, this.register.E),
    HL: new Cpu_Register_16Bit<"HL">(this.register.H, this.register.L),
  };
}

import { Ram } from '../Ram/Ram';
import { Cpu_Flag_Register } from './CPU_Flag_Register';
import { Program_Counter_Register, Stack_Pointer_Register } from './CPU_Pointer_Register';
import { Cpu_Register, Cpu_Register_16Bit } from './CPU_Register';

/*
 * The CPU REGISTER
 * Please refer to https://gbdev.io/pandocs/CPU_Registers_and_Flags.html
 * 7-------07-------0
 * |   A   ||   F   |  => Acumulator & Flags
 * |   B   ||   C   |
 * |   D   ||   E   |
 * 15---------------0
 * |   H   ||   L   |
 * |       SP       |  => Stack Pointer
 * |       PC       |  => Program Counter/Pointer
 * |----------------|
 */

export class Register_File {
    A = new Cpu_Register<'A'>(0);
    B = new Cpu_Register<'B'>(0);
    C = new Cpu_Register<'C'>(0);
    D = new Cpu_Register<'D'>(0);
    E = new Cpu_Register<'E'>(0);
    F = new Cpu_Flag_Register(0);
    H = new Cpu_Register<'H'>(0);
    L = new Cpu_Register<'L'>(0);

    // i think i might've shoot myself on the foot
    //this'll be a temporary solution for now (i hope)
    private S = new Cpu_Register<any>(0);
    private P = new Cpu_Register<any>(0);

    // PC
    private Z = new Cpu_Register<any>(0);
    private N = new Cpu_Register<any>(0);

    readonly pointers = {
        PC: new Program_Counter_Register(this.Z, this.N, 0x100),
        SP: new Stack_Pointer_Register(this.S, this.P, 0xffee),
    };

    readonly register16Bit = {
        AF: new Cpu_Register_16Bit<'AF'>(this.A, this.F),
        BC: new Cpu_Register_16Bit<'BC'>(this.B, this.C),
        DE: new Cpu_Register_16Bit<'DE'>(this.D, this.E),
        HL: new Cpu_Register_16Bit<'HL'>(this.H, this.L),
    };

    HALT = false;
    STOP = false;
    IME = false;
}

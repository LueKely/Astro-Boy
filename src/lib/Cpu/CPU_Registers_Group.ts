import { Cpu_Flag_Register } from './CPU_Flag_Register';
import { Cpu_Register, Cpu_Register_16Bit } from './CPU_Register';

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

export class CPU_Registers_Group {
	/**
	 * @description
	 *  These are the Registers that our gameboy cpu will use.
	 *	These 8bit Registers we can also combine into 16bit
	 *  using bitshifting and other bitwise operations
	 **/
	readonly register = {
		A: new Cpu_Register(0),
		B: new Cpu_Register(0),
		C: new Cpu_Register(0),
		D: new Cpu_Register(0),
		E: new Cpu_Register(0),
		F: new Cpu_Flag_Register(0),
		H: new Cpu_Register(0),
		L: new Cpu_Register(0),
	};

	// NOTE: hmmm i might remove this and just make a object for PC and SP
	readonly pointers = {
		PC: new Cpu_Register(0),
		SP: new Cpu_Register(0),
	};

	readonly register16Bit = {
		AF: new Cpu_Register_16Bit(this.register.A, this.register.F),
		BC: new Cpu_Register_16Bit(this.register.B, this.register.C),
		DE: new Cpu_Register_16Bit(this.register.D, this.register.E),
		HL: new Cpu_Register_16Bit(this.register.H, this.register.L),
	};
}

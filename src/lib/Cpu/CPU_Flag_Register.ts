import { Cpu_Register } from './CPU_Register';

export class Cpu_Flag_Register extends Cpu_Register {
	static #zeroFlagPosition = 7;
	static #subtractionFlagPosition = 6;
	static #halfCarryFlagPosition = 5;
	static #carryFlagPosition = 4;

	// 0000 0000
	//   #flag = { Z: 0, N: 0, H: 0, CY: 0 };

	//  bits 0-3 are not needed for used in the Flag

	// note to lue
	// this flag should only be handled by the instruction set
	// not the actual class itself

	// FIX ME/UNDERSTAND ME: Clearly lue you kinda don't know how this works
	// present lue i know na this bro
	// ganto nalang muna to because pag get lang naman muna eh so we gucci bro
	getZFlag() {
		return this.value >> Cpu_Flag_Register.#zeroFlagPosition;
	}

	getNFlag() {
		return this.value >> Cpu_Flag_Register.#subtractionFlagPosition;
	}

	getHFlag() {
		return this.value >> Cpu_Flag_Register.#halfCarryFlagPosition;
	}

	getCYFlag() {
		return this.value >> Cpu_Flag_Register.#carryFlagPosition;
	}

	getFRegister() {
		return this.value;
	}

	setZFlag() {
		// check if the output of the operation is zero
		//  if it is zero mark the flag as 1

		this.value ^= 0b10000000;
	}
	//   when raising the subtraction flag, it will only be raised when the last operation is subtraction
	setNFlag() {
		this.value ^= 0b01000000;
	}
	setHFlag() {
		this.value ^= 0b00100000;
	}
	setCYFlag() {
		this.value ^= 0b00010000;
	}
}

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

export class Cpu_Register_16Bit {
	protected firstRegister: Cpu_Register;
	protected secondRegister: Cpu_Register;

	constructor(firstRegister: Cpu_Register, secondRegister: Cpu_Register) {
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
	 * Bits 7-0 are set to register
	 * for further details of bit masking check out
	 * @link https://www.geeksforgeeks.org/what-is-bitmasking/
	 **/
	setRegister(value: number) {
		// mask out the bits 7-0 and shift bits 15-8 to the right by 8bits
		// to make it 8bits
		this.firstRegister.setRegister((value & 0xff00) >> 8);
		//mask out the bits 15-8 to get only bits 8-0
		this.secondRegister.setRegister(value & 0xff);
	}
}

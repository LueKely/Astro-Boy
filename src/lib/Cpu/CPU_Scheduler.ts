import type { CPU } from './CPU';
import { CpuOpcodeRecord } from './CPU_Opcode_Record';
import type { IOpCodeEntry } from './types/Opcode';

// dear viewer
// i lue, made an attempt to make a working scheduler
// for the machine cycle of this bad boy
// tho due to nature of how my opcodes work
// some of the machine cycles will be just logs i guess
// hopefully it'll all be bebetter soon lol

export class Cpu_Scheduler {
	private queue = [];
	private lowByte = 0;
	private highByte = 0;
	private cpu: CPU;
	private opCodes: Record<number, IOpCodeEntry>;

	constructor(CPU: CPU) {
		this.cpu = CPU;
		this.opCodes = CpuOpcodeRecord(this.cpu);
	}

	private readByte(pointer: number, cartridge: []) {
		return cartridge[pointer];
	}

	setLowByte(value: number) {
		this.lowByte = value & 0b0000_0011;
	}

	setHighByte(value: number) {
		this.highByte = (value & 0b0000_1100) >> 2;
	}

	getLowByte() {
		return this.lowByte;
	}

	getHighByte() {
		return this.highByte;
	}

	tick() {}
}

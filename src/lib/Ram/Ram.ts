// features to do
// logging feature
// making some addresses readonly prolly make this some sort of hook

export class Ram {
	protected memory: Uint8Array;

	constructor() {
		this.memory = new Uint8Array(0x10000);
	}

	getMemory() {
		return this.memory;
	}

	getMemoryAt(index: number) {
		return this.memory[index];
	}

	setMemoryAt(pointer: number, value: number) {
		this.memory[pointer] = value & 0xff;
	}
}

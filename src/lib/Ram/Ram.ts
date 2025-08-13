// features to do
// logging feature
// making some addresses readonly prolly make this some sort of hook

export class Ram {
  protected memory: Uint8Array;

  constructor() {
    this.memory = new Uint8Array(0x10000);
  }
  // is hardware controlled
  setIE() {}

  getIE() {
    return this.memory[0xffff];
  }
  getIF() {
    return this.memory[0xff0f];
  }

  isAllowedToInterrupt() {
    return (this.getIE() & this.getIF()) != 0;
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

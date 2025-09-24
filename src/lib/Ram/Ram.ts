// features to do
// logging feature
// making some addresses readonly prolly make this some sort of hook

export class Ram {
    protected memory: Uint8Array;

    constructor() {
        this.memory = new Uint8Array(0x10000);
        // this ain't accurate chief
        // this.memory.fill(0);
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

    stopValidation() {
        return ((this.getIE() && 0b1_0000) & (this.getIF() && 0b1_0000)) != 0;
    }

    getMemory() {
        return this.memory;
    }

    getMemoryAt(index: number) {
        if (this.memory[index] == undefined) throw new Error('INVALID VALUE');

        return this.memory[index];
    }

    setMemoryAt(pointer: number, value: number) {
        // console.log('Wrote at address: ' + pointer + ' wit the value of: ' + value);

        this.memory[pointer] = value & 0xff;
    }

    copyROM(raw: Uint8Array) {
        raw.forEach((value, index) => {
            this.setMemoryAt(index, value);
        });
    }

    getVramCut() {
        return this.memory.slice(0x8000, 0x97ff);
    }

    getTileMapIndicesA() {
        return this.memory.slice(0x9800, 0x9bff);
    }

    getTileMapIndicesB() {
        return this.memory.slice(0x9c00, 0x9fff);
    }
}

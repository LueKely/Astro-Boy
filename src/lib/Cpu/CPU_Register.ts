type T8BitRegisters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'H' | 'L';
type T16BitRegisters = 'AF' | 'BC' | 'DE' | 'HL' | 'SP' | 'PC';

class Cpu_Register<T extends T8BitRegisters> {
    protected value: number = 0;
    // will use this brand for error throwing but no errors just yet
    private readonly __brand!: T;

    constructor(value: number) {
        this.value = value;
    }
    getRegister() {
        return this.value;
    }
    setRegister(value: number) {
        // sanitize our value to only store 8bits
        this.value = value & 0xff;
    }

    getBrand() {
        return this.__brand;
    }
}

class Cpu_Register_16Bit<T extends T16BitRegisters> {
    protected firstRegister: Cpu_Register<any>;
    protected secondRegister: Cpu_Register<any>;
    private readonly __brand!: T;
    constructor(
        firstRegister: Cpu_Register<any>,
        secondRegister: Cpu_Register<any>,
        value: number = 0
    ) {
        this.firstRegister = firstRegister;
        this.secondRegister = secondRegister;
        this.setRegister(value);
    }

    getRegister() {
        return (this.firstRegister.getRegister() << 8) | this.secondRegister.getRegister();
    }

    setRegister(value: number) {
        const value16 = value & 0xffff;

        this.firstRegister.setRegister((value16 & 0xff00) >> 8);
        //mask out the bits 15-8 to get only bits 8-0
        this.secondRegister.setRegister(value16 & 0xff);
    }
}

export { Cpu_Register, Cpu_Register_16Bit };

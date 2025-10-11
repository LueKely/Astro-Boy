import { describe, expect, test } from 'vitest';
import { Register_File } from '../Register_File';
import { Ram } from '../../Ram/Ram';
import {
    RLA,
    RLCA,
    RLCHL,
    RLCR8,
    RLHL,
    RLR8,
    RRA,
    RRCA,
    RRCHL,
    RRCR8,
    RRHL,
    RRR8,
    SLAHL,
    SLAR8,
    SRAHL,
    SRAR8,
    SRLHL,
    SRLR8,
    SWAPHL,
    SWAPR8,
} from '../instructions/Bit_Shift_Logic_Instructions';

class TestCPU {
    cpu;
    ram;

    constructor() {
        this.ram = new Ram();
        this.cpu = new Register_File();
    }

    setHLPointTest(value: number) {
        this.cpu.register16Bit.HL.setRegister(value);
        this.ram.write(this.cpu.register16Bit.HL.getRegister(), value);
    }
}
// to future lue form past lue
// you could've made all the [Hl] operations and non [HL]
// operations seperately and made like a loop or something
// less tedious from this
// - past lue july 21

describe('RL r8', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { B, F } = testCPU.cpu;
        B.setRegister(0b1000_0000);
        RLR8(B, F);
        expect(B.getRegister()).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(1);
    });
    test('the value of the register should be 1 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { B, F } = testCPU.cpu;
        B.setRegister(0b1000_0000);
        F.setCYFlag();

        RLR8(B, F);

        expect(B.getRegister()).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 5 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { B, F } = testCPU.cpu;
        B.setRegister(0b1000_0010);
        F.setCYFlag();
        RLR8(B, F);
        expect(B.getRegister()).toBe(0b0000_0101);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RLA r8', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1000_0000);
        RLA(A, F);
        expect(A.getRegister()).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(0);
    });
    test('the value of the register should be 1 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1000_0000);
        F.setCYFlag();
        RLA(A, F);

        expect(A.getRegister()).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 5 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1000_0010);
        F.setCYFlag();
        RLA(A, F);
        expect(A.getRegister()).toBe(0b0000_0101);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RL [HL]', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0000);

        RLHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(1);
    });
    test('the value of the register should be 1 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0000);
        F.setCYFlag();

        RLHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 3 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0001);
        F.setCYFlag();

        RLHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0011);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RLC r8', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { B, F } = testCPU.cpu;
        B.setRegister(0b0000_0000);
        RLCR8(B, F);
        expect(B.getRegister()).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(1);
    });
    test('the value of the register should be 1 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { B, F } = testCPU.cpu;
        B.setRegister(0b1000_0000);

        RLCR8(B, F);

        expect(B.getRegister()).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 5 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { B, F } = testCPU.cpu;
        B.setRegister(0b1000_0010);
        RLCR8(B, F);
        expect(B.getRegister()).toBe(0b0000_0101);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RLC [HL]', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0000_0000);

        RLCHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(1);
    });
    test('the value of the register should be 1 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0000);

        RLCHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 3 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0001);

        RLCHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0011);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RLCA r8', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0000);
        RLCA(A, F);
        expect(A.getRegister()).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(0);
    });
    test('the value of the register should be 1 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1000_0000);

        RLCA(A, F);

        expect(A.getRegister()).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 5 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1000_0010);
        RLCA(A, F);
        expect(A.getRegister()).toBe(0b0000_0101);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RR r8', () => {
    test('value of register should be 0, CY and Z flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0001);
        RRR8(A, F);
        expect(A.getRegister()).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1001_0000);
    });
    test('value of register should be 129, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0011);
        F.setCYFlag();
        RRR8(A, F);
        expect(A.getRegister()).toBe(0b1000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 1, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0011);

        RRR8(A, F);
        expect(A.getRegister()).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RR [HL]', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0000_0000);

        RRHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(1);
    });

    test('the value of the register should be 192 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0000);
        F.setCYFlag();
        RRHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b1100_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });

    test('the value of the register should be 192 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0001);
        F.setCYFlag();
        RRHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b1100_0000);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RR A', () => {
    test('value of register should be 0, CY is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0001);
        RRA(A, F);
        expect(A.getRegister()).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 129, CY is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0011);
        F.setCYFlag();
        RRA(A, F);
        expect(A.getRegister()).toBe(0b1000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 1, CY is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0011);

        RRA(A, F);
        expect(A.getRegister()).toBe(0b0000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RRC r8', () => {
    test('value of register should be 128, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0001);
        RRCR8(A, F);
        expect(A.getRegister()).toBe(0b1000_0000);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 129, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0011);
        F.setCYFlag();
        RRCR8(A, F);
        expect(A.getRegister()).toBe(0b1000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 4, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_1000);

        RRCR8(A, F);
        expect(A.getRegister()).toBe(0b0000_0100);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('RRC [HL]', () => {
    test('Results Should be zero and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0000_0000);

        RRCHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getZFlag()).toBe(1);
    });

    test('the value of the register should be 64 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0000);
        RRCHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0100_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });

    test('the value of the register should be 192 when CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0001);
        RRCHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b1100_0000);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('RRC A', () => {
    test('value of register should be 128, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0001);
        RRCA(A, F);
        expect(A.getRegister()).toBe(0b1000_0000);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 129, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0011);
        F.setCYFlag();
        RRCA(A, F);
        expect(A.getRegister()).toBe(0b1000_0001);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 4, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_1000);

        RRCA(A, F);
        expect(A.getRegister()).toBe(0b0000_0100);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('SLA r8', () => {
    test('value of register should be 232, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0111_0100);
        SLAR8(A, F);
        expect(A.getRegister()).toBe(0b1110_1000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
    test('value of register should be 74, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1010_0101);
        SLAR8(A, F);
        expect(A.getRegister()).toBe(0b0100_1010);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 4, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_1000);

        SLAR8(A, F);
        expect(A.getRegister()).toBe(0b0001_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('SLA [HL]', () => {
    test('Results Should be 116 and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0111_0100);

        SLAHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b1110_1000);
        expect(F.getZFlag()).toBe(0);
    });
    test('the value of the register should be 0 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0000);

        SLAHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1001_0000);
    });

    test('the value of the register should be 129 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1000_0001);

        SLAHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0010);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
});

describe('SRA r8', () => {
    test('value of register should be 232, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0111_0100);
        SRAR8(A, F);
        expect(A.getRegister()).toBe(0b0011_1010);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
    test('value of register should be 74, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1010_0101);
        SRAR8(A, F);
        expect(A.getRegister()).toBe(0b1101_0010);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 4, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0001);

        SRAR8(A, F);
        expect(A.getRegister()).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1001_0000);
    });
});

describe('SRA [HL]', () => {
    test('Results Should be 116 and flag zero should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0111_0100);

        SRAHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0011_1010);
        expect(F.getZFlag()).toBe(0);
    });
    test('the value of the register should be 0 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1010_0101);

        SRAHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b1101_0010);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 129 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0000_0001);

        SRAHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1001_0000);
    });
});

describe('SRL r8', () => {
    test('value of register should be 58, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0111_0100);
        SRLR8(A, F);
        expect(A.getRegister()).toBe(0b0011_1010);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
    test('value of register should be 82, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1010_0101);
        SRLR8(A, F);
        expect(A.getRegister()).toBe(0b0101_0010);
        expect(F.getRegister()).toBe(0b0001_0000);
    });
    test('value of register should be 0, CY and Z flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0001);

        SRLR8(A, F);
        expect(A.getRegister()).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1001_0000);
    });
});

describe('SRL [HL]', () => {
    test('Results Should be 254 and no flag should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b11111110);

        SRLHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b01111111);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
    test('the value of the register should be 82 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1010_0101);

        SRLHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0101_0010);
        expect(F.getRegister()).toBe(0b0001_0000);
    });

    test('the value of the register should be 0 and Z & CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0000_0001);

        SRLHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1001_0000);
    });
});

describe('SWAP r8', () => {
    test('value of register should be 58, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0111_0100);
        SWAPR8(A, F);
        expect(A.getRegister()).toBe(0b0100_0111);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
    test('value of register should be 74, CY flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b1010_0101);
        SWAPR8(A, F);
        expect(A.getRegister()).toBe(0b0101_1010);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
    test('value of register should be 4, no flag is raised ', () => {
        const testCPU = new TestCPU();
        const { A, F } = testCPU.cpu;
        A.setRegister(0b0000_0000);

        SWAPR8(A, F);
        expect(A.getRegister()).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1000_0000);
    });
});

describe('SWAP [HL]', () => {
    test('Results Should be 254 and no flag should raise', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1111_1110);

        SWAPHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b1110_1111);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
    test('the value of the register should be 82 and CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b1010_0101);

        SWAPHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0101_1010);
        expect(F.getRegister()).toBe(0b0000_0000);
    });

    test('the value of the register should be 0 and Z & CYFlag is raised', () => {
        const testCPU = new TestCPU();
        const { F } = testCPU.cpu;
        const { HL } = testCPU.cpu.register16Bit;
        testCPU.setHLPointTest(0b0000_0000);

        SWAPHL(HL, testCPU.ram, F);
        expect(testCPU.ram.read(HL.getRegister())).toBe(0b0000_0000);
        expect(F.getRegister()).toBe(0b1000_0000);
    });
});

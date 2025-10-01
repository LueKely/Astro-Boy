import { describe, expect, test } from 'vitest';
import { Register_File } from '../Register_File';
import {
    ANDAHL,
    ANDAN8,
    ANDAR8,
    CPL,
    ORAHL,
    ORAN8,
    ORAR8,
    XORAHL,
    XORAN8,
    XORAR8,
} from '../instructions/Bitwise_Logic_Instructions';
import { Ram } from '../../Ram/Ram';

describe('Functionalities of AND A, R8', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b0000_0000);
        C.setRegister(0b0000_0000);

        ANDAR8(A, C, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b1111_1111);
        C.setRegister(0b0000_0000);

        ANDAR8(A, C, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b0000_1111);
        C.setRegister(0b0000_0000);

        ANDAR8(A, C, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });

    test('the value should be 0b0000_11111 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b10101_1111);
        C.setRegister(0b0000_1111);

        ANDAR8(A, C, F);

        expect(A.getRegister()).toBe(0b0000_1111);
        expect(F.getRegister()).toBe(0b0010_0000);
    });
});

describe('Functionalities of AND A, [HL]', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;
        const { HL } = CPU.register16Bit;
        const dummyRam = new Ram();

        A.setRegister(0b0000_0000);
        HL.setRegister(0b0000_0000);
        dummyRam.setMemoryAt(HL.getRegister(), 0b0000_0000);

        ANDAHL(A, HL, F, dummyRam);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;
        const { HL } = CPU.register16Bit;
        const dummyRam = new Ram();

        A.setRegister(0b0000_0000);
        HL.setRegister(0b1111_0000);
        dummyRam.setMemoryAt(HL.getRegister(), 0b0000_0000);

        ANDAHL(A, HL, F, dummyRam);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });

    test('the value should be 0b0000_11111 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;
        const { HL } = CPU.register16Bit;
        const dummyRam = new Ram();

        A.setRegister(0b0000_1111);
        HL.setRegister(0b0001_1111);
        dummyRam.setMemoryAt(HL.getRegister(), 0b0001_1111);

        ANDAHL(A, HL, F, dummyRam);

        expect(A.getRegister()).toBe(0b0000_1111);
        expect(F.getRegister()).toBe(0b0010_0000);
    });
});

describe('Functionalities of AND A, N8', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b0000_0000);

        ANDAN8(A, 0b0000_0000, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b1111_1111);

        ANDAN8(A, 0b0000_0000, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b0000_1111);

        ANDAN8(A, 0b0000_0000, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1010_0000);
    });

    test('the value should be 0b0000_11111 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b10101_1111);

        ANDAN8(A, 0b0000_1111, F);

        expect(A.getRegister()).toBe(0b0000_1111);
        expect(F.getRegister()).toBe(0b0010_0000);
    });
});

describe('Tests the functions of CPL', () => {
    test('The value 1111_0000 should be 0000_1111; N and H flags should raise', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b1111_0000);
        CPL(A, F);
        expect(A.getRegister()).toBe(0b0000_1111);
        expect(F.getRegister()).toBe(0b0110_0000);
    });
});

describe('Tests the fucntionality of OR A,R8', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b0000_0000);
        C.setRegister(0b0000_0000);

        ORAR8(A, C, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1000_0000);
    });

    test('the value should be 144 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b1000_0000);
        C.setRegister(0b0001_0000);

        ORAR8(A, C, F);

        expect(A.getRegister()).toBe(0b1001_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('Functionalities of OR A, [HL]', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;
        const { HL } = CPU.register16Bit;
        const dummyRam = new Ram();

        A.setRegister(0b0000_0000);
        HL.setRegister(0b0000_0000);
        dummyRam.setMemoryAt(HL.getRegister(), 0b0000_0000);

        ORAHL(A, HL, F, dummyRam);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1000_0000);
    });
    test('the value should be 256 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;
        const { HL } = CPU.register16Bit;
        const dummyRam = new Ram();

        A.setRegister(0b1010_1111);
        HL.setRegister(0b1111_0000);
        dummyRam.setMemoryAt(HL.getRegister(), 0b1111_0000);

        ORAHL(A, HL, F, dummyRam);

        expect(A.getRegister()).toBe(0b1111_1111);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('Tests the fucntionality of OR A,N8', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b0000_0000);

        ORAN8(A, 0b0000_0000, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1000_0000);
    });

    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b1111_1111);

        ORAN8(A, 0b1111_1111, F);

        expect(A.getRegister()).toBe(0b1111_1111);
        expect(F.getRegister()).toBe(0b0000_0000);
    });

    test('the value should be 144 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b1000_0000);

        ORAN8(A, 0b0001_0000, F);

        expect(A.getRegister()).toBe(0b1001_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('Tests the fucntionality of XOR A,R8', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b0000_0000);
        C.setRegister(0b0000_0000);

        XORAR8(A, C, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1000_0000);
    });

    test('the value should be 144 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b1000_0000);
        C.setRegister(0b0001_0000);

        XORAR8(A, C, F);

        expect(A.getRegister()).toBe(0b1001_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });

    test('the value should be 128 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, C, F } = CPU;

        A.setRegister(0b1001_0000);
        C.setRegister(0b0001_0000);

        XORAR8(A, C, F);

        expect(A.getRegister()).toBe(0b1000_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('Functionalities of XOR A, [HL]', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;
        const { HL } = CPU.register16Bit;
        const dummyRam = new Ram();

        A.setRegister(0b0000_0000);
        HL.setRegister(0b0000_0000);
        dummyRam.setMemoryAt(HL.getRegister(), 0b0000_0000);

        XORAHL(A, HL, F, dummyRam);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1000_0000);
    });
    test('the value should be 95 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;
        const { HL } = CPU.register16Bit;
        const dummyRam = new Ram();

        A.setRegister(0b1010_1111);
        HL.setRegister(0b1111_0000);
        dummyRam.setMemoryAt(HL.getRegister(), 0b1111_0000);

        XORAHL(A, HL, F, dummyRam);

        expect(A.getRegister()).toBe(0b0101_1111);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

describe('Tests the fucntionality of XOR A,N8', () => {
    test('the value should be zero and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b0000_0000);

        XORAN8(A, 0b0000_0000, F);

        expect(A.getRegister()).toBe(0);
        expect(F.getRegister()).toBe(0b1000_0000);
    });

    test('the value should be 144 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b1000_0000);

        XORAN8(A, 0b0001_0000, F);

        expect(A.getRegister()).toBe(0b1001_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });

    test('the value should be 128 and the flag value should correspond', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;

        A.setRegister(0b1001_0000);

        XORAN8(A, 0b0001_0000, F);

        expect(A.getRegister()).toBe(0b1000_0000);
        expect(F.getRegister()).toBe(0b0000_0000);
    });
});

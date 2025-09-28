import { describe, expect, test } from 'vitest';
import { Register_File } from '../Register_File';

const Register = new Register_File();

describe('Read and Write inside the registers', () => {
    test.each([Register.B, Register.C, Register.D, Register.E])(
        'Each Register should read and write',
        (address) => {
            address.setRegister(5);
            expect(address.getRegister()).equal(5);
        }
    );
});

describe('Read And Write in the 16bit Registers', () => {
    const testCase = [
        {
            r16: Register.register16Bit.AF,
            r8a: Register.A,
            r8b: Register.F,
        },
        {
            r16: Register.register16Bit.BC,
            r8a: Register.B,
            r8b: Register.C,
        },
        {
            r16: Register.register16Bit.DE,
            r8a: Register.D,
            r8b: Register.E,
        },
        {
            r16: Register.register16Bit.HL,
            r8a: Register.H,
            r8b: Register.L,
        },
    ];

    test.each(testCase)('Should Get r16', (registers) => {
        registers.r8a.setRegister(0b0001);
        registers.r8b.setRegister(0b0001);
        expect(registers.r16.getRegister()).toBe(0b000100000001);
    });

    test.each(testCase)('Should Set r16', (registers) => {
        registers.r16.setRegister(4369);
        expect(registers.r16.getRegister()).toBe(4369);
        expect(registers.r8a.getRegister()).toBe(0b00010001);
        expect(registers.r8b.getRegister()).toBe(0b00010001);
    });

    test.each(testCase)('Set r16 value to 69 Excpect r8a to be 0 & r8b to be 69', (registers) => {
        registers.r16.setRegister(69);
        expect(registers.r16.getRegister()).toBe(69);
        expect(registers.r8a.getRegister()).toBe(0);
        expect(registers.r8b.getRegister()).toBe(69);
    });

    test.each(testCase)('Set r8a to 0 and r8b to 69 Expect r16 to be 69', (registers) => {
        registers.r8a.setRegister(0);
        registers.r8b.setRegister(69);
        expect(registers.r16.getRegister()).toBe(69);
    });
});

describe('Flag Register', () => {
    test('Individual Flags', () => {
        // clear the register
        Register.F.setRegister(0);

        Register.F.setZFlag();
        Register.F.setCYFlag();
        Register.F.setHFlag();
        Register.F.setNFlag();

        expect(Register.F.getZFlag()).toBe(1);
        expect(Register.F.getNFlag()).toBe(1);
        expect(Register.F.getHFlag()).toBe(1);
        expect(Register.F.getCYFlag()).toBe(1);
        expect(Register.F.getRegister()).toBe(0b1111_0000);

        Register.F.clearZFlag();
        Register.F.clearCYFlag();
        Register.F.clearHFlag();
        Register.F.clearNFlag();

        expect(Register.F.getHFlag()).toBe(0);
        expect(Register.F.getNFlag()).toBe(0);
        expect(Register.F.getCYFlag()).toBe(0);
        expect(Register.F.getRegister()).toBe(0b0);
    });

    test('Combined Flags', () => {
        // clear the register
        Register.F.setRegister(0);

        Register.F.setCYFlag();
        Register.F.setHFlag();
        expect(Register.F.getRegister()).toBe(0b0011_0000);

        Register.F.clearCYFlag();
        Register.F.clearHFlag();
        expect(Register.F.getRegister()).toBe(0b0);

        Register.F.setCYFlag();
        Register.F.setZFlag();
        expect(Register.F.getRegister()).toBe(0b1001_0000);

        Register.F.clearCYFlag();
        Register.F.clearZFlag();
        expect(Register.F.getRegister()).toBe(0b0);

        Register.F.setCYFlag();
        Register.F.setZFlag();
        Register.F.setHFlag();
        expect(Register.F.getRegister()).toBe(0b1011_0000);

        Register.F.clearCYFlag();
        Register.F.clearZFlag();
        Register.F.clearHFlag();
        expect(Register.F.getRegister()).toBe(0b0);

        Register.F.setCYFlag();
        Register.F.clearZFlag();
        expect(Register.F.getRegister()).toBe(0b0001_0000);
    });
});

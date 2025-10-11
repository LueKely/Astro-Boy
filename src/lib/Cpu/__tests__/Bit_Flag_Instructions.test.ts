import { describe, expect, test } from 'vitest';
import { Register_File } from '../Register_File';
import {
    BITU3HL,
    BITU3R8,
    RESU3HL,
    RESU3R8,
    SETU3HL,
    SETU3R8,
} from '../instructions/Bit_Flag_Instructions';
import { Ram } from '../../Ram/Ram';

describe('Tests the BIT U3, R8 funciton, Flag should be 0b1010_000', () => {
    test('u3 is 1 and R8 is 1', () => {
        const CPU_Register = new Register_File();
        const { B, F } = CPU_Register;

        B.setRegister(1);
        const u3 = 1;

        BITU3R8(u3, B, F);

        expect(F.getRegister()).toBe(0b1010_0000);
    });

    test('u3 is 1 and R8 is 3, Flag should be 0b0010_000', () => {
        const CPU_Register = new Register_File();
        const { B, F } = CPU_Register;

        B.setRegister(3);
        const u3 = 1;

        BITU3R8(u3, B, F);

        expect(F.getRegister()).toBe(0b0010_0000);
    });
});

describe('Tests the BIT U3, [HL] funciton, Flag should be 0b1010_000', () => {
    test('u3 is 1 and [HL] is 1', () => {
        const CPU = new Register_File();
        const ram = new Ram();
        const { F } = CPU;
        const { HL } = CPU.register16Bit;
        HL.setRegister(1);
        ram.write(HL.getRegister(), 1);
        const u3 = 1;

        BITU3HL(u3, HL, ram, F);

        expect(F.getRegister()).toBe(0b1010_0000);
    });

    test('u3 is 1 and R8 is 3, Flag should be 0b0010_000', () => {
        const CPU = new Register_File();
        const ram = new Ram();
        const { F } = CPU;
        const { HL } = CPU.register16Bit;
        HL.setRegister(3);
        ram.write(HL.getRegister(), 3);
        const u3 = 1;

        BITU3HL(u3, HL, ram, F);

        expect(F.getRegister()).toBe(0b0010_0000);
    });
});

describe('Test the RES U3, r8', () => {
    test('turn the bit 3 to 0', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;
        A.setRegister(0b1111_1111);
        const out = 0b1111_0111;
        const u3 = 3;

        RESU3R8(u3, A);
        expect(A.getRegister()).toBe(0b1111_0111);
    });

    test('turn the bit 7 to 0', () => {
        const CPU = new Register_File();
        const { A, F } = CPU;
        A.setRegister(0b1111_1111);
        const out = 0b1111_0111;
        const u3 = 7;

        RESU3R8(u3, A);
        expect(A.getRegister()).toBe(0b0111_1111);
    });
});

describe('Tests the RES U3, [HL] function', () => {
    test('turn bit 3 to 0', () => {
        const CPU = new Register_File();
        const ram = new Ram();
        const { F } = CPU;
        const { HL } = CPU.register16Bit;
        HL.setRegister(0b1111_1111);
        ram.write(HL.getRegister(), 0b1111_1111);
        const u3 = 3;

        RESU3HL(u3, HL, ram);

        expect(ram.read(HL.getRegister())).toBe(0b1111_0111);
    });

    test('turn bit 7 to 0', () => {
        const CPU = new Register_File();
        const ram = new Ram();
        const { F } = CPU;
        const { HL } = CPU.register16Bit;
        HL.setRegister(0b1111_1111);
        ram.write(HL.getRegister(), 0b1111_1111);
        const u3 = 7;

        RESU3HL(u3, HL, ram);

        expect(ram.read(HL.getRegister())).toBe(0b0111_1111);
    });
});

describe('Test the SET U3, r8', () => {
    test('turn the bit 3 to 1', () => {
        const CPU = new Register_File();
        const { A } = CPU;
        A.setRegister(0b1111_0111);
        const out = 0b000_1000;
        const u3 = 3;

        SETU3R8(u3, A);
        expect(A.getRegister()).toBe(0b1111_1111);
    });

    test('turn the bit 7 to 0', () => {
        const CPU = new Register_File();
        const { A } = CPU;
        A.setRegister(0b0111_1111);
        const u3 = 7;

        SETU3R8(u3, A);
        expect(A.getRegister()).toBe(0b1111_1111);
    });
});

describe('Tests the SET U3, [HL] function', () => {
    test('turn bit 3 to 1', () => {
        const CPU = new Register_File();
        const ram = new Ram();
        const { HL } = CPU.register16Bit;
        HL.setRegister(0b1111_0111);
        ram.write(HL.getRegister(), 0b1111_0111);
        const u3 = 3;

        SETU3HL(u3, HL, ram);

        expect(ram.read(HL.getRegister())).toBe(0b1111_1111);
    });

    test('turn bit 7 to 0', () => {
        const CPU = new Register_File();
        const ram = new Ram();
        const { HL } = CPU.register16Bit;
        HL.setRegister(0b0111_1111);
        ram.write(HL.getRegister(), 0b0111_1111);
        const u3 = 7;

        SETU3HL(u3, HL, ram);

        expect(ram.read(HL.getRegister())).toBe(0b1111_1111);
    });
});

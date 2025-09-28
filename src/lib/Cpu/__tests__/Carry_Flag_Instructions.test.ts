import { describe, expect, test } from 'vitest';
import { Register_File } from '../Register_File';
import { CCF, SCF } from '../instructions/Carry_Flag_Instructions';

describe('CCF', () => {
    test('C should be 0 and H, N should be 0', () => {
        const group = new Register_File();
        const { F } = group;
        F.setCYFlag();
        CCF(F);
        expect(F.getCYFlag()).toBe(0);
        expect(F.getHFlag()).toBe(0);
        expect(F.getNFlag()).toBe(0);
    });

    test('C should be 1 and H, N should be 0', () => {
        const group = new Register_File();
        const { F } = group;
        CCF(F);
        expect(F.getCYFlag()).toBe(1);
        expect(F.getHFlag()).toBe(0);
        expect(F.getNFlag()).toBe(0);
    });
});

describe('SCF', () => {
    test('C should be 1 and H, N should be 0', () => {
        const group = new Register_File();
        const { F } = group;
        SCF(F);
        expect(F.getCYFlag()).toBe(1);
        expect(F.getHFlag()).toBe(0);
        expect(F.getNFlag()).toBe(0);
    });
});

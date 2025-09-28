import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

// DONE
describe('lD R16', () => {
    test('LD BC, NN', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { SP } = gameboy.registerFile.pointers;

        const targetValue = 0x2 | (0x03 << 8);

        gameboy.ram.setMemoryAt(0x100, 0x31);
        gameboy.ram.setMemoryAt(0x101, 0x02);
        gameboy.ram.setMemoryAt(0x102, 0x03);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x103);
        expect(SP.getRegister()).toBe(targetValue);
        expect(SP.getRegister() >>> 8).toBe(0x03);
        expect(SP.getRegister() & 0xff).toBe(0x02);
    });
});

// DONE
describe('lD R16', () => {
    test('LD (HL+), A', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { HL } = gameboy.registers.register16Bit;
        const { A } = gameboy;

        const targetValue = 0x10;
        const targetPointer = 0xff;
        HL.setRegister(targetPointer);
        A.setRegister(targetValue);

        gameboy.ram.setMemoryAt(0x100, 0x22);
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x101);
        expect(gameboy.ram.getMemoryAt(HL.getRegister() - 1)).toBe(targetValue);
    });
});

describe('LD R8, R8', () => {
    test('', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { B, C, D, E, F, H, L } = gameboy;

        const targetValue = 0x10;

        L.setRegister(targetValue);

        gameboy.ram.setMemoryAt(0x100, 0x45);
        gameboy.scheduler.tick();

        expect(B.getRegister()).toBe(targetValue);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x101);
    });
});

describe('LD R8, [HL]', () => {
    test('', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { B, C, D, E, F, H, L } = gameboy;
        const { HL } = gameboy.registers.register16Bit;
        const targetValue = 0x10;
        HL.setRegister(0xff);

        gameboy.ram.setMemoryAt(0xff, targetValue);

        gameboy.ram.setMemoryAt(0x100, 0x56);
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(D.getRegister()).toBe(targetValue);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x101);
    });
});

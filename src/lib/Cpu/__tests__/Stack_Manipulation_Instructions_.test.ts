import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';

describe('PUSH R16', () => {
    test('PUSH BC', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { B, C } = gameboy;

        B.setRegister(0x12);
        C.setRegister(0x34);

        gameboy.ram.setMemoryAt(0x100, 0xc5);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffc);
        expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x12);
        expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x34);
    });
    test('PUSH DE', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { D, E } = gameboy;

        D.setRegister(0x12);
        E.setRegister(0x34);

        gameboy.ram.setMemoryAt(0x100, 0xd5);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffc);
        expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x12);
        expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x34);
        expect(D.getRegister()).toBe(0x12);
        expect(E.getRegister()).toBe(0x34);
    });
    test('PUSH HL', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { H, L } = gameboy;

        H.setRegister(0x55);
        L.setRegister(0xaa);

        gameboy.ram.setMemoryAt(0x100, 0xe5);
        gameboy.registerFile.pointers.SP.setRegister(0x0002);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0000);
        expect(gameboy.ram.getMemoryAt(0x0001)).toBe(0x55);
        expect(gameboy.ram.getMemoryAt(0x000)).toBe(0xaa);
        expect(H.getRegister()).toBe(0x55);
        expect(L.getRegister()).toBe(0xaa);
    });

    test('PUSH AF', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { A, F } = gameboy;

        A.setRegister(0xff);
        F.setRegister(0xff);

        gameboy.ram.setMemoryAt(0x100, 0xf5);
        gameboy.registerFile.pointers.SP.setRegister(0xc000);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xbffe);
        expect(gameboy.ram.getMemoryAt(0xbfff)).toBe(0xff);
        expect(gameboy.ram.getMemoryAt(0xbffe)).toBe(0xff);
        expect(A.getRegister()).toBe(0xff);
        expect(F.getRegister()).toBe(0xff);
    });
});

describe('POP R16', () => {
    test('POP BC', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { B, C } = gameboy;

        gameboy.ram.setMemoryAt(0x100, 0xc1);
        gameboy.registerFile.pointers.SP.setRegister(0xfffc);
        gameboy.ram.setMemoryAt(0xfffc, 0x34);
        gameboy.ram.setMemoryAt(0xfffd, 0x12);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffe);
        expect(B.getRegister()).toBe(0x12);
        expect(C.getRegister()).toBe(0x34);
    });

    test('POP DE', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { D, E } = gameboy;

        gameboy.ram.setMemoryAt(0x100, 0xd1);
        gameboy.registerFile.pointers.SP.setRegister(0xd000);
        gameboy.ram.setMemoryAt(0xd000, 0xab);
        gameboy.ram.setMemoryAt(0xd001, 0xcd);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xd002);
        expect(D.getRegister()).toBe(0xcd);
        expect(E.getRegister()).toBe(0xab);
    });

    test('POP DE', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { D, E } = gameboy;

        gameboy.ram.setMemoryAt(0x100, 0xd1);
        gameboy.registerFile.pointers.SP.setRegister(0xd000);
        gameboy.ram.setMemoryAt(0xd000, 0xab);
        gameboy.ram.setMemoryAt(0xd001, 0xcd);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xd002);
        expect(D.getRegister()).toBe(0xcd);
        expect(E.getRegister()).toBe(0xab);
    });

    test('POP HL', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { H, L } = gameboy;

        gameboy.ram.setMemoryAt(0x100, 0xe1);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);
        gameboy.ram.setMemoryAt(0xfffe, 0x00);
        gameboy.ram.setMemoryAt(0xffff, 0x80);

        H.setRegister(0x55);
        L.setRegister(0xaa);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0000);
        expect(H.getRegister()).toBe(0x80);
        expect(L.getRegister()).toBe(0x00);
        expect(gameboy.registers.register16Bit.HL.getRegister()).toBe(0x8000);
    });

    test('POP AF', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        const { A, F } = gameboy;

        gameboy.ram.setMemoryAt(0x100, 0xf1);
        gameboy.registerFile.pointers.SP.setRegister(0xd000);
        gameboy.ram.setMemoryAt(0xd000, 0xab);
        gameboy.ram.setMemoryAt(0xd001, 0xcd);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xd002);
        expect(A.getRegister()).toBe(0xcd);
        expect(F.getRegister()).toBe(0xab);
    });
});

describe('LDNNSP', () => {
    test('regular', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x0150);
        gameboy.registerFile.pointers.SP.setRegister(0xabcd);

        gameboy.ram.setMemoryAt(0x150, 0x08);
        gameboy.ram.setMemoryAt(0x151, 0x34);
        gameboy.ram.setMemoryAt(0x152, 0x12);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.ram.getMemoryAt(0x1234)).toBe(0xcd);
        expect(gameboy.ram.getMemoryAt(0x1235)).toBe(0xab);
        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xabcd);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x153);
    });
});

describe('LD HL, SP+e', () => {
    test('Postive Offset', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        const { F } = gameboy.registerFile;
        gameboy.registerFile.pointers.PC.setRegister(0x0150);
        gameboy.registerFile.pointers.SP.setRegister(0xfff0);

        gameboy.ram.setMemoryAt(0x150, 0xf8);
        gameboy.ram.setMemoryAt(0x151, 0x10);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registers.register16Bit.HL.getRegister()).toBe(0x000);
        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfff0);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x152);
        expect(F.getCYFlag()).toBe(1);
        expect(F.getHFlag()).toBe(0);
    });

    test('Negative Offset', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        const { F } = gameboy.registerFile;
        gameboy.registerFile.pointers.PC.setRegister(0x2000);
        gameboy.registerFile.pointers.SP.setRegister(0x0100);

        gameboy.ram.setMemoryAt(0x2000, 0xf8);
        gameboy.ram.setMemoryAt(0x2001, 0xf0);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registers.register16Bit.HL.getRegister()).toBe(0x00f0);
        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0100);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x2002);
        expect(F.getCYFlag()).toBe(0);
        expect(F.getHFlag()).toBe(0);
    });

    test('Zero Offset', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        const { F } = gameboy.registerFile;
        gameboy.registerFile.pointers.PC.setRegister(0x3000);
        gameboy.registerFile.pointers.SP.setRegister(0x1234);

        gameboy.ram.setMemoryAt(0x3000, 0xf8);
        gameboy.ram.setMemoryAt(0x3001, 0x00);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registers.register16Bit.HL.getRegister()).toBe(0x1234);
        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x01234);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x3002);
        expect(F.getCYFlag()).toBe(0);
        expect(F.getHFlag()).toBe(0);
    });

    test('BOTH FLAGS ARE RAISED', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        const { F } = gameboy.registerFile;
        gameboy.registerFile.pointers.PC.setRegister(0x3000);
        gameboy.registerFile.pointers.SP.setRegister(0x00ff);

        gameboy.ram.setMemoryAt(0x3000, 0xf8);
        gameboy.ram.setMemoryAt(0x3001, 0x01);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registers.register16Bit.HL.getRegister()).toBe(0x100);
        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x00ff);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x3002);
        expect(F.getCYFlag()).toBe(1);
        expect(F.getHFlag()).toBe(1);
    });
});

describe('ADD SP, e', () => {
    test('Add 1 to SP', () => {
        const dummyRom = new ArrayBuffer(1024);

        const gameboy = new Gameboy(dummyRom);
        const { F } = gameboy.registerFile;
        gameboy.registerFile.pointers.PC.setRegister(0x3000);
        gameboy.registerFile.pointers.SP.setRegister(0x00ff);

        gameboy.ram.setMemoryAt(0x3000, 0xe8);
        gameboy.ram.setMemoryAt(0x3001, 0x01);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x100);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x3002);
        expect(F.getCYFlag()).toBe(1);
        expect(F.getHFlag()).toBe(1);
    });

    test('SP should be 0xfffe, flags not raised', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        const { F } = gameboy.registerFile;
        gameboy.registerFile.pointers.PC.setRegister(0x3000);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);

        gameboy.ram.setMemoryAt(0x3000, 0xe8);
        gameboy.ram.setMemoryAt(0x3001, 0x00);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffe);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x3002);
        expect(F.getCYFlag()).toBe(0);
        expect(F.getHFlag()).toBe(0);
    });

    test('SP should be 0, C and H flag should be 1', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        const { F } = gameboy.registerFile;
        gameboy.registerFile.pointers.PC.setRegister(0x3000);
        gameboy.registerFile.pointers.SP.setRegister(0x0005);

        gameboy.ram.setMemoryAt(0x3000, 0xe8);
        gameboy.ram.setMemoryAt(0x3001, 0xfb);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0000);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x3002);
        expect(F.getCYFlag()).toBe(1);
        expect(F.getHFlag()).toBe(1);
    });
});

// added INC SP and DEC SP
describe('INC and DEC SP', () => {
    test('simple inc and dec', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x3000);
        gameboy.registerFile.pointers.SP.setRegister(0x0005);

        gameboy.ram.setMemoryAt(0x3000, 0x33);
        gameboy.ram.setMemoryAt(0x3001, 0x3b);
        gameboy.ram.setMemoryAt(0x3002, 0x3b);
        gameboy.ram.setMemoryAt(0x3003, 0x33);

        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();
        gameboy.scheduler.tick();

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0005);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x3004);
    });
});

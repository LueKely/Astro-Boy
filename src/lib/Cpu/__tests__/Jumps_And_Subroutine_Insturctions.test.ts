import { describe, expect, test } from 'vitest';
import { Gameboy } from '../../Gameboy';
import {
    CALLCCN16,
    CALLN16,
    JPHL,
    JPN16,
    JRE,
    RET,
    RETI,
    RSTN,
} from '../instructions/Jumps_And _Subroutine_Instructions';

describe('Tests for CALL NN', () => {
    test(' first ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0150);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);

        gameboy.ram.setMemoryAt(0x0151, 0x34);
        gameboy.ram.setMemoryAt(0x0152, 0x12);

        const callNN = CALLN16();

        callNN(gameboy);

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffc);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1234);
        expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x01);
        expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x53);
    });

    test(' second ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0200);
        gameboy.registerFile.pointers.SP.setRegister(0xd000);

        gameboy.ram.setMemoryAt(0x0201, 0x00);
        gameboy.ram.setMemoryAt(0x0202, 0xc0);

        const callNN = CALLN16();

        callNN(gameboy);

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0xc000);
        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xcffe);
        expect(gameboy.ram.getMemoryAt(0xcffe)).toBe(0x03);
        expect(gameboy.ram.getMemoryAt(0xcfff)).toBe(0x02);
    });

    test(' third ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0150);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);

        gameboy.ram.setMemoryAt(0x0151, 0x00);
        gameboy.ram.setMemoryAt(0x0152, 0x00);

        const callNN = CALLN16();

        callNN(gameboy);

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x0000);
        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffc);
        expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x53);
        expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x01);
    });
});

describe('Tests for JUMP N16', () => {
    test(' JUMP FROM 0x100 to 0x200 ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0100);

        gameboy.ram.setMemoryAt(0x0101, 0x00);
        gameboy.ram.setMemoryAt(0x0102, 0x02);

        const jumpN16 = JPN16();

        jumpN16(gameboy);

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x200);
    });

    test(' JUMP FROM 0x500 to 0x100 ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0500);

        gameboy.ram.setMemoryAt(0x0501, 0x00);
        gameboy.ram.setMemoryAt(0x0502, 0x01);

        const jumpN16 = JPN16();

        jumpN16(gameboy);

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x100);
    });

    test(' JUMP FROM 0x150 to 0x150 (infinite loop)', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0150);

        gameboy.ram.setMemoryAt(0x0151, 0x50);
        gameboy.ram.setMemoryAt(0x0152, 0x01);

        const jumpN16 = JPN16();

        jumpN16.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x150);
    });

    test(' JUMP FROM ROM to RAM ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0150);

        gameboy.ram.setMemoryAt(0x0151, 0x00);
        gameboy.ram.setMemoryAt(0x0152, 0xc0);

        const jumpN16 = JPN16();

        jumpN16.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0xc000);
    });
});
describe('Tests for JP [HL]', () => {
    test('Set HL to 0x200, PC should be 0x200 as well', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x0150);
        gameboy.registers.register16Bit.HL.setRegister(0x200);

        const jobs = [
            (dmg: Gameboy) => {
                JPHL(dmg.registers.register16Bit.HL, dmg.registers.pointers.PC);
            },
        ];

        jobs.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x200);
    });
});

describe('Tests for RET', () => {
    test(' PC should be 0x1234 and SP 0x0 ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x200);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);

        gameboy.ram.setMemoryAt(0xfffe, 0x34);
        gameboy.ram.setMemoryAt(0xffff, 0x12);

        const job = RET();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0000);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1234);
    });

    test(' PC should be 0x0000 and SP 0xFFF2 ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x300);
        gameboy.registerFile.pointers.SP.setRegister(0xfff0);

        gameboy.ram.setMemoryAt(0xfff0, 0x00);
        gameboy.ram.setMemoryAt(0xfff1, 0x00);

        const job = RET();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfff2);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x0000);
    });

    test(' Wrap Around ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);

        gameboy.registerFile.pointers.PC.setRegister(0x100);
        gameboy.registerFile.pointers.SP.setRegister(0xffff);

        gameboy.ram.setMemoryAt(0xffff, 0x56);
        gameboy.ram.setMemoryAt(0x0000, 0x78);

        const job = RET();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0001);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x7856);
    });
});

describe('Tests for RETI', () => {
    test(' PC should be 0x1234 and SP 0x0 ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        expect(gameboy.registers.IME.getValue()).toBe(0);
        gameboy.registerFile.pointers.PC.setRegister(0x200);
        gameboy.registerFile.pointers.SP.setRegister(0xfffe);

        gameboy.ram.setMemoryAt(0xfffe, 0x34);
        gameboy.ram.setMemoryAt(0xffff, 0x12);

        const job = RETI();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0000);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1234);
        expect(gameboy.registers.IME.getValue()).toBe(1);
    });

    test(' PC should be 0x0000 and SP 0xFFF2 ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        expect(gameboy.registers.IME.getValue()).toBe(0);

        gameboy.registerFile.pointers.PC.setRegister(0x300);
        gameboy.registerFile.pointers.SP.setRegister(0xfff0);

        gameboy.ram.setMemoryAt(0xfff0, 0x00);
        gameboy.ram.setMemoryAt(0xfff1, 0x00);

        const job = RETI();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfff2);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x0000);
        expect(gameboy.registers.IME.getValue()).toBe(1);
    });

    test(' Wrap Around ', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        expect(gameboy.registers.IME.getValue()).toBe(0);

        gameboy.registerFile.pointers.PC.setRegister(0x100);
        gameboy.registerFile.pointers.SP.setRegister(0xffff);

        gameboy.ram.setMemoryAt(0xffff, 0x56);
        gameboy.ram.setMemoryAt(0x0000, 0x78);

        const job = RETI();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0001);
        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x7856);
        expect(gameboy.registers.IME.getValue()).toBe(1);
    });
});

describe('Tests for RST N', () => {
    const cases = [0x00, 0x08, 0x10, 0x20, 0x30, 0x18, 0x28, 0x38];

    cases.forEach((value) => {
        test(`RST 0x${value.toString(16)} where PC is 0x1000 and SP is 0x0000`, () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);

            gameboy.registerFile.pointers.PC.setRegister(0x0100);
            gameboy.registerFile.pointers.SP.setRegister(0x0000);

            const job = RSTN(value);

            job.forEach((callback) => {
                callNN(gameboy);
            });

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(value);
            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffe);
            expect(gameboy.ram.getMemoryAt(0xfffe)).toBe(0x01);
            expect(gameboy.ram.getMemoryAt(0xffff)).toBe(0x01);
        });
    });

    cases.forEach((value) => {
        test(`RST 0x${value.toString(16)}  where PC is 0x1234 and SP is 0xfffe`, () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);

            gameboy.registerFile.pointers.PC.setRegister(0x1234);
            gameboy.registerFile.pointers.SP.setRegister(0xfffe);

            const job = RSTN(value);

            job.forEach((callback) => {
                callNN(gameboy);
            });

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(value);
            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffc);
            expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x12);
            expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x35);
        });
    });

    cases.forEach((value) => {
        test(`RST 0x${value.toString(16)}  where PC is 0x100 and SP is 0x0001`, () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);

            gameboy.registerFile.pointers.PC.setRegister(0x100);
            gameboy.registerFile.pointers.SP.setRegister(0x0001);

            const job = RSTN(value);

            job.forEach((callback) => {
                callNN(gameboy);
            });

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(value);
            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xffff);
            expect(gameboy.ram.getMemoryAt(0xffff)).toBe(0x01);
            expect(gameboy.ram.getMemoryAt(0x0000)).toBe(0x01);
        });
    });
});

describe('JR e', () => {
    test('E is 0x05 & PC is 0x1000', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x1000);
        gameboy.ram.setMemoryAt(0x1001, 0x05);

        const job = JRE();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1007);
    });

    test('E is 0xFB & PC is 0x2000', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x2000);
        gameboy.ram.setMemoryAt(0x2001, 0xfb);

        const job = JRE();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1ffd);
    });

    test('E is 0x0A & PC is 0x3000', () => {
        const dummyRom = new ArrayBuffer(1024);

        // init gameboy
        const gameboy = new Gameboy(dummyRom);
        gameboy.registerFile.pointers.PC.setRegister(0x3000);
        gameboy.ram.setMemoryAt(0x3001, 0x0a);

        const job = JRE();

        job.forEach((callback) => {
            callNN(gameboy);
        });

        expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x300c);
    });
});

describe('Tests for CALLCCN16', () => {
    const casesNZFalse = [
        {
            name: 'Call NZ',
            opcode: 0xc4,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'Call NC',
            opcode: 0xd4,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'Call Z',
            opcode: 0xcc,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
        },
        {
            name: 'Call C',
            opcode: 0xdc,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
        },
    ];

    casesNZFalse.forEach((value) => {
        test(value.name + ', nn where CC is false', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);

            value.ccIsFalse(gameboy);

            gameboy.registerFile.pointers.PC.setRegister(0x0150);
            gameboy.registerFile.pointers.SP.setRegister(0xfffe);

            gameboy.ram.setMemoryAt(0x0150, value.opcode);
            gameboy.ram.setMemoryAt(0x0151, 0x34);
            gameboy.ram.setMemoryAt(0x0152, 0x12);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x0153);
            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffe);
        });
    });

    casesNZFalse.forEach((value) => {
        test(' Call NZ, nn where CC is true', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);

            value.ccIsTrue(gameboy);

            gameboy.registerFile.pointers.PC.setRegister(0x0150);
            gameboy.registerFile.pointers.SP.setRegister(0xfffe);

            gameboy.ram.setMemoryAt(0x0150, value.opcode);
            gameboy.ram.setMemoryAt(0x0151, 0x34);
            gameboy.ram.setMemoryAt(0x0152, 0x12);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffc);
            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1234);
            expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x01);
            expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x53);
        });
    });
});

describe('JR CC e', () => {
    const cases = [
        {
            name: 'JR NZ',
            opcode: 0x20,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'JR NC',
            opcode: 0x30,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'JR Z',
            opcode: 0x28,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
        },
        {
            name: 'JR C',
            opcode: 0x38,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
        },
    ];

    cases.forEach((value) => {
        test(value.name + ' CC is true', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);
            value.ccIsTrue(gameboy);
            gameboy.registerFile.pointers.PC.setRegister(0x1000);
            gameboy.ram.setMemoryAt(0x1000, value.opcode);
            gameboy.ram.setMemoryAt(0x1001, 0x05);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1007);
        });
    });

    cases.forEach((value) => {
        test(value.name + ' CC is false', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);
            value.ccIsFalse(gameboy);
            gameboy.registerFile.pointers.PC.setRegister(0x1000);
            gameboy.ram.setMemoryAt(0x1000, value.opcode);
            gameboy.ram.setMemoryAt(0x1001, 0x05);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1002);
        });
    });
});

describe('RET CC ', () => {
    const cases = [
        {
            name: 'RET NZ',
            opcode: 0xc0,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'RET NC',
            opcode: 0xd0,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'RET Z',
            opcode: 0xc8,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
        },
        {
            name: 'RET C',
            opcode: 0xd8,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
        },
    ];

    cases.forEach((value) => {
        test(value.name + ' CC is true', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);
            value.ccIsTrue(gameboy);

            gameboy.registerFile.pointers.PC.setRegister(0x200);
            gameboy.registerFile.pointers.SP.setRegister(0xfffe);

            gameboy.ram.setMemoryAt(0x200, value.opcode);

            gameboy.ram.setMemoryAt(0xfffe, 0x34);
            gameboy.ram.setMemoryAt(0xffff, 0x12);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0x0000);
            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1234);
        });
    });

    cases.forEach((value) => {
        test(value.name + ' CC is false', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);
            value.ccIsFalse(gameboy);

            gameboy.registerFile.pointers.PC.setRegister(0x200);
            gameboy.registerFile.pointers.SP.setRegister(0xfffe);

            gameboy.ram.setMemoryAt(0x200, value.opcode);

            gameboy.ram.setMemoryAt(0xfffe, 0x34);
            gameboy.ram.setMemoryAt(0xffff, 0x12);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffe);
            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x201);
        });
    });
});

describe('Tests for JP CC NN', () => {
    const cases = [
        {
            name: 'JP NZ NN',
            opcode: 0xc2,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'JP NC NN',
            opcode: 0xd2,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearCYFlag();
            },
        },
        {
            name: 'JP Z, nn',
            opcode: 0xca,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
        },
        {
            name: 'JP C, nn',
            opcode: 0xda,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
        },
    ];

    cases.forEach((value) => {
        test(value.name + ' CC is true ' + '0x' + value.opcode.toString(16), () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);
            value.ccIsTrue(gameboy);

            gameboy.registerFile.pointers.PC.setRegister(0x0100);

            gameboy.ram.setMemoryAt(0x0100, value.opcode);
            gameboy.ram.setMemoryAt(0x0101, 0x00);
            gameboy.ram.setMemoryAt(0x0102, 0x02);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x200);
        });
    });

    cases.forEach((value) => {
        test(value.name + ' CC is false ' + '0x' + value.opcode.toString(16), () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);
            value.ccIsFalse(gameboy);

            gameboy.registerFile.pointers.PC.setRegister(0x0100);

            gameboy.ram.setMemoryAt(0x0100, value.opcode);
            gameboy.ram.setMemoryAt(0x0101, 0x00);
            gameboy.ram.setMemoryAt(0x0102, 0x02);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x103);
        });
    });
});

describe('Tests for CALL NN', () => {
    const cases = [
        {
            name: 'CALL NZ NN',
            opcode: 0xc4,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
        },
        {
            name: 'CALL NC NN',
            opcode: 0xd4,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearCYFlag();
            },
        },
        {
            name: 'CALL Z, nn',
            opcode: 0xcc,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearZFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setZFlag();
            },
        },
        {
            name: 'CALL C, nn',
            opcode: 0xdc,
            ccIsFalse: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.clearCYFlag();
            },
            ccIsTrue: (Gameboy: Gameboy) => {
                Gameboy.registers.register.F.setCYFlag();
            },
        },
    ];

    cases.forEach((value) => {
        test(value.name + ' CC IS TRUE', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);

            gameboy.registerFile.pointers.PC.setRegister(0x0150);
            gameboy.registerFile.pointers.SP.setRegister(0xfffe);

            gameboy.ram.setMemoryAt(0x0150, value.opcode);

            gameboy.ram.setMemoryAt(0x0151, 0x34);
            gameboy.ram.setMemoryAt(0x0152, 0x12);

            value.ccIsTrue(gameboy);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffc);
            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x1234);
            expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x01);
            expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x53);
        });
    });

    cases.forEach((value) => {
        test(value.name + ' CC IS FALSE', () => {
            const dummyRom = new ArrayBuffer(1024);

            // init gameboy
            const gameboy = new Gameboy(dummyRom);

            gameboy.registerFile.pointers.PC.setRegister(0x0150);
            gameboy.registerFile.pointers.SP.setRegister(0xfffe);

            gameboy.ram.setMemoryAt(0x0150, value.opcode);

            gameboy.ram.setMemoryAt(0x0151, 0x34);
            gameboy.ram.setMemoryAt(0x0152, 0x12);

            value.ccIsFalse(gameboy);

            gameboy.scheduler.tick();
            gameboy.scheduler.tick();
            gameboy.scheduler.tick();

            expect(gameboy.registerFile.pointers.SP.getRegister()).toBe(0xfffe);
            expect(gameboy.registerFile.pointers.PC.getRegister()).toBe(0x153);
            expect(gameboy.ram.getMemoryAt(0xfffd)).toBe(0x00);
            expect(gameboy.ram.getMemoryAt(0xfffc)).toBe(0x00);
        });
    });
});

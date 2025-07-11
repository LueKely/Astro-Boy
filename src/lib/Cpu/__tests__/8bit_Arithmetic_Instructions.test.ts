import { describe, expect, test } from "vitest";
import { CPU_Registers_Group } from "../CPU_Registers_Group";
import {
  ADCAHL,
  ADCAN8,
  ADCAR8,
  ADDAHL,
  ADDAN8,
  ADDAR8,
  CPAHL,
  CPAN8,
  CPAR8,
  DECHL,
  DECR8,
  INCHL,
  INCR8,
  SBCAHL,
  SBCAN8,
  SBCAR8,
} from "../instructions/8bit_Arithmetic_Instructions";
import { Ram } from "../../Ram/Ram";

describe("ADC A, R8 Functionalitys", () => {
  test("The result of adding the value of register B to A is 1 — flags should all be 0", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0);
    CPU.register.B.setRegister(0x1);
    ADCAR8(CPU.register.B, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(0x1);

    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
  });

  test("Both Half Carry and Carry should raise", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0xff);
    CPU.register.B.setRegister(0x0f);

    ADCAR8(CPU.register.B, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(14);

    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(1);
    expect(CPU.register.F.getHFlag()).toBe(1);
  });

  test("The result of adding the value of register B to A is 16 — flags of the Halfcarry should raise ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0e);
    CPU.register.B.setRegister(0x01);
    CPU.register.F.setCYFlag();

    ADCAR8(CPU.register.B, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(16);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of register B to A is 0 — flags of the Zero should raise", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0);
    CPU.register.B.setRegister(0);

    ADCAR8(CPU.register.B, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(0);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(1);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
});

describe("ADC A, HL Functionalitys", () => {
  test("The result of adding the value of [HL] to A is 1 — flags should all be 0", () => {
    const CPU = new CPU_Registers_Group();
    const dummyMemory = new Ram();
    CPU.register16Bit.HL.setRegister(0xff);
    dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x01);
    CPU.register.A.setRegister(0x0);

    ADCAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(1);
    expect(CPU.register.F.getFRegister()).toBe(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ", () => {
    const CPU = new CPU_Registers_Group();
    const dummyMemory = new Ram();
    CPU.register16Bit.HL.setRegister(0xff);
    dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x01);
    CPU.register.A.setRegister(0x0e);
    CPU.register.F.setCYFlag();

    ADCAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(16);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 0 — flags of the Zero should raise", () => {
    const CPU = new CPU_Registers_Group();
    const dummyMemory = new Ram();
    CPU.register16Bit.HL.setRegister(0xff);
    dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x00);
    CPU.register.A.setRegister(0x0);

    ADCAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(0);
    expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
    expect(CPU.register.F.getZFlag()).toBe(1);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
});

describe("ADC A, N8 Functionalitys", () => {
  test("The result of adding the value of N8(0) to A is 1 — flags should all be 0", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0);
    ADCAN8(1, CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(1);
    expect(CPU.register.F.getFRegister()).toBe(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0e);
    CPU.register.F.setCYFlag();

    ADCAN8(1, CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(16);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 0 — flags of the Zero should raise", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0);
    ADCAN8(0, CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(0);
    expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
    expect(CPU.register.F.getZFlag()).toBe(1);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
});

// ADD functions

describe("ADD A, R8 Functionalitys", () => {
  test("The result of adding the value of register B to A is 1 — flags should all be 0", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0);
    CPU.register.B.setRegister(0x1);
    ADDAR8(CPU.register.B, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(0x1);

    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
  });

  test("The result of adding the value of register B to A is 15 — flags of the Halfcarry should raise ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0e);
    CPU.register.B.setRegister(2);
    CPU.register.F.setCYFlag();

    ADDAR8(CPU.register.B, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(16);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of register B to A is 0 — flags of the Zero should raise", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0);
    CPU.register.B.setRegister(0);

    ADDAR8(CPU.register.B, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(0);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(1);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
});

describe("ADD AH, L Functionalitys", () => {
  test("The result of adding the value of [HL] to A is 1 — flags should all be 0", () => {
    const CPU = new CPU_Registers_Group();
    const dummyMemory = new Ram();
    CPU.register16Bit.HL.setRegister(0xff);
    dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x01);
    CPU.register.A.setRegister(0x0);

    ADDAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(1);
    expect(CPU.register.F.getFRegister()).toBe(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ", () => {
    const CPU = new CPU_Registers_Group();
    const dummyMemory = new Ram();
    CPU.register16Bit.HL.setRegister(0xff);
    dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 2);
    CPU.register.A.setRegister(0x0e);
    CPU.register.F.setCYFlag();

    ADDAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(16);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 0 — flags of the Zero should raise", () => {
    const CPU = new CPU_Registers_Group();
    const dummyMemory = new Ram();
    CPU.register16Bit.HL.setRegister(0xff);
    dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x00);
    CPU.register.A.setRegister(0x0);

    ADDAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

    expect(CPU.register.A.getRegister()).toBe(0);
    expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
    expect(CPU.register.F.getZFlag()).toBe(1);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
});

describe("ADDAN8 Functionalitys", () => {
  test("The result of adding the value of N8(0) to A is 1 — flags should all be 0", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0);
    ADDAN8(1, CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(1);
    expect(CPU.register.F.getFRegister()).toBe(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0e);
    CPU.register.F.setCYFlag();

    ADDAN8(2, CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(16);
    expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("The result of adding the value of [HL] to A is 0 — flags of the Zero should raise", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x0);
    ADDAN8(0, CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(0);
    expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
    expect(CPU.register.F.getZFlag()).toBe(1);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
});

describe("CP A, R8 Functionalities", () => {
  test("Expect the Zero flag should raise", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(5);
    CPU.register.C.setRegister(5);

    CPAR8(CPU.register.C, CPU.register.A, CPU.register.F);

    expect(CPU.register.F.getZFlag()).toBe(1);
  });

  test("Expect the Zero flag should raise", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(18);
    CPU.register.C.setRegister(86);

    CPAR8(CPU.register.C, CPU.register.A, CPU.register.F);

    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });

  test("Only H and C flags should be set", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x78);
    CPU.register.C.setRegister(0x9c);
    CPAR8(CPU.register.C, CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(1);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });
  test("Only H Flag should be set ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(66);
    CPU.register.C.setRegister(55);
    CPAR8(CPU.register.C, CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
  test("Only C Flag should be set ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(32);
    CPU.register.C.setRegister(48);
    CPAR8(CPU.register.C, CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });
});

describe("CP A, [HL] Functionalities", () => {
  test("Expect the Zero flag should raise", () => {
    const CPU = new CPU_Registers_Group();
    const dummyRam = new Ram();
    const HL = CPU.register16Bit.HL;
    const A = CPU.register.A;

    HL.setRegister(16);
    A.setRegister(16);
    dummyRam.setMemoryAt(HL.getRegister(), 16);
    CPAHL(dummyRam, A, HL, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(1);
  });

  test("Expect the Zero flag should raise", () => {
    const CPU = new CPU_Registers_Group();
    const dummyRam = new Ram();
    const HL = CPU.register16Bit.HL;
    const A = CPU.register.A;

    HL.setRegister(86);
    A.setRegister(18);
    dummyRam.setMemoryAt(HL.getRegister(), 86);
    CPAHL(dummyRam, A, HL, CPU.register.F);

    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });

  test("Only H and C flags should be set", () => {
    const CPU = new CPU_Registers_Group();
    const dummyRam = new Ram();
    const HL = CPU.register16Bit.HL;
    const A = CPU.register.A;

    HL.setRegister(0x9c);
    A.setRegister(0x78);
    dummyRam.setMemoryAt(HL.getRegister(), 0x9c);
    CPAHL(dummyRam, A, HL, CPU.register.F);

    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(1);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });

  test("Only H Flag should be set ", () => {
    const CPU = new CPU_Registers_Group();
    const dummyRam = new Ram();
    const HL = CPU.register16Bit.HL;
    const A = CPU.register.A;

    HL.setRegister(55);
    A.setRegister(66);
    dummyRam.setMemoryAt(HL.getRegister(), 55);
    CPAHL(dummyRam, A, HL, CPU.register.F);

    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
  test("Only C Flag should be set ", () => {
    const CPU = new CPU_Registers_Group();
    const dummyRam = new Ram();
    const HL = CPU.register16Bit.HL;
    const A = CPU.register.A;

    HL.setRegister(48);
    A.setRegister(32);
    dummyRam.setMemoryAt(HL.getRegister(), 48);
    CPAHL(dummyRam, A, HL, CPU.register.F);

    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });
});

describe("CP A, N8 Functionalities", () => {
  test("Expect the Zero flag should raise", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(5);

    CPAN8(5, CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(1);
  });

  test("Expect the Zero flag should raise", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(18);

    CPAN8(86, CPU.register.A, CPU.register.F);

    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });

  test("Only H and C flags should be set", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(0x78);
    CPAN8(0x9c, CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(1);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });
  test("Only H Flag should be set ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(66);
    CPAN8(55, CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });
  test("Only C Flag should be set ", () => {
    const CPU = new CPU_Registers_Group();
    CPU.register.A.setRegister(32);
    CPAN8(48, CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getZFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });
});

describe("DEC R8 Functionalities", () => {
  test("When decrementing the value of 255, the value of A should be 254", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(0b1111_1111);

    DECR8(CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getNFlag()).toBe(1);

    expect(CPU.register.A.getRegister()).toBe(254);
  });
  test("When decrementing the value 16, H flag should raise", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(0b0001_0000);

    DECR8(CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(15);
    expect(CPU.register.F.getNFlag()).toBe(1);
    expect(CPU.register.F.getHFlag()).toBe(1);
  });
  test("When decrementing the value 1, Z flag should raise", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(0b0000_0001);

    DECR8(CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(1);
    expect(CPU.register.F.getZFlag()).toBe(1);
  });
});

describe("DEC HL Functionalities", () => {
  test("When decrementing the value of 255, the value of A should be 254", () => {
    const CPU = new CPU_Registers_Group();
    const ram = new Ram();
    CPU.register16Bit.HL.setRegister(0b1111_1111);
    ram.setMemoryAt(CPU.register16Bit.HL.getRegister(), 255);

    DECHL(CPU.register16Bit.HL, ram, CPU.register.F);

    expect(CPU.register.F.getNFlag()).toBe(1);

    expect(ram.getMemoryAt(CPU.register16Bit.HL.getRegister())).toBe(254);
  });
  test("When decrementing the value 16, H flag should raise", () => {
    const CPU = new CPU_Registers_Group();
    const ram = new Ram();
    CPU.register16Bit.HL.setRegister(0b0001_0000);
    ram.setMemoryAt(CPU.register16Bit.HL.getRegister(), 16);

    DECHL(CPU.register16Bit.HL, ram, CPU.register.F);

    expect(ram.getMemoryAt(CPU.register16Bit.HL.getRegister())).toBe(15);
    expect(CPU.register.F.getNFlag()).toBe(1);
    expect(CPU.register.F.getHFlag()).toBe(1);
  });
  test("When decrementing the value 1, Z flag should raise", () => {
    const CPU = new CPU_Registers_Group();
    const ram = new Ram();
    CPU.register16Bit.HL.setRegister(0b0000_0001);
    ram.setMemoryAt(CPU.register16Bit.HL.getRegister(), 1);

    DECHL(CPU.register16Bit.HL, ram, CPU.register.F);

    expect(ram.getMemoryAt(CPU.register16Bit.HL.getRegister())).toBe(0);
    expect(CPU.register.F.getNFlag()).toBe(1);
    expect(CPU.register.F.getZFlag()).toBe(1);
  });
});

describe("INC R8 Functionalities", () => {
  test("When incrementing the value of 254, the value of A should be 255", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(0b1111_1110);

    INCR8(CPU.register.A, CPU.register.F);
    expect(CPU.register.F.getNFlag()).toBe(0);

    expect(CPU.register.A.getRegister()).toBe(255);
  });
  test("When incrementing the value 15, H flag should raise", () => {
    const CPU = new CPU_Registers_Group();

    CPU.register.A.setRegister(0b0000_1111);

    INCR8(CPU.register.A, CPU.register.F);

    expect(CPU.register.A.getRegister()).toBe(16);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
  });
});

describe("INC HL Functionalities", () => {
  test("When incrementing the value of 254, the value of A should be 255", () => {
    const CPU = new CPU_Registers_Group();
    const ram = new Ram();
    CPU.register16Bit.HL.setRegister(0b1111_1110);
    ram.setMemoryAt(CPU.register16Bit.HL.getRegister(), 254);

    INCHL(CPU.register16Bit.HL, ram, CPU.register.F);

    expect(CPU.register.F.getNFlag()).toBe(0);

    expect(ram.getMemoryAt(CPU.register16Bit.HL.getRegister())).toBe(255);
  });
  test("When incrementing the value 15, H flag should raise", () => {
    const CPU = new CPU_Registers_Group();
    const ram = new Ram();
    CPU.register16Bit.HL.setRegister(0b0000_1111);
    ram.setMemoryAt(CPU.register16Bit.HL.getRegister(), 15);

    INCHL(CPU.register16Bit.HL, ram, CPU.register.F);

    expect(ram.getMemoryAt(CPU.register16Bit.HL.getRegister())).toBe(16);
    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
  });
});

describe("SBC A, R8 Functionalities", () => {
  test(" Let A be 15 and r8 be 14 and carry be 1 it should return 0, raising the zero flag", () => {
    const CPU = new CPU_Registers_Group();

    const { A, C, F } = CPU.register;

    A.setRegister(0b0000_1111);
    C.setRegister(0b0000_1110);
    F.setCYFlag();

    SBCAR8(C, A, F);
    expect(A.getRegister()).toBe(0);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(1);
    expect(F.getHFlag()).toBe(0);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 15 and r8 be 15 and carry be 0 it should return 0, raising the zero flag", () => {
    const CPU = new CPU_Registers_Group();

    const { A, C, F } = CPU.register;

    A.setRegister(0b0000_1111);
    C.setRegister(0b0000_1111);

    // F.setCYFlag();

    SBCAR8(C, A, F);
    expect(A.getRegister()).toBe(0);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(1);
    expect(F.getHFlag()).toBe(0);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 16 and r8 be 1 and carry be 0 it should return 15, raising the Half carry flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b0001_0000);
    C.setRegister(0b0000_0001);
    // F.setCYFlag();

    SBCAR8(C, A, F);
    expect(A.getRegister()).toBe(15);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 32 and r8 be 15 and carry be 1 it should return 0, raising the zero flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b0010_0000);
    C.setRegister(0b0000_1111);
    F.setCYFlag();

    SBCAR8(C, A, F);
    expect(A.getRegister()).toBe(16);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 0 and r8 be 1 and carry be 0 it should return 0, raising the H and CY flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b0000_0000);
    C.setRegister(0b0000_0001);
    // F.setCYFlag();

    SBCAR8(C, A, F);
    expect(A.getRegister()).toBe(255);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(1);
  });
});

describe("SBC A, [HL] functionalities", () => {
  test("let A be 15, and [HL] be 1 and carry be 0, the difference should be 14; only N should raise ", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const ram = new Ram();

    A.setRegister(0b0000_1111);

    HL.setRegister(0b0000_0001);
    ram.setMemoryAt(HL.getRegister(), HL.getRegister());

    // F.setCYFlag();

    SBCAHL(ram, A, HL, F);
    expect(A.getRegister()).toBe(14);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(0);
    expect(F.getCYFlag()).toBe(0);
  });

  test("let A be 15, and [HL] be 15 and carry be 0, the difference should be 0; only N & Z should raise ", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const ram = new Ram();

    A.setRegister(0b0000_1111);

    HL.setRegister(0b0000_1111);
    ram.setMemoryAt(HL.getRegister(), HL.getRegister());

    // F.setCYFlag();

    SBCAHL(ram, A, HL, F);
    expect(A.getRegister()).toBe(0);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(1);
    expect(F.getHFlag()).toBe(0);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 32 and [HL] be 15 and carry be 1 it should return 0, raising the zero flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const ram = new Ram();

    A.setRegister(0b0010_0000);

    HL.setRegister(0b0000_1111);
    ram.setMemoryAt(HL.getRegister(), HL.getRegister());
    F.setCYFlag();
    SBCAHL(ram, A, HL, F);
    expect(A.getRegister()).toBe(16);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 16 and r8 be 1 and carry be 0 it should return 15, raising the Half carry flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const ram = new Ram();

    A.setRegister(0b0001_0000);
    HL.setRegister(0b0000_0001);
    ram.setMemoryAt(HL.getRegister(), HL.getRegister());

    // F.setCYFlag();

    SBCAHL(ram, A, HL, F);

    expect(A.getRegister()).toBe(15);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 0 and r8 be 1 and carry be 0 it should return 0, raising the H and CY flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const ram = new Ram();

    A.setRegister(0b0000_0000);

    HL.setRegister(0b0000_0001);
    ram.setMemoryAt(HL.getRegister(), HL.getRegister());

    // F.setCYFlag();

    SBCAHL(ram, A, HL, F);
    expect(A.getRegister()).toBe(255);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(1);
  });
});

describe("SBC A, N8 Functionalities", () => {
  test(" Let A be 15 and r8 be 14 and carry be 1 it should return 0, raising the zero flag", () => {
    const CPU = new CPU_Registers_Group();

    const { A, F } = CPU.register;

    A.setRegister(0b0000_1111);
    F.setCYFlag();

    SBCAN8(0b0000_1110, A, F);
    expect(A.getRegister()).toBe(0);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(1);
    expect(F.getHFlag()).toBe(0);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 15 and r8 be 15 and carry be 0 it should return 0, raising the zero flag", () => {
    const CPU = new CPU_Registers_Group();

    const { A, F } = CPU.register;

    A.setRegister(0b0000_1111);

    // F.setCYFlag();

    SBCAN8(0b0000_1111, A, F);
    expect(A.getRegister()).toBe(0);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(1);
    expect(F.getHFlag()).toBe(0);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 16 and r8 be 1 and carry be 0 it should return 15, raising the Half carry flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;

    A.setRegister(0b0001_0000);
    // F.setCYFlag();

    SBCAN8(0b0000_0001, A, F);
    expect(A.getRegister()).toBe(15);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 32 and r8 be 15 and carry be 1 it should return 0, raising the zero flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b0010_0000);
    F.setCYFlag();

    SBCAN8(0b0000_1111, A, F);
    expect(A.getRegister()).toBe(16);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(0);
  });

  test(" Let A be 0 and r8 be 1 and carry be 0 it should return 0, raising the H and CY flag", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;

    A.setRegister(0b0000_0000);
    // F.setCYFlag();

    SBCAN8(0b0000_0001, A, F);
    expect(A.getRegister()).toBe(255);
    expect(F.getNFlag()).toBe(1);
    expect(F.getZFlag()).toBe(0);
    expect(F.getHFlag()).toBe(1);
    expect(F.getCYFlag()).toBe(1);
  });
});

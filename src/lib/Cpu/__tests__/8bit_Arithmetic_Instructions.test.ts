import { describe, expect, test } from "vitest";
import { CPU_Registers_Group } from "../CPU_Registers_Group";
import {
  ADCAHL,
  ADCAN8,
  ADCAR8,
  ADDAHL,
  ADDAN8,
  ADDAR8,
  CPAR8,
} from "../instructions/8bit_Arithmetic_Instructions";
import { Ram } from "../../Ram/Ram";

describe("ADCAR8 Functionalitys", () => {
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

describe("ADCAHL Functionalitys", () => {
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

describe("ADCAN8 Functionalitys", () => {
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

describe("ADDAR8 Functionalitys", () => {
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

describe("ADDAHL Functionalitys", () => {
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

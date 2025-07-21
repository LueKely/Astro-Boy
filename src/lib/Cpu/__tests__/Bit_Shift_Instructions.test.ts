import { describe, expect, test } from "vitest";
import { CPU_Registers_Group } from "../CPU_Registers_Group";
import { Ram } from "../../Ram/Ram";
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
} from "../instructions/Bit_Shift_Logic_Instructions";

class TestCPU {
  cpu;
  ram;

  constructor() {
    this.ram = new Ram();
    this.cpu = new CPU_Registers_Group();
  }

  setHLPointTest(value: number) {
    this.cpu.register16Bit.HL.setRegister(value);
    this.ram.setMemoryAt(this.cpu.register16Bit.HL.getRegister(), value);
  }
}

describe("RL R8", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { B, F } = testCPU.cpu.register;
    B.setRegister(0b1000_0000);
    RLR8(B, F);
    expect(B.getRegister()).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(1);
  });
  test("the value of the register should be 1 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { B, F } = testCPU.cpu.register;
    B.setRegister(0b1000_0000);
    F.setCYFlag();

    RLR8(B, F);

    expect(B.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test("the value of the register should be 5 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { B, F } = testCPU.cpu.register;
    B.setRegister(0b1000_0010);
    F.setCYFlag();
    RLR8(B, F);
    expect(B.getRegister()).toBe(0b0000_0101);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RLA R8", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b1000_0000);
    RLA(A, F);
    expect(A.getRegister()).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(0);
  });
  test("the value of the register should be 1 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b1000_0000);
    F.setCYFlag();
    RLA(A, F);

    expect(A.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test("the value of the register should be 5 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b1000_0010);
    F.setCYFlag();
    RLA(A, F);
    expect(A.getRegister()).toBe(0b0000_0101);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RL HL", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0000);

    RLHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(1);
  });
  test("the value of the register should be 1 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0000);
    F.setCYFlag();

    RLHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test("the value of the register should be 3 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0001);
    F.setCYFlag();

    RLHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0011);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RLC R8", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { B, F } = testCPU.cpu.register;
    B.setRegister(0b0000_0000);
    RLCR8(B, F);
    expect(B.getRegister()).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(1);
  });
  test("the value of the register should be 1 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { B, F } = testCPU.cpu.register;
    B.setRegister(0b1000_0000);

    RLCR8(B, F);

    expect(B.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test("the value of the register should be 5 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { B, F } = testCPU.cpu.register;
    B.setRegister(0b1000_0010);
    RLCR8(B, F);
    expect(B.getRegister()).toBe(0b0000_0101);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RLC HL", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b0000_0000);

    RLCHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(1);
  });
  test("the value of the register should be 1 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0000);

    RLCHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test("the value of the register should be 3 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0001);

    RLCHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0011);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RLCA R8", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0000);
    RLCA(A, F);
    expect(A.getRegister()).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(0);
  });
  test("the value of the register should be 1 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b1000_0000);

    RLCA(A, F);

    expect(A.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });

  test("the value of the register should be 5 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b1000_0010);
    RLCA(A, F);
    expect(A.getRegister()).toBe(0b0000_0101);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RR R8", () => {
  test("value of register should be 0, CY and Z flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0001);
    RRR8(A, F);
    expect(A.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });
  test("value of register should be 129, CY flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0011);
    F.setCYFlag();
    RRR8(A, F);
    expect(A.getRegister()).toBe(0b1000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 1, CY flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0011);

    RRR8(A, F);
    expect(A.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RR [HL]", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b0000_0000);

    RRHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(1);
  });

  test("the value of the register should be 192 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0000);
    F.setCYFlag();
    RRHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b1100_0000);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test("the value of the register should be 192 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0001);
    F.setCYFlag();
    RRHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b1100_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RR A", () => {
  test("value of register should be 0, CY is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0001);
    RRA(A, F);
    expect(A.getRegister()).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 129, CY is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0011);
    F.setCYFlag();
    RRA(A, F);
    expect(A.getRegister()).toBe(0b1000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 1, CY is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0011);

    RRA(A, F);
    expect(A.getRegister()).toBe(0b0000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RRC R8", () => {
  test("value of register should be 128, CY flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0001);
    RRCR8(A, F);
    expect(A.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 129, CY flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0011);
    F.setCYFlag();
    RRCR8(A, F);
    expect(A.getRegister()).toBe(0b1000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 4, no flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_1000);

    RRCR8(A, F);
    expect(A.getRegister()).toBe(0b0000_0100);
    expect(F.getRegister()).toBe(0b0000_0000);
  });
});

describe("RRC [HL]", () => {
  test("Results Should be zero and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b0000_0000);

    RRCHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0000);
    expect(F.getZFlag()).toBe(1);
  });

  test("the value of the register should be 64 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0000);
    RRCHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0100_0000);
    expect(F.getRegister()).toBe(0b0000_0000);
  });

  test("the value of the register should be 192 when CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0001);
    RRCHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b1100_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

describe("RRC A", () => {
  test("value of register should be 128, CY flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0001);
    RRCA(A, F);
    expect(A.getRegister()).toBe(0b1000_0000);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 129, CY flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_0011);
    F.setCYFlag();
    RRCA(A, F);
    expect(A.getRegister()).toBe(0b1000_0001);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 4, no flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_1000);

    RRCA(A, F);
    expect(A.getRegister()).toBe(0b0000_0100);
    expect(F.getRegister()).toBe(0b0000_0000);
  });
});

describe("SLA R8", () => {
  test("value of register should be 232, no flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0111_0100);
    SLAR8(A, F);
    expect(A.getRegister()).toBe(0b1110_1000);
    expect(F.getRegister()).toBe(0b0000_0000);
  });
  test("value of register should be 74, CY flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b1010_0101);
    SLAR8(A, F);
    expect(A.getRegister()).toBe(0b0100_1010);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
  test("value of register should be 4, no flag is raised ", () => {
    const testCPU = new TestCPU();
    const { A, F } = testCPU.cpu.register;
    A.setRegister(0b0000_1000);

    SLAR8(A, F);
    expect(A.getRegister()).toBe(0b0001_0000);
    expect(F.getRegister()).toBe(0b0000_0000);
  });
});

describe("SLA HL", () => {
  test("Results Should be 116 and flag zero should raise", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b0111_0100);

    SLAHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b1110_1000);
    expect(F.getZFlag()).toBe(0);
  });
  test("the value of the register should be 0 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0000);

    SLAHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0000);
    expect(F.getRegister()).toBe(0b1001_0000);
  });

  test("the value of the register should be 129 and CYFlag is raised", () => {
    const testCPU = new TestCPU();
    const { F } = testCPU.cpu.register;
    const { HL } = testCPU.cpu.register16Bit;
    testCPU.setHLPointTest(0b1000_0001);

    SLAHL(HL, testCPU.ram, F);
    expect(testCPU.ram.getMemoryAt(HL.getRegister())).toBe(0b0000_0010);
    expect(F.getRegister()).toBe(0b0001_0000);
  });
});

import { describe, expect, test } from "vitest";
import {
  LDHLN8,
  LDHLR8,
  LDN16A,
  LDR16N16,
  LDR8HL,
  LDR8N8,
  LDR8R8,
} from "../instructions/LD_Instructions";
import { CPU_Registers_Group } from "../CPU_Registers_Group";
import { Ram } from "../../Ram/Ram";

describe("This will test the LD r8, r8 function", () => {
  const CpuRegisterGroup = new CPU_Registers_Group();

  for (const [keyA, valueA] of Object.entries(CpuRegisterGroup.register)) {
    for (const [keyB, valueB] of Object.entries(CpuRegisterGroup.register)) {
      // skip registers if they have the same key
      if (keyA == keyB) continue;

      test(`Tests register ${keyA} and ${keyB} `, () => {
        valueB.setRegister(0xff);
        LDR8R8(valueA, valueB);
        expect(valueA.getRegister()).toBe(0xff);
        expect(valueB.getRegister()).toBe(0xff);
      });
      valueA.setRegister(0);
      valueB.setRegister(0);
    }
  }
});

describe("This will test the LD r8, n8 function", () => {
  const CpuRegisterGroup = new CPU_Registers_Group();

  for (const [key, value] of Object.entries(CpuRegisterGroup.register)) {
    // skip registers if they have the same key

    test(`Tests register  ${key} to get the value 0xf0 `, () => {
      LDR8N8(value, 0xf0);
      expect(value.getRegister()).toBe(0xf0);
    });
  }
});

describe("This will test the LD R16, N16 function", () => {
  const CpuRegisterGroup = new CPU_Registers_Group();

  for (const [key, value] of Object.entries(CpuRegisterGroup.register16Bit)) {
    // skip registers if they have the same key

    test(`Tests register  ${key} to get the value 0xff00 `, () => {
      LDR16N16(value, 0xff00);
      expect(value.getRegister()).toBe(0xff00);
    });
  }
});

describe("This will test LD[HL], R8", () => {
  const CpuGroupRegister = new CPU_Registers_Group();
  CpuGroupRegister.register16Bit.HL.setRegister(0xffff);
  // todo: replace this once implemented a good memory
  const dummyMemory = new Ram();
  for (const [key, value] of Object.entries(CpuGroupRegister.register)) {
    test(
      "This will add the number 0x00FF to register when [HL] = 0xFFFF on register " +
        key,
      () => {
        value.setRegister(0xff);

        LDHLR8(CpuGroupRegister.register16Bit.HL, value, dummyMemory);

        expect(
          dummyMemory.getMemoryAt(
            CpuGroupRegister.register16Bit.HL.getRegister()
          )
        ).toBe(0xff);
      }
    );
  }
});

describe("This will test LD[HL], N8", () => {
  const CpuCluster = new CPU_Registers_Group();
  CpuCluster.register16Bit.HL.setRegister(0xffff);
  const dummyMemory = new Ram();

  test("Add the value 15 to the [HL] pointed into the ram", () => {
    const testValue = 15;

    LDHLN8(CpuCluster.register16Bit.HL, testValue, dummyMemory);
    expect(
      dummyMemory.getMemoryAt(CpuCluster.register16Bit.HL.getRegister())
    ).toBe(testValue);
  });
});

describe("This will test LD R8, [HL]", () => {
  const CpuCluster = new CPU_Registers_Group();
  const DummyMemory = new Ram();
  const testPointer = 0xffff;
  const testValue = 0xff;
  // setup the environment
  // let hl get the value of where to point in the mem address
  CpuCluster.register16Bit.HL.setRegister(testPointer);
  DummyMemory.setMemoryAt(CpuCluster.register16Bit.HL.getRegister(), testValue);

  for (const [key, value] of Object.entries(CpuCluster.register)) {
    test(`The register ${key} should have the value ${testValue}`, () => {
      LDR8HL(value, CpuCluster.register16Bit.HL, DummyMemory);
      expect(value.getRegister()).toBe(DummyMemory.getMemoryAt(testPointer));
    });
  }
});

describe("This will test function LD[N16],A", () => {
  const CpuCluster = new CPU_Registers_Group();
  const DummyMemory = new Ram();

  test("Set the value of register A to 15 and set the value of A to Ram pointed at N16", () => {
    const testValue = 15;
    const testPointer = 0xffff;
    CpuCluster.register.A.setRegister(testValue);
    LDN16A(testPointer, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(testPointer)).toBe(testValue);
  });

  test("Set the value of register A to 0xff and set the value of A to Ram pointed at N16", () => {
    const testValue = 0xff;
    const testPointer = 0xff;
    CpuCluster.register.A.setRegister(testValue);
    LDN16A(testPointer, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(testPointer)).toBe(testValue);
  });

  test("Set the value of register A to 0 and set the value of A to Ram pointed at N16", () => {
    const testValue = 0xff;
    const testPointer = 0x0;
    CpuCluster.register.A.setRegister(testValue);
    LDN16A(testPointer, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(testPointer)).toBe(testValue);
  });
});

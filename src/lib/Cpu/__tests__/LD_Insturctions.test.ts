import { describe, expect, test } from "vitest";
import { LDR16N16, LDR8N8, LDR8R8 } from "../instructions/LD_Instructions";
import { CPU_Registers_Group } from "../CPU_Registers_Group";

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

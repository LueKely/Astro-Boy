import { describe, test, expect } from "vitest";
import { CPU_Registers_Group } from "../CPU_Registers_Group";
import { ADDHLR16 } from "../instructions/16bit_Arithmetic_Instructions";

describe("ADDHLR16 Functionalitys", () => {
  test("The sum of the opearation should be 2_082 and no flags should be raised", () => {
    const CPU = new CPU_Registers_Group();
    const r16 = 1_041;

    CPU.register16Bit.HL.setRegister(1_041);

    ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
    expect(CPU.register16Bit.HL.getRegister()).toBe(2_082);

    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("Sum should be 4_096 and should raise the HF Flag", () => {
    const CPU = new CPU_Registers_Group();
    const r16 = 0xfff;

    CPU.register16Bit.HL.setRegister(1);

    ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
    expect(CPU.register16Bit.HL.getRegister()).toBe(0xfff + 1);

    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("Sum of the opperation should raise both the HF and CY flag", () => {
    const CPU = new CPU_Registers_Group();
    const r16 = 0xffff;

    CPU.register16Bit.HL.setRegister(1);

    ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
    expect(CPU.register16Bit.HL.getRegister()).toBe(0);

    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });
});

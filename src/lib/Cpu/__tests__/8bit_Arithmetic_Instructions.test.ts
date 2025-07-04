import { describe, expect, test } from "vitest";
import { CPU_Registers_Group } from "../CPU_Registers_Group";
import { ADCAR8 } from "../instructions/8bit_Arithmetic_Instructions";

describe("ADCAR8", () => {
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

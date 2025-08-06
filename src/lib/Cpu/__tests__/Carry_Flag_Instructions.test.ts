import { describe, expect, test } from "vitest";
import { Cpu_Register_File } from "../CPU_Register_File";
import { CCF } from "../instructions/Carry_Flag_Instructions";

describe("CCF", () => {
  test("C should be 0 and H, N should be 0", () => {
    const group = new Cpu_Register_File();
    const { F } = group.register;
    F.setCYFlag();
    CCF(F);
    expect(F.getCYFlag()).toBe(0);
    expect(F.getHFlag()).toBe(0);
    expect(F.getNFlag()).toBe(0);
  });

  test("C should be 1 and H, N should be 0", () => {
    const group = new Cpu_Register_File();
    const { F } = group.register;
    CCF(F);
    expect(F.getCYFlag()).toBe(1);
    expect(F.getHFlag()).toBe(0);
    expect(F.getNFlag()).toBe(0);
  });
});

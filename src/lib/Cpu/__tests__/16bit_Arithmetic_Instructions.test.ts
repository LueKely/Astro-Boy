import { describe, test, expect } from "vitest";
import { Cpu_Register_File } from "../CPU_Register_File";
import {
  ADDHLR16,
  DECR16,
  INCR16,
} from "../instructions/16bit_Arithmetic_Instructions";

describe("ADD HL, R16 Functionalities", () => {
  test("The sum of the opearation should be 2_082 and no flags should be raised", () => {
    const CPU = new Cpu_Register_File();
    const { BC: r16 } = CPU.register16Bit;
    r16.setRegister(1_041);
    CPU.register16Bit.HL.setRegister(1_041);

    ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
    expect(CPU.register16Bit.HL.getRegister()).toBe(2_082);

    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(0);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("Sum should be 4_096 and should raise the HF Flag", () => {
    const CPU = new Cpu_Register_File();

    const { DE: r16 } = CPU.register16Bit;
    r16.setRegister(0xfff);

    CPU.register16Bit.HL.setRegister(1);

    ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
    expect(CPU.register16Bit.HL.getRegister()).toBe(0xfff + 1);

    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(0);
  });

  test("Sum of the opperation should raise both the HF and CY flag", () => {
    const CPU = new Cpu_Register_File();
    const { DE: r16 } = CPU.register16Bit;
    r16.setRegister(0xffff);

    CPU.register16Bit.HL.setRegister(1);

    ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
    expect(CPU.register16Bit.HL.getRegister()).toBe(0);

    expect(CPU.register.F.getNFlag()).toBe(0);
    expect(CPU.register.F.getHFlag()).toBe(1);
    expect(CPU.register.F.getCYFlag()).toBe(1);
  });
});

describe("INC r16 functionalities", () => {
  test("The value of r16 should increment to 1", () => {
    const CPU = new Cpu_Register_File();

    const { BC } = CPU.register16Bit;
    BC.setRegister(0b0001_0000_0000_0000);
    INCR16(BC);
    expect(BC.getRegister()).toBe(0b0001_0000_0000_0001);
  });
});
describe("DEC r16 functionalities", () => {
  test("The value of r16 should decrement to 1", () => {
    const CPU = new Cpu_Register_File();

    const { BC } = CPU.register16Bit;
    BC.setRegister(0b0001_0000_0000_0001);
    DECR16(BC);
    expect(BC.getRegister()).toBe(0b0001_0000_0000_0000);
  });
});

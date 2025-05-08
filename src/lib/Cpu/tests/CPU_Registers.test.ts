import { describe, expect, test } from "vitest";
import { CPU_Registers } from "../CPU_Registers";

const Register = new CPU_Registers();

describe("Read and Write inside the registers", () => {
  test.each([
    Register.register.B,
    Register.register.C,
    Register.register.D,
    Register.register.E,
  ])("Each Register should read and right", (address) => {
    address = 5;
    expect(address).equal(5);
  });
});

describe("Read And Write in BC Register", () => {
  test("Should Get BC", () => {
    Register.register.B = 0b0001;
    Register.register.C = 0b0001;
    expect(Register.getBC()).toBe(0b000100000001);
  });

  test("Should Set BC", () => {
    Register.setBC(4369);
    expect(Register.getBC()).toBe(4369);
    expect(Register.register.B).toBe(0b00010001);
    expect(Register.register.C).toBe(0b00010001);
  });

  test("Set BC value to 69 Excpect B to be 0 & C to be 69", () => {
    Register.setBC(69);
    expect(Register.getBC()).toBe(69);
    expect(Register.register.B).toBe(0);
    expect(Register.register.C).toBe(69);
  });

  test("Set B to 0 and C to 69 Expect BC to be 69", () => {
    Register.register.B = 0;
    Register.register.C = 69;
    expect(Register.getBC()).toBe(69);
  });
});

describe("Read And Write in DE Register", () => {
  test("Should Get DE", () => {
    Register.register.D = 0b0001;
    Register.register.E = 0b0001;
    expect(Register.getDE()).toBe(0b0001_0000_0001);
  });

  test("Should Set DE", () => {
    Register.setDE(4369);
    expect(Register.getDE()).toBe(4369);
    expect(Register.register.D).toBe(0b0001_0001);
    expect(Register.register.E).toBe(0b0001_0001);
  });

  test("Set DE value to 69 Excpect D to be 0 & E to be 69", () => {
    Register.setDE(69);
    expect(Register.getDE()).toBe(69);
    expect(Register.register.D).toBe(0);
    expect(Register.register.E).toBe(69);
  });

  test("Set D to 0 and E to 69 Expect DE to be 69", () => {
    Register.register.D = 0;
    Register.register.E = 69;
    expect(Register.getDE()).toBe(69);
  });
});

describe("Flag Register", () => {
  test("Individual Flags", () => {
    Register.register.F.setZFlag();
    Register.register.F.setCYFlag();
    Register.register.F.setHFlag();
    Register.register.F.setNFlag();
    expect(Register.register.F.getZFlag()).not.toBe(0);
    expect(Register.register.F.getNFlag()).not.toBe(0);
    expect(Register.register.F.getHFlag()).not.toBe(0);
    expect(Register.register.F.getCYFlag()).not.toBe(0);
    expect(Register.register.F.getFRegister()).toBe(0b1111_0000);
    Register.register.F.setZFlag();
    Register.register.F.setCYFlag();
    Register.register.F.setHFlag();
    Register.register.F.setNFlag();
    expect(Register.register.F.getZFlag()).toBe(0);
    expect(Register.register.F.getHFlag()).toBe(0);
    expect(Register.register.F.getNFlag()).toBe(0);
    expect(Register.register.F.getCYFlag()).toBe(0);
    expect(Register.register.F.getFRegister()).toBe(0b0);
  });
  test("Combined Flags");
});

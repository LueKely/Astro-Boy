import { describe, expect, test } from "vitest";
import { CPU_Registers_Group } from "../CPU_Registers_Group";
import {
  ANDAHL,
  ANDAN8,
  ANDAR8,
  CPL,
} from "../instructions/Bitwise_Logic_Instructions";
import { Ram } from "../../Ram/Ram";

describe("Functionalities of AND A, R8", () => {
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b0000_0000);
    C.setRegister(0b0000_0000);

    ANDAR8(A, C, F);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b1111_1111);
    C.setRegister(0b0000_0000);

    ANDAR8(A, C, F);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b0000_1111);
    C.setRegister(0b0000_0000);

    ANDAR8(A, C, F);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test("the value should be 0b0000_11111 and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;

    A.setRegister(0b10101_1111);
    C.setRegister(0b0000_1111);

    ANDAR8(A, C, F);

    expect(A.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0010_0000);
  });
});

describe("Functionalities of AND A, R8", () => {
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const dummyRam = new Ram();

    A.setRegister(0b0000_0000);
    HL.setRegister(0b0000_0000);
    dummyRam.setMemoryAt(HL.getRegister(), 0b0000_0000);

    ANDAHL(A, HL, F, dummyRam);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const dummyRam = new Ram();

    A.setRegister(0b0000_0000);
    HL.setRegister(0b1111_0000);
    dummyRam.setMemoryAt(HL.getRegister(), 0b0000_0000);

    ANDAHL(A, HL, F, dummyRam);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test("the value should be 0b0000_11111 and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, C, F } = CPU.register;
    const { HL } = CPU.register16Bit;
    const dummyRam = new Ram();

    A.setRegister(0b0000_1111);
    HL.setRegister(0b0001_1111);
    dummyRam.setMemoryAt(HL.getRegister(), 0b0001_1111);

    ANDAHL(A, HL, F, dummyRam);

    expect(A.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0010_0000);
  });
});

describe("Functionalities of AND A, N8", () => {
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;

    A.setRegister(0b0000_0000);

    ANDAN8(A, 0b0000_0000, F);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;

    A.setRegister(0b1111_1111);

    ANDAN8(A, 0b0000_0000, F);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });
  test("the value should be zero and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;

    A.setRegister(0b0000_1111);

    ANDAN8(A, 0b0000_0000, F);

    expect(A.getRegister()).toBe(0);
    expect(F.getRegister()).toBe(0b1010_0000);
  });

  test("the value should be 0b0000_11111 and the flag value should correspond", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;

    A.setRegister(0b10101_1111);

    ANDAN8(A, 0b0000_1111, F);

    expect(A.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0010_0000);
  });
});

describe("Tests the function of CPL", () => {
  test("The value 1111_0000 should be 0000_1111; N and H flags should raise", () => {
    const CPU = new CPU_Registers_Group();
    const { A, F } = CPU.register;

    A.setRegister(0b1111_0000);
    CPL(A, F);
    expect(A.getRegister()).toBe(0b0000_1111);
    expect(F.getRegister()).toBe(0b0110_0000);
  });
});

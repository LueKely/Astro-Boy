import { expect, test } from "vitest";
import { CPU_Registers } from "../CPU_Registers";

const Register = new CPU_Registers();

Register.register.B = 10;
Register.register.C = 10;

test.each([
  Register.register.B,
  Register.register.C,
  Register.register.D,
  Register.register.E,
])("Each Register should read and right", (address) => {});

import type { Ram } from "../../Ram/Ram";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";
// note:
// [XX] means it is a pointer pointing to the address bus

// LD R8, R8 tested
// LD r, r'
function LDR8R8(r8l: Cpu_Register, r8r: Cpu_Register) {
  r8l.setRegister(r8r.getRegister());
}
// LD R8, N8 tested
function LDR8N8(r8: Cpu_Register, n8: number) {
  r8.setRegister(n8);
}
// LD R16, N16 tested
function LDR16N16(r16: Cpu_Register_16Bit, n16: number) {
  r16.setRegister(n16);
}

// LD [HL], R8 tested
function LDHLR8(HL: Cpu_Register_16Bit, r8: Cpu_Register, memAdd: Ram) {
  memAdd.setMemoryAt(HL.getRegister(), r8.getRegister());
}

// LD [HL], N8 tested
function LDHLN8(HL: Cpu_Register_16Bit, n8: number, memAdd: Ram) {
  memAdd.setMemoryAt(HL.getRegister(), n8);
}

// LD R8, [HL] tested
function LDR8HL(r8: Cpu_Register, HL: Cpu_Register_16Bit, memAdd: Ram) {
  r8.setRegister(memAdd.getMemoryAt(HL.getRegister()));
}
// LD[n16],A tested
function LDN16A(n16: number, a: Cpu_Register, memAdd: Ram) {
  memAdd.setMemoryAt(n16, a.getRegister());
}
// LDH [n16], A tested
function LDHN16A(n16: number, a: Cpu_Register, memAdd: Ram) {
  if (n16 >= 0xff00 && n16 <= 0xffff) {
    memAdd.setMemoryAt(n16, a.getRegister());
  } else {
    throw new Error("pos is out of scope");
  }
}

// LDH [C], A tested
function LDHCA(memAdd: Ram, a: Cpu_Register, c: Cpu_Register) {
  memAdd.setMemoryAt(0xff00 + c.getRegister(), a.getRegister());
}

// this is LD A,[R16] tested
// LDAPR16
function LDAR16(a: Cpu_Register, r16: Cpu_Register_16Bit, memAdd: Ram) {
  a.setRegister(memAdd.getMemoryAt(r16.getRegister()));
}

// LD A, [N16] tested
function LDAN16(a: Cpu_Register, n16: number, memAdd: Ram) {
  a.setRegister(memAdd.getMemoryAt(n16));
}

// LDH A, [N16] tested
function LDHAN16(n16: number, a: Cpu_Register, memAdd: Ram) {
  if (n16 >= 0xff00 && n16 <= 0xffff) {
    a.setRegister(memAdd.getMemoryAt(n16));
  } else {
    throw new Error("pointer is out of scope");
  }
}

// LDH A, [C] tested
function LDHAC(c: Cpu_Register, a: Cpu_Register, address: Ram) {
  a.setRegister(address.getMemoryAt(c.getRegister() + 0xff00));
}

// LD [HLI], A tested
function LDHLIA(memAdd: Ram, HL: Cpu_Register_16Bit, a: Cpu_Register) {
  memAdd.setMemoryAt(HL.getRegister(), a.getRegister());
  HL.setRegister(HL.getRegister() + 1);
}
// LD [HLD], A tested
function LDHLDA(memAdd: Ram, HL: Cpu_Register_16Bit, a: Cpu_Register) {
  memAdd.setMemoryAt(HL.getRegister(), a.getRegister());
  HL.setRegister(HL.getRegister() - 1);
}

// LD A,[HLD] Tested
function LDAHLD(a: Cpu_Register, HL: Cpu_Register_16Bit, memAdd: Ram) {
  a.setRegister(memAdd.getMemoryAt(HL.getRegister()));
  HL.setRegister(HL.getRegister() - 1);
}

// LD A, [HLI] tested
function LDAHLI(a: Cpu_Register, HL: Cpu_Register_16Bit, memAdd: Ram) {
  a.setRegister(memAdd.getMemoryAt(HL.getRegister()));
  HL.setRegister(HL.getRegister() + 1);
}

export {
  LDR16N16,
  LDR8N8,
  LDR8R8,
  LDHLN8,
  LDR8HL,
  LDHCA,
  LDN16A,
  LDAR16,
  LDHLIA,
  LDHLDA,
  LDAHLI,
  LDAHLD,
  LDHAC,
  LDHN16A,
  LDAN16,
  LDHAN16,
  LDHLR8,
};

import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";
// note:
// [XX] means it is a pointer pointing to the address bus

// LD R8, R8
// LD r, r'
function LDR8R8(r8l: Cpu_Register, r8r: Cpu_Register) {
  r8l.setRegister(r8r.getRegister());
}
// LD R8, N8
function LDR8N8(r8: Cpu_Register, n8: number) {
  r8.setRegister(n8);
}
// LD R16, N16
function LDR16N16(r16: Cpu_Register_16Bit, n16: number) {
  r16.setRegister(n16);
}

// LD [HL], R8
function LDHLR8(HL: Cpu_Register_16Bit, r8: Cpu_Register, memAdd: Uint8Array) {
  memAdd[HL.getRegister()] = r8.getRegister();
}

// LD [HL], N8
function LDHLN8(HL: Cpu_Register_16Bit, n8: number, memAdd: Uint8Array) {
  memAdd[HL.getRegister()] = n8;
}

// LD R8, [HL]
function LDR8HL(r8: Cpu_Register, HL: Cpu_Register_16Bit, memAdd: Uint8Array) {
  r8.setRegister(memAdd[HL.getRegister()]);
}
// LD[n16],A
function LDN16A(n16: number, a: Cpu_Register, memAdd: Uint8Array) {
  memAdd[n16] = a.getRegister();
}
// LDH [n16], A
function LDHN16A(n16: number, a: Cpu_Register, memAdd: Uint8Array) {
  if (n16 >= 0xff00 && 16 <= 0xffff) {
    memAdd[n16] = a.getRegister();
  } else {
    throw new Error("pos is out of scope");
  }
}

// LDH [C], A
function LDHCA(memAdd: Uint8Array, a: Cpu_Register, c: Cpu_Register) {
  memAdd[0xff00 + c.getRegister()] = a.getRegister();
}

// this is LD A,[R16]
// let memory = new unint8Array();
// let R16 = CPU.Registers.register.getBC
// let [R16] = memory(R16)
// LDAPR16
function LDAPR16(a: Cpu_Register, r16: Cpu_Register_16Bit, memAdd: Uint8Array) {
  a.setRegister(memAdd[r16.getRegister()]);
}

// LD A, [N16]
function LDAPN16(a: Cpu_Register, n16: number, memAdd: Uint8Array) {
  a.setRegister(memAdd[n16]);
}

// LDH A, [N16]
function LDHAN16(n16: number, a: Cpu_Register, memAdd: Uint8Array) {
  if (n16 >= 0xff00 && n16 <= 0xffff) {
    a.setRegister(memAdd[n16]);
  } else {
    throw new Error("pointer is out of scope");
  }
}

// LDH A, [C]
function LDHAC(c: number, a: Cpu_Register, address: Uint8Array) {
  a.setRegister(address[c + 0xff00]);
}

// LD [HLI], A
function LDHLIA(memAdd: Uint8Array, HL: Cpu_Register_16Bit, a: Cpu_Register) {
  memAdd[HL.getRegister()] = a.getRegister();
  HL.setRegister(HL.getRegister() + 1);
}
// LD [HLD], A
function LDHLDA(memAdd: Uint8Array, HL: Cpu_Register_16Bit, a: Cpu_Register) {
  memAdd[HL.getRegister()] = a.getRegister();
  HL.setRegister(HL.getRegister() - 1);
}

// LD A,[HLD]
function LDAHLD(a: Cpu_Register, HL: Cpu_Register_16Bit, memAdd: Uint8Array) {
  a.setRegister(memAdd[HL.getRegister()]);
  HL.setRegister(HL.getRegister() - 1);
}

// LD A, [HLI]
function LDAHLI(a: Cpu_Register, HL: Cpu_Register_16Bit, memAdd: Uint8Array) {
  a.setRegister(memAdd[HL.getRegister()]);
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
  LDAPR16,
  LDHLIA,
  LDHLDA,
  LDAHLI,
  LDAHLD,
  LDHAC,
  LDHN16A,
  LDAPN16,
  LDHAN16,
  LDHLR8,
};

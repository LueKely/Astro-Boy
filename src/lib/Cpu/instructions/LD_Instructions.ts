import type { CPU_Registers } from "../CPU_Registers";
// note:
// [XX] means it is a pointer pointing to the address bus
// bro all of this shit doesn't work hahaha
// LD R8, R8
// LD r, r'
function LDR8R8(r8l: number, r8r: number) {
  r8l = r8r;
}
// LD R8, N8
function LDR8N8(r8: number, n8: number) {
  r8 = n8;
}
// LD R16, N16
function LDR16N16(r16: (value: number) => void, n16: number) {
  r16(n16);
}

// LD [HL], R8
function LDHLR8(HL: CPU_Registers, r8: number, memAdd: Uint8Array) {
  memAdd[HL.getHL()] = r8;
}

// LD [HL], N8
function LDHLN8(HL: CPU_Registers, n8: number, memAdd: Uint8Array) {
  memAdd[HL.getHL()] = n8;
}

// LD R8, [HL]
function LDR8HL(r8: number, HL: CPU_Registers, memAdd: Uint8Array) {
  r8 = memAdd[HL.getHL()];
}
// LD[n16],A
function LDN16A(n16: number, a: number) {
  n16 = a;
}
// LDH [n16], A
function LDHN16A(n16: number, a: number, pos: number) {
  if (pos > 0xff00 && pos < 0xffff) {
    n16 = a;
  } else {
    throw new Error("pos is out of scope");
  }
}

// LDH [C], A
function LDHCA(c: Uint8Array, a: number) {
  c[0xff00 + 0xc] = a;
}

// this is LD A,[R16]
// let memory = new unint8Array();
// let R16 = CPU.Registers.register.getBC
// let [R16] = memory(R16)
// LDAPR16
function LDAPR16(a: number, pr16: number) {
  a = pr16;
}

// LD A, [N16]
function LDAPN16(a: number, n16: number) {
  a = n16;
}

// LDH A, [N16]
function LDHAN16(n16: number, a: number, pos: number) {
  if (pos > 0xff00 && pos < 0xffff) {
    a = n16;
  } else {
    throw new Error("pos is out of scope");
  }
}

// LDH A, [C]
function LDHAC(c: number, a: number, address: Uint8Array) {
  a = address[c + 0xff00];
}

// LD [HLI], A
function LDHLIA(HLPointer: number, HL: CPU_Registers, a: number) {
  HLPointer = a;
  HL.setHL(HL.getHL() + 1);
}
// LD [HLD], A
function LDHLDA(HLPointer: number, HL: CPU_Registers, a: number) {
  HLPointer = a;
  HL.setHL(HL.getHL() - 1);
}

// LD A,[HLD]
function LDAHLD(a: number, HL: CPU_Registers, address: Uint8Array) {
  a = address[HL.getHL()];

  HL.setHL(HL.getHL() - 1);
}

// LD A, [HLI]
function LDAHLI(a: number, HL: CPU_Registers, address: Uint8Array) {
  a = address[HL.getHL()];
  HL.setHL(HL.getHL() + 1);
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

// note:
// [XX] means it is a pointer pointing to the address bus

// LD r, r'
import type { CPU_Registers } from '../CPU_Registers';

function LDR8R8(r8l: number, r8r: number) {
	r8l = r8r;
}

function LDR8N8(r8: number, n8: number) {
	r8 = n8;
}

function LDR16N16(r16: (value: number) => void, n16: number) {
	r16(n16);
}

function LDHLN8(HL: CPU_Registers, n8: number) {
	HL.setHL(n8);
}

// LD R8, [HL]
function LDR8HL(r8: number, HL: CPU_Registers, memAdd: Uint8Array) {
	r8 = memAdd[HL.getHL()];
}
// LD[n16],A
function LDN16A(n16: number, a: number) {
	n16 = a;
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
};

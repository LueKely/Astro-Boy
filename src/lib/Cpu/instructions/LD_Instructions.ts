import type { Ram } from '../../Ram/Ram';
import type { Cpu_Register, Cpu_Register_16Bit } from '../CPU_Register';
// note:
// [XX] means it is a pointer pointing to the address bus

// LD R8, R8 tested
// LD r, r'
function LDR8R8(r8l: Cpu_Register<any>, r8r: Cpu_Register<any>) {
	r8l.setRegister(r8r.getRegister());
}

// LD R8, N8 tested
function LDR8N8(r8: Cpu_Register<any>, n8: number) {
	r8.setRegister(n8);
}

// LD R16, N16 tested
function LDR16N16(r16: Cpu_Register_16Bit<any>, n16: number) {
	r16.setRegister(n16);
}

// LD [HL], R8 tested
function LDHLR8(
	HL: Cpu_Register_16Bit<'HL'>,
	r8: Cpu_Register<any>,
	memAdd: Ram
) {
	memAdd.setMemoryAt(HL.getRegister(), r8.getRegister());
}

// LD [HL], N8 tested
function LDHLN8(HL: Cpu_Register_16Bit<'HL'>, n8: number, memAdd: Ram) {
	memAdd.setMemoryAt(HL.getRegister(), n8);
}

// LD R8, [HL] tested
function LDR8HL(
	r8: Cpu_Register<any>,
	HL: Cpu_Register_16Bit<'HL'>,
	memAdd: Ram
) {
	r8.setRegister(memAdd.getMemoryAt(HL.getRegister()));
}

// LD[n16],A tested
function LDN16A(n16: number, a: Cpu_Register<'A'>, memAdd: Ram) {
	if (n16 == 0xff02) {
		console.log('SOMETHING HAS BEEN WRITTEN');
	}
	memAdd.setMemoryAt(n16, a.getRegister());
}

// LDH [n16], A untested
function LDHN16A(n8: number, a: Cpu_Register<'A'>, memAdd: Ram) {
	if (n8 + 0xff0 == 0xff02) {
		console.log('SOMETHING HAS BEEN WRITTEN');
	} else {
		console.log(n8);
	}

	memAdd.setMemoryAt(0xff00 + n8, a.getRegister());
}

// LDH [C], A tested
function LDHCA(memAdd: Ram, a: Cpu_Register<'A'>, c: Cpu_Register<'C'>) {
	if (c.getRegister() + 0xff0 == 0xff02) {
		console.log('SOMETHING HAS BEEN WRITTEN');
	}
	memAdd.setMemoryAt(0xff00 + c.getRegister(), a.getRegister());
}

// this is LD A,[R16] tested
// LDAPR16
function LDAR16(
	a: Cpu_Register<'A'>,
	r16: Cpu_Register_16Bit<any>,
	memAdd: Ram
) {
	a.setRegister(memAdd.getMemoryAt(r16.getRegister()));
}

// LD [R16], A - untested
function LDR16A(
	r16: Cpu_Register_16Bit<any>,
	a: Cpu_Register<'A'>,
	memAdd: Ram
) {
	memAdd.setMemoryAt(r16.getRegister(), a.getRegister());
}

// LD A, [N16] tested
function LDAN16(a: Cpu_Register<'A'>, n16: number, memAdd: Ram) {
	a.setRegister(memAdd.getMemoryAt(n16));
}

// LDH A, [N16] retested
function LDHAN16(n16: number, a: Cpu_Register<'A'>, memAdd: Ram) {
	a.setRegister(memAdd.getMemoryAt(n16 + 0xff));
}

// LDH A, [C] tested
function LDHAC(c: Cpu_Register<'C'>, a: Cpu_Register<'A'>, address: Ram) {
	a.setRegister(address.getMemoryAt(c.getRegister() + 0xff00));
}

// LD [HLI], A tested
function LDHLIA(
	memAdd: Ram,
	HL: Cpu_Register_16Bit<'HL'>,
	a: Cpu_Register<'A'>
) {
	memAdd.setMemoryAt(HL.getRegister(), a.getRegister());
	HL.setRegister(HL.getRegister() + 1);
}

// LD [HLD], A tested
function LDHLDA(
	memAdd: Ram,
	HL: Cpu_Register_16Bit<'HL'>,
	a: Cpu_Register<'A'>
) {
	memAdd.setMemoryAt(HL.getRegister(), a.getRegister());
	HL.setRegister(HL.getRegister() - 1);
}

// LD A,[HLD] Tested
function LDAHLD(
	a: Cpu_Register<'A'>,
	HL: Cpu_Register_16Bit<'HL'>,
	memAdd: Ram
) {
	a.setRegister(memAdd.getMemoryAt(HL.getRegister()));
	HL.setRegister(HL.getRegister() - 1);
}

// LD A, [HLI] tested
function LDAHLI(
	a: Cpu_Register<'A'>,
	HL: Cpu_Register_16Bit<'HL'>,
	memAdd: Ram
) {
	a.setRegister(memAdd.getMemoryAt(HL.getRegister()));
	HL.setRegister(HL.getRegister() + 1);
}

export {
	LDR16A,
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

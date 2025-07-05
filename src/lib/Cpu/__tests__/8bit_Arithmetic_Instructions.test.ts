import { describe, expect, test } from 'vitest';
import { CPU_Registers_Group } from '../CPU_Registers_Group';
import {
	ADCAHL,
	ADCAN8,
	ADCAR8,
	ADDAHL,
	ADDAN8,
	ADDAR8,
	ADDHLR16,
} from '../instructions/8bit_Arithmetic_Instructions';
import { Ram } from '../../Ram/Ram';

describe('ADCAR8 Functionalitys', () => {
	test('The result of adding the value of register B to A is 1 — flags should all be 0', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0);
		CPU.register.B.setRegister(0x1);
		ADCAR8(CPU.register.B, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(0x1);

		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
	});

	test('The result of adding the value of register B to A is 16 — flags of the Halfcarry should raise ', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0e);
		CPU.register.B.setRegister(0x01);
		CPU.register.F.setCYFlag();

		ADCAR8(CPU.register.B, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(16);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of register B to A is 0 — flags of the Zero should raise', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0);
		CPU.register.B.setRegister(0);

		ADCAR8(CPU.register.B, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(0);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(1);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});
});

describe('ADCAHL Functionalitys', () => {
	test('The result of adding the value of [HL] to A is 1 — flags should all be 0', () => {
		const CPU = new CPU_Registers_Group();
		const dummyMemory = new Ram();
		CPU.register16Bit.HL.setRegister(0xff);
		dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x01);
		CPU.register.A.setRegister(0x0);

		ADCAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(1);
		expect(CPU.register.F.getFRegister()).toBe(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ', () => {
		const CPU = new CPU_Registers_Group();
		const dummyMemory = new Ram();
		CPU.register16Bit.HL.setRegister(0xff);
		dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x01);
		CPU.register.A.setRegister(0x0e);
		CPU.register.F.setCYFlag();

		ADCAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(16);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 0 — flags of the Zero should raise', () => {
		const CPU = new CPU_Registers_Group();
		const dummyMemory = new Ram();
		CPU.register16Bit.HL.setRegister(0xff);
		dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x00);
		CPU.register.A.setRegister(0x0);

		ADCAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(0);
		expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
		expect(CPU.register.F.getZFlag()).toBe(1);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});
});

describe('ADCAN8 Functionalitys', () => {
	test('The result of adding the value of N8(0) to A is 1 — flags should all be 0', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0);
		ADCAN8(1, CPU.register.A, CPU.register.F);

		expect(CPU.register.A.getRegister()).toBe(1);
		expect(CPU.register.F.getFRegister()).toBe(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0e);
		CPU.register.F.setCYFlag();

		ADCAN8(1, CPU.register.A, CPU.register.F);

		expect(CPU.register.A.getRegister()).toBe(16);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 0 — flags of the Zero should raise', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0);
		ADCAN8(0, CPU.register.A, CPU.register.F);

		expect(CPU.register.A.getRegister()).toBe(0);
		expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
		expect(CPU.register.F.getZFlag()).toBe(1);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});
});

// ADD functions

describe('ADDAR8 Functionalitys', () => {
	test('The result of adding the value of register B to A is 1 — flags should all be 0', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0);
		CPU.register.B.setRegister(0x1);
		ADDAR8(CPU.register.B, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(0x1);

		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
	});

	test('The result of adding the value of register B to A is 15 — flags of the Halfcarry should raise ', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0e);
		CPU.register.B.setRegister(2);
		CPU.register.F.setCYFlag();

		ADDAR8(CPU.register.B, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(16);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of register B to A is 0 — flags of the Zero should raise', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0);
		CPU.register.B.setRegister(0);

		ADDAR8(CPU.register.B, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(0);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(1);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});
});

describe('ADDAHL Functionalitys', () => {
	test('The result of adding the value of [HL] to A is 1 — flags should all be 0', () => {
		const CPU = new CPU_Registers_Group();
		const dummyMemory = new Ram();
		CPU.register16Bit.HL.setRegister(0xff);
		dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x01);
		CPU.register.A.setRegister(0x0);

		ADDAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(1);
		expect(CPU.register.F.getFRegister()).toBe(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ', () => {
		const CPU = new CPU_Registers_Group();
		const dummyMemory = new Ram();
		CPU.register16Bit.HL.setRegister(0xff);
		dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 2);
		CPU.register.A.setRegister(0x0e);
		CPU.register.F.setCYFlag();

		ADDAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(16);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 0 — flags of the Zero should raise', () => {
		const CPU = new CPU_Registers_Group();
		const dummyMemory = new Ram();
		CPU.register16Bit.HL.setRegister(0xff);
		dummyMemory.setMemoryAt(CPU.register16Bit.HL.getRegister(), 0x00);
		CPU.register.A.setRegister(0x0);

		ADDAHL(CPU.register16Bit.HL, dummyMemory, CPU.register.F, CPU.register.A);

		expect(CPU.register.A.getRegister()).toBe(0);
		expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
		expect(CPU.register.F.getZFlag()).toBe(1);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});
});

describe('ADDAN8 Functionalitys', () => {
	test('The result of adding the value of N8(0) to A is 1 — flags should all be 0', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0);
		ADDAN8(1, CPU.register.A, CPU.register.F);

		expect(CPU.register.A.getRegister()).toBe(1);
		expect(CPU.register.F.getFRegister()).toBe(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 16 — flags of the Halfcarry should raise ', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0e);
		CPU.register.F.setCYFlag();

		ADDAN8(2, CPU.register.A, CPU.register.F);

		expect(CPU.register.A.getRegister()).toBe(16);
		expect(CPU.register.F.getFRegister()).toBeGreaterThan(0);
		expect(CPU.register.F.getZFlag()).toBe(0);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('The result of adding the value of [HL] to A is 0 — flags of the Zero should raise', () => {
		const CPU = new CPU_Registers_Group();
		CPU.register.A.setRegister(0x0);
		ADDAN8(0, CPU.register.A, CPU.register.F);

		expect(CPU.register.A.getRegister()).toBe(0);
		expect(CPU.register.F.getFRegister()).toBe(0b1000_0000);
		expect(CPU.register.F.getZFlag()).toBe(1);
		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});
});

describe('ADDHLR16 Functionalitys', () => {
	test('The sum of the opearation should be 2_082 and no flags should be raised', () => {
		const CPU = new CPU_Registers_Group();
		const r16 = 1_041;

		CPU.register16Bit.HL.setRegister(1_041);

		ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
		expect(CPU.register16Bit.HL.getRegister()).toBe(2_082);

		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(0);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('Sum should be 4_096 and should raise the HF Flag', () => {
		const CPU = new CPU_Registers_Group();
		const r16 = 0xfff;

		CPU.register16Bit.HL.setRegister(1);

		ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
		expect(CPU.register16Bit.HL.getRegister()).toBe(0xfff + 1);

		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(0);
	});

	test('Sum of the opperation should raise both the HF and CY flag', () => {
		const CPU = new CPU_Registers_Group();
		const r16 = 0xffff;

		CPU.register16Bit.HL.setRegister(1);

		ADDHLR16(r16, CPU.register16Bit.HL, CPU.register.F);
		expect(CPU.register16Bit.HL.getRegister()).toBe(0);

		expect(CPU.register.F.getNFlag()).toBe(0);
		expect(CPU.register.F.getHFlag()).toBe(1);
		expect(CPU.register.F.getCYFlag()).toBe(1);
	});
});

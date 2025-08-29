import { describe, expect, test } from 'vitest';
import {
  LDAHLD,
  LDAHLI,
  LDAN16,
  LDAR16,
  LDHAC,
  LDHAN16,
  LDHCA,
  LDHLDA,
  LDHLIA,
  LDHLN8,
  LDHLR8,
  LDHN16A,
  LDN16A,
  LDR16A,
  LDR16N16,
  LDR8HL,
  LDR8N8,
  LDR8R8,
} from '../instructions/LD_Instructions';
import { Cpu_Register_File } from '../CPU_Register_File';
import { Ram } from '../../Ram/Ram';

describe('This will test the LD r8, r8 function', () => {
  const CpuRegisterGroup = new Cpu_Register_File();

  for (const [keyA, valueA] of Object.entries(CpuRegisterGroup.register)) {
    for (const [keyB, valueB] of Object.entries(CpuRegisterGroup.register)) {
      // skip registers if they have the same key
      if (keyA == keyB) continue;

      test(`Tests register ${keyA} and ${keyB} `, () => {
        valueB.setRegister(0xff);
        LDR8R8(valueA, valueB);
        expect(valueA.getRegister()).toBe(0xff);
        expect(valueB.getRegister()).toBe(0xff);
      });
      valueA.setRegister(0);
      valueB.setRegister(0);
    }
  }
});

describe('This will test the LD r8, n8 function', () => {
  const CpuRegisterGroup = new Cpu_Register_File();

  for (const [key, value] of Object.entries(CpuRegisterGroup.register)) {
    // skip registers if they have the same key

    test(`Tests register  ${key} to get the value 0xf0 `, () => {
      LDR8N8(value, 0xf0);
      expect(value.getRegister()).toBe(0xf0);
    });
  }
});

describe('This will test the LD R16, N16 function', () => {
  const CpuRegisterGroup = new Cpu_Register_File();

  for (const [key, value] of Object.entries(CpuRegisterGroup.register16Bit)) {
    // skip registers if they have the same key

    test(`Tests register  ${key} to get the value 0xff00 `, () => {
      LDR16N16(value, 0xff00);
      expect(value.getRegister()).toBe(0xff00);
    });

    test(`Tests register  ${key} to get the value 0xff00 `, () => {
      LDR16N16(value, 0x2 | (0x03 << 8));
      expect(value.getRegister()).toBe(0x2 | (0x03 << 8));
    });
  }
});

describe('This will test LD[HL], R8', () => {
  const CpuGroupRegister = new Cpu_Register_File();
  CpuGroupRegister.register16Bit.HL.setRegister(0xffff);
  // todo: replace this once implemented a good memory
  const dummyMemory = new Ram();
  for (const [key, value] of Object.entries(CpuGroupRegister.register)) {
    test(
      'This will add the number 0x00FF to register when [HL] = 0xFFFF on register ' +
        key,
      () => {
        value.setRegister(0xff);

        LDHLR8(CpuGroupRegister.register16Bit.HL, value, dummyMemory);

        expect(
          dummyMemory.getMemoryAt(
            CpuGroupRegister.register16Bit.HL.getRegister()
          )
        ).toBe(0xff);
      }
    );
  }
});

describe('This will test LD[HL], N8', () => {
  const CpuCluster = new Cpu_Register_File();
  CpuCluster.register16Bit.HL.setRegister(0xffff);
  const dummyMemory = new Ram();

  test('Add the value 15 to the [HL] pointed into the ram', () => {
    const testValue = 15;

    LDHLN8(CpuCluster.register16Bit.HL, testValue, dummyMemory);
    expect(
      dummyMemory.getMemoryAt(CpuCluster.register16Bit.HL.getRegister())
    ).toBe(testValue);
  });
});

describe('This will test LD R8, [HL]', () => {
  const CpuCluster = new Cpu_Register_File();
  const DummyMemory = new Ram();
  const testPointer = 0xffff;
  const testValue = 0xff;
  // setup the environment
  // let hl get the value of where to point in the mem address
  CpuCluster.register16Bit.HL.setRegister(testPointer);
  DummyMemory.setMemoryAt(CpuCluster.register16Bit.HL.getRegister(), testValue);

  for (const [key, value] of Object.entries(CpuCluster.register)) {
    test(`The register ${key} should have the value ${testValue}`, () => {
      LDR8HL(value, CpuCluster.register16Bit.HL, DummyMemory);
      expect(value.getRegister()).toBe(DummyMemory.getMemoryAt(testPointer));
    });
  }
});

describe('This will test function LD[N16],A', () => {
  const CpuCluster = new Cpu_Register_File();
  const DummyMemory = new Ram();

  test('Set the value of register A to 15 and set the value of A to Ram pointed at N16', () => {
    const testValue = 15;
    const testPointer = 0xffff;
    CpuCluster.register.A.setRegister(testValue);
    LDN16A(testPointer, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(testPointer)).toBe(testValue);
  });

  test('Set the value of register A to 0xff and set the value of A to Ram pointed at N16', () => {
    const testValue = 0xff;
    const testPointer = 0xff;
    CpuCluster.register.A.setRegister(testValue);
    LDN16A(testPointer, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(testPointer)).toBe(testValue);
  });

  test('Set the value of register A to 0 and set the value of A to Ram pointed at N16', () => {
    const testValue = 0xff;
    const testPointer = 0x0;
    CpuCluster.register.A.setRegister(testValue);
    LDN16A(testPointer, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(testPointer)).toBe(testValue);
  });
});

describe('This will test function LDH[N16],A', () => {
  const CpuCluster = new Cpu_Register_File();
  const DummyMemory = new Ram();

  test('Set the value of register A to 15 and set the value of A to Ram pointed at N16', () => {
    const testValue = 15;
    const n8 = 0x1;
    CpuCluster.register.A.setRegister(testValue);
    LDHN16A(n8, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(n8 + 0xff00)).toBe(testValue);
  });

  test('Set the value of register A to 0xff and set the value of A to Ram pointed at N16', () => {
    const testValue = 0xff;
    const testPointer = 0xf0;
    CpuCluster.register.A.setRegister(testValue);
    LDHN16A(testPointer, CpuCluster.register.A, DummyMemory);
    expect(DummyMemory.getMemoryAt(testPointer + 0xff00)).toBe(testValue);
  });
});

describe('Testing function LDH [C], A', () => {
  test('Expect the register A to be written into the value of [C + 0xff00]', () => {
    const CpuCluster = new Cpu_Register_File();
    const { A, C } = CpuCluster.register;
    const DummyRam = new Ram();
    const testValue = 0xff;
    const testPointer = 0xff;
    A.setRegister(testValue);
    C.setRegister(testPointer);
    LDHCA(DummyRam, A, C);

    expect(DummyRam.getMemoryAt(0xff00 + C.getRegister())).toBe(testValue);
    expect(DummyRam.getMemoryAt(0xff00 + C.getRegister())).toBe(
      A.getRegister()
    );
  });

  test('Expect the register A to be written into the value of [C + 0xff00]', () => {
    const CpuCluster = new Cpu_Register_File();
    const { A, C } = CpuCluster.register;
    const DummyRam = new Ram();
    const testValue = 0x0f;
    const testPointer = 0xff;
    A.setRegister(testValue);
    C.setRegister(testPointer);
    LDHCA(DummyRam, A, C);

    expect(DummyRam.getMemoryAt(0xff00 + C.getRegister())).toBe(testValue);
    expect(DummyRam.getMemoryAt(0xff00 + C.getRegister())).toBe(
      A.getRegister()
    );
  });
});

describe('This will test LD A,[R16]', () => {
  const CpuCluster = new Cpu_Register_File();
  const DummyMemory = new Ram();
  const { A } = CpuCluster.register;
  const testPointer = 0xfff1;
  const testValue = 0xfffa;
  for (const [key, value] of Object.entries(CpuCluster.register16Bit)) {
    // skip AF
    if (key == 'AF') continue;
    test(`This will add the values of [${key}] into register a`, () => {
      value.setRegister(testPointer);
      DummyMemory.setMemoryAt(value.getRegister(), testValue);
      LDAR16(A, value, DummyMemory);
      expect(A.getRegister()).toBe(
        DummyMemory.getMemoryAt(value.getRegister())
      );
    });
  }
});

describe('this will test fucntion LD A,[N16]', () => {
  const cpuCluster = new Cpu_Register_File();
  const { A } = cpuCluster.register;
  const dummyMemory = new Ram();

  test('Load the value of [0xff] into register A', () => {
    const testPointer = 0xff;
    const testValue = 0xff;
    dummyMemory.setMemoryAt(testPointer, testValue);
    LDAN16(A, testPointer, dummyMemory);
    expect(A.getRegister()).toBe(testValue);
  });

  test('Load the value of [0xf] into register A', () => {
    const testPointer = 0xf;
    const testValue = 0xf;
    dummyMemory.setMemoryAt(testPointer, testValue);
    LDAN16(A, testPointer, dummyMemory);
    expect(A.getRegister()).toBe(testValue);
  });
});

describe('This will test the function LDH A, [N16]', () => {
  const cpuCluster = new Cpu_Register_File();
  const { A } = cpuCluster.register;
  const dummyMemory = new Ram();

  test('Load the value of [0xff] into register A', () => {
    const testPointer = 0x1;
    const testValue = 0xb;
    dummyMemory.setMemoryAt(testPointer + 0xff00, testValue);
    LDHAN16(testPointer, A, dummyMemory);
    expect(A.getRegister()).toBe(testValue);
  });
});

describe('This will test the function LDH A, [C]', () => {
  const cpuCluster = new Cpu_Register_File();
  const { A, C } = cpuCluster.register;
  const dummyMemory = new Ram();

  test('This will Load the value of [C] into Register A', () => {
    const testPointer = 0x00ff;
    const testValue = 0xf;

    C.setRegister(testPointer);
    dummyMemory.setMemoryAt(C.getRegister() + 0xff00, testValue);

    LDHAC(C, A, dummyMemory);

    expect(A.getRegister()).toBe(
      dummyMemory.getMemoryAt(C.getRegister() + 0xff00)
    );
  });
});

describe('This will test the function LD [HLI], A', () => {
  const cpuCluster = new Cpu_Register_File();
  const { A } = cpuCluster.register;
  const HLI = cpuCluster.register16Bit.HL;
  const dummyMemory = new Ram();

  test('This will Load the value of Register A into [HLI]', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_1110;
    A.setRegister(testValue);

    HLI.setRegister(testPointer);
    LDHLIA(dummyMemory, HLI, A);
    expect(dummyMemory.getMemoryAt(HLI.getRegister() - 1)).toBe(
      A.getRegister()
    );
  });

  test('Expect HLI will incriment after the instruction', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_1110;
    A.setRegister(testValue);
    HLI.setRegister(testPointer);
    LDHLIA(dummyMemory, HLI, A);
    expect(HLI.getRegister()).toBe(testPointer + 1);
  });
});

describe('This will test the function LD [HLD], A', () => {
  const cpuCluster = new Cpu_Register_File();
  const { A } = cpuCluster.register;
  const HLD = cpuCluster.register16Bit.HL;
  const dummyMemory = new Ram();

  test('This will Load the value of Register A into [HLD]', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_1111;
    A.setRegister(testValue);

    HLD.setRegister(testPointer);
    LDHLDA(dummyMemory, HLD, A);
    expect(dummyMemory.getMemoryAt(HLD.getRegister() + 1)).toBe(
      A.getRegister()
    );
  });

  test('Expect HLD will incriment after the instruction', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_1111;
    A.setRegister(testValue);
    HLD.setRegister(testPointer);
    LDHLDA(dummyMemory, HLD, A);
    expect(HLD.getRegister()).toBe(testPointer - 1);
  });
});

describe('This will test the function LD A,[HLD]', () => {
  const cpuCluster = new Cpu_Register_File();
  const { A } = cpuCluster.register;
  const HLD = cpuCluster.register16Bit.HL;
  const dummyMemory = new Ram();

  test('This will Load the value of [HLD] into Register A', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_1111;
    HLD.setRegister(testPointer);
    dummyMemory.setMemoryAt(HLD.getRegister(), testValue);

    LDAHLD(A, HLD, dummyMemory);

    expect(A.getRegister()).toBe(testValue);
  });

  test('Expect HL to decrement', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_1111;
    HLD.setRegister(testPointer);
    dummyMemory.setMemoryAt(HLD.getRegister(), testValue);

    LDAHLD(A, HLD, dummyMemory);

    expect(HLD.getRegister()).toBe(testPointer - 1);
  });
});

describe('This will test the function LD A,[HLI]', () => {
  const cpuCluster = new Cpu_Register_File();
  const { A } = cpuCluster.register;
  const HLI = cpuCluster.register16Bit.HL;
  const dummyMemory = new Ram();

  test('This will Load the value of [HLI] into Register A', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_1110;
    HLI.setRegister(testPointer);
    dummyMemory.setMemoryAt(HLI.getRegister(), testValue);

    LDAHLI(A, HLI, dummyMemory);

    expect(A.getRegister()).toBe(testValue);
  });

  test('Expect HL to decrement', () => {
    const testValue = 0xff;
    const testPointer = 0b1111_1111_1111_0000;
    HLI.setRegister(testPointer);
    dummyMemory.setMemoryAt(HLI.getRegister(), testValue);

    LDAHLI(A, HLI, dummyMemory);

    expect(HLI.getRegister()).toBe(testPointer + 1);
  });
});

describe('LD [R16], A ', () => {
  test('Expect [BC] to have the value of 0xff', () => {
    const cpuCluster = new Cpu_Register_File();
    const { A } = cpuCluster.register;
    const { BC } = cpuCluster.register16Bit;
    const dummyMemory = new Ram();
    BC.setRegister(0xff);
    A.setRegister(0xff);
    LDR16A(BC, A, dummyMemory);

    expect(dummyMemory.getMemoryAt(BC.getRegister())).toBe(A.getRegister());
  });
  test('Expect [DE] to have the value of 0xf', () => {
    const cpuCluster = new Cpu_Register_File();
    const { A } = cpuCluster.register;
    const { DE } = cpuCluster.register16Bit;
    const dummyMemory = new Ram();
    DE.setRegister(0xff);
    A.setRegister(0xf);
    LDR16A(DE, A, dummyMemory);

    expect(dummyMemory.getMemoryAt(DE.getRegister())).toBe(A.getRegister());
  });
});

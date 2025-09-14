import type { Gameboy } from '../Gameboy';
import {
  BITU3HL,
  BITU3R8,
  RESU3HL,
  RESU3R8,
  SETU3HL,
  SETU3R8,
} from './instructions/Bit_Flag_Instructions';
import {
  RLA,
  RLCA,
  RLCHL,
  RLCR8,
  RLHL,
  RLR8,
  RRA,
  RRCA,
  RRCHL,
  RRCR8,
  RRHL,
  RRR8,
  SLAHL,
  SLAR8,
  SRAHL,
  SRAR8,
  SRLHL,
  SRLR8,
  SWAPHL,
  SWAPR8,
} from './instructions/Bit_Shift_Logic_Instructions';
import type { IOpCodeEntry } from './types/OpcodeTypes';

export class CpuPrefixOpCodeRecord {
  get(index: number): IOpCodeEntry {
    return this.record()[index];
  }

  private record(): Record<number, IOpCodeEntry> {
    return {
      0x0: {
        name: 'Prefix: RLC B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLCR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1: {
        name: 'Prefix: RLC C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLCR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2: {
        name: 'Prefix: RLC D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLCR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3: {
        name: 'Prefix: RLC E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLCR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x4: {
        name: 'Prefix: RLC H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLCR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x5: {
        name: 'Prefix: RLC L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLCR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0x6: {
        name: 'Prefix: RLC (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RLCHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7: {
        name: 'Prefix: RLC A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLCA(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x8: {
        name: 'Prefix: RRC B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x9: {
        name: 'Prefix: RRC C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa: {
        name: 'Prefix: RRC D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb: {
        name: 'Prefix: RRC E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc: {
        name: 'Prefix: RRC H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd: {
        name: 'Prefix: RRC L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe: {
        name: 'Prefix: RRC (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RRCHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf: {
        name: 'Prefix: RRC A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCA(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x10: {
        name: 'Prefix: RL B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x11: {
        name: 'Prefix: RL C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x12: {
        name: 'Prefix: RL D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x13: {
        name: 'Prefix: RL E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x14: {
        name: 'Prefix: RL H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x15: {
        name: 'Prefix: RL L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0x16: {
        name: 'Prefix: RL (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RLHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x17: {
        name: 'Prefix: RL A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RLA(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x18: {
        name: 'Prefix: RR B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x19: {
        name: 'Prefix: RR C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1a: {
        name: 'Prefix: RR D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1b: {
        name: 'Prefix: RR E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1c: {
        name: 'Prefix: RR H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRCR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1d: {
        name: 'Prefix: RR L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1e: {
        name: 'Prefix: RR (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RRHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1f: {
        name: 'Prefix: RR A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRA(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x20: {
        name: 'Prefix: SLA B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x21: {
        name: 'Prefix: SLA C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x22: {
        name: 'Prefix: SLA D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x23: {
        name: 'Prefix: SLA E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x24: {
        name: 'Prefix: SLA H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x25: {
        name: 'Prefix: SLA L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0x26: {
        name: 'Prefix: SLA (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SLAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x27: {
        name: 'Prefix: SLA A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x28: {
        name: 'Prefix: SRA B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRAR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x29: {
        name: 'Prefix: SRA C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RRR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2a: {
        name: 'Prefix: SRA D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRAR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2b: {
        name: 'Prefix: SRA E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRAR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2c: {
        name: 'Prefix: SRA H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRAR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2d: {
        name: 'Prefix: SRA L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRAR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2e: {
        name: 'Prefix: SRA (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SRAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2f: {
        name: 'Prefix: SRA A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRAR8(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x30: {
        name: 'Prefix: SWAP B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SWAPR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x31: {
        name: 'Prefix: SWAP C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SWAPR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x32: {
        name: 'Prefix: SWAP D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SWAPR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x33: {
        name: 'Prefix: SWAP E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SWAPR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x34: {
        name: 'Prefix: SWAP H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SWAPR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x35: {
        name: 'Prefix: SWAP L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SLAR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0x36: {
        name: 'Prefix: SLA (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SWAPHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x37: {
        name: 'Prefix: SWAP A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SWAPR8(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x38: {
        name: 'Prefix: SRL B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRLR8(dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x39: {
        name: 'Prefix: SRL C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRLR8(dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3a: {
        name: 'Prefix: SRL D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRLR8(dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3b: {
        name: 'Prefix: SRL E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRAR8(dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3c: {
        name: 'Prefix: SRL H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRLR8(dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3d: {
        name: 'Prefix: SRL L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRLR8(dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3e: {
        name: 'Prefix: SRL (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SRLHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3f: {
        name: 'Prefix: SRL A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SRLR8(dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x40: {
        name: 'Prefix: BIT 0, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(0, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x41: {
        name: 'Prefix: BIT 0, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(0, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x42: {
        name: 'Prefix: BIT 0, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(0, dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x43: {
        name: 'Prefix: BIT 0, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(0, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x44: {
        name: 'Prefix: BIT 0, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(0, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x45: {
        name: 'Prefix: BIT 0, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(0, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x46: {
        name: 'Prefix: BIT 0, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              0,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x47: {
        name: 'Prefix: BIT 0, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(0, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x48: {
        name: 'Prefix: BIT 1, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(1, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x49: {
        name: 'Prefix: BIT 1, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(1, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x4a: {
        name: 'Prefix: BIT 1, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(1, dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x4b: {
        name: 'Prefix: BIT 1, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(1, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x4c: {
        name: 'Prefix: BIT 1, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(1, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x4d: {
        name: 'Prefix: BIT 1, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(1, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x4e: {
        name: 'Prefix: BIT 1, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              1,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x4f: {
        name: 'Prefix: BIT 1, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(1, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x50: {
        name: 'Prefix: BIT 2, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(2, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x51: {
        name: 'Prefix: BIT 2, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(2, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x52: {
        name: 'Prefix: BIT 2, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(2, dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x53: {
        name: 'Prefix: BIT 2, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(2, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x54: {
        name: 'Prefix: BIT 2, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(2, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x55: {
        name: 'Prefix: BIT 2, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(2, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x56: {
        name: 'Prefix: BIT 2, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              2,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x57: {
        name: 'Prefix: BIT 2, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(2, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x58: {
        name: 'Prefix: BIT 3, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(3, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x59: {
        name: 'Prefix: BIT 3, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(3, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x5a: {
        name: 'Prefix: BIT 3, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(3, dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x5b: {
        name: 'Prefix: BIT 3, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(3, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x5c: {
        name: 'Prefix: BIT 3, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(3, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x5d: {
        name: 'Prefix: BIT 3, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(3, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x5e: {
        name: 'Prefix: BIT 3, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              3,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x5f: {
        name: 'Prefix: BIT 3, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(3, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0x60: {
        name: 'Prefix: BIT 4, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(4, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x61: {
        name: 'Prefix: BIT 4, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(4, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x62: {
        name: 'Prefix: BIT 4, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(4, dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x63: {
        name: 'Prefix: BIT 4, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(4, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x64: {
        name: 'Prefix: BIT 4, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(4, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x65: {
        name: 'Prefix: BIT 4, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(4, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x66: {
        name: 'Prefix: BIT 4, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              4,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x67: {
        name: 'Prefix: BIT 4, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(4, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x68: {
        name: 'Prefix: BIT 5, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(5, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x69: {
        name: 'Prefix: BIT 5, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(5, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x6a: {
        name: 'Prefix: BIT 5, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(5, dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x6b: {
        name: 'Prefix: BIT 5, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(5, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x6c: {
        name: 'Prefix: BIT 5, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(5, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x6d: {
        name: 'Prefix: BIT 5, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(5, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x6e: {
        name: 'Prefix: BIT 5, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              5,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x6f: {
        name: 'Prefix: BIT 5, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(5, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x70: {
        name: 'Prefix: BIT 6, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(6, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x71: {
        name: 'Prefix: BIT 6, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(6, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x72: {
        name: 'Prefix: BIT 6, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(6, dmg.registers.register.D, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x73: {
        name: 'Prefix: BIT 6, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(6, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x74: {
        name: 'Prefix: BIT 6, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(6, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x75: {
        name: 'Prefix: BIT 6, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(6, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x76: {
        name: 'Prefix: BIT 6, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              6,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x77: {
        name: 'Prefix: BIT 6, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(6, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x78: {
        name: 'Prefix: BIT 7, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(7, dmg.registers.register.B, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x79: {
        name: 'Prefix: BIT 7, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(7, dmg.registers.register.C, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7a: {
        name: 'Prefix: BIT 7, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(7, dmg.registers.register.D, dmg.registers.register.F);

            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7b: {
        name: 'Prefix: BIT 7, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(7, dmg.registers.register.E, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7c: {
        name: 'Prefix: BIT 7, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(7, dmg.registers.register.H, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7d: {
        name: 'Prefix: BIT 7, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(7, dmg.registers.register.L, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7e: {
        name: 'Prefix: BIT 7, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            BITU3HL(
              7,
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7f: {
        name: 'Prefix: BIT 7, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            BITU3R8(7, dmg.registers.register.A, dmg.registers.register.F);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x80: {
        name: 'Prefix: RES 0, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(0, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x81: {
        name: 'Prefix: RES 0, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(0, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x82: {
        name: 'Prefix: RES 0, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(0, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x83: {
        name: 'Prefix: RES 0, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(0, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x84: {
        name: 'Prefix: RES 0, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(0, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x85: {
        name: 'Prefix: RES 0, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(0, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x86: {
        name: 'Prefix: RES 0, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(0, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x87: {
        name: 'Prefix: RES 0, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(0, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x88: {
        name: 'Prefix: RES 1, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(1, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x89: {
        name: 'Prefix: RES 1, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(1, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x8a: {
        name: 'Prefix: RES 1, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(1, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x8b: {
        name: 'Prefix: RES 1, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(1, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x8c: {
        name: 'Prefix: RES 1, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(1, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x8d: {
        name: 'Prefix: RES 1, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(1, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x8e: {
        name: 'Prefix: RES 1, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(1, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x8f: {
        name: 'Prefix: RES 1, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(1, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x90: {
        name: 'Prefix: RES 2, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(2, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x91: {
        name: 'Prefix: RES 2, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(2, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x92: {
        name: 'Prefix: RES 2, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(2, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x93: {
        name: 'Prefix: RES 2, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(2, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x94: {
        name: 'Prefix: RES 2, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(2, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x95: {
        name: 'Prefix: RES 2, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(2, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x96: {
        name: 'Prefix: RES 2, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(2, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x97: {
        name: 'Prefix: RES 2, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(2, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x98: {
        name: 'Prefix: RES 3, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(3, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x99: {
        name: 'Prefix: RES 3, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(3, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x9a: {
        name: 'Prefix: RES 3, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(3, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x9b: {
        name: 'Prefix: RES 3, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(3, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x9c: {
        name: 'Prefix: RES 3, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(3, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x9d: {
        name: 'Prefix: RES 3, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(3, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x9e: {
        name: 'Prefix: RES 3, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(3, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x9f: {
        name: 'Prefix: RES 3, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(3, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0xa0: {
        name: 'Prefix: RES 4, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(4, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa1: {
        name: 'Prefix: RES 4, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(4, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa2: {
        name: 'Prefix: RES 4, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(4, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa3: {
        name: 'Prefix: RES 4, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(4, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa4: {
        name: 'Prefix: RES 4, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(4, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa5: {
        name: 'Prefix: RES 4, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(4, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa6: {
        name: 'Prefix: RES 4, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(4, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa7: {
        name: 'Prefix: RES 4, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(4, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa8: {
        name: 'Prefix: RES 5, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(5, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xa9: {
        name: 'Prefix: RES 5, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(5, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xaa: {
        name: 'Prefix: RES 5, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(5, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xab: {
        name: 'Prefix: RES 5, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(5, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xac: {
        name: 'Prefix: RES 5, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(5, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xad: {
        name: 'Prefix: RES 5, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(5, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xae: {
        name: 'Prefix: RES 5, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(5, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xaf: {
        name: 'Prefix: RES 5, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(5, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb0: {
        name: 'Prefix: RES 6, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(6, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb1: {
        name: 'Prefix: RES 6, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(6, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb2: {
        name: 'Prefix: RES 6, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(6, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb3: {
        name: 'Prefix: RES 6, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(6, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb4: {
        name: 'Prefix: RES 6, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(6, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb5: {
        name: 'Prefix: RES 6, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(6, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb6: {
        name: 'Prefix: RES 6, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(6, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb7: {
        name: 'Prefix: RES 6, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(6, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb8: {
        name: 'Prefix: RES 7, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(7, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xb9: {
        name: 'Prefix: RES 7, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(7, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xba: {
        name: 'Prefix: RES 7, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(7, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xbb: {
        name: 'Prefix: RES 7, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(7, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xbc: {
        name: 'Prefix: RES 7, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(7, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xbd: {
        name: 'Prefix: RES 7, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(7, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xbe: {
        name: 'Prefix: RES 7, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            RESU3HL(7, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xbf: {
        name: 'Prefix: RES 7, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            RESU3R8(7, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0xc0: {
        name: 'Prefix: SET 0, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(0, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc1: {
        name: 'Prefix: SET 0, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(0, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc2: {
        name: 'Prefix: SET 0, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(0, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc3: {
        name: 'Prefix: SET 0, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(0, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc4: {
        name: 'Prefix: SET 0, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(0, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc5: {
        name: 'Prefix: SET 0, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(0, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc6: {
        name: 'Prefix: SET 0, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(0, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc7: {
        name: 'Prefix: SET 0, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(0, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc8: {
        name: 'Prefix: SET 1, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(1, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xc9: {
        name: 'Prefix: SET 1, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(1, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xca: {
        name: 'Prefix: SET 1, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(1, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xcb: {
        name: 'Prefix: SET 1, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(1, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xcc: {
        name: 'Prefix: SET 1, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(1, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xcd: {
        name: 'Prefix: SET 1, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(1, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xce: {
        name: 'Prefix: SET 1, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(1, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xcf: {
        name: 'Prefix: SET 1, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(1, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd0: {
        name: 'Prefix: SET 2, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(2, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd1: {
        name: 'Prefix: SET 2, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(2, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd2: {
        name: 'Prefix: SET 2, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(2, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd3: {
        name: 'Prefix: SET 2, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(2, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd4: {
        name: 'Prefix: SET 2, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(2, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd5: {
        name: 'Prefix: SET 2, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(2, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd6: {
        name: 'Prefix: SET 2, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(2, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd7: {
        name: 'Prefix: SET 2, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(2, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd8: {
        name: 'Prefix: SET 3, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(3, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xd9: {
        name: 'Prefix: SET 3, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(3, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xda: {
        name: 'Prefix: SET 3, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(3, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xdb: {
        name: 'Prefix: SET 3, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(3, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xdc: {
        name: 'Prefix: SET 3, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(3, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xdd: {
        name: 'Prefix: SET 3, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(3, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xde: {
        name: 'Prefix: SET 3, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(3, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xdf: {
        name: 'Prefix: SET 3, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(3, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },

      0xe0: {
        name: 'Prefix: SET 4, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(4, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe1: {
        name: 'Prefix: SET 4, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(4, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe2: {
        name: 'Prefix: SET 4, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(4, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe3: {
        name: 'Prefix: SET 4, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(4, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe4: {
        name: 'Prefix: SET 4, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(4, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe5: {
        name: 'Prefix: SET 4, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(4, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe6: {
        name: 'Prefix: SET 4, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(4, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe7: {
        name: 'Prefix: SET 4, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(4, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe8: {
        name: 'Prefix: SET 5, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(5, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xe9: {
        name: 'Prefix: SET 5, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(5, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xea: {
        name: 'Prefix: SET 5, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(5, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xeb: {
        name: 'Prefix: SET 5, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(5, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xec: {
        name: 'Prefix: SET 5, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(5, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xed: {
        name: 'Prefix: SET 5, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(5, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xee: {
        name: 'Prefix: SET 5, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(5, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xef: {
        name: 'Prefix: SET 5, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(5, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf0: {
        name: 'Prefix: SET 6, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(6, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf1: {
        name: 'Prefix: SET 6, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(6, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf2: {
        name: 'Prefix: SET 6, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(6, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf3: {
        name: 'Prefix: SET 6, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(6, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf4: {
        name: 'Prefix: SET 6, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(6, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf5: {
        name: 'Prefix: SET 6, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(6, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf6: {
        name: 'Prefix: SET 6, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(6, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf7: {
        name: 'Prefix: SET 6, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(6, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf8: {
        name: 'Prefix: SET 7, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(7, dmg.registers.register.B);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf9: {
        name: 'Prefix: SET 7, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(7, dmg.registers.register.C);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xfa: {
        name: 'Prefix: SET 7, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(7, dmg.registers.register.D);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xfb: {
        name: 'Prefix: SET 7, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(7, dmg.registers.register.E);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xfc: {
        name: 'Prefix: SET 7, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(7, dmg.registers.register.H);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xfd: {
        name: 'Prefix: SET 7, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(7, dmg.registers.register.L);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xfe: {
        name: 'Prefix: SET 7, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            SETU3HL(7, dmg.registers.register16Bit.HL, dmg.ram);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xff: {
        name: 'Prefix: SET 7, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {},
          (dmg: Gameboy) => {
            SETU3R8(7, dmg.registers.register.A);
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
    };
  }
}

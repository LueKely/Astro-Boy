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
        name: 'RLC B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RLC C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RLC D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RLC E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RLC H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RLC L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RLC (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            RLCHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x7: {
        name: 'RLC A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RRC B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RRC C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RRC D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RRC E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RRC H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RRC L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RRC (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            RRCHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0xf: {
        name: 'RRC A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RL B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RL C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RL D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RL E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RL H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RL L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RL (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            RLHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x17: {
        name: 'RL A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RR B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RR C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RR D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RR E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RR H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RR L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RR (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            RRHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x1f: {
        name: 'RR A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            SLAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x27: {
        name: 'SLA A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRA B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRA C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRA D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRA E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRA H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRA L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRA (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            SRAHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x2f: {
        name: 'SRA A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SWAP B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SWAP C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SWAP D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SWAP E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SWAP H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SWAP L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SLA (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            SWAPHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x37: {
        name: 'SWAP A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRL B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRL C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRL D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRL E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRL H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRL L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SRL (HL)',
        length: 2,
        cycles: 4,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
          (dmg: Gameboy) => {
            console.log(
              'Value at HL',
              dmg.ram.getMemoryAt(dmg.registers.register16Bit.HL.getRegister())
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            SRLHL(
              dmg.registers.register16Bit.HL,
              dmg.ram,
              dmg.registers.register.F
            );
          },
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
            if (dmg.registers.HALT_BUG) {
              dmg.registers.HALT_BUG = false;
            } else {
              dmg.registers.pointers.PC.increment();
            }
          },
        ],
      },
      0x3f: {
        name: 'SRL A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 0, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 1, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 2, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 3, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 4, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 5, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 6, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'BIT 7, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 0, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 1, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 2, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 3, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 4, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 5, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 6, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'RES 7, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 0, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 1, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 2, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 3, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 4, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 5, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 6, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, B',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, C',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, D',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, E',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, H',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, L',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, (HL)',
        length: 2,
        cycles: 3,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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
        name: 'SET 7, A',
        length: 2,
        cycles: 2,
        jobs: [
          (dmg: Gameboy) => {
            console.log('CB PREFIX DETECTED');
          },
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

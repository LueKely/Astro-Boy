//  ADD HL, SP - untested

import type { Gameboy } from '../../Gameboy';
import { validateADDSPe } from '../../utils/instructions/instruction_utils';
// TODO - TEST ALL
// DONE WITH INC SP And DEC SP
// DONE LD SP NN (LD r16 nn)

function ADDSPe() {
  return [
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const e = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());
      dmg.registers.setLowerByte(e);
    },
    (dmg: Gameboy) => {
      // settig up e
      const e = dmg.registers.getLowerByte();
      const eSigned = e > 127 ? e - 256 : e;
      const SP = dmg.registers.pointers.SP.getRegister();
      validateADDSPe(SP, e, dmg.registers.register.F);
      const result = SP + eSigned;

      dmg.registers.setTempByte(result);
    },
    (dmg: Gameboy) => {
      const result = dmg.registers.getTempByte();
      dmg.registers.pointers.SP.setRegister(result);
    },
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
    },
  ];
}
// TESTED
function LDNNSP() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const lsb = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());
      dmg.registers.setLowerByte(lsb);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const msb = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());
      dmg.registers.setUpperByte(msb);
    },
    // M4
    (dmg: Gameboy) => {
      dmg.registers.setTempByte(
        dmg.registers.getLowerByte() | (dmg.registers.getUpperByte() << 8)
      );
      dmg.ram.setMemoryAt(
        dmg.registers.getTempByte(),
        dmg.registers.pointers.SP.getRegister() & 0xff
      );

      dmg.registers.setTempByte(dmg.registers.getTempByte() + 1);
    },
    // M5
    (dmg: Gameboy) => {
      dmg.ram.setMemoryAt(
        dmg.registers.getTempByte(),
        dmg.registers.pointers.SP.getRegister() >> 8
      );
    },
    // M1/M6
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
    },
  ];
}
// TESTED
function LDHLSPe() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const pc = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

      dmg.registers.setLowerByte(pc);
    },
    // M3
    (dmg: Gameboy) => {
      const SP = dmg.registers.pointers.SP.getRegister();

      // this is the e
      let e = dmg.registers.getLowerByte();

      const targetValue = e > 127 ? e - 256 : e;
      const result = targetValue + SP;
      const halfCarry = (SP & 0xf) + (e & 0xf) > 0xf;
      const carry = (SP & 0xff) + (e & 0xff) > 0xff;
      // validate flags for target value
      dmg.registers.register.F.clearZFlag();
      dmg.registers.register.F.clearNFlag();
      if (halfCarry) {
        dmg.registers.register.F.setHFlag();
      } else {
        dmg.registers.register.F.clearHFlag();
      }
      if (carry) {
        dmg.registers.register.F.setCYFlag();
      } else {
        dmg.registers.register.F.clearCYFlag();
      }

      dmg.registers.register16Bit.HL.setRegister(result);
    },
    // M4
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
    },
  ];
}

export { LDNNSP, ADDSPe, LDHLSPe };

//  ADD HL, SP - untested

import type { Gameboy } from "../../Gameboy";
import type { Ram } from "../../Ram/Ram";
import { validateADDSPe } from "../../utils/instructions/instruction_utils";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Program_Counter_Register } from "../CPU_Pointer_Register";
import type { Cpu_Register_16Bit } from "../CPU_Register";
import type { Cpu_Register_File } from "../CPU_Register_File";

// DONE WITH INC SP And DEC SP
// DONE LD SP NN (LD r16 nn)

function ADDSPe() {
  return [
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const e =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];
      dmg.registers.setLowerByte(e);
    },
    (dmg: Gameboy) => {
      // settig up e
      const e = dmg.registers.getLowerByte();
      const lsbSP = dmg.registers.pointers.SP.getRegister() && 0xff;
      const result = lsbSP + e;
      validateADDSPe(lsbSP, e, dmg.registers.register.F);
      dmg.registers.setLowerByte(result & 0xff);
    },
    (dmg: Gameboy) => {
      const e = dmg.registers.getLowerByte();
      const adj = e > 127 ? 0xff : 0x00;
      const spHigh = (dmg.registers.pointers.SP.getRegister() >> 8) & 0xff;
      const carry = dmg.registers.register.F.getCYFlag();

      const result = spHigh + adj + carry;
      dmg.registers.setUpperByte(result & 0xff);
    },
    (dmg: Gameboy) => {
      const newSP =
        (dmg.registers.getUpperByte() << 8) | dmg.registers.getLowerByte();
      dmg.registers.pointers.SP.setRegister(newSP);
      dmg.registers.pointers.PC.increment();
    },
  ];
}

function LDNNSP() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const lsb =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];
      dmg.registers.setLowerByte(lsb);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const msb =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];
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

function LDHLSPe() {
  // FIX ME: Validation is a bit scuffed
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const pc =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];
      const lowerPC = dmg.registers.pointers.PC.getRegister() & 0xff;

      dmg.registers.setLowerByte(pc + lowerPC);
      dmg.registers.setUpperByte(pc >> 8);
    },
    // M3
    (dmg: Gameboy) => {
      const targetValue = dmg.registers.getLowerByte();
      dmg.registers.register.L.setRegister(targetValue);

      // validate flags for target value
      dmg.registers.register.F.clearZFlag();
      dmg.registers.register.F.clearNFlag();
      // testing
      if (targetValue > 0xf) {
        dmg.registers.register.F.setHFlag();
      } else {
        dmg.registers.register.F.clearHFlag();
      }
      if (targetValue > 0xff) {
        dmg.registers.register.F.setCYFlag();
      } else {
        dmg.registers.register.F.clearCYFlag();
      }

      dmg.registers.setTempByte(targetValue >> 7);
    },
    // M4
    (dmg: Gameboy) => {
      const adj = dmg.registers.getTempByte() != 0 ? 0xff : 0x00;
      const result =
        dmg.registers.getUpperByte() +
        adj +
        dmg.registers.register.F.getCYFlag();
      dmg.registers.register.H.setRegister(result);
      dmg.registers.pointers.PC.increment();
    },
  ];
}

export { LDNNSP, ADDSPe, LDHLSPe };

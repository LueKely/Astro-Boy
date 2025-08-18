import type { Gameboy } from '../../Gameboy';
import type { Program_Counter_Register } from '../CPU_Pointer_Register';
import type { Cpu_Register_16Bit } from '../CPU_Register';
// TODO :TEST ALL

function CALLN16() {
  // author's notes: This shit is so scoffed
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];

      dmg.registers.setLowerByte(n);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];

      dmg.registers.setUpperByte(n);
    },
    // M4
    (dmg: Gameboy) => {
      dmg.registers.pointers.SP.decrement();
    }, // M5
    (dmg: Gameboy) => {
      dmg.ram.setMemoryAt(
        dmg.registers.pointers.SP.getRegister(),
        (dmg.registers.pointers.PC.getRegister() >> 8) & 0xff
      );
      dmg.registers.pointers.SP.decrement();
    },
    //M6
    (dmg: Gameboy) => {
      dmg.ram.setMemoryAt(
        dmg.registers.pointers.SP.getRegister(),
        dmg.registers.pointers.PC.getRegister() & 0xff
      );
      dmg.registers.pointers.PC.setRegister(
        (dmg.registers.getUpperByte() << 8) |
          (dmg.registers.getLowerByte() & 0xff)
      );
    },
    // M7/1
    (dmg: Gameboy) => {
      // dmg.registers.pointers.PC.increment();
      console.log('CALL FINISHED');
    },
  ];
}
function CALLCCN16(CC: number) {
  // author's notes: This shit is so scuffed
  if (CC != 0) {
    return CALLN16();
  } else {
    return [
      // M2
      (dmg: Gameboy) => {
        dmg.registers.pointers.PC.increment();

        const n =
          dmg.cartridge.CartDataToBytes[
            dmg.registers.pointers.PC.getRegister()
          ];

        dmg.registers.setLowerByte(n);
      },
      // M3
      (dmg: Gameboy) => {
        dmg.registers.pointers.PC.increment();

        const n =
          dmg.cartridge.CartDataToBytes[
            dmg.registers.pointers.PC.getRegister()
          ];

        dmg.registers.setUpperByte(n);
      },
      //   M4/1
      (dmg: Gameboy) => {
        if (dmg.registers.HALT_BUG) {
          dmg.registers.HALT_BUG = false;
        } else {
          dmg.registers.pointers.PC.increment();
        }
      },
    ];
  }
}

function JPN16() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const n =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];
      dmg.registers.setLowerByte(n);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const n =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];
      dmg.registers.setUpperByte(n);
    },
    // M4
    (dmg: Gameboy) => {
      const nn =
        dmg.registers.getLowerByte() | (dmg.registers.getUpperByte() << 8);
      dmg.registers.pointers.PC.setRegister(nn);
      console.log('jumping to address: ', nn);
    },
    // M1/M5
    (dmg: Gameboy) => {
      console.log('JPN16 finished');
    },
  ];
}

function JPCCN16(CC: number) {
  // author's notes: This shit is so scuffed
  if (CC != 0) {
    return JPN16();
  } else {
    return [
      // M2
      (dmg: Gameboy) => {
        dmg.registers.pointers.PC.increment();

        const n =
          dmg.cartridge.CartDataToBytes[
            dmg.registers.pointers.PC.getRegister()
          ];

        dmg.registers.setLowerByte(n);
      },
      // M3
      (dmg: Gameboy) => {
        dmg.registers.pointers.PC.increment();

        const n =
          dmg.cartridge.CartDataToBytes[
            dmg.registers.pointers.PC.getRegister()
          ];

        dmg.registers.setUpperByte(n);
      },
      //   M4/1
      (dmg: Gameboy) => {
        if (dmg.registers.HALT_BUG) {
          dmg.registers.HALT_BUG = false;
        } else {
          dmg.registers.pointers.PC.increment();
        }
      },
    ];
  }
}

function JPHL(HL: Cpu_Register_16Bit<'HL'>, PC: Program_Counter_Register) {
  PC.setRegister(HL.getRegister());
}

function RET() {
  return [
    (dmg: Gameboy) => {
      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.SP.getRegister());
      dmg.registers.setLowerByte(n);
      dmg.registers.pointers.SP.increment();
    },
    (dmg: Gameboy) => {
      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.SP.getRegister());
      dmg.registers.setUpperByte(n);
      dmg.registers.pointers.SP.increment();
    },
    (dmg: Gameboy) => {
      const nn =
        dmg.registers.getLowerByte() | (dmg.registers.getUpperByte() << 8);
      dmg.registers.pointers.PC.setRegister(nn);
    },
    (dmg: Gameboy) => {
      console.log('RET PROTOCOL FINISHED');
    },
  ];
}

function RETI() {
  return [
    (dmg: Gameboy) => {
      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.SP.getRegister());
      dmg.registers.setLowerByte(n);
      dmg.registers.pointers.SP.increment();
    },
    (dmg: Gameboy) => {
      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.SP.getRegister());
      dmg.registers.setUpperByte(n);
      dmg.registers.pointers.SP.increment();
    },
    (dmg: Gameboy) => {
      const nn =
        dmg.registers.getLowerByte() | (dmg.registers.getUpperByte() << 8);
      dmg.registers.pointers.PC.setRegister(nn);
      dmg.registers.IME.raiseFlag();
    },
    (dmg: Gameboy) => {
      console.log('RET PROTOCOL FINISHED');
    },
  ];
}

function RETCC(cc: number) {
  if (cc != 0) {
    return RET();
  }

  return [
    (dmg: Gameboy) => {
      console.log('Current RET CC check is false moving to next opcode');
    },
    (dmg: Gameboy) => {
      if (dmg.registers.HALT_BUG) {
        dmg.registers.HALT_BUG = false;
      } else {
        dmg.registers.pointers.PC.increment();
      }
    },
  ];
}

function RSTN(n: number) {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.SP.decrement();
    },
    // M3
    (dmg: Gameboy) => {
      const msb = dmg.registers.pointers.PC.getRegister() >>> 8;
      dmg.ram.setMemoryAt(dmg.registers.pointers.SP.getRegister(), msb);
      dmg.registers.pointers.SP.decrement();
    },
    // M4
    (dmg: Gameboy) => {
      const lsb = dmg.registers.pointers.PC.getRegister() & 0xff;
      dmg.ram.setMemoryAt(dmg.registers.pointers.SP.getRegister(), lsb);
      dmg.registers.pointers.PC.setRegister(n);
    },
    // M5
    (dmg: Gameboy) => {
      console.log('RST Protocol Finished');
    },
  ];
}

function JRE() {
  return [
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const z =
        dmg.cartridge.CartDataToBytes[dmg.registers.pointers.PC.getRegister()];
      dmg.registers.setTempByte(z);
    },
    (dmg: Gameboy) => {
      const z = dmg.registers.getTempByte();
      const zSign = z >>> 7 != 0;
      const lsb = dmg.registers.pointers.PC.getRegister() & 0xff;
      const msb = dmg.registers.pointers.PC.getRegister() >>> 8;

      const carryBit = z + lsb > 0xff;
      const result = (z + lsb) & 0xff;
      // this shit looks like ass
      let adj =
        carryBit && !zSign == true ? 1 : !carryBit && zSign == true ? -1 : 0;
      dmg.registers.setLowerByte(result);
      dmg.registers.setUpperByte(msb + adj);
      dmg.registers.setTempByte(
        (dmg.registers.getUpperByte() << 8) | dmg.registers.getLowerByte()
      );
    },
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.setRegister(dmg.registers.getTempByte());
    },
  ];
}

function JRCCE(cc: number) {
  if (cc == 1) {
    return JRE();
  } else {
    return [
      (dmg: Gameboy) => {
        if (dmg.registers.HALT_BUG) {
          dmg.registers.HALT_BUG = false;
        } else {
          dmg.registers.pointers.PC.increment();
        }
      },
    ];
  }
}

export {
  CALLN16,
  CALLCCN16,
  JPN16,
  JPCCN16,
  RET,
  JPHL,
  RETCC,
  RSTN,
  RETI,
  JRCCE,
  JRE,
};

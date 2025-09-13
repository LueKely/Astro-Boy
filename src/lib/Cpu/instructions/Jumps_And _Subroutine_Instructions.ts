import type { Gameboy } from '../../Gameboy';
import type { Ram } from '../../Ram/Ram';
import type { Program_Counter_Register } from '../CPU_Pointer_Register';
import type { Cpu_Register_16Bit } from '../CPU_Register';
// TODO :TEST ALL

// TESTED
function CALLN16() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

      dmg.registers.setLowerByte(n);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

      dmg.registers.setUpperByte(n);
    },
    // M4
    (dmg: Gameboy) => {
      dmg.registers.pointers.SP.decrement();
      dmg.registers.pointers.PC.increment();
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
      console.log('CALL FINISHED');
    },
  ];
}
// TESTED
function CALLCCN16() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

      dmg.registers.setLowerByte(n);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

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

//TESTED
function JPN16() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());
      console.log('GUMANA KA: ', n);

      dmg.registers.setLowerByte(n);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());
      console.log('GUMANA KA: ', n);

      dmg.registers.setUpperByte(n);
    },
    // M4
    (dmg: Gameboy) => {
      const nn =
        (dmg.registers.getUpperByte() << 8) | dmg.registers.getLowerByte();
      dmg.registers.pointers.PC.setRegister(nn);

      console.log(
        'Jumping to  address',
        (dmg.registers.getUpperByte() << 8) | dmg.registers.getLowerByte()
      );
    },
    (dmg: Gameboy) => {},
  ];
}
// TESTED
function JPCCN16() {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

      dmg.registers.setLowerByte(n);
    },
    // M3
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();

      const n = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

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

// TESTED
function JPHL(HL: Cpu_Register_16Bit<'HL'>, PC: Program_Counter_Register) {
  PC.setRegister(HL.getRegister());
}
// TESTED
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

// TESTED
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

// TESTED
function RETCC() {
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
//TESTED - questionable - okay lang pala
function RSTN(n: number) {
  return [
    // M2
    (dmg: Gameboy) => {
      dmg.registers.pointers.SP.decrement();
      dmg.registers.pointers.PC.increment();
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
    (dmg: Gameboy) => {},
  ];
}
// TESTED
function JRE() {
  return [
    (dmg: Gameboy) => {
      dmg.registers.pointers.PC.increment();
    },
    (dmg: Gameboy) => {
      // Get current PC and increment to operand
      let e = dmg.ram.getMemoryAt(dmg.registers.pointers.PC.getRegister());

      // Convert to signed 8-bit and add to PC+1
      if (e > 127) e -= 256;
      const newPC = (dmg.registers.pointers.PC.getRegister() + e) & 0xffff;
      dmg.registers.pointers.PC.increment();

      dmg.registers.pointers.PC.setRegister(newPC + 1);
    },
    (dmg: Gameboy) => {
      // dmg.registers.pointers.PC.setRegister(dmg.registers.getTempByte());
    },
  ];
}

// TESTED
function JREFALSE() {
  return [
    () => {},
    (dmg: Gameboy) => {
      if (dmg.registers.HALT_BUG) {
        dmg.registers.HALT_BUG = false;
      } else {
        dmg.registers.pointers.PC.increment();
      }
      dmg.registers.pointers.PC.increment();
    },
  ];
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
  JREFALSE,
  JRE,
};

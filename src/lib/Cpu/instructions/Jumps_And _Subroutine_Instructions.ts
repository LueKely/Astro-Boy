import type { Gameboy } from "../../Gameboy";
import type { Ram } from "../../Ram/Ram";
import type { Cpu_Flag_Register } from "../CPU_Flag_Register";
import type { Program_Counter_Register } from "../CPU_Pointer_Register";
import type { Cpu_Register, Cpu_Register_16Bit } from "../CPU_Register";
// TODO THIS
// least significant byte
// most significant byte
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
      console.log("TODO: DO SOMETHING HERE");
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
        dmg.registers.pointers.PC.increment();
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
    },
    // M1/M5
    (dmg: Gameboy) => {
      console.log("TODO: DO SOMETHING HERE");
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
        dmg.registers.pointers.PC.increment();
      },
    ];
  }
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
      console.log("TODO: SOMEHTING SOMEHTING");
    },
  ];
}

export { CALLN16, CALLCCN16, JPN16, JPCCN16, RET };

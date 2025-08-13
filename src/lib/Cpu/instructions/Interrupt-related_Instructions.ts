import type { Gameboy } from "../../Gameboy";

function EI() {
  return [
    (dmg: Gameboy) => {
      dmg.registers.IME.raiseFlag();
      dmg.registers.pointers.SP.decrement();
    },
  ];
}

function DI() {
  return [
    (dmg: Gameboy) => {
      dmg.registers.IME.clearFlag();
      dmg.registers.pointers.SP.decrement();
    },
  ];
}

// insert halt here
export { EI, DI };

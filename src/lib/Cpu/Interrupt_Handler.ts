// Pre-conditions (must all be true):
// Find highest priority interrupt
// CPU executes interrupt service routine (5 M-cycles total):
// Routine is based on the prioritized opcode to be cleared

import type { Gameboy } from "../Gameboy";

export class Interrupt_Handler {
  dmg: Gameboy;
  constructor(dmg: Gameboy) {
    this.dmg = dmg;
  }

  createCycles(priorityFlag: number) {
    return [
      (dmg: Gameboy) => {},
      (dmg: Gameboy) => {},
      (dmg: Gameboy) => {},
      (dmg: Gameboy) => {},
      (dmg: Gameboy) => {},
    ];
  }
}

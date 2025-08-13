// Pre-conditions (must all be true):
// Find highest priority interrupt
// CPU executes interrupt service routine (5 M-cycles total):
// Routine is based on the prioritized opcode to be cleared

// todo handle timer inside gb
import type { Gameboy } from "../Gameboy";

export class Interrupt_Handler {
  dmg: Gameboy;
  priorityBit: number = 0;

  private static LookUpTable: Record<number, number> = {
    // vblank interrupt
    0: 0x40,
    // stat interrupt
    1: 0x48,
    // timer Interrupt
    2: 0x50,
    // Serial Interrupt
    3: 0x58,
    // joypad Interrupt
    4: 0x60,
  };
  private static bitTable: Record<number, number> = {
    0b0_0001: 0,
    0b0_0010: 1,
    0b0_0100: 2,
    0b0_1000: 3,
    0b1_0000: 4,
  };

  constructor(dmg: Gameboy) {
    this.dmg = dmg;
  }
  // wrong logic
  // find a way to prioritize the serial codes
  private prioritize() {
    const IF = this.dmg.ram.getIF();
    const value = [
      IF & 0x0b0_0001,
      IF & 0x0b0_0010,
      IF & 0x0b0_0100,
      IF & 0x0b0_1000,
      IF & 0x0b1_0000,
    ];

    return value.reduce((accumulator, currentValue) => {
      return currentValue < accumulator ? currentValue : accumulator;
    }, 0);
  }

  // todo create priority look up
  createCycles() {
    this.priorityBit = Interrupt_Handler.bitTable[this.prioritize()];
    return [
      (dmg: Gameboy) => {
        console.log("Interupt had started");
      },
      (dmg: Gameboy) => {
        console.log("Interupt had started");
      },
      (dmg: Gameboy) => {
        dmg.registers.pointers.SP.decrement();
        dmg.ram.setMemoryAt(
          dmg.registers.pointers.SP.getRegister(),
          dmg.registers.pointers.PC.getRegister() >>> 8
        );
      },
      (dmg: Gameboy) => {
        dmg.registers.pointers.SP.decrement();
        dmg.ram.setMemoryAt(
          dmg.registers.pointers.SP.getRegister(),
          dmg.registers.pointers.PC.getRegister() & 0xff
        );
      },
      (dmg: Gameboy) => {
        //  Clear interrupt flag
        dmg.ram.setMemoryAt(
          0xff0f,
          dmg.ram.getIF() & ~(0b0_0001 << this.priorityBit)
        );
        //  Disable interrupts
        dmg.registers.IME.clearFlag();
        //  Jump to 0x40, 0x48, 0x50, 0x58, or 0x60
        dmg.registers.pointers.PC.setRegister(
          Interrupt_Handler.LookUpTable[this.priorityBit]
        );
      },
    ];
  }
}

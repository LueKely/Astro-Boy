// Pre-conditions (must all be true):
// Find highest priority interrupt
// CPU executes interrupt service routine (5 M-cycles total):
// Routine is based on the prioritized opcode to be cleared

// todo handle timer inside gb
import type { Gameboy } from '../Gameboy';

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

	constructor(dmg: Gameboy) {
		this.dmg = dmg;
	}
	// todo create priority look up
	createCycles(priorityFlag: number) {
		return [
			(dmg: Gameboy) => {
				console.log('Interupt had started');
			},
			(dmg: Gameboy) => {
				console.log('Interupt had started');
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
				//  Disable interrupts
				//  Jump to 0x40, 0x48, 0x50, 0x58, or 0x60
				dmg.registers.pointers.PC.setRegister(
					Interrupt_Handler.LookUpTable[priorityFlag]
				);
			},
		];
	}
}

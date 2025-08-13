import type { Gameboy } from '../../Gameboy';

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

function HALT() {
	return [
		(dmg: Gameboy) => {
			if (!dmg.registers.HALT) {
				dmg.registers.HALT = true;
			}
		},
		(dmg: Gameboy) => {},
		(dmg: Gameboy) => {},
		(dmg: Gameboy) => {},
		(dmg: Gameboy) => {},
	];
}

function STOP() {
	return [
		(dmg: Gameboy) => {
			if (!dmg.registers.HALT) {
				dmg.registers.STOP = true;
			}
		},
		(dmg: Gameboy) => {},
		(dmg: Gameboy) => {},
		(dmg: Gameboy) => {},
		(dmg: Gameboy) => {},
	];
}

// insert halt here
export { EI, DI, HALT, STOP };

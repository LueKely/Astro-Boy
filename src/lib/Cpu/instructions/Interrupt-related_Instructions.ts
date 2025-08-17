import type { Gameboy } from '../../Gameboy';
// TODO: TEST ALL

function EI() {
	return [
		(dmg: Gameboy) => {
			dmg.registers.IME.raiseFlag();
			if (dmg.registers.HALT_BUG) {
				dmg.registers.HALT_BUG = false;
			} else {
				dmg.registers.pointers.PC.increment();
			}
		},
	];
}

function DI() {
	return [
		(dmg: Gameboy) => {
			dmg.registers.IME.clearFlag();
			if (dmg.registers.HALT_BUG) {
				dmg.registers.HALT_BUG = false;
			} else {
				dmg.registers.pointers.PC.increment();
			}
		},
	];
}

function HALT() {
	return [
		(dmg: Gameboy) => {
			if (!dmg.registers.IME && (dmg.ram.getIE() & dmg.ram.getIF()) != 0) {
				dmg.registers.HALT_BUG = true;
			} else {
				dmg.registers.HALT = true;
			}
			dmg.registers.pointers.PC.increment();
		},
	];
}

function STOP() {
	return [
		(dmg: Gameboy) => {
			if (!dmg.registers.HALT) {
				dmg.registers.STOP = true;
			}
			if (dmg.registers.HALT_BUG) {
				dmg.registers.HALT_BUG = false;
			} else {
				dmg.registers.pointers.PC.increment();
			}
		},
	];
}

// insert halt here
export { EI, DI, HALT, STOP };

import { CartHeaderAdress } from './types/Catridge_Address_Reader';

/**
 * @description
 * This file contains the code for loading a ROM file.
 **/
export class GameBoyCatridge {
	// a cartridge should take the binaries from the buffer array
	// and "slice" the parts of the array buffer and those sliced parts
	// will be compared to the data map
	rawGame: ArrayBuffer;
	#CatridgeHeader = CartHeaderAdress.Adresses;

	constructor(rawGame: ArrayBuffer) {
		this.rawGame = rawGame;
	}

	getCartridgeHeader() {
		const cartridge = new DataView(this.rawGame);
		const cartridgeType = cartridge.getUint8(
			this.#CatridgeHeader.cartridgeType[0]
		);

		return cartridgeType;
	}
	// eg.
}

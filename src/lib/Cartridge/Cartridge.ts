import { CartHeaderAdress } from './types/Catridge_Address_Reader';

/**
 * @description
 * This file contains the code for loading a ROM file.
 **/

export class GameBoyCatridge {
	// a cartridge should take the binaries from the buffer array
	// and "slice" the parts of the array buffer and those sliced parts
	// will be compared to the data map
	#rawGame: ArrayBuffer;
	#CatridgeHeader = CartHeaderAdress.Adresses;
	#CartData: DataView;

	constructor(rawGame: ArrayBuffer) {
		this.#rawGame = rawGame;
		this.#CartData = new DataView(this.#rawGame);
	}

	getCartridgeHeader() {
		function toHex(value: number) {
			return value.toString(16);
		}

		const cartridgeType = this.#CartData.getUint8(
			this.#CatridgeHeader.oldLicenseeCode[0]
		);

		const cartridgeRomSize = this.#CartData.getUint8(
			this.#CatridgeHeader.romSize[0]
		);

		const cartridgeRamSize = this.#CartData.getUint8(
			this.#CatridgeHeader.ramSize[0]
		);
		const cartridgeCgbFlag = this.#CartData.getUint8(
			this.#CatridgeHeader.cgbFlag[0]
		);

		return {
			type: toHex(cartridgeType),
			romSize: toHex(cartridgeRomSize),
			ramSize: toHex(cartridgeRamSize),
			cgbFlag: toHex(cartridgeCgbFlag),
		};
	}

	// eg.
}

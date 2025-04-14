import { CartHeaderAdress } from './types/Catridge_Address_Reader';

/**
 * @description
 * This file contains the code for loading a ROM file.
 **/

export class GameBoyCatridge {
	// a cartridge should take the binaries from the buffer array
	// and "slice" the parts of the array buffer and those sliced parts
	// will be compared to the data map

	//make cart header be a static value
	#rawGame: ArrayBuffer;
	readonly #CatridgeHeader = CartHeaderAdress.Adresses;
	#CartData: DataView;
	#CartDataToBytes: Uint8Array;

	constructor(rawGame: ArrayBuffer) {
		this.#rawGame = rawGame;
		this.#CartData = new DataView(this.#rawGame);
		this.#CartDataToBytes = new Uint8Array(this.#CartData.buffer);
	}

	getCartridgeHeader() {
		function toHex(value: number) {
			return value.toString(16);
		}

		const cartridgeType = this.#CartData.getUint8(
			this.#CatridgeHeader.cartridgeType[0]
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

		const cartridgeDestinationCode = this.#CartData.getUint8(
			this.#CatridgeHeader.destinationCode[0]
		);

		const cartridgeOldLicenseeCode = this.#CartData.getUint8(
			this.#CatridgeHeader.oldLicenseeCode[0]
		);

		const cartridgeMaskRomVersionNumber = this.#CartData.getUint8(
			this.#CatridgeHeader.maskRomVersionNumber[0]
		);

		const cartridgeCheckSum = this.#CartData.getUint8(
			this.#CatridgeHeader.headerCheckSum[0]
		);

		// todo fix later this is ugly
		function readSubArray(arg: Uint8Array) {
			const textDecoder = new TextDecoder();
			return textDecoder.decode(arg);
		}
		const cartridgeTitle = this.#CartDataToBytes.subarray(
			this.#CatridgeHeader.gameTitle[0],
			this.#CatridgeHeader.gameTitle[1]
		);

		return {
			type: toHex(cartridgeType),
			romSize: toHex(cartridgeRomSize),
			ramSize: toHex(cartridgeRamSize),
			cgbFlag: toHex(cartridgeCgbFlag),
			destinationCode: toHex(cartridgeDestinationCode),
			oldLicenseeCode: toHex(cartridgeOldLicenseeCode),
			maskRomVersionNumber: toHex(cartridgeMaskRomVersionNumber),
			checkSum: toHex(cartridgeCheckSum),
			title: readSubArray(cartridgeTitle),
		};
	}

	// eg.
}

import { CartHeaderAdress } from './types/Catridge_Address_Reader';
// tonight will infer what these ascii code mean
/**
 * @description
 * This file contains the code for loading a ROM file.
 **/

export class GameBoyCatridge {
	// a cartridge should take the binaries from the buffer array
	// and "slice" the parts of the array buffer and those sliced parts
	// will be compared to the data map

	#rawGame: ArrayBuffer;
	#CartData: DataView;
	#CartDataToBytes: Uint8Array;

	static #ToHex(value: number) {
		return value.toString(16);
	}

	static #ReadSubArray(arg: Uint8Array) {
		const textDecoder = new TextDecoder();
		return textDecoder.decode(arg);
	}

	constructor(rawGame: ArrayBuffer) {
		this.#rawGame = rawGame;
		this.#CartData = new DataView(this.#rawGame);
		this.#CartDataToBytes = new Uint8Array(this.#CartData.buffer);
	}

	getCartridgeHeaderRaw() {
		const cartridgeType = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.cartridgeType[0]
		);

		const cartridgeRomSize = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.romSize[0]
		);

		const cartridgeRamSize = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.ramSize[0]
		);

		const cartridgeCgbFlag = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.cgbFlag[0]
		);

		const cartridgeDestinationCode = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.destinationCode[0]
		);

		const cartridgeOldLicenseeCode = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.oldLicenseeCode[0]
		);

		const cartridgeMaskRomVersionNumber = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.maskRomVersionNumber[0]
		);

		const cartridgeCheckSum = this.#CartData.getUint8(
			CartHeaderAdress.Adresses.headerCheckSum[0]
		);

		const cartridgeTitle = this.#CartDataToBytes.subarray(
			CartHeaderAdress.Adresses.gameTitle[0],
			CartHeaderAdress.Adresses.gameTitle[1]
		);

		const entryPoint = this.#CartDataToBytes.subarray(
			CartHeaderAdress.Adresses.entry[0],
			CartHeaderAdress.Adresses.entry[1]
		);

		const newLicenseeCode = this.#CartDataToBytes.subarray(
			CartHeaderAdress.Adresses.newLicenseeCode[0],
			CartHeaderAdress.Adresses.newLicenseeCode[1]
		);
		// as pandev implies, the manufacturer code has no know purpose
		const manufactureCode = this.#CartDataToBytes.subarray(
			CartHeaderAdress.Adresses.manufactureCode[0],
			CartHeaderAdress.Adresses.manufactureCode[1]
		);

		const globalCheckSum = this.#CartDataToBytes.subarray(
			CartHeaderAdress.Adresses.globalCheckSum[0],
			CartHeaderAdress.Adresses.globalCheckSum[1]
		);

		return {
			type: GameBoyCatridge.#ToHex(cartridgeType),
			romSize: GameBoyCatridge.#ToHex(cartridgeRomSize),
			ramSize: GameBoyCatridge.#ToHex(cartridgeRamSize),
			cgbFlag: GameBoyCatridge.#ToHex(cartridgeCgbFlag),
			destinationCode: GameBoyCatridge.#ToHex(cartridgeDestinationCode),
			oldLicenseeCode: GameBoyCatridge.#ToHex(cartridgeOldLicenseeCode),
			maskRomVersionNumber: GameBoyCatridge.#ToHex(
				cartridgeMaskRomVersionNumber
			),
			checkSum: GameBoyCatridge.#ToHex(cartridgeCheckSum),
			title: GameBoyCatridge.#ReadSubArray(cartridgeTitle),
			entryPoint: entryPoint,
			newLicenseeCode: newLicenseeCode,
			manufactureCode: manufactureCode,
			globalCheckSum: globalCheckSum,
		};
	}

	inferCartridgeHeader() {
		const header = this.getCartridgeHeaderRaw();

		return {
			type: CartHeaderAdress.CartridgeType.get(Number(header.type)),
			romSize: CartHeaderAdress.RomSize.get(Number(header.romSize)),
			ramSize: CartHeaderAdress.RamSize.get(Number(header.ramSize)),
			// desciper the the title here instead in the raw variable
		};
	}

	// eg.
}

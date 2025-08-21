import { CartHeaderAdress } from './types/Catridge_Address_Reader';

export class GameBoyCatridge {
  #rawGame: ArrayBuffer;
  #CartData: DataView;
  CartDataToBytes: Uint8Array;

  static #ToHex(value: number) {
    return value.toString(16);
  }

  static #ReadSubArray(arg: Uint8Array) {
    const textDecoder = new TextDecoder();
    return textDecoder.decode(arg);
  }

  static #CipherAscii(args: Uint8Array<ArrayBufferLike>) {
    const a = String.fromCharCode(args[0]);
    const b = String.fromCharCode(args[1]);

    return a + b;
  }

  constructor(rawGame: ArrayBuffer) {
    this.#rawGame = rawGame;
    this.#CartData = new DataView(this.#rawGame);
    this.CartDataToBytes = new Uint8Array(this.#CartData.buffer);
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

    const cartridgeCgbFlag = this.#CartData.getUint8(0x143);

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

    const cartridgeTitle = this.CartDataToBytes.subarray(
      CartHeaderAdress.Adresses.gameTitle[0],
      CartHeaderAdress.Adresses.gameTitle[1] + 0x01
    );
    // please dont sue me
    const nintendoLogo = this.CartDataToBytes.subarray(
      CartHeaderAdress.Adresses.nintendoLogo[0],
      CartHeaderAdress.Adresses.nintendoLogo[1]
    );

    const entryPoint = this.CartDataToBytes.subarray(
      CartHeaderAdress.Adresses.entry[0],
      CartHeaderAdress.Adresses.entry[1] + 0x01
    );

    const newLicenseeCode = this.CartDataToBytes.subarray(
      CartHeaderAdress.Adresses.newLicenseeCode[0],
      CartHeaderAdress.Adresses.newLicenseeCode[1] + 0x01
    );
    // as pandev implies, the manufacturer code has no known purpose
    const manufactureCode = this.CartDataToBytes.subarray(
      CartHeaderAdress.Adresses.manufactureCode[0],
      CartHeaderAdress.Adresses.manufactureCode[1] + 0x01
    );
    // pandev says this isn't supported
    const globalCheckSum = this.CartDataToBytes.subarray(
      CartHeaderAdress.Adresses.globalCheckSum[0],
      CartHeaderAdress.Adresses.globalCheckSum[1] + 0x01
    );

    return {
      type: GameBoyCatridge.#ToHex(cartridgeType),
      romSize: GameBoyCatridge.#ToHex(cartridgeRomSize),
      ramSize: GameBoyCatridge.#ToHex(cartridgeRamSize),
      // FIX ME: WHY AM I SHOWING AS 32 BRO
      cgbFlag: GameBoyCatridge.#ToHex(cartridgeCgbFlag),
      destinationCode: GameBoyCatridge.#ToHex(cartridgeDestinationCode),
      oldLicenseeCode: GameBoyCatridge.#ToHex(cartridgeOldLicenseeCode),
      maskRomVersionNumber: GameBoyCatridge.#ToHex(
        cartridgeMaskRomVersionNumber
      ),
      checkSum: GameBoyCatridge.#ToHex(cartridgeCheckSum),
      title: cartridgeTitle,
      entryPoint: entryPoint,
      nintendoLogo: nintendoLogo,
      // this part should be an ASCII code
      newLicenseeCode: newLicenseeCode,
      manufactureCode: manufactureCode,
      globalCheckSum: globalCheckSum,
    };
  }

  inferCartridgeHeader() {
    const header = this.getCartridgeHeaderRaw();
    const {
      globalCheckSum,
      manufactureCode,
      entryPoint,
      checkSum,
      nintendoLogo,
    } = this.getCartridgeHeaderRaw();
    return {
      type: CartHeaderAdress.CartridgeType.get(Number(header.type)),
      romSize: CartHeaderAdress.RomSize.get(Number(header.romSize)),
      ramSize: CartHeaderAdress.RamSize.get(Number(header.ramSize)),
      destination: CartHeaderAdress.DestinationCode.get(
        Number(header.destinationCode)
      ),
      title: GameBoyCatridge.#ReadSubArray(header.title),
      oldLicenseeCode: CartHeaderAdress.OldLicenseeCode.get(
        Number('0x' + header.oldLicenseeCode)
      ),
      newLicenseeCode: CartHeaderAdress.NewLicenseeCode.get(
        GameBoyCatridge.#CipherAscii(header.newLicenseeCode)
      ),
      cgbFlag:
        CartHeaderAdress.CgbFlag.get(Number(header.cgbFlag)) ||
        "Doesn't seem to work wdym 32",
      maskRomVersionNumber: header.maskRomVersionNumber,
      globalCheckSum,
      manufactureCode,
      entryPoint,
      checkSum,
      nintendoLogo,
    };
  }

  /*
  DRM
  AUTHOR'S NOTE: Ofcourse I will not implement a lock system
  if the check sum failed
  */
  checkSum() {
    const { checkSum } = this.getCartridgeHeaderRaw();
    let currentSum = 0;
    for (let i = 0x0134; i <= 0x014c; i++) {
      currentSum = (currentSum - this.CartDataToBytes[i] - 1) & 0xff;
    }

    return checkSum === currentSum.toString(16);
  }
}

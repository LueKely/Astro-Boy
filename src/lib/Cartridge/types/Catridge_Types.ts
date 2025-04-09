/**
 @link https://gbdev.io/pandocs/The_Cartridge_Header.html 
 please refer to this link in regards of the Rom Header
**/

// Note To self
// i find a lot of coding styles when

type TFourBitArray = Uint8Array & { length: 4 };
type TLogoSizeArray = Uint8Array & { length: 0x30 };
type TManufacturerCodeArray = Uint8Array & { length: 3 };

export interface IRomHeader {
	entry: TFourBitArray;
	logo: TLogoSizeArray;
	// this should only be a length of 16
	title: string;
	manufacturer_Code: TManufacturerCodeArray;
	CGB_Flag?: Uint8Array;
	new_License_Code: Uint16Array;
}

/**
 * @description This is a util function class for the headers, this will be a look up table
 * @link https://gbdev.io/pandocs/The_Cartridge_Header.html
 *
 * See link above to get a general direction of what these Header Value infer
 **/
export class CartHeaderAdress {
  /**
   * @description This stores an array of memory address that stores a 16 bit value
   * @example To see what type of cartridge the game is contained in you need to jump to address 0x0147 and infer its 16bit value
   * NOTE: some of the adress have more than 1 address to look at.
   **/
  static Adresses = {
    entry: [0x100, 0x103],
    nintendoLogo: [0x104, 0x133],
    gameTitle: [0x134, 0x143],
    manufactureCode: [0x13f, 0x0142],
    cgbFlag: [0x0143],
    newLicenseeCode: [0x144, 0x145],
    cartridgeType: [0x0147],
    romSize: [0x148],
    ramSize: [0x149],
    destinationCode: [0x014a],
    oldLicenseeCode: [0x14b],
    maskRomVersionNumber: [0x014c],
    headerCheckSum: [0x014d],
    globalCheckSum: [0x014e, 0x014f],
  };

  /**
   * @description This checks if the cartridge is Game Boy Color Compatible
   *
   * NOTE: I don't inted to make this emulator Cgb friendly (for now, April 19 2025)
   **/
  static CgbFlag = new Map([
    [0x80, "Backwards Compatible"],
    [0xc0, "CGB Only"],
  ]);

  // ADD intepriter for the value of the cartridge

  /**
   * @description This checks what type of cartridge the game is in
   *
   * NOTE: this will imporant because of the gameboy's rom size to fit the game which is only 32kb,
   * Some of the cartridges provides a built in memory back controller or an MBC that will act as
   * external memory, in that case the emulator should also be capable of emulating different types of MBC's
   **/
  static CartridgeType = new Map([
    [0x00, "ROM ONLY"],
    [0x01, "MBC1"],
    [0x02, "MBC1+RAM"],
    [0x03, "MBC1+RAM+BATTERY"],
    [0x05, "MBC2"],
    [0x06, "MBC2+BATTERY"],
    [0x08, "ROM+RAM"],
    [0x09, "ROM+RAM+BATTERY"],
    [0x0b, "MMM01"],
    [0x0c, "MMM01+RAM"],
    [0x0d, "MMMO1+RAM+BATTERY"],
    [0x0f, "MBC3+TIMER+BATTERY"],
    [0x10, "MBC3+TIMER+RAM+BATTERY"],
    [0x11, "MBC3"],
    [0x12, "MBC3+RAM"],
    [0x13, "MBC3+RAM+BATTERY"],
    [0x19, "MBC5"],
    [0x1a, "MBC5+RAM"],
    [0x1b, "MBC5+RAM+BATTERY"],
    [0x1c, "MBC5+RUMBLE"],
    [0x1d, "MBC5+RUMBLE+RAM"],
    [0x1e, "MBC5+RUMBLE+RAM+BATTERY"],
    [0x20, "MBC6"],
    [0x22, "MBC7+SENSOR+RUMBLE+RAM+BATTERY"],
    [0xfc, "POCKET CAMERA"],
    [0xfd, "BANDAI TAMA5"],
    [0xfe, "HuC3"],
    [0xff, "HuC1+RAM+BATTERY"],
  ]);

  /**
   * @description this checks if this cartridge is made for japan or overseas
   **/
  static DestinationCode = new Map([
    [0x00, "Japan"],
    [0x01, "Overseas Only"],
  ]);

  /**
   * @description These are the values of the ascii code that is given by the adress 0x144 & 0x145
   * NOTE: You will only check the NewLicenseeCode IF the value of the adress OldLicenseeCode is 0x33
   **/
  static NewLicenseeCode = new Map([
    ["\u0000\u0000", "unavailable"],
    ["00", "None"],
    ["01", "Nintendo Research & Development 1"],
    ["08", "Capcom"],
    ["13", "EA (Electronic Arts)"],
    ["18", "Hudson Soft"],
    ["19", "B-AI"],
    ["20", "KSS"],
    ["22", "Planning Office WADA"],
    ["24", "PCM Complete"],
    ["25", "San-X"],
    ["28", "Kemco"],
    ["29", "SETA Corporation"],
    ["30", "Viacom"],
    ["31", "Nintendo"],
    ["32", "Bandai"],
    ["33", "Ocean Software/Acclaim Entertainment"],
    ["34", "Konami"],
    ["35", "HectorSoft"],
    ["37", "Taito"],
    ["38", "Hudson Soft"],
    ["39", "Banpresto"],
    ["41", "Ubi Soft¹"],
    ["42", "Atlus"],
    ["44", "Malibu Interactive"],
    ["46", "Angel"],
    ["47", "Bullet-Proof Software²"],
    ["49", "Irem"],
    ["50", "Absolute"],
    ["51", "Acclaim Entertainment"],
    ["52", "Activision"],
    ["53", "Sammy Usa Corporation"],
    ["54", "Konami"],
    ["55", "Hi Tech Expressions"],
    ["56", "LJN"],
    ["57", "Matchbox"],
    ["58", "Mattel"],
    ["59", "Milton Bradley Company"],
    ["60", "Titus Interactive"],
    ["61", "Virgin Games Ltd.³"],
    ["64", "Lucasfilm Games⁴"],
    ["67", "Ocean Software"],
    ["69", "EA (Electronic Arts)"],
    ["70", "Infogrames⁵"],
    ["71", "Interplay Entertainment"],
    ["72", "Broderbund"],
    ["73", "Sculptured Software⁶"],
    ["75", "The Sales Curve Limited⁷"],
    ["78", "THQ"],
    ["79", "Accolade"],
    ["80", "Misawa Entertainment"],
    ["83", "Iozc"],
    ["86", "Tokuma Shoten"],
    ["87", "Tsukuda Original"],
    ["91", "Chunsuft Co.⁸"],
    ["93", "Ocean Software/Acclaim Entertainment"],
    ["95", "Varie"],
    ["96", "Yonezewa/s'pal"],
    ["97", "Kaneko"],
    ["99", "Pack-In-Video"],
    ["9H", "Bottom Up"],
    ["A4", "Konami (Yu-Gi-Oh!)"],
    ["BL", "MTO"],
    ["DK", "Kodansha"],
  ]);

  /**
	 @description This stores the values of the old licensee code
	 * This is the first licensee code the emulator should check
	 * NOTE: If the address value of the OldLicensee code is 0x33,
	 * you should now check the New Licensee Code
	 **/
  static OldLicenseeCode = new Map([
    [0x00, "None"],
    [0x01, "Nintendo"],
    [0x08, "Capcom"],
    [0x09, "HOT-B"],
    [0x0a, "Jaleco"],
    [0x0b, "Coconuts Japan"],
    [0x0c, "Elite Systems"],
    [0x13, "EA (Electronic Arts)"],
    [0x18, "Hudson Soft"],
    [0x19, "ITC Entertainment"],
    [0x1a, "Yanoman"],
    [0x1d, "Japan Clary"],
    [0x1f, "Virgin Gamed Ltd.³"],
    [0x24, "PCM Complete"],
    [0x25, "San-X"],
    [0x28, "Kemco"],
    [0x29, "SETA Corporation"],
    [0x30, "Infogrames⁵"],
    [0x31, "Nintendo"],
    [0x32, "Bandai"],
    [0x33, "New License Code should be used"],
    [0x34, "Konami"],
    [0x35, "HectorSoft"],
    [0x38, "Capcom"],
    [0x39, "Banpresto"],
    [0x3c, "Entertainment Interactive(stub) "],
    [0x3e, "Gremlin"],
    [0x41, "Ubi Soft¹"],
    [0x42, "Atlus"],
    [0x44, "Malibu Interactive"],
    [0x46, "Angel"],
    [0x47, "Spectrum HoloByte"],
    [0x49, "Irem"],
    [0x4a, "Virgin Games Ltd.³"],
    [0x4d, "Malibu Interactive"],
    [0x4f, "U.S Gold"],
    [0x50, "Absolute"],
    [0x51, "Acclaim Entertainment"],
    [0x52, "Activision"],
    [0x53, "Sammy USA Corporation"],
    [0x54, "GameTek"],
    [0x55, "Park Place¹³"],
    [0x56, "LJN"],
    [0x57, "Matchbox"],
    [0x59, "Milton Bradley Company"],
    [0x5a, "Mindscape"],
    [0x5b, "Romstar"],
    [0x5c, "Naxat Soft¹⁴"],
    [0x5d, "Absolute"],
    [0x60, "Titus Interactive"],
    [0x61, "Virgin Games Ltd.³"],
    [0x67, "Ocean Software"],
    [0x69, "EA (Electronic Arts)"],
    [0x6e, "Elite Systems"],
    [0x6f, "Electro Brain"],
    [0x70, "Infogrames⁵"],
    [0x71, "Interplay Entertainment"],
    [0x72, "Broderbund"],
    [0x73, "Sculptured Software⁶"],
    [0x75, "The Sales Curve Limited⁷"],
    [0x78, "THQ"],
    [0x79, "Accolade⁷"],
    [0x7a, "Traffix Entertainment"],
    [0x7c, "MicroProse"],
    [0x7f, "Kemco"],
    [0x80, "Misawa Entertainment"],
    [0x83, "LOZC G."],
    [0x86, "Tokuma Shoten"],
    [0x8b, "Bullet-Proof Software²"],
    [0x8c, "Vic Tokai Corp.¹⁶"],
    [0x8e, "Ape Inc.¹⁷"],
    [0x8f, "I'Max¹⁸,"],
    [0x91, "Chunsoft Co.⁸"],
    [0x92, "Video System"],
    [0x93, "Tsubaraya Productions"],
    [0x95, "Varie"],
    [0x96, "Yonezawa¹⁹"],
    [0x97, "Kemco"],
    [0x99, "Arc"],
    [0x9a, "Nihon Bussan"],
    [0x9b, "Tecmo"],
    [0x9c, "Imagineer"],
    [0x9d, "Banpresto"],
    [0x9f, "Nova"],
    [0xa1, "Hori Electric"],
    [0xa2, "Bandai"],
    [0xa4, "Konami"],
    [0xa6, "Kawada"],
    [0xa7, "Takara"],
    [0xa9, "Technos Japan"],
    [0xaa, "Broderbund"],
    [0xac, "Toei Animation"],
    [0xad, "Toho"],
    [0xaf, "Namco"],
    [0xb0, "Acclaim Entertainment"],
    [0xb1, "ASCII Corporation or Nexsoft"],
    [0xb2, "Bandai"],
    [0xb4, "Square Enix"],
    [0xb6, "HAL Laboratory"],
    [0xb7, "SNK"],
    [0xb9, "Pony Canyon"],
    [0xba, "Culture Brain"],
    [0xbb, "Sunsoft"],
    [0xbd, "Sony Imagesoft"],
    [0xbf, "Sammy corporartion"],
    [0xc0, "Taito"],
    [0xc2, "Kemco"],
    [0xc3, "Square"],
    [0xc4, "Tokuma Shoten"],
    [0xc5, "Data East"],
    [0xc6, "TOnkin House"],
    [0xc8, "Koei"],
    [0xc9, "UFL"],
    [0xca, "Ultra Games"],
    [0xcb, "VAP, Inc."],
    [0xcc, "Use Corporation"],
    [0xcd, "Meldac"],
    [0xce, "Pony Canyon"],
    [0xcf, "Angel"],
    [0xd0, "Taito"],
    [0xd1, "SOFEL (Software Engineering Lab"],
    [0xd2, "Quest"],
    [0xd3, "Sigma Enterprises"],
    [0xd4, "ASK Kodansha Co."],
    [0xd6, "Naxat Soft⁹´"],
    [0xd7, "Copya System"],
    [0xd9, "Banpresto"],
    [0xda, "Tomy"],
    [0xdb, "LJN"],
    [0xdd, "Nippon Computer Systems"],
    [0xde, "Human Ent."],
    [0xdf, "Altron"],
    [0xe0, "Jaleco"],
    [0xe1, "Towa Chiki"],
    [0xe2, "Yutaka"],
    [0xe3, "Varie"],
    [0xe5, "Epoch"],
    [0xe7, "Athena"],
    [0xe9, "Asmik Ace Entertainment"],
    [0xea, "King Records"],
    [0xeb, "Atlus"],
    [0xec, "Epic/Sony Records"],
    [0xee, "IGS"],
    [0xf0, "A Wave"],
    [0xf3, "Extreme Entertainment"],
    [0xff, "LJN"],
  ]);

  /**
   * @description This Checks the rom size of the cartridge in KiB KibiBytes
   **/
  static RomSize = new Map([
    [0x00, 32],
    [0x01, 64],
    [0x02, 128],
    [0x03, 256],
    [0x04, 512],
    [0x05, 1024],
    [0x06, 2048],
    [0x07, 4096],
    [0x08, 8192],
    [0x52, 1126.4],
    [0x53, 1228.8],
    [0x54, 1536],
  ]);

  /**
   * @description This Checks the ram size of the cartridge in KiB KibBytes
   **/
  static RamSize = new Map([
    [0x00, 0], // no RAM
    [0x01, 0], // unused
    [0x02, 8], // 1 bank
    [0x03, 32], // 4 banks of 8 KiB
    [0x04, 128], // 16 banks of 8 KiB
    [0x05, 64], // 8 banks of 8 KiB
  ]);
}

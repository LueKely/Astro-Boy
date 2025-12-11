export interface ICartridge {
    type: string;
    romSize: number;
    ramSize: number;
    destination: string;
    title: string;
    oldLicenseeCode: string;
    newLicenseeCode: string;
    cgbFlag: string;
    maskRomVersionNumber: string;
    globalCheckSum: Uint8Array<ArrayBufferLike>;
    manufactureCode: Uint8Array<ArrayBufferLike>;
    entryPoint: Uint8Array<ArrayBufferLike>;
    checkSum: string;
    nintendoLogo: Uint8Array<ArrayBufferLike>;
}

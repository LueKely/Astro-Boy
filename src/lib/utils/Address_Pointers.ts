export enum Address {
    // INTERRUPT Registers
    IE = 0xffff,
    IF = 0xff0f,
    // VRAM
    vramStart = 0x8000,
    vramEnd = 0x9fff,
    // OAM
    oamStart = 0xfe00,
    oamEnd = 0xfe9f,
    // LCD Registers
    LCDC = 0xff40,
    STAT = 0xff41,
    // Scroll Registers
    SCY = 0xff43,
    SCX = 0xff42,
    // Window X and Y position
    WY = 0xff4a,
    WX = 0xff4b,
    // Scan Line Registers
    LY = 0xff44,
    LYC = 0xff45,
}

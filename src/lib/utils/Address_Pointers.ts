export enum Address {
    // INTERRUPT Registers
    IE = 0xffff,
    IF = 0xff0f,
    //TILE MAPS
    tileMapAStart = 0x9800,
    tileMapAEnd = 0x9bff,
    tileMapBStart = 0x9c00,
    tileMapBEnd = 0x9fff,
    // OAM
    oamStart = 0xfe00,
    oamEnd = 0xfe9f,
    // LCD Registers
    LCDC = 0xff40,
    STAT = 0xff41,
    // Scroll Registers
    SCY = 0xff43,
    SCX = 0xff42,
    // Scan Line Registers
    LY = 0xff44,
    LYC = 0xff45,
}

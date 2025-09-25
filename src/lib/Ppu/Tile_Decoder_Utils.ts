export class Tile_Decoder_Utils {
    static decodeTo2bpp(lsb: number, msb: number): number[] {
        const result = [];

        for (let i = 7; i >= 0; i--) {
            const bit0 = (lsb >> i) & 1; // low bit
            const bit1 = (msb >> i) & 1; // high bit

            result.push((bit1 << 1) | bit0);
        }
        return result;
    }

    // this should take 16 items from an array to crate the 8x8 tile
    static decodeATile(vramSlice: Uint8Array) {
        const tile: number[][] = [];

        for (let index = 0; index < vramSlice.length; index += 2) {
            const lsb = vramSlice[index];
            const msb = vramSlice[index + 1];

            const tileRow = Tile_Decoder_Utils.decodeTo2bpp(lsb, msb);
            tile.push(tileRow);
        }

        return tile;
    }

    static decodeTileData(vram: Uint8Array): number[][][] {
        const cached: number[][][] = [];

        for (let index = 0; index < vram.length; index += 16) {
            const tile = Tile_Decoder_Utils.decodeATile(vram.slice(index, index + 16));
            cached.push(tile);
        }
        return cached;
    }
}

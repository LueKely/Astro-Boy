export class PPU {
	// this should store 384 tiles
	tileCache: number[][][] = [];

	static twoBitPixelProcessing(lsb: number, msb: number): number[] {
		const result = [];

		for (let index = 7; index >= 0; index--) {
			const mask = 0b0000_0001 << index;
			const maskLsb = (mask & lsb) >> index;
			const maskMsb = (mask & msb) >> index;

			if (maskMsb === maskLsb) {
				if (maskMsb != 0) {
					result.push(3);
				} else {
					result.push(0);
				}
			} else if (maskMsb > maskLsb) {
				result.push(2);
			} else if (maskMsb < maskLsb) {
				result.push(1);
			}
		}

		return result;
	}

	// this should take 16 items from an array to crate the 8x8 tile
	static renderATile(vramSlice: Uint8Array) {
		const tile: number[][] = [];

		for (let index = 0; index < vramSlice.length; index += 2) {
			const lsb = vramSlice[index];
			const msb = vramSlice[index + 1];

			const tileRow = PPU.twoBitPixelProcessing(lsb, msb);
			tile.push(tileRow);
		}

		return tile;
	}

	static renderTileData(vram: Uint8Array): number[][][] {
		const cached: number[][][] = [];

		for (let index = 0; index < vram.length; index += 16) {
			const tile = PPU.renderATile(vram.slice(0, 15));
			cached.push(tile);
		}

		return cached;
	}
}

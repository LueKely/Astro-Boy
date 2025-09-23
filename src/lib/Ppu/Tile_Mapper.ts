export class Tile_Mapper {
    private map: { x: number; y: number }[] = [];

    create(width: number = 256, height: number = 256) {
        const offset = 8;
        for (let row = 0; row < width; row += offset) {
            for (let col = 0; col < height; col += offset) {
                this.map.push({ x: col, y: row });
            }
        }
        return this.map;
    }
}

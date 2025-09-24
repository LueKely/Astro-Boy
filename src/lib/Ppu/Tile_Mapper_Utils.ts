export class Tile_Mapper_Utils {
    static createBasicTile(width: number = 256, height: number = 256) {
        const map: { x: number; y: number }[] = [];
        const offset = 8;
        for (let row = 0; row < width; row += offset) {
            for (let col = 0; col < height; col += offset) {
                map.push({ x: col, y: row });
            }
        }
        return map;
    }
}

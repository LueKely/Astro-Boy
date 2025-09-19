export class PPU {
  tileCache: number[] = [];

  // i have to make 384 tiles of this dawg and this just renders a row lol
  twoBitPixelProcessing(lsb: number, msb: number): number[] {
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

  renderATile() {}
}

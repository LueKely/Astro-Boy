export class MachineCycle {
  totalCycles: number;

  constructor() {
    this.totalCycles = 0;
  }

  tick() {
    this.totalCycles++;
  }
  getMCycle() {
    return Math.floor(this.totalCycles / 4);
  }
}

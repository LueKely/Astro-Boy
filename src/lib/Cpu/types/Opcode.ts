import type { Gameboy } from "../../Gameboy";

export interface IOpCodeEntry {
  name: string;
  cycles: number | string;
  length: number;
  jobs: ((dmg: Gameboy) => void)[];
}

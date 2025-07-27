export interface IOpCodeEntry {
  name: string;
  cycles: number;
  length: number;
  jobs: (() => void)[];
}

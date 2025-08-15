import type { IOpCodeEntry } from './types/OpcodeTypes';

export class CpuPrefixOpCodeRecord {
	get(index: number): IOpCodeEntry {
		return this.record()[index];
	}

	private record(): Record<number, IOpCodeEntry> {
		return {};
	}
}

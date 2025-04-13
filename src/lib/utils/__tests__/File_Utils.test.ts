import { test, describe, expect } from 'vitest';
import { fileToArrayBuffer } from '../File_Utils';

describe('File Handler', () => {
	test('This should take a file and return it as a buffer array', async () => {
		const mockFile = new File(['hello world'], 'test.txt', {
			type: 'text/plain',
		});

		expect(await fileToArrayBuffer(mockFile)).toBeDefined();
	});
});

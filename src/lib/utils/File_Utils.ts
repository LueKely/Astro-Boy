function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
	const fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);

		fileReader.onerror = () => {
			fileReader.abort();
			reject(new Error('Error parsing file'));
		};

		fileReader.readAsArrayBuffer(file);
	});
}

function loadFile(event: Event) {
	// throws error if event given is undefined
	if (!event) throw new Error('No file given');

	const file = event.target as HTMLInputElement;
	const fileSuffix = file.value.slice(file.value.length - 2, file.value.length);
	const gameBoySuffix = 'gb';

	// throws an error if file isn't a gameboy or if the files aren't contained
	if (fileSuffix != gameBoySuffix || file.files == null)
		throw new Error('Invalide File Type');

	return fileToArrayBuffer(file.files[0]);
}

export { loadFile };

/**
 * @description This function takes a file and turns it into a buffer array using the file reader api
 * @param {File} file This function takes a file to turn into an array buffer
 * @returns {Promise<ArrayBuffer>} Returns a promise of an Array Buffer
 **/

import { GameBoyCatridge } from '../Cartridge/Cartridge';

function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
	const fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		// resolve filereader if file was read successfully
		fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);

		// throw error when file reader
		fileReader.onerror = () => {
			fileReader.abort();
			reject(new Error('Error parsing file'));
		};

		fileReader.readAsArrayBuffer(file);
	});
}

/**
 * @description  a function checks whether the file is valid gameboy cartridge or not
 * @param {Event} event  this function takes an event as parameter said event comes from
 * an input file event
 **/

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

export { loadFile, fileToArrayBuffer };

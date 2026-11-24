const PITCH_OFFSETS = {
		'C' : 0,
	    'C#' : 1, 'Db' : 1,
	    'D' : 2,
	    'D#' : 3, 'Eb' : 3,
	    'E' : 4,
	    'F' : 5,
	    'F#' : 6, 'Gb' : 6,
	    'G' : 7,
	    'G#' : 8, 'Ab' : 8,
	    'A' : 9,
	    'A#' : 10, 'Bb' : 10,
	    'B' : 11
};



export function noteToFreq(name){

	//throws an error making sure that the input is not empty and that we know something wrong is happening
	if (typeof name !== 'string' || name.length < 2){
		throw new Error (`Invalid not name "${name}: expected a string such as "C4" or "Db5".`);
	}

	//this line extracts the final character and cconverts it to a base 10 integer
	const octave = parseInt(name.slice(-1), 10);

	//this extracts all character before the last one to isolate the pitch class
	const pitchClass = name.slice(0, -1);

	//searches for the semitone offset after the pitch class is parsed
	const semitoneOffset = PITCH_OFFSETS[pitchClass];

	//throwing an error that lets us know the note is not within the 12 octave range
	if (Number.isNaN(octave)){
		throw new Error(`Invalid octave in note "${name}": expeccted a number between 0-12`);
	}

	//throwing an error igf the pitch class is not wihtin the PITCH_OFFSETS
	if (semitoneOffset === undefined) {
		throw new Error (`Invalid pitch class "${pitchClass}" within note "${name}".`);
	}
	
	//calculating each semitone relative to octave 0 or from C0
	const absoluteSemitones = semitoneOffset + (12*octave);

	//calculating semitone distance from A4 (57 semitones above C0)
	const n = absoluteSemitones - 57;

	//finding the frequency in hertz using the 12 tone tempermant found on a piano
	const frequency = 440 * Math.pow(2, n / 12);
	
	return frequency;
};

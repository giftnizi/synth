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
	const octave = parseInt(name.slice(-1), 10);
	const pitchClass = name.slice(0, -1);
	const semitoneOffset = PITCH_OFFSETS[pitchClass];
	return {octave, pitchClass, semitoneOffset};
}

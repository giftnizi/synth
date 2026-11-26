
//importing the freq converter from the local ES module with synth/src
import {noteToFreq} from './note.mjs';

//the attmpt to make the button in the html file play sound script is below

//this specific line grabs the button delcared within the index.html file
const playBtn = document.getElementById('play-btn');

//using a single audiocontect refernce this time, soo that we dont spawn multiple nor unlimited all at once
let audioCtx = null;

//this logic is used to check wether audio has been said to play after clicking the button
playBtn.addEventListener('click', async () =>{
	//it created the audiocontext after the first click
	if (!audioCtx){
		audioCtx = new AudioContext();
	}
	//resumes the state if the browser starts ina a "suspended" state
	if (audioCtx.state === "suspended"){
		await audioCtx.resume();
	}

	console.log('AudioContext state on play:', audioCtx.state);

	//this now creates a single osc which is how sound is produced, thankfully jscript has them nativelyy
	const osc = audioCtx.createOscillator();
	osc.type = 'triangle';
	osc.frequency.value = noteToFreq('C4');

	//creating a gain which puts an output level
	const gain = audioCtx.createGain();
	gain.gain.value = 0.2;

	//connecting the audio graph. osc >> gain >> output
	osc.connect(gain);
	gain.connect(audioCtx.destination);

	//this tells the sound should play (when pressed) then and for one second
	const now = audioCtx.currentTime;
	osc.start(now);
	osc.stop(now + 1);
});

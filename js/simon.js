var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;

// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
	// Create references to box element and audio element.
	var boxEl = document.getElementById(key);
	var audioEl = document.getElementById(key + '-audio');
	if (!boxEl) throw new Error('No NoteBox element with id' + key);
	if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

	// When enabled, will call this.play() and this.onClick() when clicked.
	// Otherwise, clicking has no effect.
	var enabled = true;
	// Counter of how many play calls have been made without completing.
	// Ensures that consequent plays won't prematurely remove the active class.
	var playing = 0;

	this.key = key;
	this.onClick = onClick || function () {};

	// Plays the audio associated with this NoteBox
	this.play = function () {
		playing++;
		// Always play from the beginning of the file.
		audioEl.currentTime = 0;
		audioEl.play();

		// Set active class for NOTE_DURATION time
		boxEl.classList.add('active');
		setTimeout(function () {
			playing--;
			if (!playing) {
				boxEl.classList.remove('active');
			}
		}, NOTE_DURATION)
	};

	// Enable this NoteBox
	this.enable = function () {
		enabled = true;
	};

	// Disable this NoteBox
	this.disable = function () {
		enabled = false;
	};

	// Call this NoteBox's clickHandler and play the note.
	this.clickHandler = function () {
		if (!enabled) return;

		this.onClick(this.key);
		this.play();
	}.bind(this);

	boxEl.addEventListener('mousedown', this.clickHandler);
}

function playSimon() {
	let notes = {};
	let notesToPlay = [];
	let noteIndex = 0;

	setup(notes);
	incrementRound(notesToPlay, notes);

// adds event listeners to each box
	for (let key of KEYS) {
		document.getElementById(key).addEventListener('mousedown', function() {
			reactToUserInput(this);});
	}

	function reactToUserInput(documentBox) {
		getUserInput(documentBox);
		// successfully reached end of round, wait until end of note then start new round
		if (noteIndex > 0 && noteIndex === notesToPlay.length) {
			noteIndex = 0; // reset the index to look at
			setTimeout(function () {incrementRound(notesToPlay, notes)}, 2 * NOTE_DURATION);
		}
	}

	function getUserInput(documentBox) {
		if (notesToPlay.length > 0) {
			if(document.getElementById(notesToPlay[noteIndex].key) !== documentBox) {
				notesToPlay = []; // reset the sequence
				noteIndex = 0; // reset the index to look at
				setTimeout(function() {incrementRound(notesToPlay, notes)}, 2 * NOTE_DURATION);
			} else {
				noteIndex++; // increment the index to look at
			}
		}
	}
}

// generates notes, adds them to notesToPlay, and plays the NoteBoxes in notesToPlay
function incrementRound(notesToPlay, notes) {
	generateNotes(notesToPlay, notes);
	playNotes(notesToPlay);
}

// Plays the notes in notesToPlay
function playNotes(notesToPlay) {
	notesToPlay.forEach(function(note, i) {
		setTimeout(note.play, i * NOTE_DURATION);
	});
}

// Generates a new random NoteBox to add to notesToPlay
function generateNotes(notesToPlay, notes) {
	notesToPlay.push(notes[KEYS[Math.floor(Math.random() * KEYS.length)]]);
}

// Sets up the notes to each box by going through each key and assigns it to the corresponding box
function setup(notes) {
	KEYS.forEach(function (key) {
		notes[key] = new NoteBox(key);
	});
}
playSimon();


function startPomo() {
	const homeScreen = document.getElementById('homeScreen');
	const pomoScreen = document.getElementById('pomoScreen');

	homeScreen.style.display = "none";
	pomoScreen.style.display = "block";
}

const progressBar = document.querySelector('.e-c-progress');
const indicator = document.getElementById('e-indicator');
const pointer = document.getElementById('e-pointer');
const length = Math.PI * 2 * 100;
progressBar.style.strokeDasharray = length;
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');
let intervalTimer;
let timeLeft;
let wholeTime = 0.5 * 60;
let isPaused = false;
let isStarted = false;

function update(value, timePercent) {
	var offset = - length - length * value / (timePercent);
	progressBar.style.strokeDashoffset = offset; 
	pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
}

function timer (seconds) {
	let remainTime = Date.now() + (seconds * 1000);
	displayTimeLeft(seconds);
	
	intervalTimer = setInterval(() => {
		timeLeft = Math.round((remainTime - Date.now()) / 1000);
		if(timeLeft < 0){
			clearInterval(intervalTimer);
			isStarted = false;
			displayTimeLeft(wholeTime);
			pauseBtn.classList.remove('pause');
			pauseBtn.classList.add('play');
			return;
		}
		displayTimeLeft(timeLeft);
	}, 1000);
}

function pauseTimer() {
	if (isStarted === false) {
		timer(wholeTime);
		isStarted = true;
		this.classList.remove('play');
		this.classList.add('pause');
	} else if (isPaused) {
		this.classList.remove('play');
		this.classList.add('pause');
		timer(timeLeft);
		isPaused = isPaused ? false : true
	} else {
		this.classList.remove('pause');
		this.classList.add('play');
		clearInterval(intervalTimer);
		isPaused = isPaused ? false : true ;
	}
}
function displayTimeLeft (timeLeft){
	let minutes = Math.floor(timeLeft / 60);
	let seconds = timeLeft % 60;
	let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	displayOutput.textContent = displayString;
	update(timeLeft, wholeTime);
}

update(wholeTime,wholeTime);
displayTimeLeft(wholeTime);

pauseBtn.addEventListener('click', pauseTimer);
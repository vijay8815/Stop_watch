const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

let time = 0;
let lapTime = 0;
let intervalId;
let isRunning = false;

function updateTime() {
	const hours = Math.floor(time / 3600).toString().padStart(2, "0");
	const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
	const seconds = Math.floor(time % 60).toString().padStart(2, "0");
	timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function start() {
	if (!isRunning) {
		isRunning = true;
		intervalId = setInterval(() => {
			time++;
			updateTime();
		}, 1000);
	}
}

function stop() {
	clearInterval(intervalId);
	isRunning = false;
}

function pause() {
	if (isRunning) {
		stop();
		startButton.textContent = "Continue";
	} else {
		start();
		startButton.textContent = "Start";
	}
}

function reset() {
	stop();
	time = 0;
	lapTime = 0;
	updateTime();
	lapsList.innerHTML = "";
}

function lap() {
	const lapTimeDisplay = document.createElement("li");
	lapTimeDisplay.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime.toString().padStart(6, "0")}`;
	lapsList.appendChild(lapTimeDisplay);
	lapTime = time;
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

updateTime();
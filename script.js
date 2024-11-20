const clockHour = document.querySelector(".clock-hour");
const clockMin = document.querySelector(".clock-min");
const clockSec = document.querySelector(".clock-sec");
const interval = document.querySelector(".interval");
const resetBtn = document.querySelector(".resetBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const startBtn = document.querySelector(".startBtn");
const statusEl = document.querySelector(".status");

let intervalCount = 1;
let running = false;
let focusing = false;
let completedRestCycle = false;

const defaultHour = 0;
const defaultMin = 45;
const defaultSec = 0;

const defaultShortHour = 0;
const defaultShortMin = 15;
const defaultShortSec = 0;

const defaultLongHour = 0;
const defaultLongMin = 30;
const defaultLongSec = 0;

let currentHour = defaultHour;
let currentMin = defaultMin;
let currentSec = defaultSec;

let time = null;

function startTimer() {
    if (!running) {
        running = true;
        focusing = true;
        runTheTimer();
    }
}

// Changing the clock function
function changeTimer(h, m, s) {
    clockHour.textContent = h < 10 ? "0" + h : h;
    clockMin.textContent = m < 10 ? "0" + m : m;
    clockSec.textContent = s < 10 ? "0" + s : s;
    interval.textContent = intervalCount;
}

// Running the clock function
function runTheTimer() {
    if (currentSec == 0) {
        currentSec = 59;
        if (currentMin == 0) {
            currentMin = 59;
            if (currentHour == 0) {
                focusing = !focusing;
                if (!focusing) {
                    if (intervalCount < 4) {
                        alert("Focus time is done. Get a short rest");
                        statusEl.textContent = "Resting";
                    } else {
                        alert("You have finished 4 intervals. Get a long rest");
                        statusEl.textContent = "Long Resting";
                    }
                    statusEl.classList.replace("bg-green-400", "bg-gray-400");
                    completedRestCycle = true;
                } else {
                    alert("Rest time is done. Time to focus!");
                    statusEl.classList.replace("bg-gray-400", "bg-green-400");
                    statusEl.textContent = "Focusing";

                    if (completedRestCycle) {
                        intervalCount++;
                        completedRestCycle = false;
                    }
                }

                changeTheCondition();

            } else {
                currentHour--;
            }
        } else {
            currentMin--;
        }
    } else {
        currentSec--;
    }

    changeTimer(currentHour, currentMin, currentSec);
    if (running) {
        time = setTimeout(runTheTimer, 1000);
    }
}

function changeTheCondition() {
    if (focusing) {
        currentHour = defaultHour;
        currentMin = defaultMin;
        currentSec = defaultSec;
    } else {
        if (intervalCount < 4) {
            currentHour = defaultShortHour;
            currentMin = defaultShortMin;
            currentSec = defaultShortSec;
        } else {
            intervalCount = 1;
            currentHour = defaultLongHour;
            currentMin = defaultLongMin;
            currentSec = defaultLongSec;
        }
    }
}

// Pause function
function pauseTheTimer() {
    running = !running;

    if (!running) {
        clearTimeout(time);
        pauseBtn.textContent = "Continue";
    } else {
        pauseBtn.textContent = "Pause";
        runTheTimer();
    }
}

// Reset the clock to the default function
function resetTheTimer() {
    clearTimeout(time);
    running = false;
    focusing = true;
    completedRestCycle = false;
    intervalCount = 1;
    currentHour = defaultHour;
    currentMin = defaultMin;
    currentSec = defaultSec;
    changeTimer(defaultHour, defaultMin, defaultSec);
    statusEl.classList.replace("bg-gray-400", "bg-green-400");
    statusEl.textContent = "Focusing";
}

// Events Part
window.addEventListener(
    "load",
    changeTimer(defaultHour, defaultMin, defaultSec)
);
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTheTimer);
resetBtn.addEventListener("click", resetTheTimer);

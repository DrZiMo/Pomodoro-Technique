const clockHour = document.querySelector(".clock-hour");
const clockMin = document.querySelector(".clock-min");
const clockSec = document.querySelector(".clock-sec");
const interval = document.querySelector(".interval");
const resetBtn = document.querySelector(".resetBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const startBtn = document.querySelector(".startBtn");
const statusEl = document.querySelector(".status");

const timerLabel = document.querySelector(".timer-label");
const shortLabel = document.querySelector(".short-label");
const longLabel = document.querySelector(".long-label");

const hoursInput = document.querySelector(".hours-input");
const minInput = document.querySelector(".min-input");
const secInput = document.querySelector(".sec-input");

const hoursShortInput = document.querySelector(".hours-short-input");
const minShortInput = document.querySelector(".min-short-input");
const secShortInput = document.querySelector(".sec-short-input");

const hoursLongInput = document.querySelector(".hours-long-input");
const minLongInput = document.querySelector(".min-long-input");
const secLongInput = document.querySelector(".sec-long-input");

const saveBtn = document.querySelector(".saveBtn");

let intervalCount = 1;
let running = false;
let focusing = false;
let completedRestCycle = false;

let defaultHour = 0;
let defaultMin = 45;
let defaultSec = 0;

let defaultShortHour = 0;
let defaultShortMin = 15;
let defaultShortSec = 0;

let defaultLongHour = 0;
let defaultLongMin = 30;
let defaultLongSec = 0;

let currentHour = defaultHour;
let currentMin = defaultMin;
let currentSec = defaultSec;

let time = null;

// Starting the timer
function startTimer() {
    currentHour = defaultHour;
    currentMin = defaultMin;
    currentSec = defaultSec;
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

                updateCycle();

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

// Update the cycle
function updateCycle() {
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

// Saving new time
function saveNewTime() {
    resetTheTimer();
    if ((parseInt(hoursInput.value) === 0 && parseInt(minInput.value) === 0 && parseInt(secInput.value) === 0) ||
        (parseInt(hoursShortInput.value) === 0 && parseInt(minShortInput.value) === 0 && parseInt(secShortInput.value) === 0) ||
        (parseInt(hoursLongInput.value) === 0 && parseInt(minLongInput.value) === 0 && parseInt(secLongInput.value) === 0)) {
        alert("the values can't be zero");
    }
    else if ((parseInt(hoursInput.value) > 59 || parseInt(minInput.value) > 59 || parseInt(secInput.value) > 59) ||
        (parseInt(hoursShortInput.value) > 59 || parseInt(minShortInput.value) > 59 || parseInt(secShortInput.value) > 59) ||
        (parseInt(hoursLongInput.value) > 59 || parseInt(minLongInput.value) > 59 || parseInt(secLongInput.value) > 59)) {
        alert("some values are over the limit");
    }
    else if ((parseInt(hoursInput.value) < 0 || parseInt(minInput.value) < 0 || parseInt(secInput.value) < 0) ||
        (parseInt(hoursShortInput.value) < 0 || parseInt(minShortInput.value) < 0 || parseInt(secShortInput.value) < 0) ||
        (parseInt(hoursLongInput.value) < 0 || parseInt(minLongInput.value) < 0 || parseInt(secLongInput.value) < 0)) {
        alert("some values are under the limit");
    }
    else {
        defaultHour = parseInt(hoursInput.value);
        defaultMin = parseInt(minInput.value);
        defaultSec = parseInt(secInput.value);

        defaultShortHour = parseInt(hoursShortInput.value);
        defaultShortMin = parseInt(minShortInput.value);
        defaultShortSec = parseInt(secShortInput.value);

        defaultLongHour = parseInt(hoursLongInput.value);
        defaultLongMin = parseInt(minLongInput.value);
        defaultLongSec = parseInt(secLongInput.value);

        changeTimer(defaultHour, defaultMin, defaultSec);
    }

}

// Events Part
window.addEventListener(
    "load",
    changeTimer(defaultHour, defaultMin, defaultSec)
);
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTheTimer);
resetBtn.addEventListener("click", resetTheTimer);
saveBtn.addEventListener("click", saveNewTime);

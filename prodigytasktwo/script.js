let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 1;
let timeRef = document.querySelector(".timer-display");
let int = null;

document.getElementById("start-timer").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    lapCount = 1;
    timeRef.innerHTML = "00 : 00 : 00 : 000 ";
    document.getElementById('lap-list').innerHTML = '';
});

document.getElementById("lap-timer").addEventListener("click", () => {
    recordLap();
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds -= 1000;
        seconds++;
        if (seconds >= 60) {
            seconds -= 60;
            minutes++;
            if (minutes >= 60) {
                minutes -= 60;
                hours++;
            }
        }
    }
    timeRef.innerHTML = `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)} : ${formatTime(milliseconds, true)}`;
}

function formatTime(time, isMilliseconds = false) {
    if (isMilliseconds) {
        return time.toString().padStart(3, '0');
    }
    return time.toString().padStart(2, '0');
}

function recordLap() {
    const lapList = document.getElementById('lap-list');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds, true)}`;
    lapList.appendChild(lapItem);
    lapCount++;
}

import iziToast from 'izitoast';
import flatpickr from 'flatpickr';

const inputDatetimeRef = document.querySelector('#datetime-picker');
const buttonStartRef = document.querySelector('button');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerId;
buttonStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0 && selectedDates[0].getTime() > Date.now()) {
      buttonStartRef.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
    } else {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        timeout: 3000,
      });
      buttonStartRef.disabled = true;
    }
  },
};

flatpickr(inputDatetimeRef, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const now = Date.now();
  const timeLeft = userSelectedDate - now;

  if (timeLeft <= 0) {
    clearInterval(timerId);
    timerDays.textContent = '00';
    timerHours.textContent = '00';
    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';
    inputDatetimeRef.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function onButtonStartTimer() {
  if (!userSelectedDate) {
    return;
  }

  buttonStartRef.disabled = true;
  inputDatetimeRef.disabled = true;

  if (!timerId) {
    timerId = setInterval(updateTimer, 1000);
  }
}

buttonStartRef.addEventListener('click', onButtonStartTimer);

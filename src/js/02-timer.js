import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds');

let selectedTime = null;

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,

    onClose(selectedDates) {
        let currentDate = new Date();
        let time = currentDate < selectedDates[0];
        if (time) {
            startButton.addEventListener('click', () => {
                selectedTime = setInterval(() => {
                    startButton.setAttribute('disabled', true);
                    currentDate = new Date();
                    let delta = selectedDates[0] - currentDate;
                    let values = convertMs(delta);
                    addLeadingZero(values);
                    if (delta < 1000) {
                        clearInterval(selectedTime);
                        Notiflix.Notify.success('Timeout');
                    }
                }, 1000);
            })
        } else {
            startButton.setAttribute('disabled', true);
            Notiflix.Notify.failure('Please choose a date in the future');
    }
},
};

flatpickr(`input[type="text"]`, options);

function addLeadingZero(values) {
    days.textContent = values.days.toString().padStart(2, '0');
    hours.textContent = values.hours.toString().padStart(2, '0');
    minutes.textContent = values.minutes.toString().padStart(2, '0');
    seconds.textContent = values.seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// получаем доступ к элементам
const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
// делаем кнопку старт не активной
refs.startBtn.setAttribute("disabled", "");

// вешаем слушателя на кнопку Старт, при нажании запускаем функцию start
refs.startBtn.addEventListener('click', () => {
    start();
});

// создаем переменную = выбранное время
let selectedTime = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // выбранное время в мсек
        selectedTime = selectedDates[0].getTime();
        // если выбрали время в прошлом - предупреждение
        // если будущее - кнопка старт активна
        if (selectedTime < Date.now()) {
            Notify.warning('Please choose a date in the future');
            return;
        } refs.startBtn.removeAttribute("disabled")
    },
};

// подключаем календарь
flatpickr(refs.input, options);

function start() {
    // делаем кнопку старт не активной
    refs.startBtn.setAttribute("disabled", ""); 
        // с интервалом раз в сек вычисляем разницу в мсек между
        // текущим и выбранным временем, если результат больше 0, то
        // запускаем функцию пересчета в дн, час, мин, сек,
        // запускаем обновление интерфейса    
    setInterval(() => {
        const deltaTime = selectedTime - Date.now();
        if (deltaTime < 0) {
            return
        } else {
            const time = convertMs(deltaTime);
            updateClockFace(time);
        }
    }, 1000);
    // делаем невозможным еще один выбор даты
    let calendar = flatpickr(refs.input, options);
    calendar.destroy();
};

// функция пересчета времени в мсек в дн, час, мин, сек
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

const days = addLeadingZero(Math.floor(ms / day));
const hours = addLeadingZero(Math.floor((ms % day) / hour));
const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

return { days, hours, minutes, seconds };
};
// функция возращающая строку в формате 0+число
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

// обновляем интерфейс
function updateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
};
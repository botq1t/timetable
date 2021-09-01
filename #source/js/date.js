let monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'илюя', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let dayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];		//? Название дней недели

const semBegin = 1630454400000; 			//? Начало семестра в миллисекундах
const weekCheck = 604800000; 							//? Одна неделя в миллисекундах
const remainEnd = 1640552400000;		//? Конец семестра в миллисекундах
var date, dayIndex, timeInSeconds;
let currentTime, timeString;
let remainTimeString, remainTime, remain, remainDays, remainInSeconds, remainHours, remainMinutes, remainSeconds;
let weekPassTime, weekIndex;
let nextDayIndex, nextDayLastLessonTime;
let currentLessonBegin, currentLessonEnd;
// ! Получение текущей даты
function getDate() {
	date = new Date();
	dayIndex = date.getDay();
	timeInSeconds = (date.getHours() * 3600) + (date.getMinutes() * 60) + (date.getSeconds());
}
setTimeout(getDate, 0);
setInterval(getDate, 1000);

// ! Секунды в красивую строку
function getTimeString(h, m, s) {
	timeString = ''
	if (h < 10) { timeString = timeString + '0' }
	timeString = timeString + h + ':';
	if (m < 10) { timeString = timeString + '0' }
	timeString = timeString + m + ':';
	if (s < 10) { timeString = timeString + '0' }
	timeString = timeString + s;
}

// ! Осталось до конца семестра
function getRemain() {
	remainTime = remainEnd - date.getTime();
	remainTime = Math.floor(remainTime / 1000);

	remainDays = Math.floor(remainTime / 86400);
	remainInSeconds = (remainTime % 86400);
	remainHours = Math.floor(remainInSeconds / 3600);
	remainMinutes = Math.floor((remainInSeconds % 3600) / 60);
	remainSeconds = ((remainInSeconds % 86400) % 60);

	getTimeString(remainHours, remainMinutes, remainSeconds);
	remainTimeString = timeString;

	remain = `${remainDays} дней, ${remainTimeString}`

	$('.footer__time').text(`До сессии осталось ${remain}`)
}

// ! Выделение текущего дня недели
function hlToday() {
	$(`.day_${dayIndex}`).children('.day__name').addClass('active slide').next().css('display', 'grid');
}

// ! Получение номера недели
function getWeekIndex() {
	weekPassTime = date.getTime() - semBegin;
	weekIndex = Math.floor(weekPassTime / weekCheck);
	console.log('Номер недели:', (weekIndex + 1))
}
setTimeout(getWeekIndex, 0)

// ! Чётности недели
function getWeekParity() {
	weekIndex++;
	switch (weekIndex % 2) {
		case 0:
			// console.log('Чётная')
			$('.week__even-odd').removeClass('odd').addClass('even').text('Чётная неделя');
			$('.main').removeClass('odd').addClass('even');
			$('.nav__tab').removeClass('odd').addClass('even');


			$('.lesson_even').css('display', 'grid');
			$('.lesson_odd').each(function () {
				if ($(this).hasClass('lesson_even') == false) {
					$(this).css('display', 'none');
				}
			})
			break;
		default:
			// console.log('Нечётная')
			$('.week__even-odd').removeClass('even').addClass('odd').text('Нечётная неделя');
			$('.main').removeClass('even').addClass('odd');
			$('.nav__tab').removeClass('even').addClass('odd');

			$('.lesson_odd').css('display', 'grid');
			$('.lesson_even').each(function () {
				if ($(this).hasClass('lesson_odd') == false) {
					$(this).css('display', 'none');
				}
			})
			break;
	}
}

// ! Расписание следующего дня

function getNextDay() {
	nextDayIndex = dayIndex + 1;
	if (nextDayIndex > 4) { nextDayIndex = 1 }
	console.log('Завтра:', dayName[nextDayIndex]);

	// ? У117
	var k = 4;
	while ($('#u117-target').children(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').last().hasClass(`lesson_${k}`) == false) {
		k--;
	}
	console.log('Количество пар У117 сегодня:', k);
	/*timeToSeconds(lessonTime[k]['end'])
	nextDayLastLessonTime = timeOutput;*/
	if (timeInSeconds > lessonTimeSeconds[k]['end'] + 299) {
		$('#u117-target').children(`.day_${nextDayIndex}`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
		$('#u117-target').children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
	}

	// ? У217
	var k = 4;
	while ($('#u217-target').children(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').last().hasClass(`lesson_${k}`) == false) {
		k--;
	}
	console.log('Количество пар У117 сегодня:', k);
	timeToSeconds(lessonTime[k]['end'])
	nextDayLastLessonTime = timeOutput;
	if (timeInSeconds > nextDayLastLessonTime + 299) {
		$('#u217-target').children(`.day_${nextDayIndex}`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
		$('#u217-target').children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
	}
}
// ! Текущая пара
function getCurrentLesson() {
	for (let i = 1; i < 5; i++) {
		/*timeToSeconds(lessonTime[i]['begin'])
		currentLessonBegin = timeOutput;
		timeToSeconds(lessonTime[i]['end'])
		currentLessonEnd = timeOutput;*/
		if (timeInSeconds > (lessonTimeSeconds[i]['begin'] - 1)) {
			if (timeInSeconds < (lessonTimeSeconds[i]['end'] + 1)) {
				$(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').each(function () { $(this).removeClass('active') })
				$(`.day_${dayIndex}`).children('.day__timetable').children(`.lesson_${i}`).each(function () { $(this).addClass('active') })
			}
		}
	}
}

// ? Вывод на страницу
$(document).ready(function () {
	// ! Вывод текущей даты и времени
	function displayDate() {
		$('.week__date').text(`Сегодня: ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()} г. (${dayName[dayIndex]})`);
		currentTime = '';
		getTimeString(date.getHours(), date.getMinutes(), date.getSeconds());
		currentTime = timeString;
		$('.week__time').text(`Время: ${currentTime}`);
	}
	setTimeout(displayDate, 0);
	setInterval(displayDate, 1000)

	// ! Вывод остатка до конца семестра
	setTimeout(getRemain, 0);
	setInterval(getRemain, 1000)

	// ! Выделение текущего дня недели
	setTimeout(hlToday, 0);

	// ! Вывод и смена чётности недели
	setTimeout(getWeekParity, 0);
	$('.week__even-odd').click(getWeekParity);

	// ! Расписание следующего дня
	setTimeout(getNextDay, 0);

	// ! Вывод остатка до конца семестра
	setTimeout(getCurrentLesson, 0);
	setInterval(getCurrentLesson, 1000)
});
const monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'илюя', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const dayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];		//? Название дней недели

const remainEnd = 1640552400000;		//? Конец семестра в миллисекундах
const weekCheck = 604800000; 							//? Одна неделя в миллисекундах
const semBegin = 1630270800000; 			//? Начало семестра в миллисекундах
// * =================================================
// ! Получение текущей даты, дня недели и времени в секундах
let date, dayIndex, timeInSeconds;
function getDate() {
	date = new Date();
	dayIndex = date.getDay();
	timeInSeconds = (date.getHours() * 3600) + (date.getMinutes() * 60) + (date.getSeconds());
}
getDate();
setInterval(getDate, 1000);
console.log('====================== date.js ========================');
console.log('Дата:', date);
console.log('Номер дня:', dayIndex);
console.log('Время в секундах:', timeInSeconds);

// * =================================================
// ! Секунды в красивую строку
function getTimeString(h, m, s) {
	let timeString = ''
	if (h < 10) { timeString = timeString + '0' }
	timeString = timeString + h + ':';
	if (m < 10) { timeString = timeString + '0' }
	timeString = timeString + m + ':';
	if (s < 10) { timeString = timeString + '0' }
	timeString = timeString + s;
	return timeString;
}
// * =================================================
// ! Выделение часов, минут и секунд из секунд
function getHMS(time) {
	let output = {
		'hours': 0,
		'minutes': 0,
		'seconds': 0
	}
	output['hours'] = Math.floor(time / 3600);
	output['minutes'] = Math.floor((time - (output['hours'] * 3600)) / 60);
	output['seconds'] = time - (output['hours'] * 3600) - (output['minutes'] * 60);
	return output;
}
// * ===========================================
// ! Осталось до конца семестра
function getRemain() {
	let remainTime = remainEnd - date.getTime();
	remainTime = Math.floor(remainTime / 1000);

	let remainDays = Math.floor(remainTime / 86400);
	let remainInSeconds = remainTime - (remainDays * 86400);
	let remainHMS = getHMS(remainInSeconds);

	let remainTimeString = getTimeString(remainHMS['hours'], remainHMS['minutes'], remainHMS['seconds']);
	let remain = `${remainDays} дней, ${remainTimeString}`

	$('.footer__time').text(`До сессии: ${remain}`)
}
// * ===========================================
// ! Выделение текущего дня недели
function hlToday() {
	$(`.day_${dayIndex}`).children('.day__name').addClass('active slide').next().css('display', 'grid');
}
// * ===========================================
// ! Получение номера недели
function getWeekIndex() {
	var weekPassTime = date.getTime() - semBegin;
	return (Math.floor(weekPassTime / weekCheck) + 1)
}
var weekIndex = getWeekIndex();
const nowWeekIndex = getWeekIndex();
console.log('Номер текущей недели:', weekIndex);
// * ===========================================
// ! Чётности недели
function setWeekParity() {
	if (weekIndex % 2 == 0) {
		$('.week__parity').removeClass('odd').addClass('even').text('Чётная неделя');
		$('.main').removeClass('odd').addClass('even');
		$('.nav__tab').removeClass('odd').addClass('even');


		$('.lesson_even').css('display', 'grid');
		$('.lesson_odd').each(function () {
			if ($(this).hasClass('lesson_even') == false) $(this).css('display', 'none');
		})
	} else {
		$('.week__parity').removeClass('even').addClass('odd').text('Нечётная неделя');
		$('.main').removeClass('even').addClass('odd');
		$('.nav__tab').removeClass('even').addClass('odd');

		$('.lesson_odd').css('display', 'grid');
		$('.lesson_even').each(function () {
			if ($(this).hasClass('lesson_odd') == false) $(this).css('display', 'none');
		})
	}
	weekIndex++;
}
// * ===========================================
// ! Количество пар сегодня
function getLessonAmount(group, day) {
	if (day == undefined) day = dayIndex;
	if (day == 0) day = 1;

	let groupTag = `#u${group}-target`;
	let today = $(groupTag).children(`.day_${day}`).children('.day__timetable').children('.lesson').last();
	let i = 5;
	while (today.hasClass(`lesson_${i}`) == false) i--;
	return i;
}
// * ===========================================
// ! ====== Расписание следующего дня ==========
let nextDayIndex = dayIndex + 1;
if (nextDayIndex > 6) nextDayIndex = 1;
console.log('Завтра:', dayName[nextDayIndex]);

function setNextDay(group, delay) {
	function getNextDay(group, delay) {
		let groupTag = `#u${group}-target`;
		if (dayIndex != 0) {
			if (timeInSeconds >= lessonTimeSeconds[lessonAmount]['end'] + delay) {
				$(groupTag).children(`.day_${nextDayIndex}`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
				$(groupTag).children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
			}
		} else {
			$(groupTag).children(`.day_1`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
			$(groupTag).children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
		}
	}
	let lessonAmount = getLessonAmount(group);
	console.log(`Количество пар У${group} сегодня:`, lessonAmount);
	getNextDay(group, delay);
}
// * ===========================================
// ! =========== Текущий перерыв ===============
function getCurrentBreakIndex() {
	for (var i = 1; i <= 3; i++)
		if (timeInSeconds >= breakTimeSeconds['big'][i]['begin'] && timeInSeconds < breakTimeSeconds['big'][i]['end'])
			var lessonBreakIndex = i;
	return lessonBreakIndex;
}
// * ===========================================
// ! =========== Текущая пара ==================
function getCurrentLessonIndex() {
	for (var i = 1; i <= 4; i++)
		if (timeInSeconds >= lessonTimeSeconds[i]['begin'] && timeInSeconds < lessonTimeSeconds[i]['end'])
			var lessonIndex = i;
	return lessonIndex;
}
function highlightCurrentLesson() {
	var lessonIndex = getCurrentLessonIndex();
	$(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').each(function () { $(this).removeClass('active') })
	$(`.day_${dayIndex}`).children('.day__timetable').children(`.lesson_${lessonIndex}`).each(function () { $(this).addClass('active') })
}


// * ===========================================
// ? Вывод на страницу
$(document).ready(function () {
	// ! Вывод текущей даты и времени
	function displayDate() {
		$('.week__date').html(`Сегодня: ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()} г.<br>(${dayName[dayIndex]}, ${nowWeekIndex}-ая неделя)`);
		var currentTime = getTimeString(date.getHours(), date.getMinutes(), date.getSeconds());
		$('.week__time').text(`Время: ${currentTime}`);
	}
	displayDate();
	setInterval(displayDate, 1000)

	// ! Вывод остатка до конца семестра
	getRemain();
	setInterval(getRemain, 1000)

	// ! Выделение текущего дня недели
	hlToday();

	// ! Вывод и смена чётности недели
	setWeekParity();
	$('.week__parity').click(setWeekParity);

	// ! Расписание следующего дня
	setNextDay(117, 300);
	setNextDay(217, 300);

	// ! Выделение текущей пары
	highlightCurrentLesson();
	setInterval(highlightCurrentLesson, 1000)
});
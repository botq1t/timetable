let monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'илюя', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let dayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];		//? Название дней недели

const remainEnd = 1640552400000;		//? Конец семестра в миллисекундах
const weekCheck = 604800000; 							//? Одна неделя в миллисекундах
const semBegin = 1630454400000; 			//? Начало семестра в миллисекундах
let nextDayLastLessonTime;
let currentLessonBegin, currentLessonEnd;
// * =================================================
// ! Получение текущей даты, дня недели и времени в секундах
var date, dayIndex, timeInSeconds;
function getDate() {
	date = new Date();
	dayIndex = date.getDay();
	timeInSeconds = (date.getHours() * 3600) + (date.getMinutes() * 60) + (date.getSeconds());
}
getDate();
setInterval(getDate, 1000);
console.log('Дата:', date);
console.log('Номер дня:', dayIndex);
console.log('Время в секундах:', timeInSeconds);
console.log();

// * =================================================
// ! Секунды в красивую строку
function getTimeString(h, m, s) {
	var h, m, s;
	var timeString = ''
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
	var time;
	var output = {
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
	var remainTime = remainEnd - date.getTime();
	remainTime = Math.floor(remainTime / 1000);

	var remainDays = Math.floor(remainTime / 86400);
	var remainInSeconds = remainTime - (remainDays * 86400);
	var remainHMS = getHMS(remainInSeconds);

	var remainTimeString = getTimeString(remainHMS['hours'], remainHMS['minutes'], remainHMS['seconds']);
	var remain = `${remainDays} дней, ${remainTimeString}`

	$('.footer__time').text(`До сессии осталось ${remain}`)
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
console.log('Номер текущей недели:', weekIndex);
// * ===========================================
// ! Чётности недели
function setWeekParity() {
	if (weekIndex % 2 == 0) {
		$('.week__even-odd').removeClass('odd').addClass('even').text('Чётная неделя');
		$('.main').removeClass('odd').addClass('even');
		$('.nav__tab').removeClass('odd').addClass('even');


		$('.lesson_even').css('display', 'grid');
		$('.lesson_odd').each(function () {
			if ($(this).hasClass('lesson_even') == false) $(this).css('display', 'none');
		})
	} else {
		$('.week__even-odd').removeClass('even').addClass('odd').text('Нечётная неделя');
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
	var day;
	if (day == undefined) day = dayIndex;
	if (day == 6 || day == 0)
		day = 1;

	var groupTag = `#u${group}-target`;
	var today = $(groupTag).children(`.day_${day}`).children('.day__timetable').children('.lesson').last();
	var i = 5;
	while (today.hasClass(`lesson_${i}`) == false) i--;
	return i;
}
// * ===========================================
// ! ====== Расписание следующего дня ==========
var nextDayIndex = dayIndex + 1;
if (nextDayIndex > 5) nextDayIndex = 1;
console.log('Завтра:', dayName[nextDayIndex]);
function setNextDay(group, delay) {
	function getNextDay(group, delay) {
		var groupTag = `#u${group}-target`;
		if (dayIndex != 6 && dayIndex != 0) {
			if (timeInSeconds >= lessonTimeSeconds[lessonAmount]['end'] + delay) {
				$(groupTag).children(`.day_${nextDayIndex}`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
				$(groupTag).children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
			}
		} else {
			$(groupTag).children(`.day_1`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
			$(groupTag).children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
		}
	}
	var lessonAmount = getLessonAmount(group);
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
function getCurrentLesson() {
	var lessonIndex = getCurrentLessonIndex();
	$(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').each(function () { $(this).removeClass('active') })
	$(`.day_${dayIndex}`).children('.day__timetable').children(`.lesson_${lessonIndex}`).each(function () { $(this).addClass('active') })
}


// * ===========================================
// ? Вывод на страницу
$(document).ready(function () {
	// ! Вывод текущей даты и времени
	function displayDate() {
		$('.week__date').text(`Сегодня: ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()} г. (${dayName[dayIndex]})`);
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
	$('.week__even-odd').click(setWeekParity);

	// ! Расписание следующего дня
	setNextDay(117, 300);
	setNextDay(217, 300);

	// ! Выделение текущей пары
	getCurrentLesson();
	setInterval(getCurrentLesson, 1000)
});
"use strict"
// ! ================== Settings =========================
let settings, defaultSettings = {
	colorScheme: 'light',
	colorSchemeDark: 'dark',
	colorSchemeDarkBegin: 20 * 3600,
	colorSchemeDarkEnd: 8 * 3600,
	defaultGroup: null,
	dynamicTitle: true,
	sounds: true,
};

if (localStorage['settings']) {
	localStorage['timetable_settings'] = localStorage['settings'];
	localStorage.removeItem('settings');
}

if (!localStorage['timetable_settings']) {
	localStorage['timetable_settings'] = JSON.stringify(defaultSettings);
}

settings = JSON.parse(localStorage['timetable_settings']);
console.log('Settings', settings);

// ! =================== Schedule creation ============================
import { createSchedule } from './modules/schedule.js';

console.log('Расписания', lessons);

createSchedule(117);
createSchedule(217);

$('.lesson__type').each(function () {
	switch ($(this).text()) {
		case 'ЛК':
			$(this).parent('.lesson').addClass('lesson_lection');
			break;
		case 'ПЗ':
			$(this).parent('.lesson').addClass('lesson_practice');
			break;
	}
});

//  ! ======================= Lessons Time =============================
import { lessonTime, lessonTimeSeconds, breakTime, breakTimeSeconds } from './modules/lessonTime.js';

console.log('Пары:', lessonTime);
console.log('Пары в секундах', lessonTimeSeconds);

console.log('Перерывы', breakTime);
console.log('Перерывы в секундах', breakTimeSeconds);

for (let i in lessonTime) {
	$(`.time_${i}`).each(function () {
		$(this).children('.time__start').text(lessonTime[i].begin);
		$(this).children('.time__end').text(lessonTime[i].end);
	});
}

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
export { date, dayIndex, timeInSeconds };
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
let weekIndex = getWeekIndex();
const nowWeekIndex = getWeekIndex();
export { nowWeekIndex };
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
}
// * ===========================================
// ! Количество пар сегодня
/*function getLessonAmount(group, day) {
	if (day == undefined) day = dayIndex;
	if (day == 0) day = 1;

	let groupTag = `#u${group}-target`;
	let today = $(groupTag).children(`.day_${day}`).children('.day__timetable').children('.lesson').last();
	let i = 5;
	while (today.hasClass(`lesson_${i}`) == false) i--;
	return i;
}*/

import { lessons } from './modules/schedule.js';

function getLessonAmount(group, day) {
	let weekIndex;
	if (day == undefined) day = dayIndex;
	if (day == 0) {
		day = 1;
		weekIndex = nowWeekIndex + 1;
	} else {
		weekIndex = nowWeekIndex;
	}

	if (weekIndex % 2 == 0) {
		weekIndex = 'even';
	} else {
		weekIndex = 'odd';
	}

	let i = 1;

	for (let key in lessons[group][day]) {
		if (lessons[group][day][key].parity == 'both' || lessons[group][day][key].parity == weekIndex) {
			i = lessons[group][day][key].index;
		}
	}

	return i;
}

console.log('lesson amount 117', getLessonAmount(117, 1));
console.log('lesson amount 217', getLessonAmount(217, 1));
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
		let currentTime = getTimeString(date.getHours(), date.getMinutes(), date.getSeconds());
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
	$('.week__parity').click(function () {
		weekIndex++;
		setWeekParity();
	});

	// ! Расписание следующего дня
	setNextDay(117, 300);
	setNextDay(217, 300);

	// ! Выделение текущей пары
	highlightCurrentLesson();
	setInterval(highlightCurrentLesson, 1000)
});
import { colorSchemeArray, setColorScheme } from './modules/colorSchemes.js';


if (settings.colorSchemeDarkBegin > settings.colorSchemeDarkEnd) {
	if (timeInSeconds >= settings.colorSchemeDarkBegin || timeInSeconds < settings.colorSchemeDarkEnd) {
		setColorScheme(settings['colorSchemeDark']);
	} else {
		setColorScheme(settings['colorScheme']);
	}
} else {
	if (timeInSeconds < settings.colorSchemeDarkEnd && timeInSeconds >= settings.colorSchemeDarkBegin) {
		setColorScheme(settings['colorSchemeDark']);
	} else {
		setColorScheme(settings['colorScheme']);
	}
}


let nowLesson = {
	117: { 'now': [], 'next': [] },
	217: { 'now': [], 'next': [] },
};
let nowDayIndex = null;



nowUpdate();
setInterval(nowUpdate, 1000);
nowUpdate();
setInterval(nowUpdate, 1000);

nowDisplayItems(117);
nowDisplayItems(217);
// setInterval(nowDisplayItemsUpdate, 1000, 117);
// setInterval(nowDisplayItemsUpdate, 1000, 217);

// ? Functions
function nowCreateArray(group) {
	nowLesson[group] = { 'now': [], 'next': [] };
	var i = 1;
	var j = 1;
	nowLesson[group]['now'].push(null);
	// ! Now
	while (lessons[group][dayIndex][i] != undefined) {
		switch (lessons[group][dayIndex][i]['parity']) {
			case 'both':
				nowLesson[group]['now'].push({ 'name': '', 'type': '', 'auditory': '', 'endTime': 0 });
				nowLesson[group]['now'][j]['name'] = lessons[group][dayIndex][i]['name'];
				nowLesson[group]['now'][j]['type'] = lessons[group][dayIndex][i]['type'];
				nowLesson[group]['now'][j]['auditory'] = lessons[group][dayIndex][i]['auditory'];
				nowLesson[group]['now'][j]['endTime'] = lessonTimeSeconds[j]['end'];
				j++;
				break;
			case 'odd':
				if (weekIndex % 2 != 0) {
					nowLesson[group]['now'].push({ 'name': '', 'type': '', 'auditory': '', 'endTime': 0 });
					nowLesson[group]['now'][j]['name'] = lessons[group][dayIndex][i]['name'];
					nowLesson[group]['now'][j]['type'] = lessons[group][dayIndex][i]['type'];
					nowLesson[group]['now'][j]['auditory'] = lessons[group][dayIndex][i]['auditory'];
					nowLesson[group]['now'][j]['endTime'] = lessonTimeSeconds[j]['end'];
					j++;
				}
				break;
			case 'even':
				if (weekIndex % 2 == 0) {
					nowLesson[group]['now'].push({ 'name': '', 'type': '', 'auditory': '', 'endTime': 0 });
					nowLesson[group]['now'][j]['name'] = lessons[group][dayIndex][i]['name'];
					nowLesson[group]['now'][j]['type'] = lessons[group][dayIndex][i]['type'];
					nowLesson[group]['now'][j]['auditory'] = lessons[group][dayIndex][i]['auditory'];
					nowLesson[group]['now'][j]['endTime'] = lessonTimeSeconds[j]['end'];
					j++;
				}
				break;
		}

		i++;
	}
	// ! Next

	for (let i = 0; i < (nowLesson[group]['now'].length - 1); i++) {
		nowLesson[group]['next'].push({ 'name': '', 'type': '', 'auditory': '', 'beginTime': 0 });
		j = i + 1;
		while (nowLesson[group]['now'][j]['name'] == 'no') {
			j++;
		}
		nowLesson[group]['next'][i]['name'] = nowLesson[group]['now'][j]['name'];
		nowLesson[group]['next'][i]['type'] = nowLesson[group]['now'][j]['type'];
		nowLesson[group]['next'][i]['auditory'] = nowLesson[group]['now'][j]['auditory'];
		nowLesson[group]['next'][i]['beginTime'] = lessonTimeSeconds[j]['begin'];


	}
}

function nowCreateLessons(group) {
	let groupTag = `#now-${group}`;

	// ? Текущие пары
	let temp = $(groupTag).children('.current');
	temp.empty();
	for (let i = 1; i < nowLesson[group]['now'].length; i++) {
		temp = $(groupTag).children('.current');
		temp.append(`<div class="now__lesson now__lesson_${i}"></div>`);
		temp = temp.children().last();
		temp.append(`
			<div class="now__auditory now__item">Сейчас (${nowLesson[group]['now'][i]['auditory']})</div>
			<div class="now__body now__item">
				<div class="now__name">${nowLesson[group]['now'][i]['name']}</div>
				<div class="now__type">${nowLesson[group]['now'][i]['type']}</div>
			</div>
			<div class="now__countdown now__item">End in MM minutes (lil break in MM)</div>
		`);

		if (nowLesson[group]['now'][i]['name'] == 'no')
			temp.remove()
	}

	// ? Следующие пары
	temp = $(groupTag).children('.next');
	temp.empty();
	for (let i = 0; i < nowLesson[group]['next'].length; i++) {
		temp = $(groupTag).children('.next');
		temp.append(`<div class="now__lesson now__lesson_${i}"></div>`);
		temp = temp.children().last();
		temp.append(`
			<div class="now__auditory now__item">Следующая (${nowLesson[group]['next'][i]['auditory']})</div>
			<div class="now__body now__item">
				<div class="now__name">${nowLesson[group]['next'][i]['name']}</div>
				<div class="now__type">${nowLesson[group]['next'][i]['type']}</div>
			</div>
			<div class="now__countdown now__item">Begin in MM minutes</div>
		`);
	}
}

function nowTimeUpdate(group) {
	let groupTag = `#now-${group}`;
	let nowIndex = getCurrentLessonIndex();
	// ? Now
	if (nowIndex && nowIndex <= getLessonAmount(group)) {
		// console.log('nowTimeUpdate');
		let temp = $(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).children('.now__countdown');
		let nowCurrentTimeRemain = nowLesson[group]['now'][nowIndex]['endTime'] - timeInSeconds;
		nowCurrentTimeRemain = getHMS(nowCurrentTimeRemain);
		nowCurrentTimeRemain = getTimeString(nowCurrentTimeRemain['hours'], nowCurrentTimeRemain['minutes'], nowCurrentTimeRemain['seconds']);
		temp.html(`До конца пары: ${nowCurrentTimeRemain}`);
	}

	// ? Next
	if (nowIndex === undefined)
		if (timeInSeconds < lessonTimeSeconds[1]['begin'])
			nowIndex = 0;
		else
			nowIndex = getCurrentBreakIndex();

	if (nowIndex != undefined && nowIndex < getLessonAmount(group)) {
		// console.log('nextTimeUpdate');
		let temp = $(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).children('.now__countdown');
		let nowCurrentTimeRemain = nowLesson[group]['next'][nowIndex]['beginTime'] - timeInSeconds;
		nowCurrentTimeRemain = getHMS(nowCurrentTimeRemain);
		nowCurrentTimeRemain = getTimeString(nowCurrentTimeRemain['hours'], nowCurrentTimeRemain['minutes'], nowCurrentTimeRemain['seconds']);
		temp.html(`До начала пары: ${nowCurrentTimeRemain}`);
	}

}

function nowUpdate() {
	if (nowDayIndex != dayIndex) {
		nowDayIndex = dayIndex;
		console.log('now update');
		nowCreateArray(117);
		nowCreateArray(217);
		nowCreateLessons(117)
		nowCreateLessons(217)
		console.log('Сегодняшние пары', nowLesson);

	}

	if (lessons[117][dayIndex]['lessons']) {
		nowTimeUpdate(117);
	}

	if (lessons[217][dayIndex]['lessons']) {
		nowTimeUpdate(217);
	}

	if (timeInSeconds >= 0 && timeInSeconds <= 3) {
		nowDisplayItemsUpdate(117);
		nowDisplayItemsUpdate(217);
	}

	for (let i = 1; i <= 4; i++) {
		if ((timeInSeconds >= lessonTimeSeconds[i]['begin'] - 2) && (timeInSeconds <= lessonTimeSeconds[i]['end'] + 2)) {
			nowDisplayItemsUpdate(117);
			nowDisplayItemsUpdate(217);
		}
	}

}

function nowDisplayItems(group) {
	let groupTag = `#now-${group}`;
	if (lessons[group][dayIndex]['lessons'] === false) {
		$(groupTag).children('.now__gone').addClass('active').css('display', 'flex').html(`<span class="icon-bokal"></span>Выходной!<span class="icon-bokal"></span>`);
	} else {
		if (timeInSeconds < lessonTimeSeconds[1]['begin']) {
			$(groupTag).children('.next').addClass('active').css('display', 'flex');
			$(groupTag).children('.next').children('.now__lesson_0').addClass('active').css('display', 'flex');
		} else if (timeInSeconds >= lessonTimeSeconds[getLessonAmount(group)]['end']) {

			$(groupTag).children('.now__gone').addClass('active').html(`<span class="icon-happy"></span>На сегодня пары закончились!<span class="icon-happy"></span>`).css('display', 'flex');
		} else {
			$(groupTag).children('.now__content').addClass('active').css('display', 'flex');

			// ? Now
			let nowIndex = getCurrentLessonIndex();
			if (nowIndex) {
				$(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).addClass('active').css('display', 'flex');
			}

			if (nowIndex == getLessonAmount(group))
				$(groupTag).children(`.current`).addClass('noNext');

			// ? Next
			if (nowIndex === undefined)
				nowIndex = getCurrentBreakIndex();
			if (nowIndex != undefined && nowIndex < getLessonAmount(group)) {
				$(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).addClass('active').css('display', 'flex');
			}
		}
	}
}

function nowDisplayItemsUpdate(group) {
	let groupTag = `#now-${group}`;
	if (lessons[group][dayIndex]['lessons'] === false) {
		if ($(groupTag).children('.now__content').hasClass('active'))
			$(groupTag).children('.now__content').removeClass('active').slideUp(300);

		if ($(groupTag).children('.now__gone').hasClass('active') === false)
			$(groupTag).children('.now__gone').addClass('active').slideDown(300, function () {
				$(this).css('display', 'flex');
			})

		$(groupTag).children('.now__gone').html(`<span class="icon-bokal"></span>Выходной!<span class="icon-bokal"></span>`)

	} else {
		if (timeInSeconds < lessonTimeSeconds[1]['begin']) {
			if ($(groupTag).children('.now__gone').hasClass('active'))
				$(groupTag).children('.now__gone').removeClass('active').slideUp(300);

			if ($(groupTag).children('.current').hasClass('active'))
				$(groupTag).children('.current').removeClass('active').slideUp(300);

			if ($(groupTag).children('.next').hasClass('active') === false)
				$(groupTag).children('.next').addClass('active').delay(300).slideDown(300, function () {
					$(this).css('display', 'flex');
				})

			$(groupTag).children('.next').children().not('.now__lesson_0').each(function () {
				if ($(this).hasClass('active'))
					$(this).removeClass('active').slideUp(300);
			});

			if ($(groupTag).children('.next').children('.now__lesson_0').hasClass('active') === false)
				$(groupTag).children('.next').children('.now__lesson_0').addClass('active').slideDown(300, function () {
					$(this).css('display', 'flex');
				})
		} else if (timeInSeconds >= lessonTimeSeconds[getLessonAmount(group)]['end']) {
			if ($(groupTag).children('.now__content').hasClass('active'))
				$(groupTag).children('.now__content').removeClass('active').slideUp(300);

			if ($(groupTag).children('.now__gone').hasClass('active') === false)
				$(groupTag).children('.now__gone').addClass('active').html(`<span class="icon-happy"></span>На сегодня пары закончились!<span class="icon-happy"></span>`).slideDown(300, function () {
					$(this).css('display', 'flex');
				})
		} else {
			if ($(groupTag).children('.now__content').hasClass('active') === false)
				$(groupTag).children('.now__content').addClass('active').slideDown(300, function () {
					$(this).css('display', 'flex');
				});

			if ($(groupTag).children('.now__gone').hasClass('active'))
				$(groupTag).children('.now__gone').removeClass('active').slideUp(300);

			// ? Now
			let nowIndex = getCurrentLessonIndex();
			if (nowIndex) {
				$(groupTag).children('.current').children().not(`.now__lesson_${nowIndex}`).each(function () {
					if ($(this).hasClass('active'))
						$(this).removeClass('active').slideUp(300);
				});

				if ($(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).hasClass('active') === false)
					$(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).addClass('active').slideDown(300, function () {
						$(this).css('display', 'flex');
					})
			} else {
				if ($(groupTag).children('.current').children('.now__lesson').hasClass('active'))
					$(groupTag).children('.current').children('.now__lesson').removeClass('active').slideUp(300);
			}

			if (nowIndex == getLessonAmount(group))
				if ($(groupTag).children(`.current`).hasClass('noNext') === false)
					$(groupTag).children(`.current`).addClass('noNext');

			// ? Next
			if (nowIndex === undefined)
				nowIndex = getCurrentBreakIndex();
			if (nowIndex != undefined && nowIndex < getLessonAmount(group)) {
				$(groupTag).children('.next').children().not(`.now__lesson_${nowIndex}`).each(function () {
					if ($(this).hasClass('active'))
						$(this).removeClass('active').slideUp(300);
				});

				if ($(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).hasClass('active') === false)
					$(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).addClass('active').slideDown(300, function () {
						$(this).css('display', 'flex');
					});
			} else {
				if ($(groupTag).children('.next').children('.now__lesson').hasClass('active'))
					$(groupTag).children('.next').children('.now__lesson').removeClass('active').slideUp(300);
			}
		}

	}
}

// ! ================ Переключение вкладок ============================
import { getFirstLesson } from './modules/lessonBreak.js';

if (settings.defaultGroup) {
	if (dayIndex == 0 ||
		timeInSeconds < lessonTimeSeconds[getFirstLesson(settings.defaultGroup)].begin ||
		timeInSeconds >= lessonTimeSeconds[getLessonAmount(settings.defaultGroup)].end) {
		$('#now').removeClass('active');
		$('#now-target').css('display', 'none');

		$(`#u${settings.defaultGroup}`).addClass('active');
		$(`#u${settings.defaultGroup}-target`).css('display', 'flex');
	}
}

$('.nav__tab').each(function () {
	if ($(this).hasClass('active')) {
		let tabIndex = $(this).attr('id');
		$(`#${tabIndex}-target`).css('display', 'flex');
	}
});

$('.nav__tab').click(function () {
	if (!$(this).hasClass('active')) {
		let tabIndex = $(this).attr('id');
		$('.nav__tab').removeClass('active');
		$(this).addClass('active');
		$('.main__tab').fadeOut(150);
		$(`#${tabIndex}-target`).delay(160).fadeIn(150, function () {
			$(this).css('display', 'flex');
		});
	}
});

// ! ================ Раскрытие списка дня ============================
$('.day__name').click(function () {
	if ($(this).hasClass('slide')) {
		$(this).next().slideUp(300)
	} else {
		$(this).next().slideDown(300, function () {
			$(this).css('display', 'grid')
		})
	}
	$(this).toggleClass('slide');
})

// console.log('++++++++++++++++++++++++++++++++++++++++++');
if (!settings.defaultGroup) {
	setTimeout(checkPrefsGroup, 2000);
}
$('.prefs__block').each(function () {
	let id = $(this).attr('id');
	id = id.split('_')[1];
	// console.log(id);
	if (!$(this).hasClass('time')) {
		$(this).children('.prefs__options').children().each(function () {
			let checker = $(this).attr('id');
			checker = checker.split('_')[2];
			if (checker == String(settings[id])) {
				$(this).addClass('active');
			}
		});
	} else {
		let timeString = getPrefsTime(id);
		// console.log(id, timeString);
		$(this).children('.prefs__options').children().children().val(timeString);

	}



});

$('.prefs__tab').click(function () {
	$('.prefs__tab').removeClass('active');
	$('.prefs__card').removeClass('active');

	$(this).addClass('active');
	let id = $(this).attr('id');
	id = id.split('_')[2];
	// console.log(id);
	$(`#prefs_target_${id}`).addClass('active');
});

$('.prefs__options').children('il').click(function () {
	$(this).parent().children().removeClass('active');
	$(this).addClass('active');
});

$('.prefs__close').click(function () {
	$('#prefs-target').removeClass('active');
	$('body').removeClass('lock');
});

$('#prefs').click(function () {
	$('#prefs-target').addClass('active');
	$('body').addClass('lock');
});

$('.prefs__submit').click(function () {
	$('.prefs__options').each(function () {

		if (!$(this).children('il').hasClass('time')) {
			$(this).children().each(function () {
				let id = $(this).attr('id');
				let name = id.split('_')[1];
				id = id.split('_')[2];

				if ($(this).hasClass('active')) {
					if (!isNaN(Number(id))) {
						settings[name] = +id;
					} else if (id == 'true') {
						settings[name] = true;
					} else if (id == 'false') {
						settings[name] = false;
					} else {
						settings[name] = id;
					}
				}
			});
		} else {
			let time = $(this).children().children().val();
			let id = $(this).children().children().attr('name');
			let timeSeconds = (+time.split(':')[0] * 3600) + (+time.split(':')[1] * 60);
			settings[id] = timeSeconds;
			// // console.log(id, time, timeSeconds);
		}

	});
	localStorage['timetable_settings'] = JSON.stringify(settings);
	// console.log(settings);
	document.location.reload();
});

function getPrefsTime(id) {
	let timeString = '';
	let time = Math.floor(settings[id] / 3600);
	if (time < 10) {
		timeString = timeString + '0';
	}
	timeString = timeString + time;
	timeString = timeString + ':';

	time = (settings[id] - time * 3600) / 60;
	if (time < 10) {
		timeString = timeString + '0';
	}
	timeString = timeString + time;
	return timeString;
}

function checkPrefsGroup() {
	$('#prefs-target').addClass('active');
	$('body').addClass('lock');

	$('.prefs__tab').removeClass('active');
	$('.prefs__card').removeClass('active');

	$('#prefs_tab_other').addClass('active');
	$('#prefs_target_other').addClass('active');

	alert('Выберите свою группу плез)');
}

// console.log('++++++++++++++++++++++++++++++++++++++++++');

import { fullLessonName, fullTeacherName } from './modules/lessonTeacherName.js';

$('.lesson__name').click(fullLessonName);
$('.now__name').click(fullLessonName);

$('.lesson__teacher').click(fullTeacherName);




let titleChangerArray = [
	'Хочу передать привет Сивцу P.S. Сашка Бурбик',
	'Коренислав, где Бурбислав?',
	'Нэ атмечай у мения жёпа болыт',
	'Разбрёмсь',
	'Жирнолею привет завтра передавайте',
	'Пары в субботу? Почему настолько кайф?',
	'Папаня орёт!',
	'Значиць генератор генератор генерирует генерирует',
	'Дополнительная литература дополняет',
	'Шарага на любителя, но тем самым любителям она понравится',
	'Продам гараж',
	'ПэПэПэ ПэВэПэ',
	'Сайт проспонсирован Старановичем',
	'Здороваться, значиць, не будем',
	'У Лукоморья дуб зелёный...',
	'Напрягают алкоголики',
	'Замечательное место',
	'Ты что игнорируешь? Занятия никто не отменял',
	'Та ти, ти ти та ти. Или просто ти ти та',
	'Пугачёва умерла',
	'Ты меня презираешь',
]
let birthFlag = false;
/*
let titleChangerHappyBirthday = {
	'date': ['24.9', '14.10', '3.0'],
	'name': ['Грузик', 'Корнеслав', 'Медвежонок'],
}


function titleBirthCheker() {
	var titleDate = `${date.getDate().toString()}.${date.getMonth().toString()}`;
	console.log('title string', titleDate);

	if (titleChangerHappyBirthday['date'].includes(titleDate)) {
		var titleIndex = titleChangerHappyBirthday['date'].indexOf(titleDate);
		birthFlag = true;
	}

	if (birthFlag) {
		clearInterval(titleChanger);
		$('.header__title').html(`<span class="icon-cake"></span><p>С Днём Рождения, ${titleChangerHappyBirthday['name'][titleIndex]}!</p><span class="icon-cake"></span>`);
	} else {
		setInterval(titleChanger, 5000);
	}
}

*/

let titleChangerHappyBirthday = {
	'3.0': 'Медвежонок',
	'10.0': 'Таня',
	'10.2': 'Артурчик Крутилкин',
	'20.2': 'Иветта',
	'18.4': 'Юля Танцовщица',
	'25.6': 'Даша Квак',
	'2.6': 'Юля',
	'18.7': 'Саша фром Финлядния',
	'13.8': 'Настя Куш',
	'25.8': 'Маша',
	'24.9': 'Грузик',
	'2.10': 'Ягрон',
	'14.10': 'Корнеславик',
}


function titleBirthCheker() {
	let titleDate = `${date.getDate().toString()}.${date.getMonth().toString()}`;
	console.log('title string', titleDate);

	if (titleDate in titleChangerHappyBirthday) {
		birthFlag = true;
	}

	if (birthFlag) {
		clearInterval(titleChanger);
		$('.header__title').html(`<span class="icon-cake"></span><p>С Днём Рождения, ${titleChangerHappyBirthday[titleDate]}!</p><span class="icon-cake"></span>`);
	} else if (settings['dynamicTitle']) {
		setInterval(titleChanger, 5000);
	}
}

titleBirthCheker();
setInterval(titleBirthCheker, 10000);


function titleChanger() {
	$('.header__title').fadeOut(400, function () {
		$(this).fadeIn(400).children('p').html(titleChangerArray[Math.floor(Math.random() * titleChangerArray.length)]);
	})
}
let soundsObject = {
	'Пилипчук': [
		new Audio('audio/victor/pepuk-1.mp3'),
		new Audio('audio/victor/pepuk-2.mp3'),
		new Audio('audio/victor/cunt.mp3'),
		new Audio('audio/victor/chert.mp3'),
		new Audio('audio/victor/rat.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'Барабан': [
		new Audio('audio/victor/baraban-1.mp3'),
		new Audio('audio/victor/rat.mp3'),
	],
	'Вишневский': [
		new Audio('audio/victor/heroes.mp3'),
		new Audio('audio/victor/maslyak.mp3'),
		new Audio('audio/victor/respect.mp3'),
	],
	'Лазовский': [
		new Audio('audio/victor/heroes.mp3'),
		new Audio('audio/victor/maslyak.mp3'),
		new Audio('audio/victor/respect.mp3'),
	],
	'Александров': [
		new Audio('audio/victor/maslyak.mp3'),
	],
	'Науменко': [
		new Audio('audio/victor/cunt.mp3'),
		new Audio('audio/victor/chert.mp3'),
		new Audio('audio/victor/zavtra.mp3'),
		new Audio('audio/victor/rat.mp3'),
		new Audio('audio/victor/want-to-die-1.mp3'),
		new Audio('audio/victor/want-to-die-2.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'Дубовский': [
		new Audio('audio/victor/chert.mp3'),
		new Audio('audio/victor/rat.mp3'),
		new Audio('audio/victor/blevon.mp3'),
		new Audio('audio/victor/dubec.mp3'),
	],
	'Худолей': [
		new Audio('audio/victor/blevon.mp3'),
	],

	'Суббота': [
		new Audio('audio/victor/saturdays.mp3'),
		new Audio('audio/victor/saturday-salt.mp3'),
		new Audio('audio/victor/godno.mp3'),
		new Audio('audio/victor/want-to-die-1.mp3'),
		new Audio('audio/victor/want-to-die-2.mp3'),
		new Audio('audio/victor/roger.mp3'),
		new Audio('audio/victor/hate.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'08': [
		new Audio('audio/victor/too-early.mp3'),
		new Audio('audio/victor/why-first.mp3'),
		new Audio('audio/victor/want-to-die-1.mp3'),
		new Audio('audio/victor/want-to-die-2.mp3'),
		new Audio('audio/victor/hate.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'Можно спать': [
		new Audio('audio/victor/cool.mp3'),
	],
	'Форточка': [
		new Audio('audio/victor/naggets.mp3'),
		new Audio('audio/victor/godno.mp3'),
		new Audio('audio/victor/smthng-wrong.mp3'),
		new Audio('audio/victor/roger.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'На сегодня пары закончились!': [
		new Audio('audio/victor/naggets.mp3'),
	],

	'У117': [
		new Audio('audio/victor/crazy-koren.mp3'),
		new Audio('audio/victor/koren-dontmark.mp3'),
		new Audio('audio/victor/koren-change-surname.mp3'),
		new Audio('audio/victor/koreniuuuk.mp3'),
		new Audio('audio/victor/koren-dont-mark.mp3'),
		new Audio('audio/victor/koren-dont-mark-2.mp3'),
		new Audio('audio/victor/dont-mark.mp3'),
		new Audio('audio/victor/allo.mp3'),
	],
	'У217': [
		new Audio('audio/victor/dauni-217.mp3'),
	],

	'Сейчас': [
		new Audio('audio/victor/kliga.mp3'),
		new Audio('audio/victor/spravka.mp3'),
		new Audio('audio/victor/belching-1.mp3'),
		new Audio('audio/victor/dying-laught.mp3'),
		new Audio('audio/victor/laught.mp3'),
		new Audio('audio/victor/narkoman.mp3'),
		new Audio('audio/victor/naggets.mp3'),
		new Audio('audio/victor/fuck-you.mp3'),
		new Audio('audio/victor/fuck-you-2.mp3'),
		new Audio('audio/victor/fuck-you-3.mp3'),
		new Audio('audio/victor/fuck-you-4.mp3'),
		new Audio('audio/victor/ne-doljen.mp3'),
		new Audio('audio/victor/content.mp3'),
		new Audio('audio/victor/pomoika.mp3'),
		new Audio('audio/victor/turbo-pushka.mp3'),
		new Audio('audio/victor/yes-me.mp3'),
		new Audio('audio/victor/blr-topchik.mp3'),
		new Audio('audio/victor/fart.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],

	'parity': [
		new Audio('audio/victor/huinya.mp3'),
	],

	'auditory': [
		new Audio('audio/victor/pomoika.mp3'),
		new Audio('audio/victor/roger.mp3'),
	],
}

$('.lesson__teacher').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.lesson__name').click(function () {
	let name = $(this).next().next().next().text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.lesson__time').click(function () {
	let name = $(this).text();
	name = name.split(':')[0];
	name = name.slice(-2);
	if (name in soundsObject) playSound(name);
});

$('.lesson__auditory').click(function () {
	if (!settings['sounds']) return;
	playSound('auditory');
});

$('.lesson_out').click(function () {
	let name = $(this).text();
	if (name in soundsObject) playSound(name);
});

$('.nav__tab').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.day__name').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.now__title').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.now__gone').click(function () {
	let name = $(this).text();
	if (name in soundsObject) playSound(name);
});

$('.week__parity').click(function () {
	if (!settings['sounds']) return;
	playSound('parity');
});

$('.header__title').click(function () {
	if (!settings['sounds']) return;
	playSound('Сейчас');
});

function playSound(key) {
	if (!settings['sounds']) return;
	let random = Math.floor(Math.random() * (soundsObject[key].length));
	// console.log(random);
	for (let keyStop in soundsObject) {
		for (let i = 0; i < soundsObject[keyStop].length; i++) {
			soundsObject[keyStop][i].pause();
			soundsObject[keyStop][i].currentTime = 0;
		}
	}

	soundsObject[key][random].play();
}
"use strict"
// ! =====================================================
// ! ================== Settings =========================
// ! =====================================================
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
export { settings };
// ! =====================================================
// ! ====================== Date =========================
// ! =====================================================
import { dayName, getDate } from './modules/date.js';

// ? Получение текущей даты, дня недели и времени в секундах
let date = getDate().date;
let dayIndex = getDate().dayIndex;
let timeInSeconds = getDate().timeInSeconds;

console.log('====================== date ========================');
console.log('Дата:', date);
console.log('Номер дня:', dayIndex);
console.log('Время в секундах:', timeInSeconds);
console.log('====================== date end ========================');

setInterval(function () {
	date = getDate().date;
	dayIndex = getDate().dayIndex;
	timeInSeconds = getDate().timeInSeconds;
}, 1000);


export { date, dayIndex, timeInSeconds };

// ? ============= Получение номера недели ====================
import { getWeekIndex } from './modules/date.js';

let weekIndex = getWeekIndex(date);
const nowWeekIndex = getWeekIndex(date);
export { nowWeekIndex };
console.log('Номер текущей недели:', weekIndex);
// ? ===================== Количество пар сегодня ================
import { getLessonAmount } from './modules/lessonBreak.js';

// ? ==================== Расписание следующего дня ==============
let nextDayIndex = dayIndex + 1;
if (nextDayIndex > 6) nextDayIndex = 1;
console.log('Завтра:', dayName[nextDayIndex]);


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
import { getRemain } from './modules/date.js';
import { hlToday } from './modules/date.js';
import { setWeekParity } from './modules/date.js';
import { getNextDay } from './modules/date.js';
import { displayDate } from './modules/date.js';

$(document).ready(function () {
	// ! Вывод текущей даты и времени
	displayDate(date, dayIndex, nowWeekIndex);
	setInterval(function () {
		displayDate(date, dayIndex, nowWeekIndex);
	}, 1000);

	// ! Вывод остатка до конца семестра
	getRemain(date);
	setInterval(function () {
		getRemain(date);
	}, 1000);

	// ! Выделение текущего дня недели
	hlToday(dayIndex);

	// ! Вывод и смена чётности недели
	setWeekParity(weekIndex);
	$('.week__parity').click(function () {
		weekIndex++;
		setWeekParity(weekIndex);
	});

	// ! Расписание следующего дня
	getNextDay(117, 300, dayIndex, timeInSeconds, getLessonAmount(117), nextDayIndex);
	getNextDay(217, 300, dayIndex, timeInSeconds, getLessonAmount(217), nextDayIndex);

	// ! Выделение текущей пары
	highlightCurrentLesson();
	setInterval(highlightCurrentLesson, 1000)
});
// ! =================== Schedule creation ============================
import { createSchedule, lessons } from './modules/schedule.js';
import { setLessonType } from './modules/lessonBreak.js';
console.log('Расписания', lessons);

createSchedule(117);
createSchedule(217);

setLessonType('.lesson__type');

// ! =====================================================
// ! ======================= Lessons Time ================
// ! =====================================================
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

// @prepros-append "darkMode.js"
// @prepros-append "index/now.js"
// @prepros-append "index/tabs.js"
// @prepros-append "index/prefs.js"
// ! =====================================================
// ! ===================== Full Lesson Name ==============
// ! =====================================================
import { fullLessonName, fullTeacherName } from './modules/lessonTeacherName.js';

$('.lesson__name').click(fullLessonName);
$('.now__name').click(fullLessonName);

$('.lesson__teacher').click(fullTeacherName);
// ! =====================================================
// ! ===================== Title Changer =================
// ! =====================================================
import { titleBirthCheker } from './modules/titleChanger.js';

titleBirthCheker(date, settings['dynamicTitle']);
// @prepros-append "index/sounds.js"
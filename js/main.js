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



// * ===========================================
// ? Вывод на страницу
import { getRemain } from './modules/date.js';
import { hlToday } from './modules/date.js';
import { setWeekParity } from './modules/date.js';
import { getNextDay } from './modules/date.js';
import { displayDate } from './modules/date.js';
import { highlightCurrentLesson } from './modules/lessonBreak.js';

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
	highlightCurrentLesson(dayIndex);
	setInterval(function () {
		highlightCurrentLesson(dayIndex);
	}, 1000);
});
// ! =====================================================
// ! =================== Schedule creation ===============
// ! =====================================================
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


import { getCurrentBreakIndex } from './modules/lessonBreak.js';
import { getHMS, getTimeString } from './modules/date.js';

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

import { soundsObject, playSound } from './modules/sounds.js';

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


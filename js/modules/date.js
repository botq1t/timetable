const constants = {
	monthName: [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'илюя',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	],

	dayName: [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
	],

	remainEnd: 1640552400000,				//? Конец семестра в миллисекундах
	weekCheck: 604800000, 					//? Одна неделя в миллисекундах
	semBegin: 1630270800000, 				//? Начало семестра в миллисекундах
};

export const monthName = constants.monthName;
export const dayName = constants.dayName;
export const remainEnd = constants.remainEnd;
export const weekCheck = constants.weekCheck;
export const semBegin = constants.semBegin;
// ! =============================================================
import { lessonTimeSeconds } from "./lessonTime.js";

const functions = {
	getDate: function () {
		let output = {};
		output.date = new Date();
		output.dayIndex = output.date.getDay();
		output.timeInSeconds = (output.date.getHours() * 3600) + (output.date.getMinutes() * 60) + (output.date.getSeconds());
		return output;
	},

	getTimeString: function (h, m, s) {
		let timeString = ''
		if (h < 10) { timeString = timeString + '0' }
		timeString = timeString + h + ':';
		if (m < 10) { timeString = timeString + '0' }
		timeString = timeString + m + ':';
		if (s < 10) { timeString = timeString + '0' }
		timeString = timeString + s;
		return timeString;
	},

	getHMS: function (time) {
		let output = {
			'hours': 0,
			'minutes': 0,
			'seconds': 0
		}
		output['hours'] = Math.floor(time / 3600);
		output['minutes'] = Math.floor((time - (output['hours'] * 3600)) / 60);
		output['seconds'] = time - (output['hours'] * 3600) - (output['minutes'] * 60);
		return output;
	},

	getRemain: function (date) {
		let remainTime = remainEnd - date.getTime();
		remainTime = Math.floor(remainTime / 1000);

		let remainDays = Math.floor(remainTime / 86400);
		let remainInSeconds = remainTime - (remainDays * 86400);
		let remainHMS = getHMS(remainInSeconds);

		let remainTimeString = getTimeString(remainHMS['hours'], remainHMS['minutes'], remainHMS['seconds']);
		let remain = `${remainDays} дней, ${remainTimeString}`

		$('.footer__time').text(`До сессии: ${remain}`)
	},

	hlToday: function (dayIndex) {
		$(`.day_${dayIndex}`).children('.day__name').addClass('active slide').next().css('display', 'grid');
	},

	getWeekIndex: function (date) {
		let weekPassTime = date.getTime() - semBegin;
		return (Math.floor(weekPassTime / weekCheck) + 1)
	},

	setWeekParity: function (weekIndex) {
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
	},

	getNextDay: function (group, delay, dayIndex, timeInSeconds, lessonAmount, nextDayIndex) {
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
	},

	displayDate: function (date, dayIndex, nowWeekIndex) {
		$('.week__date').html(`Сегодня: ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()} г.<br>(${dayName[dayIndex]}, ${nowWeekIndex}-ая неделя)`);
		let currentTime = getTimeString(date.getHours(), date.getMinutes(), date.getSeconds());
		$('.week__time').text(`Время: ${currentTime}`);
	},
}

export const getDate = functions.getDate;
export const getTimeString = functions.getTimeString;
export const getHMS = functions.getHMS;
export const getRemain = functions.getRemain;
export const hlToday = functions.hlToday;
export const getWeekIndex = functions.getWeekIndex;
export const getNextDay = functions.getNextDay;
export const setWeekParity = functions.setWeekParity;
export const displayDate = functions.displayDate;
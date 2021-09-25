import { dayIndex, nowWeekIndex, timeInSeconds } from '../main.js';
import { lessons } from './schedule.js';
import { breakTimeSeconds, lessonTimeSeconds } from './lessonTime.js';

const lessonsFunctions = {
	getFirstLesson: function (group, day) {
		if (!day) day = dayIndex;
		if (day == 0) day = 1;

		let week;
		if (nowWeekIndex % 2 == 0) {
			week = 'even';
		} else {
			week = 'odd';
		}
		let i = 0;
		for (let key in lessons[group][day])
			if (lessons[group][day][key].parity == 'both' || lessons[group][day][key].parity == week)
				if (lessons[group][day][key].name != 'no') {
					i = lessons[group][day][key].index;
					return i;
				}
	},

	setLessonType: function (item) {
		$(item).each(function () {
			switch ($(this).text()) {
				case 'ЛК':
					$(this).parent('.lesson').addClass('lesson_lection');
					break;
				case 'ПЗ':
					$(this).parent('.lesson').addClass('lesson_practice');
					break;
			}
		});

	},

	getLessonAmount: function (group, day) {
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
	},

	getCurrentLessonIndex: function () {
		let lessonIndex;
		for (let i = 1; i <= 4; i++)
			if (timeInSeconds >= lessonTimeSeconds[i]['begin'] && timeInSeconds < lessonTimeSeconds[i]['end'])
				lessonIndex = i;
		return lessonIndex;
	},
};

export const getFirstLesson = lessonsFunctions.getFirstLesson;
export const setLessonType = lessonsFunctions.setLessonType;
export const getLessonAmount = lessonsFunctions.getLessonAmount;
export const getCurrentLessonIndex = lessonsFunctions.getLessonAmount;

const breaksFunctions = {
	getCurrentBreakIndex: function () {
		for (var i = 1; i <= 3; i++)
			if (timeInSeconds >= breakTimeSeconds['big'][i]['begin'] && timeInSeconds < breakTimeSeconds['big'][i]['end'])
				var lessonBreakIndex = i;
		return lessonBreakIndex;
	},
};

export const getCurrentBreakIndex = breaksFunctions.getCurrentBreakIndex;

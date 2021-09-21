import { dayIndex, nowWeekIndex } from '../main.js';
import { lessons } from './schedule.js';

const functions = {
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
	}
}

export const getFirstLesson = functions.getFirstLesson;
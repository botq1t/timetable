'use strict'
import { lessonName } from './modules/lessonTeacherName.js';
import { lessons } from './modules/schedule.js';
import { initHours, fillHoursByParity } from './modules/hours/createHelpers.js';
// console.log(lessons);

let hours = {
	117: initHours(lessonName),
	217: initHours(lessonName),
};
console.log('hours', hours);

let hoursByParityPassed = {
	117: {},
	217: {},
};

Object.assign(hoursByParityPassed[117], fillHoursByParity(117, lessons, hours));
Object.assign(hoursByParityPassed[217], fillHoursByParity(217, lessons, hours));
console.log('hours by parity (passed)', hoursByParityPassed);

import { getDate, getWeekIndex } from './modules/date.js';

const weekIndex = getWeekIndex(getDate().date);
const passedWeeks = weekIndex - 1;
const dayIndex = getDate().dayIndex;

let passedWeeksByParity = {
	even: Math.ceil(passedWeeks / 2),
	odd: Math.ceil(passedWeeks / 2) - (passedWeeks % 2),
};

const fillPassedWeekHours = function (group, week, lessonName, hours) {
	let output = initHours(lessonName);
	// console.log(output);
	if (typeof week == 'object') {
		for (let parity in week) {
			for (let i = 1; i <= week[parity]; i++) {
				for (let lesson in hours[group][parity]) {
					output[lesson].lection = output[lesson].lection + hours[group][parity][lesson].lection;
					output[lesson].practice = output[lesson].practice + hours[group][parity][lesson].practice;
				}
			}
		}
	} else {
		for (let lesson in hours[group][week]) {
			output[lesson].lection = output[lesson].lection + hours[group][week][lesson].lection;
			output[lesson].practice = output[lesson].practice + hours[group][week][lesson].practice;
		}
	}
	return output;
}

Object.assign(hours[117], fillPassedWeekHours(117, passedWeeksByParity, lessonName, hoursByParityPassed));
Object.assign(hours[217], fillPassedWeekHours(217, passedWeeksByParity, lessonName, hoursByParityPassed));

let hoursThisWeek = {
	117: initHours(lessonName),
	217: initHours(lessonName),
}

let weekParity;
switch (weekIndex % 2) {
	case 1:
		weekParity = 'odd';
		break;
	case 0:
		weekParity = 'even';
		break;
}

/*let hoursByParityNow = {
	117: {},
	217: {},
};

Object.assign(hoursByParityNow[117], fillHoursByParity(117, lessons, hours));
Object.assign(hoursByParityNow[217], fillHoursByParity(217, lessons, hours));*/

Object.assign(hoursThisWeek[117], fillPassedWeekHours(117, weekParity, lessonName,));

console.log(dayIndex, weekIndex, passedWeeks, weekParity);
console.log(passedWeeksByParity);
'use strict'
import { fillHours } from './modules/hours/createHelpers.js';
import { getDate, getWeekIndex } from './modules/date.js';
import { corrections } from './modules/hours/corrections.js';

let dayIndex = getDate().dayIndex;
if (dayIndex != 0) dayIndex--;
if (dayIndex == 0) dayIndex = 6;
const weekIndex = getWeekIndex(getDate().date);

let hours = {
	117: fillHours(117, dayIndex, weekIndex),
	217: fillHours(217, dayIndex, weekIndex),
};

// console.log(corrections);
for (let group in hours) {
	for (let lesson in hours[group]) {
		hours[group][lesson].lection = hours[group][lesson].lection + corrections[group][lesson].lection;
		hours[group][lesson].practice = hours[group][lesson].practice + corrections[group][lesson].practice;
	}
}

console.log(`Неделя №${weekIndex}, День №${dayIndex}`);
console.log(hours);
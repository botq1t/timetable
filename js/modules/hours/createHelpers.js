import { lessons } from './../schedule.js';
import { lessonName } from './../lessonTeacherName.js';

const functions = {
	initHours: function (whereFrom) {
		let output = {};
		for (let lesson in whereFrom) {
			output[lesson] = {};
			output[lesson].lection = 0;
			output[lesson].practice = 0;
		}
		return output;
	},

	fillHours: function (group, dayIndex, weekIndex) {
		let output = functions.initHours(lessonName);
		// console.log(output);
		for (let i = 1; i <= weekIndex; i++) {
			let weekParity = functions.getWeekParity(i);

			if (i < weekIndex) {
				// console.log(weekParity);
				for (let j = 1; j <= 6; j++) {
					functions.addHours(i, j, lessons, group, weekParity, output);
				}
			} else {
				// console.log(weekParity);
				for (let j = 1; j <= dayIndex; j++) {
					functions.addHours(i, j, lessons, group, weekParity, output);
				}
			}
		}
		return output;
	},

	getWeekParity: function (i) {
		switch (i % 2) {
			case 1:
				return 'odd';
			case 0:
				return 'even';
		}
	},

	addHours: function (i, j, lessons, group, weekParity, output) {
		// console.log(`Неделя ${i}, день ${j}, ${weekParity}`);
		let currentSchedule = lessons[group][j];

		for (let lessonIndex in currentSchedule) {
			if (typeof currentSchedule[lessonIndex] == 'boolean') continue;

			let currentLesson = currentSchedule[lessonIndex];
			let name = currentLesson.name;
			let parity = currentLesson.parity;
			let type = functions.getLessonType(currentLesson.type);
			if (name == 'no') continue;
			// console.log(parity, name, type);
			// console.log(`Parity: ${parity}, Name: ${name}, Type: ${type}`);

			switch (parity) {
				case 'both':
					output[name][type]++;
					break;
				default:
					if (parity == weekParity) {
						output[name][type]++;
					}
					break;
			}
		}
	},

	getLessonType: function (type) {
		switch (type) {
			case 'ЛК':
				return 'lection';
			case 'ПЗ':
				return 'practice';
		}
	},

	fillPassedHours: function (group, hours) {
		$(`#target_tab_${group}`).find('.card__body').children('.item').each(function () {
			let lesson = $(this).find('.item__title').text();
			let passed = $(this).find('.item__column_passed');

			passed.find('.item__hours_lection').text(`${hours[group][lesson].lection} лк`);
			passed.find('.item__hours_practice').text(`${hours[group][lesson].practice} пз`);
		});
	}
}

export const initHours = functions.initHours;
export const fillHours = functions.fillHours;
export const fillPassedHours = functions.fillPassedHours;
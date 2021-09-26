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




	initHoursByParity: function (whereFrom) {
		let output = {
			'even': {},
			'odd': {},
		};

		for (let parity in output) {
			for (let lesson in whereFrom) {
				let addition = {};
				Object.assign(addition, whereFrom[lesson]);
				output[parity][lesson] = addition;
			}
		}

		return output;
	},

	fillHoursByParity: function (group, lessons, hours, day) {
		let output = initHoursByParity(hours[group]);
		if (!day || day == 0) day = 6;

		for (let dayIndex in lessons[group]) {
			// console.log('day:', dayIndex);
			for (let lessonIndex in lessons[group][dayIndex]) {
				let currentLesson = lessons[group][dayIndex][lessonIndex];
				if (typeof currentLesson == 'boolean' || currentLesson.type == 'no') continue;

				let parityFlag = currentLesson.parity;
				let lessonType = functions.getType(currentLesson.type);
				let currentLessonName = currentLesson.name;

				// console.log(parityFlag, lessonType, currentLessonName);

				if (parityFlag == 'both') {
					output['even'][currentLessonName][lessonType]++;
					output['odd'][currentLessonName][lessonType]++;
					// console.log('added both for ', lessonType);
				} else {
					output[parityFlag][currentLessonName][lessonType]++;
					// console.log('added ', parityFlag, ' for ', lessonType);

				}

			}
			// console.log(lessons[group][key]);
			if (dayIndex == day) break;
		}
		// console.log(output);
		return output;
	},

	getType: function (type) {
		switch (type) {
			case 'ЛК':
				return 'lection';
			case 'ПЗ':
				return 'practice';
		}
	},
}

export const initHours = functions.initHours;
export const fillHours = functions.fillHours;
// export const initHoursByParity = functions.initHoursByParity;
// export const fillHoursByParity = functions.fillHoursByParity;
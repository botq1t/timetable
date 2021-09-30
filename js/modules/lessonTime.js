const lessonTime = {
	1: { 'begin': '08:00', 'end': '09:35' },
	2: { 'begin': '09:50', 'end': '11:25' },
	3: { 'begin': '11:40', 'end': '13:15' },
	4: { 'begin': '14:00', 'end': '15:35' }
}

const breakTime = {
	'big': {
		1: { 'begin': '09:35', 'end': '09:50' },
		2: { 'begin': '11:25', 'end': '11:40' },
		3: { 'begin': '13:15', 'end': '14:00' },
	},
	'little': {
		1: { 'begin': '08:45', 'end': '08:50' },
		2: { 'begin': '10:35', 'end': '10:40' },
		3: { 'begin': '11:25', 'end': '11:30' },
		4: { 'begin': '14:45', 'end': '14:50' },
	},
}

let lessonTimeSeconds = {};

for (let key in lessonTime) {
	lessonTimeSeconds[key] = {};
	lessonTimeSeconds[key].begin = timeToSeconds(lessonTime[key].begin);
	lessonTimeSeconds[key].end = timeToSeconds(lessonTime[key].end);
}

let breakTimeSeconds = {};

for (let key1 in breakTime) {
	breakTimeSeconds[key1] = {};
	for (let key2 in breakTime[key1]) {
		breakTimeSeconds[key1][key2] = {};
		breakTimeSeconds[key1][key2].begin = timeToSeconds(breakTime[key1][key2].begin);
		breakTimeSeconds[key1][key2].end = timeToSeconds(breakTime[key1][key2].end);
	}
}

function timeToSeconds(timeInput) {
	var a = timeInput.split(':')[0];
	var b = timeInput.split(':')[1];
	return ((a * 3600) + (b * 60));
}

export { lessonTime, lessonTimeSeconds, breakTime, breakTimeSeconds };
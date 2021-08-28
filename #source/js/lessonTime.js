let lessonTime = {
	'start': [28800, 35400, 42000, 50400],		//? 08:00,		09:50,		11:40,		14:00
	'end': [34500, 41100, 47700, 56100],		//? 09:35,		11:25,		11:40,		15:35
};

$(document).ready(function () {
	var lessonStringTime = '';
	for (let i = 0; i < lessonTime['start'].length; i++) {
		// ! Начало пары
		lessonTimeHours = Math.floor(lessonTime['start'][i] / 3600);
		lessonTimeMinutes = (lessonTime['start'][i] % 3600) / 60;

		lessonStringTime = '';
		if (lessonTimeHours < 10) { lessonStringTime = lessonStringTime + '0' }
		lessonStringTime = lessonStringTime + `${lessonTimeHours}:`;

		if (lessonTimeMinutes < 10) { lessonStringTime = lessonStringTime + '0' }
		lessonStringTime = lessonStringTime + `${lessonTimeMinutes}`;

		$('.time_' + (i + 1)).children('.time__start').text(lessonStringTime);

		// ! Конец пары
		lessonTimeHours = Math.floor(lessonTime['end'][i] / 3600);
		lessonTimeMinutes = (lessonTime['end'][i] % 3600) / 60;

		lessonStringTime = '';
		if (lessonTimeHours < 10) { lessonStringTime = lessonStringTime + '0' }
		lessonStringTime = lessonStringTime + `${lessonTimeHours}:`;

		if (lessonTimeMinutes < 10) { lessonStringTime = lessonStringTime + '0' }
		lessonStringTime = lessonStringTime + `${lessonTimeMinutes}`;

		$('.time_' + (i + 1)).children('.time__end').text(lessonStringTime);
	}

	/*
		$('.time').each(function () {
			if ($(this).hasClass('time_1')) {
				$(this).children('.time__start').text('08:00');
				$(this).children('.time__end').text('09:35');
			}
			if ($(this).hasClass('time_2')) {
				$(this).children('.time__start').text('09:50');
				$(this).children('.time__end').text('11:25');
			}
			if ($(this).hasClass('time_3')) {
				$(this).children('.time__start').text('11:40');
				$(this).children('.time__end').text('13:15');
			}
			if ($(this).hasClass('time_4')) {
				$(this).children('.time__start').text('14:00');
				$(this).children('.time__end').text('15:35');
			}
		})
	*/

});
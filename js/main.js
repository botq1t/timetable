
const monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'илюя', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const dayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];		//? Название дней недели

const remainEnd = 1640552400000;		//? Конец семестра в миллисекундах
const weekCheck = 604800000; 							//? Одна неделя в миллисекундах
const semBegin = 1630270800000; 			//? Начало семестра в миллисекундах
let nextDayLastLessonTime;
let currentLessonBegin, currentLessonEnd;
// * =================================================
// ! Получение текущей даты, дня недели и времени в секундах
let date, dayIndex, timeInSeconds;
function getDate() {
	date = new Date();
	dayIndex = date.getDay();
	timeInSeconds = (date.getHours() * 3600) + (date.getMinutes() * 60) + (date.getSeconds());
}
getDate();
setInterval(getDate, 1000);

console.log('Дата:', date);
console.log('Номер дня:', dayIndex);
console.log('Время в секундах:', timeInSeconds);
console.log();

// * =================================================
// ! Секунды в красивую строку
function getTimeString(h, m, s) {
	var h, m, s;
	var timeString = ''
	if (h < 10) { timeString = timeString + '0' }
	timeString = timeString + h + ':';
	if (m < 10) { timeString = timeString + '0' }
	timeString = timeString + m + ':';
	if (s < 10) { timeString = timeString + '0' }
	timeString = timeString + s;
	return timeString;
}
// * =================================================
// ! Выделение часов, минут и секунд из секунд
function getHMS(time) {
	var time;
	var output = {
		'hours': 0,
		'minutes': 0,
		'seconds': 0
	}
	output['hours'] = Math.floor(time / 3600);
	output['minutes'] = Math.floor((time - (output['hours'] * 3600)) / 60);
	output['seconds'] = time - (output['hours'] * 3600) - (output['minutes'] * 60);
	return output;
}
// * ===========================================
// ! Осталось до конца семестра
function getRemain() {
	let remainTime = remainEnd - date.getTime();
	remainTime = Math.floor(remainTime / 1000);

	let remainDays = Math.floor(remainTime / 86400);
	let remainInSeconds = remainTime - (remainDays * 86400);
	let remainHMS = getHMS(remainInSeconds);

	let remainTimeString = getTimeString(remainHMS['hours'], remainHMS['minutes'], remainHMS['seconds']);
	let remain = `${remainDays} дней, ${remainTimeString}`

	$('.footer__time').text(`До сессии: ${remain}`)
}
// * ===========================================
// ! Выделение текущего дня недели
function hlToday() {
	$(`.day_${dayIndex}`).children('.day__name').addClass('active slide').next().css('display', 'grid');
}
// * ===========================================
// ! Получение номера недели
function getWeekIndex() {
	var weekPassTime = date.getTime() - semBegin;
	return (Math.floor(weekPassTime / weekCheck) + 1)
}
var weekIndex = getWeekIndex();
const nowWeekIndex = getWeekIndex();
console.log('Номер текущей недели:', weekIndex);
// * ===========================================
// ! Чётности недели
function setWeekParity() {
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
	weekIndex++;
}
// * ===========================================
// ! Количество пар сегодня
function getLessonAmount(group, day) {
	var day;
	if (day == undefined) day = dayIndex;
	if (day == 0)
		day = 1;

	var groupTag = `#u${group}-target`;
	var today = $(groupTag).children(`.day_${day}`).children('.day__timetable').children('.lesson').last();
	var i = 5;
	while (today.hasClass(`lesson_${i}`) == false) i--;
	return i;
}
// * ===========================================
// ! ====== Расписание следующего дня ==========
var nextDayIndex = dayIndex + 1;
if (nextDayIndex > 6) nextDayIndex = 1;
console.log('Завтра:', dayName[nextDayIndex]);
function setNextDay(group, delay) {
	function getNextDay(group, delay) {
		var groupTag = `#u${group}-target`;
		if (dayIndex != 0) {
			if (timeInSeconds >= lessonTimeSeconds[lessonAmount]['end'] + delay) {
				$(groupTag).children(`.day_${nextDayIndex}`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
				$(groupTag).children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
			}
		} else {
			$(groupTag).children(`.day_1`).children('.day__name').addClass('nextDay slide').next().css('display', 'grid');
			$(groupTag).children(`.day_${dayIndex}`).children('.day__name').removeClass('slide').next().slideUp();
		}
	}
	let lessonAmount = getLessonAmount(group);
	console.log(`Количество пар У${group} сегодня:`, lessonAmount);
	getNextDay(group, delay);
}
// * ===========================================
// ! =========== Текущий перерыв ===============
function getCurrentBreakIndex() {
	for (var i = 1; i <= 3; i++)
		if (timeInSeconds >= breakTimeSeconds['big'][i]['begin'] && timeInSeconds < breakTimeSeconds['big'][i]['end'])
			var lessonBreakIndex = i;
	return lessonBreakIndex;
}
// * ===========================================
// ! =========== Текущая пара ==================
function getCurrentLessonIndex() {
	for (var i = 1; i <= 4; i++)
		if (timeInSeconds >= lessonTimeSeconds[i]['begin'] && timeInSeconds < lessonTimeSeconds[i]['end'])
			var lessonIndex = i;
	return lessonIndex;
}
function highlightCurrentLesson() {
	var lessonIndex = getCurrentLessonIndex();
	$(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').each(function () { $(this).removeClass('active') })
	$(`.day_${dayIndex}`).children('.day__timetable').children(`.lesson_${lessonIndex}`).each(function () { $(this).addClass('active') })
}


// * ===========================================
// ? Вывод на страницу
$(document).ready(function () {
	// ! Вывод текущей даты и времени
	function displayDate() {
		$('.week__date').text(`Сегодня: ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()} г. (${dayName[dayIndex]}, ${nowWeekIndex}-ая неделя)`);
		var currentTime = getTimeString(date.getHours(), date.getMinutes(), date.getSeconds());
		$('.week__time').text(`Время: ${currentTime}`);
	}
	displayDate();
	setInterval(displayDate, 1000)

	// ! Вывод остатка до конца семестра
	getRemain();
	setInterval(getRemain, 1000)

	// ! Выделение текущего дня недели
	hlToday();

	// ! Вывод и смена чётности недели
	setWeekParity();
	$('.week__parity').click(setWeekParity);

	// ! Расписание следующего дня
	setNextDay(117, 300);
	setNextDay(217, 300);

	// ! Выделение текущей пары
	highlightCurrentLesson();
	setInterval(highlightCurrentLesson, 1000)
});
let lessonsDayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

let lessonsU117 = {
	// ? Понедельник
	1: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'no',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'ПАП при ОВД',
			'type': 'ПЗ',
			'auditory': '3204',
			'teacher': 'Александров О.В.'
		},
		3: {
			'index': 3,
			'parity': 'both',
			'name': 'ПП и ТОВД',
			'type': 'ЛК',
			'auditory': '3203',
			'teacher': 'Дубовский А.В.'
		},
		4: {
			'index': 4,
			'parity': 'both',
			'name': 'ФРО на АЯ',
			'type': 'ПЗ',
			'auditory': '1305',
			'teacher': 'Лазовский Г.Б.'
		},

	},

	// ? Вторник
	2: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'both',
			'name': 'ЭО',
			'type': 'ЛК',
			'auditory': '3103',
			'teacher': 'Науменко А.И.'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'ЭО',
			'type': 'ПЗ',
			'auditory': '3209',
			'teacher': 'Науменко А.И.'
		},
	},

	// ? Среда
	3: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'both',
			'name': 'ОПВД',
			'type': 'ПЗ',
			'auditory': '3204',
			'teacher': 'Вишневский Р.А.'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'ФРО на АЯ',
			'type': 'ПЗ',
			'auditory': '1305',
			'teacher': 'Лазовский Г.Б.'
		},

		3: {
			'index': 3,
			'parity': 'both',
			'name': 'ПП и ТОВД',
			'type': 'ПЗ',
			'auditory': '3204',
			'teacher': 'Дубовский А.В.'
		},
	},

	// ? Четверг
	4: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'odd',
			'name': 'МОМАН',
			'type': 'ЛК',
			'auditory': '3203',
			'teacher': 'Барабан И.И.'
		},

		2: {
			'index': 1,
			'parity': 'even',
			'name': 'АП и ПНК',
			'type': 'ЛК',
			'auditory': '3103',
			'teacher': 'Пилипчук В.С.'
		},
		3: {
			'index': 2,
			'parity': 'odd',
			'name': 'ОПВД',
			'type': 'ЛК',
			'auditory': '3204',
			'teacher': 'Вишневский Р.А.'
		},
		4: {
			'index': 2,
			'parity': 'even',
			'name': 'ОПВД',
			'type': 'ЛК',
			'auditory': '3203',
			'teacher': 'Вишневский Р.А.'
		},
		5: {
			'index': 3,
			'parity': 'both',
			'name': 'ПАП при ОВД',
			'type': 'ЛК',
			'auditory': '3204',
			'teacher': 'Вишневский Р.А.'
		},

	},

	// ? Пятница
	5: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'no',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},

		2: {
			'index': 2,
			'parity': 'odd',
			'name': 'АП и ПНК',
			'type': 'ПЗ',
			'auditory': '3103',
			'teacher': 'Пилипчук В.С.'
		},
		3: {
			'index': 2,
			'parity': 'even',
			'name': 'МОМАН',
			'type': 'ПЗ',
			'auditory': '3203',
			'teacher': 'Барабан И.И.'
		},
		4: {
			'index': 3,
			'parity': 'both',
			'name': 'ПП и ТОВД',
			'type': 'ПЗ',
			'auditory': '3203',
			'teacher': 'Дубовский А.В.'
		},
		5: {
			'index': 4,
			'parity': 'both',
			'name': 'ФРО на АЯ',
			'type': 'ПЗ',
			'auditory': '1305',
			'teacher': 'Лазовский Г.Б.'
		},

	},

	// ? Суббота
	6: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'no',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'АИП и ЧФ',
			'type': 'ПЗ',
			'auditory': '3204',
			'teacher': 'Худолей Е.В.'
		},
		3: {
			'index': 3,
			'parity': 'both',
			'name': 'АИП и ЧФ',
			'type': 'ЛК',
			'auditory': '3204',
			'teacher': 'Худолей Е.В.'
		},

	},

	// ? Воскресенье
	0: {
		'lessons': false,
	},

}

let lessonsU217 = {
	// ? Понедельник
	1: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'both',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'ФРО на АЯ',
			'type': 'ПЗ',
			'auditory': '1305, 1307',
			'teacher': 'Лазовский Г.Б., Швайко Е. П.'
		},
		3: {
			'index': 3,
			'parity': 'both',
			'name': 'ПП и ТОВД',
			'type': 'ЛК',
			'auditory': '3203',
			'teacher': 'Дубовский А.В.'
		},
		4: {
			'index': 4,
			'parity': 'both',
			'name': 'ОПВД',
			'type': 'ПЗ',
			'auditory': '3204',
			'teacher': 'Вишневский Р.А.'
		},

	},

	// ? Вторник
	2: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'both',
			'name': 'ЭО',
			'type': 'ЛК',
			'auditory': '3103',
			'teacher': 'Науменко А.И.'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},
		3: {
			'index': 3,
			'parity': 'both',
			'name': 'ЭО',
			'type': 'ПЗ',
			'auditory': '3209',
			'teacher': 'Науменко А.И.'
		},

	},

	// ? Среда
	3: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'both',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'ПП и ТОВД',
			'type': 'ПЗ',
			'auditory': '3204',
			'teacher': 'Дубовский А.В.'
		},

		3: {
			'index': 3,
			'parity': 'both',
			'name': 'ПАП при ОВД',
			'type': 'ПЗ',
			'auditory': '3207',
			'teacher': 'Александров О.В.'
		},
		4: {
			'index': 4,
			'parity': 'both',
			'name': 'ФРО на АЯ',
			'type': 'ПЗ',
			'auditory': '1305, 1307',
			'teacher': 'Лазовский Г.Б., Швайко Е. П.'
		},
	},

	// ? Четверг
	4: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'odd',
			'name': 'МОМАН',
			'type': 'ЛК',
			'auditory': '3203',
			'teacher': 'Барабан И.И.'
		},

		2: {
			'index': 1,
			'parity': 'even',
			'name': 'АП и ПНК',
			'type': 'ЛК',
			'auditory': '3103',
			'teacher': 'Пилипчук В.С.'
		},
		3: {
			'index': 2,
			'parity': 'odd',
			'name': 'ОПВД',
			'type': 'ЛК',
			'auditory': '3204',
			'teacher': 'Вишневский Р.А.'
		},
		4: {
			'index': 2,
			'parity': 'even',
			'name': 'ОПВД',
			'type': 'ЛК',
			'auditory': '3203',
			'teacher': 'Вишневский Р.А.'
		},
		5: {
			'index': 3,
			'parity': 'both',
			'name': 'ПАП при ОВД',
			'type': 'ЛК',
			'auditory': '3204',
			'teacher': 'Вишневский Р.А.'
		},

	},

	// ? Пятница
	5: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'odd',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},

		2: {
			'index': 1,
			'parity': 'even',
			'name': 'МОМАН',
			'type': 'ПЗ',
			'auditory': '3203',
			'teacher': 'Барабан И.И.'
		},
		3: {
			'index': 2,
			'parity': 'both',
			'name': 'ФРО на АЯ',
			'type': 'ПЗ',
			'auditory': '1305, 1307',
			'teacher': 'Лазовский Г.Б., Швайко Е. П.'
		},
		4: {
			'index': 3,
			'parity': 'odd',
			'name': 'АП и ПНК',
			'type': 'ПЗ',
			'auditory': '3103',
			'teacher': 'Пилипчук В.С.'
		},
		5: {
			'index': 3,
			'parity': 'even',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},
		6: {
			'index': 4,
			'parity': 'both',
			'name': 'ПП и ТОВД',
			'type': 'ПЗ',
			'auditory': '3203',
			'teacher': 'Дубовский А.В.'
		},

	},

	// ? Суббота
	6: {
		'lessons': true,
		1: {
			'index': 1,
			'parity': 'both',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},

		2: {
			'index': 2,
			'parity': 'both',
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'teacher': 'no'
		},
		3: {
			'index': 3,
			'parity': 'both',
			'name': 'АИП и ЧФ',
			'type': 'ЛК',
			'auditory': '3204',
			'teacher': 'Худолей Е.В.'
		},
		4: {
			'index': 4,
			'parity': 'both',
			'name': 'АИП и ЧФ',
			'type': 'ПЗ',
			'auditory': '3207',
			'teacher': 'Худолей Е.В.'
		},

	},
	// ? Воскресенье
	7: {
		'lessons': false,
	},

}

var lessons = {
	117: {
		// ? Воскресенье
		0: {
			'lessons': false,
		},

		// ? Понедельник
		1: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},

			2: {
				'index': 2,
				'parity': 'both',
				'name': 'ПАП при ОВД',
				'type': 'ПЗ',
				'auditory': '3204',
				'teacher': 'Александров О.В.'
			},
			3: {
				'index': 3,
				'parity': 'both',
				'name': 'ПП и ТОВД',
				'type': 'ЛК',
				'auditory': '3203',
				'teacher': 'Дубовский А.В.'
			},
			4: {
				'index': 4,
				'parity': 'both',
				'name': 'ФРО на АЯ',
				'type': 'ПЗ',
				'auditory': '1305',
				'teacher': 'Лазовский Г.Б.'
			},

		},

		// ? Вторник
		2: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'ЭО',
				'type': 'ЛК',
				'auditory': '3103',
				'teacher': 'Науменко А.И.'
			},

			2: {
				'index': 2,
				'parity': 'both',
				'name': 'ЭО',
				'type': 'ПЗ',
				'auditory': '3209',
				'teacher': 'Науменко А.И.'
			},
		},

		// ? Среда
		3: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'ОПВД',
				'type': 'ПЗ',
				'auditory': '3204',
				'teacher': 'Вишневский Р.А.'
			},

			2: {
				'index': 2,
				'parity': 'both',
				'name': 'ФРО на АЯ',
				'type': 'ПЗ',
				'auditory': '1305',
				'teacher': 'Лазовский Г.Б.'
			},

			3: {
				'index': 3,
				'parity': 'both',
				'name': 'ПП и ТОВД',
				'type': 'ПЗ',
				'auditory': '3204',
				'teacher': 'Дубовский А.В.'
			},
		},

		// ? Четверг
		4: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'odd',
				'name': 'МОМАН',
				'type': 'ЛК',
				'auditory': '3203',
				'teacher': 'Барабан И.И.'
			},

			2: {
				'index': 1,
				'parity': 'even',
				'name': 'АП и ПНК',
				'type': 'ЛК',
				'auditory': '3103',
				'teacher': 'Пилипчук В.С.'
			},
			3: {
				'index': 2,
				'parity': 'odd',
				'name': 'ОПВД',
				'type': 'ЛК',
				'auditory': '3204',
				'teacher': 'Вишневский Р.А.'
			},
			4: {
				'index': 2,
				'parity': 'even',
				'name': 'ОПВД',
				'type': 'ЛК',
				'auditory': '3203',
				'teacher': 'Вишневский Р.А.'
			},
			5: {
				'index': 3,
				'parity': 'both',
				'name': 'ПАП при ОВД',
				'type': 'ЛК',
				'auditory': '3204',
				'teacher': 'Вишневский Р.А.'
			},

		},

		// ? Пятница
		5: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},

			2: {
				'index': 2,
				'parity': 'odd',
				'name': 'АП и ПНК',
				'type': 'ПЗ',
				'auditory': '3103',
				'teacher': 'Пилипчук В.С.'
			},
			3: {
				'index': 2,
				'parity': 'even',
				'name': 'МОМАН',
				'type': 'ПЗ',
				'auditory': '3203',
				'teacher': 'Барабан И.И.'
			},
			4: {
				'index': 3,
				'parity': 'both',
				'name': 'ПП и ТОВД',
				'type': 'ПЗ',
				'auditory': '3203',
				'teacher': 'Дубовский А.В.'
			},
			5: {
				'index': 4,
				'parity': 'both',
				'name': 'ФРО на АЯ',
				'type': 'ПЗ',
				'auditory': '1305',
				'teacher': 'Лазовский Г.Б.'
			},

		},

		// ? Суббота
		6: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},

			2: {
				'index': 2,
				'parity': 'both',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},

			3: {
				'index': 3,
				'parity': 'both',
				'name': 'АИП и ЧФ',
				'type': 'ЛК',
				'auditory': '1402',
				'teacher': 'Худолей Е.В.'
			},
			4: {
				'index': 4,
				'parity': 'both',
				'name': 'АИП и ЧФ',
				'type': 'ПЗ',
				'auditory': '1404',
				'teacher': 'Худолей Е.В.'
			},

		},
	},
	217: {
		// ? Воскресенье
		0: {
			'lessons': false,
		},
		// ? Понедельник
		1: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},

			2: {
				'index': 2,
				'parity': 'both',
				'name': 'ФРО на АЯ',
				'type': 'ПЗ',
				'auditory': '1305, 1307',
				'teacher': 'Лазовский Г.Б., Швайко Е. П.'
			},
			3: {
				'index': 3,
				'parity': 'both',
				'name': 'ПП и ТОВД',
				'type': 'ЛК',
				'auditory': '3203',
				'teacher': 'Дубовский А.В.'
			},
		},

		// ? Вторник
		2: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'ЭО',
				'type': 'ЛК',
				'auditory': '3103',
				'teacher': 'Науменко А.И.'
			},

			2: {
				'index': 2,
				'parity': 'both',
				'name': 'ОПВД',
				'type': 'ПЗ',
				'auditory': '3204',
				'teacher': 'Вишневский Р.А.'
			},
			3: {
				'index': 3,
				'parity': 'both',
				'name': 'ЭО',
				'type': 'ПЗ',
				'auditory': '3209',
				'teacher': 'Науменко А.И.'
			},

		},

		// ? Среда
		3: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},

			2: {
				'index': 2,
				'parity': 'both',
				'name': 'ПП и ТОВД',
				'type': 'ПЗ',
				'auditory': '3204',
				'teacher': 'Дубовский А.В.'
			},

			3: {
				'index': 3,
				'parity': 'both',
				'name': 'ПАП при ОВД',
				'type': 'ПЗ',
				'auditory': '3207',
				'teacher': 'Александров О.В.'
			},
			4: {
				'index': 4,
				'parity': 'both',
				'name': 'ФРО на АЯ',
				'type': 'ПЗ',
				'auditory': '1305, 1307',
				'teacher': 'Лазовский Г.Б., Швайко Е. П.'
			},
		},

		// ? Четверг
		4: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'odd',
				'name': 'МОМАН',
				'type': 'ЛК',
				'auditory': '3203',
				'teacher': 'Барабан И.И.'
			},

			2: {
				'index': 1,
				'parity': 'even',
				'name': 'АП и ПНК',
				'type': 'ЛК',
				'auditory': '3103',
				'teacher': 'Пилипчук В.С.'
			},
			3: {
				'index': 2,
				'parity': 'odd',
				'name': 'ОПВД',
				'type': 'ЛК',
				'auditory': '3204',
				'teacher': 'Вишневский Р.А.'
			},
			4: {
				'index': 2,
				'parity': 'even',
				'name': 'ОПВД',
				'type': 'ЛК',
				'auditory': '3203',
				'teacher': 'Вишневский Р.А.'
			},
			5: {
				'index': 3,
				'parity': 'both',
				'name': 'ПАП при ОВД',
				'type': 'ЛК',
				'auditory': '3204',
				'teacher': 'Вишневский Р.А.'
			},

		},

		// ? Пятница
		5: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'odd',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},

			2: {
				'index': 1,
				'parity': 'even',
				'name': 'МОМАН',
				'type': 'ПЗ',
				'auditory': '3203',
				'teacher': 'Барабан И.И.'
			},
			3: {
				'index': 2,
				'parity': 'both',
				'name': 'ФРО на АЯ',
				'type': 'ПЗ',
				'auditory': '1305, 1307',
				'teacher': 'Лазовский Г.Б., Швайко Е. П.'
			},
			4: {
				'index': 3,
				'parity': 'odd',
				'name': 'АП и ПНК',
				'type': 'ПЗ',
				'auditory': '3103',
				'teacher': 'Пилипчук В.С.'
			},
			5: {
				'index': 3,
				'parity': 'even',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},
			6: {
				'index': 4,
				'parity': 'both',
				'name': 'ПП и ТОВД',
				'type': 'ПЗ',
				'auditory': '3203',
				'teacher': 'Дубовский А.В.'
			},

		},

		// ? Суббота
		6: {
			'lessons': true,
			1: {
				'index': 1,
				'parity': 'both',
				'name': 'no',
				'type': 'no',
				'auditory': 'no',
				'teacher': 'no'
			},
			2: {
				'index': 2,
				'parity': 'both',
				'name': 'АИП и ЧФ',
				'type': 'ПЗ',
				'auditory': '1402',
				'teacher': 'Худолей Е.В.'
			},
			3: {
				'index': 3,
				'parity': 'both',
				'name': 'АИП и ЧФ',
				'type': 'ЛК',
				'auditory': '1402',
				'teacher': 'Худолей Е.В.'
			},

		},
	},
}
// console.log('Расписание У117:');
// console.log(lessonsU117);
// console.log('Расписание У217:');
// console.log(lessonsU217);
console.log('Расписания', lessons);

function scheduleNew(group) {
	let groupTag = `#u${group}-target`

	for (var i = 1; i <= 6; i++) {

		let currentDay = $(groupTag).children(`.day_${i}`).children('.day__timetable');
		currentDay.empty();
		let currentDaySchedule = lessons[group][i];

		if (currentDaySchedule['lessons']) {
			var j = 1;
			while (currentDaySchedule[j] != undefined) {
				currentDay.append(`<li class="day__lesson lesson lesson_${currentDaySchedule[j]['index']}"></li>`);
				let bufer = currentDay.children('.lesson').last();
				switch (currentDaySchedule[j]['parity']) {
					case 'both':
						bufer.addClass('lesson_odd lesson_even')
						break;
					case 'even':
						bufer.addClass('lesson_even')
						break;
					case 'odd':
						bufer.addClass('lesson_odd')
						break;
				}

				bufer.append(`
					<div class="lesson__time time time_${currentDaySchedule[j]['index']} lesson__item">
						<div class="time__start"></div>
						<div class="time__end"></div>
					</div>
				`);

				if (currentDaySchedule[j]['name'] == 'no') {
					let flag = true;
					for (let k = j; k >= 1; k--) {
						if (currentDaySchedule[k]['name'] != 'no')
							flag = false;
					}

					if (flag) {
						bufer.append(`<div class="lesson__item lesson_out"><span class="icon-sleep"></span>Можно спать<span class="icon-sleep"></span></div>`);
					} else {
						bufer.append(`<div class="lesson__item lesson_out"><span class="icon-sad"></span>Форточка<span class="icon-sad"></span></div>`);
					}

					flag = true;
				} else {
					bufer.append(`
						<div class="lesson__name lesson__item">${currentDaySchedule[j]['name']}</div>
						<div class="lesson__type lesson__item">${currentDaySchedule[j]['type']}</div>
						<div class="lesson__autidory lesson__item">${currentDaySchedule[j]['auditory']}</div>
						<div class="lesson__teacher lesson__item">${currentDaySchedule[j]['teacher']}</div>
					`);
				}
				j++;
			}
		}
	}
}


scheduleNew(117);
scheduleNew(217);

function schedule() {
	// ! Объявление переменных
	let i, lessonNow117, currentLesson117, currentTime117, currentDay117, currentTime117table;
	let j, lessonNow217, currentLesson217, currentTime217, currentDay217, currentTime217table;
	// ! Расписание
	$('#u117-target').empty();
	$('#u217-target').empty();
	// ! Перебор дней недели
	for (let dayIndex = 1; dayIndex <= 6; dayIndex++) {
		i = 1;
		j = 1;
		// ? Прописывание денй недели и их классов
		$('#u117-target').append('<div></div>');
		$('#u117-target').children('div').last().addClass(`main__day day day_${dayIndex}`);
		// ! =============================================
		$('#u217-target').append('<div></div>');
		$('#u217-target').children('div').last().addClass(`main__day day day_${dayIndex}`);

		// ? Текущий день в переменную
		currentDay117 = $('#u117-target').children(`.day_${dayIndex}`);
		// ! ==============================================
		currentDay217 = $('#u217-target').children(`.day_${dayIndex}`);

		// ? Добавление текущему дню имени и расписания
		currentDay117.append(`< h2 class= "day__name" > ${lessonsDayName[dayIndex]}</ > `);
		currentDay117.append(`< ul class= "day__timetable" ></ > `);
		// ! ===============================================
		currentDay217.append(`< h2 class= "day__name" > ${lessonsDayName[dayIndex]}</ > `);
		currentDay217.append(`< ul class= "day__timetable" ></ > `);

		// ? Текущее расписание в переменную
		currentTime117table = currentDay117.children('.day__timetable');
		// ! ===================================================================
		currentTime217table = currentDay217.children('.day__timetable');

		// ? Перебор пар в текущем расписании
		if (lessonsU117[dayIndex]['lessons']) {
			while (lessonsU117[dayIndex][i] != undefined) {
				// ? Запись в переменную информации о текущей паре из общего массива
				lessonNow117 = lessonsU117[dayIndex][i];

				// ? Добавление пары
				currentTime117table.append(`< li class= "day__lesson lesson lesson_${lessonNow117['index']}" ></ > `);
				currentLesson117 = currentTime117table.children().last();

				// ? Добавление текущей паре класса чётности
				switch (lessonNow117['parity']) {
					case 'both':
						currentLesson117.addClass('lesson_odd lesson_even')
						break;
					case 'odd':
						currentLesson117.addClass('lesson_odd')
						break;
					case 'even':
						currentLesson117.addClass('lesson_even')
						break;
				}

				// ? Добавление остальной информации текущей пары

				currentLesson117.append(`< div class= "lesson__time time time_${lessonNow117['index']} lesson__item" ></ > `);

				currentTime117 = currentLesson117.children().last();
				currentTime117.append('<div class="time__start"></div>').append('<div class="time__end"></div>')

				if (lessonNow117['name'] == 'no') {
					switch (lessonNow117['index']) {
						case 1:
							currentLesson117.append(`< div class= "lesson__item lesson_out" > <span class="icon-sleep"></spanМожно спать между прочим! < span class= "icon-sleep" ></ ></div > `)
							break;
						default:
							currentLesson117.append(`< div class= "lesson__item lesson_out" > <span class="icon-sad"></span>Форточка < span class= "icon-sad" ></ ></div > `)
							break;
					}
				} else {
					currentLesson117.append(`< div class= "lesson__name lesson__item" > ${lessonNow117['name']}</ > `)
					currentLesson117.append(`< div class= "lesson__type lesson__item" > ${lessonNow117['type']}</ > `)
					currentLesson117.append(`< div class= "lesson__autidory lesson__item" > ${lessonNow117['auditory']}</ > `)
					currentLesson117.append(`< div class= "lesson__teacher lesson__item" > ${lessonNow117['teacher']}</ > `)
				}
				i++;
			}
		}
		// ! ==================================================
		if (lessonsU217[dayIndex]['lessons']) {
			while (lessonsU217[dayIndex][j] != undefined) {
				// ? Запись в переменную информации о текущей паре из общего массива
				lessonNow217 = lessonsU217[dayIndex][j];

				// ? Добавление пары
				currentTime217table.append(`< li class= "day__lesson lesson lesson_${lessonNow217['index']}" ></ > `);
				currentLesson217 = currentTime217table.children().last();

				// ? Добавление текущей паре класса чётности
				switch (lessonNow217['parity']) {
					case 'both':
						currentLesson217.addClass('lesson_odd lesson_even')
						break;
					case 'odd':
						currentLesson217.addClass('lesson_odd')
						break;
					case 'even':
						currentLesson217.addClass('lesson_even')
						break;
				}

				// ? Добавление остальной информации текущей пары

				currentLesson217.append(`< div class= "lesson__time time time_${lessonNow217['index']} lesson__item" ></ > `);

				currentTime217 = currentLesson217.children().last();
				currentTime217.append('<div class="time__start"></div>').append('<div class="time__end"></div>')

				if (lessonNow217['name'] == 'no') {
					switch (lessonNow217['index']) {
						case 1:
							currentLesson217.append(`< div class= "lesson__item lesson_out" > <span class="icon-sleep"></span>Можно спать между прочим! < span class= "icon-sleep" ></ ></div > `)
							break;
						default:
							currentLesson217.append(`< div class= "lesson__item lesson_out" > <span class="icon-sad"></span>Форточка < span class= "icon-sad" ></ ></div > `)
							break;
					}
				} else {
					currentLesson217.append(`< div class= "lesson__name lesson__item" > ${lessonNow217['name']}</ > `)
					currentLesson217.append(`< div class= "lesson__type lesson__item" > ${lessonNow217['type']}</ > `)
					currentLesson217.append(`< div class= "lesson__autidory lesson__item" > ${lessonNow217['auditory']}</ > `)
					currentLesson217.append(`< div class= "lesson__teacher lesson__item" > ${lessonNow217['teacher']}</ > `)
				}
				j++;
			}
		}
	}
}

// $(document).ready(schedule);
let lessonTime = {
	1: { 'begin': '08:00', 'end': '09:35' },
	2: { 'begin': '09:50', 'end': '11:25' },
	3: { 'begin': '11:40', 'end': '13:15' },
	4: { 'begin': '14:00', 'end': '15:35' }
}

let breakTime = {
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

let lessonTimeSeconds = {
	1: { 'begin': 0, 'end': 0 },
	2: { 'begin': 0, 'end': 0 },
	3: { 'begin': 0, 'end': 0 },
	4: { 'begin': 0, 'end': 0 }
};

let breakTimeSeconds = {
	'big': {
		1: { 'begin': 0, 'end': 0 },
		2: { 'begin': 0, 'end': 0 },
		3: { 'begin': 0, 'end': 0 },
	},
	'little': {
		1: { 'begin': 0, 'end': 0 },
		2: { 'begin': 0, 'end': 0 },
		3: { 'begin': 0, 'end': 0 },
		4: { 'begin': 0, 'end': 0 },
	},
}

function timeToSeconds(timeInput) {
	var a = timeInput.split(':')[0];
	var b = timeInput.split(':')[1];
	return ((a * 3600) + (b * 60));
}

for (let i = 1; i < 5; i++) {
	lessonTimeSeconds[i]['begin'] = timeToSeconds(lessonTime[i]['begin']);
	lessonTimeSeconds[i]['end'] = timeToSeconds(lessonTime[i]['end']);
}
console.log('Пары:', lessonTime);
console.log('Пары в секундах', lessonTimeSeconds);

for (let i = 1; i < 4; i++) {
	breakTimeSeconds['big'][i]['begin'] = timeToSeconds(breakTime['big'][i]['begin']);
	breakTimeSeconds['big'][i]['end'] = timeToSeconds(breakTime['big'][i]['end']);
}
for (let i = 1; i < 5; i++) {
	breakTimeSeconds['little'][i]['begin'] = timeToSeconds(breakTime['little'][i]['begin']);
	breakTimeSeconds['little'][i]['end'] = timeToSeconds(breakTime['little'][i]['end']);
}

console.log('Перерывы', breakTime);
console.log('Перерывы в секундах', breakTimeSeconds);

$(document).ready(function () {
	for (let i = 1; i < 5; i++) {
		$(`.time_${i}`).each(function () {
			$(this).children('.time__start').text(lessonTime[i]['begin']);
			$(this).children('.time__end').text(lessonTime[i]['end']);
		});
	}
});

// !==================================================================================
/*
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


});
*/
$(document).ready(function () {
	$('.nav__tab').each(function () {
		if ($(this).hasClass('active')) {
			var tabIndex = $(this).attr('id');
			$(`#${tabIndex}-target`).css('display', 'grid');
			if ($(`#${tabIndex}-target`).hasClass('now')) { $(`#${tabIndex}-target`).css('display', 'flex'); }
		}
	})


	$('.nav__tab').click(function (event) {
		if ($(this).hasClass('active') == false) {
			$('.nav__tab').removeClass('active');
			$(this).addClass('active');
			var tabIndex = $(this).attr('id');
			$('.main__tab').fadeOut(150);
			$(`#${tabIndex}-target`).delay(160).fadeIn(150, function () {
				$(this).css('display', 'grid');
				if ($(`#${tabIndex}-target`).hasClass('now')) { $(`#${tabIndex}-target`).css('display', 'flex'); }
			});
		}
	});

	$('.day__name').click(function (event) {
		if ($(this).hasClass('slide')) {
			$(this).next().slideUp(300)
		} else {
			$(this).next().slideDown(300, function () {
				$(this).css('display', 'grid')
			})
		}
		$(this).toggleClass('slide');
	})
});
let lessonName = {
	'short': ['ФРО на АЯ', 'АИП и ЧФ', 'ПАП при ОВД', 'ПП и ТОВД', 'ЭО', 'ОПВД', 'АП и ПНК', 'МОМАН'],
	'full': ['Фразеология радиообмена на английском языке', 'Авиационная инженерная психология и человеческий фактор', 'Предотвращение авиационных происшествий при обслуживании воздушного движения', 'Правила, процедуры и технология обслуживания воздушного движения', 'Экономика отрасли', 'Организация потоков воздушного движения', 'Авиационные приборы и пилотажные навигационные комплексы', 'Метеорологическое обеспечение международной аэронавигации']
};

let teacherName = {
	'short': ['Лазовский Г.Б., Швайко Е. П.', 'Науменко А.И.', 'Худолей Е.В.', 'Александров О.В.', 'Дубовский А.В.', 'Лазовский Г.Б.', 'Вишневский Р.А.', 'Пилипчук В.С.', 'Барабан И.И.'],
	'full': ['Лазовский Георгий Борисович, Швайко Елена Петровна', 'Науменко Александр Иванович', 'Худолей Елена Владимировна', 'Александров Олег Валерьевич', 'Дубовский Алексей Викторович', 'Лазовский Георгий Борисович', 'Вишневский Роман Анатольевич', 'Пилипчук Владимир Сергеевич', 'Барабан Иван Иванович']
}

$(document).ready(function () {
	/*	console.log($('.ttest').text())
		if (teacherName['short'][8] == $('.ttest').text()) {
			console.log('true')
		} else {
			console.log('false')
		}*/
	function fullTeacherName() {
		// console.log($(this).text());
		console.log($(this).text());
		for (let i = 0; i < teacherName['short'].length; i++) {
			switch ($(this).text()) {
				case teacherName['short'][i]:
					$(this).fadeOut(100, function () {
						$(this).text(teacherName['full'][i]).fadeIn(100)
					})
					break;

				case teacherName['full'][i]:
					$(this).fadeOut(100, function () {
						$(this).text(teacherName['short'][i]).fadeIn(100)
					})
					break;
			};
		};
	}

	function fullLessonName() {
		// console.log($(this).text())
		for (let i = 0; i < lessonName['short'].length; i++) {

			switch ($(this).text()) {
				case lessonName['short'][i]:
					$(this).fadeOut(100, function () {
						$(this).text(lessonName['full'][i]).fadeIn(100)
					})
					break;

				case lessonName['full'][i]:
					$(this).fadeOut(100, function () {
						$(this).text(lessonName['short'][i]).fadeIn(100)
					})
					break;
			};
		};
	}

	$('.lesson__name').click(fullLessonName);
	$('.now__name').click(fullLessonName);

	$('.lesson__teacher').click(fullTeacherName);
});
$(document).ready(function () {
	$('.lesson__type').each(function () {
		if ($(this).text() == 'ЛК') {
			$(this).parent('.lesson').addClass('lesson_lection');
		} else {
			$(this).parent('.lesson').addClass('lesson_practice');
		};
	});
});
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
			<div class="now__auditory now__item">${i} Сейчас (${nowLesson[group]['now'][i]['auditory']})</div>
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
			<div class="now__auditory now__item">${i} Следующая (${nowLesson[group]['next'][i]['auditory']})</div>
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

	if (lessons[117][dayIndex]['lessons'])
		nowTimeUpdate(117);

	if (lessons[217][dayIndex]['lessons'])
		nowTimeUpdate(217);

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

let titleChangerArray = [
	'Хочу передать привет Сивцу P.S. Сашка Бурбик',
	'Коренислав, где Бурбислав?',
	'Нэ атмечай у мения жёпа болыт',
	'Разбрёмсь',
	'Жирнолею привет завтра передавайте',
	'Пары в субботу? Почему настолько кайф?',
	'Папаня орёт!',
	'Значиць генератор генератор генерирует генерирует',
	'Дополнительная литература дополняет',
	'Шарага на любителя, но тем самым любителям она понравится',
	'Продам гараж',
	'ПэПэПэ ПэВэПэ',
	'Сайт проспонсирован Старановичем',
	'Здороваться, значиць, не будем',
	'У Лукоморья дуб зелёный...',
	'Напрягают алкоголики',
	'Замечательное место',
	'Ты что игнорируешь? Занятия никто не отменял',
]
let birthFlag = false;
/*
let titleChangerHappyBirthday = {
	'date': ['24.9', '14.10', '3.0'],
	'name': ['Грузик', 'Корнеслав', 'Медвежонок'],
}


function titleBirthCheker() {
	var titleDate = `${date.getDate().toString()}.${date.getMonth().toString()}`;
	console.log('title string', titleDate);

	if (titleChangerHappyBirthday['date'].includes(titleDate)) {
		var titleIndex = titleChangerHappyBirthday['date'].indexOf(titleDate);
		birthFlag = true;
	}

	if (birthFlag) {
		clearInterval(titleChanger);
		$('.header__title').html(`<span class="icon-cake"></span><p>С Днём Рождения, ${titleChangerHappyBirthday['name'][titleIndex]}!</p><span class="icon-cake"></span>`);
	} else {
		setInterval(titleChanger, 5000);
	}
}

*/

let titleChangerHappyBirthday = {
	'24.9': 'Грузик',
	'14.10': 'Корнеславик',
	'3.0': 'Медвежонок',
	'3.0': 'Медвежонок',
	'13.8': 'Настя Куш',
	'25.8': 'Маша',
}


function titleBirthCheker() {
	let titleDate = `${date.getDate().toString()}.${date.getMonth().toString()}`;
	console.log('title string', titleDate);

	if (titleDate in titleChangerHappyBirthday) {
		birthFlag = true;
	}

	if (birthFlag) {
		clearInterval(titleChanger);
		$('.header__title').html(`<span class="icon-cake"></span><p>С Днём Рождения, ${titleChangerHappyBirthday[titleDate]}!</p><span class="icon-cake"></span>`);
	} else {
		setInterval(titleChanger, 5000);
	}
}

titleBirthCheker();
setInterval(titleBirthCheker, 10000);


function titleChanger() {
	$('.header__title').fadeOut(400, function () {
		$(this).fadeIn(400).children('p').html(titleChangerArray[Math.floor(Math.random() * titleChangerArray.length)]);
	})
}


// titleChanger();
// setInterval(titleChanger, 5000);
if (timeInSeconds >= (21 * 3600) || timeInSeconds <= (7 * 3600)) {
	toggleDarkMode();
}

$('.footer').click(toggleDarkMode);

function toggleDarkMode() {
	$('.header__body').toggleClass('dark');
	$('.header__title').toggleClass('dark');
	$('.header__nav').toggleClass('dark');

	$('.week__today').toggleClass('dark');
	$('.week__parity').toggleClass('dark');

	$('.nav__tab').toggleClass('dark');

	$('.main').toggleClass('dark');

	$('.now__gone').toggleClass('dark');
	$('.now__title').toggleClass('dark');
	$('.now__item').not('.now__title').toggleClass('dark');
	$('.now__card').toggleClass('dark');
	$('.now__name').toggleClass('dark');
	$('.current').toggleClass('dark');
	$('.next').toggleClass('dark');

	$('.footer').toggleClass('dark');
	$('.footer__time').toggleClass('dark');

	$('.day__name').toggleClass('dark');
	$('.day').toggleClass('dark');
	$('.lesson').toggleClass('dark');
	$('.lesson__item').toggleClass('dark');
}
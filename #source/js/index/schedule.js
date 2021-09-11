let lessonsDayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

/*let lessonsU117 = {
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

}*/

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
				'auditory': '3209',
				'teacher': 'Худолей Е.В.'
			},
			4: {
				'index': 4,
				'parity': 'both',
				'name': 'АИП и ЧФ',
				'type': 'ПЗ',
				'auditory': '3209',
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
				'auditory': '3203',
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
				'auditory': '3209',
				'teacher': 'Худолей Е.В.'
			},
			3: {
				'index': 3,
				'parity': 'both',
				'name': 'АИП и ЧФ',
				'type': 'ЛК',
				'auditory': '3209',
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
						<div class="lesson__auditory lesson__item">${currentDaySchedule[j]['auditory']}</div>
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
					currentLesson117.append(`< div class= "lesson__auditory lesson__item" > ${lessonNow117['auditory']}</ > `)
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
					currentLesson217.append(`< div class= "lesson__auditory lesson__item" > ${lessonNow217['auditory']}</ > `)
					currentLesson217.append(`< div class= "lesson__teacher lesson__item" > ${lessonNow217['teacher']}</ > `)
				}
				j++;
			}
		}
	}
}

// $(document).ready(schedule);
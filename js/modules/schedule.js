const schedule = {
	lessons: {
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
					'parity': 'odd',
					'name': 'ЭО',
					'type': 'ЛК',
					'auditory': '3203',
					'teacher': 'Науменко А.И.'
				},
				2: {
					'index': 1,
					'parity': 'even',
					'name': 'ЭО',
					'type': 'ЛК',
					'auditory': '3103',
					'teacher': 'Науменко А.И.'
				},

				3: {
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
					'parity': 'odd',
					'name': 'ЭО',
					'type': 'ЛК',
					'auditory': '3203',
					'teacher': 'Науменко А.И.'
				},
				2: {
					'index': 1,
					'parity': 'even',
					'name': 'ЭО',
					'type': 'ЛК',
					'auditory': '3103',
					'teacher': 'Науменко А.И.'
				},

				3: {
					'index': 2,
					'parity': 'both',
					'name': 'ОПВД',
					'type': 'ПЗ',
					'auditory': '3204',
					'teacher': 'Вишневский Р.А.'
				},
				4: {
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
	},

	createSchedule: function (group) {
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
}

export const lessons = schedule.lessons;
export const createSchedule = schedule.createSchedule;
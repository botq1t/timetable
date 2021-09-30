const lessonName = {
	'ФРО на АЯ': 'Фразеология радиообмена на английском языке',
	'АИП и ЧФ': 'Авиационная инженерная психология и человеческий фактор',
	'ПАП при ОВД': 'Предотвращение авиационных происшествий при обслуживании воздушного движения',
	'ПП и ТОВД': 'Правила, процедуры и технология обслуживания воздушного движения',
	'ЭО': 'Экономика отрасли',
	'ОПВД': 'Организация потоков воздушного движения',
	'АП и ПНК': 'Авиационные приборы и пилотажные навигационные комплексы',
	'МОМАН': 'Метеорологическое обеспечение международной аэронавигации'
};

const teacherName = {
	'Лазовский Г.Б., Швайко Е. П.': 'Лазовский Георгий Борисович, Швайко Елена Петровна',
	'Науменко А.И.': 'Науменко Александр Иванович',
	'Худолей Е.В.': 'Худолей Елена Владимировна',
	'Александров О.В.': 'Александров Олег Валерьевич',
	'Дубовский А.В.': 'Дубовский Алексей Викторович',
	'Лазовский Г.Б.': 'Лазовский Георгий Борисович',
	'Вишневский Р.А.': 'Вишневский Роман Анатольевич',
	'Пилипчук В.С.': 'Пилипчук Владимир Сергеевич',
	'Барабан И.И.': 'Барабан Иван Иванович'
};

const changeFunctions = {
	fullTeacherName: function () {
		let teacher = $(this);

		if (teacher.text() in teacherName) {
			teacher.fadeOut(100, function () {
				teacher.text(teacherName[teacher.text()]).fadeIn(100);
			});
		} else {
			for (let key in teacherName) if (teacherName[key] == teacher.text()) {
				teacher.fadeOut(100, function () {
					teacher.text(key).fadeIn(100);
				});
				break;
			}
		}
	},
	fullLessonName: function () {
		let lesson = $(this);

		if (lesson.text() in lessonName) {
			lesson.fadeOut(100, function () {
				lesson.text(lessonName[lesson.text()]).fadeIn(100);
			});
		} else {
			for (let key in lessonName) if (lessonName[key] == lesson.text()) {
				lesson.fadeOut(100, function () {
					lesson.text(key).fadeIn(100);
				});
				break;
			}
		}
	}
};


export const fullTeacherName = changeFunctions.fullTeacherName;
export const fullLessonName = changeFunctions.fullLessonName;
export { lessonName };
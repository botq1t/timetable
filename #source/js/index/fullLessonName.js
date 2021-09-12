let lessonName = {
	'ФРО на АЯ': 'Фразеология радиообмена на английском языке',
	'АИП и ЧФ': 'Авиационная инженерная психология и человеческий фактор',
	'ПАП при ОВД': 'Предотвращение авиационных происшествий при обслуживании воздушного движения',
	'ПП и ТОВД': 'Правила, процедуры и технология обслуживания воздушного движения',
	'ЭО': 'Экономика отрасли',
	'ОПВД': 'Организация потоков воздушного движения',
	'АП и ПНК': 'Авиационные приборы и пилотажные навигационные комплексы',
	'МОМАН': 'Метеорологическое обеспечение международной аэронавигации'
}

let teacherName = {
	'Лазовский Г.Б., Швайко Е. П.': 'Лазовский Георгий Борисович, Швайко Елена Петровна',
	'Науменко А.И.': 'Науменко Александр Иванович',
	'Худолей Е.В.': 'Худолей Елена Владимировна',
	'Александров О.В.': 'Александров Олег Валерьевич',
	'Дубовский А.В.': 'Дубовский Алексей Викторович',
	'Лазовский Г.Б.': 'Лазовский Георгий Борисович',
	'Вишневский Р.А.': 'Вишневский Роман Анатольевич',
	'Пилипчук В.С.': 'Пилипчук Владимир Сергеевич',
	'Барабан И.И.': 'Барабан Иван Иванович'
}

$('.lesson__name').click(fullLessonName);
$('.now__name').click(fullLessonName);

$('.lesson__teacher').click(fullTeacherName);

function fullTeacherName() {
	let teacher = $(this);
	// console.log(teacher.text() in teacherName);

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
}

function fullLessonName() {
	let lesson = $(this);
	// console.log(lesson.text() in lessonName);

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
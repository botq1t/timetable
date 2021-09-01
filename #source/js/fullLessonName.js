let lessonName = {
	'short': ['ФРО на АЯ', 'АИП и ЧФ', 'ПАП при ОВД', 'ПП и ТОВД', 'ЭО', 'ОПВД', 'АП и ПНК', 'МОМАН'],
	'full': ['Фразеология радиообмена на английском языке', 'Авиационная инженерная психология и человеческий фактор', 'Предотвращение АП при обслуживании ВД', 'Правила, процедуры и технология обслуживания воздушного движения', 'Экономика отрасли', 'Организация потоков воздушного движения', 'Авиационные приборы и ПНК', 'Метеорологическое обеспечение международной АН']
};

let teacherName = {
	'short': ['Лазовский Г.Б., Швайко Е. П.', 'Науменко А.И.', 'Козлова О.Г.', 'Александров О.В.', 'Дубовский А.В.', 'Лазовский Г.Б.', 'Вишневский Р.А.', 'Пилипчук В.С.', 'Барабан И.И.'],
	'full': ['Лазовский Георгий Борисович, Швайко Елена Петровна', 'Науменко Александр Иванович', 'Козлова Ольга Григорьевна', 'Александров Олег Валерьевич', 'Дубовский Алексей Викторович', 'Лазовский Георгий Борисович', 'Вишневский Роман Анатольевич', 'Пилипчук Владимир Сергеевич', 'Барабан Иван Иванович']
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
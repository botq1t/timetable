let lessonName = {
	'short': ['ФРО на АЯ', 'АИП и ЧФ', 'ПАП при ОВД', 'ПП и ТОВД', 'ЭО', 'ОПВД', 'АП и ПНК', 'МОМАН'],
	'full': ['Фразеология радиообмена на английском языке', 'Авиационная инженерная психология и ЧФ', 'Предотвращение АП при обслуживании ВД', 'Правила, процедуры и технология обслуживания воздушного движения', 'Экономика отрасли', 'Организация потоков воздушного движения', 'Авиационные приборы и ПНК', 'Метеорологическое обеспечение международной АН']
};

$(document).ready(function () {
	$('.lesson__name').click(function (event) {
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
	});
});
$(document).ready(function () {
	// Получение даты
	var dateTest = new Date(1631078401000);

	var dateBegin = new Date(1630454400000);
	var dateCurrent = new Date();
	var dateCheck = 604800000;
	// Вывод текущей даты над ивен одд
	let monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'илюя', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	var dateCurrentDisplay = `${dateCurrent.getDate()} ${monthArray[dateCurrent.getMonth()]} ${dateCurrent.getFullYear()} года`;
	$('.header__today').children('span').text(dateCurrentDisplay)
	// Чётный или нечётный
	// var dateMinus = dateCurrent.getTime() - dateBegin.getTime();
	var dateMinus = dateTest.getTime() - dateBegin.getTime();
	var dateIndex = Math.floor(dateMinus / dateCheck) + 1;
	// console.log(dateMinus)
	if (dateIndex % 2 == 0) {
		console.log('Чётная')
		$('.header__even-odd').addClass('even').text('Чётная неделя');
		$('.main').addClass('even');

		$('.lesson__odd').hide();
		$('.lesson__even').css('display', 'grid');
	} else {
		console.log('Нечётная')
		$('.header__even-odd').children('span').addClass('odd').text('Нечётная неделя');
		$('.main').addClass('odd');

		$('.lesson__even').hide();
		$('.lesson__odd').css('display', 'grid');
	}
	// Переключение чётности при нажатии
	$('.header__even-odd').click(function () {
		dateIndex++;
		if (dateIndex % 2 == 0) {
			console.log('Чётная')
			$('.header__even-odd').removeClass('odd').addClass('even').text('Чётная неделя');
			$('.odd').removeClass('odd').addClass('even');

			$('.lesson__odd').hide();
			$('.lesson__even').css('display', 'grid');
		} else {
			console.log('Нечётная')
			$('.header__even-odd').removeClass('even').addClass('odd').text('Нечётная неделя');
			$('.even').removeClass('even').addClass('odd');

			$('.lesson__even').hide();
			$('.lesson__odd').css('display', 'grid');
		}
	});

	// console.log(dateIndex)

	// var dayIndex = dateCurrent.getDay();
	var dayIndex = dateTest.getDay();

	// var timeIndex = dateCurrent.getHours() * 3600 + dateCurrent.getMinutes()* 60 + dateCurrent.getSeconds();
	var timeIndex = dateTest.getHours() * 3600 + dateTest.getMinutes() * 60 + dateTest.getSeconds();
	// console.log(dayIndex);
	console.log(timeIndex);

	$('#d' + dayIndex).children('.day__name').addClass('active');

	$('#d' + dayIndex).children('.day__timetable').delay(300).slideDown(300, function () {
		$(this).css('display', 'grid').toggleClass('active')
	})

	if (timeIndex > (7 * 3600 + 59 * 60 + 59)) {
		if (timeIndex < (15 * 3600 + 35 * 60 + 1)) {
			if (timeIndex < (9 * 3600 + 35 * 60 + 1)) {
				$('#d' + dayIndex).children().children(".lesson_1").addClass('active');
			} else {
				if (timeIndex < (11 * 3600 + 25 * 60 + 1)) {
					$('#d' + dayIndex).children().children(".lesson_2").addClass('active');
				} else {
					if (timeIndex < (13 * 3600 + 15 * 60 + 1)) {
						$('#d' + dayIndex).children().children(".lesson_3").addClass('active');
					} else {
						if (timeIndex < (15 * 3600 + 35 * 60 + 1)) {
							$('#d' + dayIndex).children().children(".lesson_4").addClass('active');
						}
					}
				}
			}
		}
	}
})

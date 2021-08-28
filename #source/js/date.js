let monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'илюя', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let dayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];		//? Название дней недели
const dateBegin = new Date(1630454400000); 			//? Начало семестра
const dateCheck = 604800000; 							//? Одна неделя в миллисекундах

$(document).ready(function () {
	//! ====================== Получение даты =========================
	var dateCurrent = new Date();						//? Текущая дата
	// var dateCurrent = new Date(1631349600000);		//? Тестовая дата

	console.log(dateCurrent)

	// !======================== Текущий день недели ========================================
	var dayIndex = dateCurrent.getDay();		//? Определение текущего дня недели

	$('.day_' + dayIndex).children('.day__name').addClass('active');		//? Выделение текущего дня недели в расписании

	$('.day_' + dayIndex).children('.day__timetable').delay(200).slideDown(300, function () {		//? Выкатывание расписания текущего дня недели
		$(this).css('display', 'grid').toggleClass('active')
	})
	//! ============ Вывод текущей даты над ивен одд ==================

	function getCurrentDate() {
		dateCurrent = new Date();								//? Текущая дата
		// var dateCurrent = new Date(1631349600000);		//? Тестовая дата

		var dateCurrentDisplay = `Сегодня: ${dateCurrent.getDate()} ${monthName[dateCurrent.getMonth()]} ${dateCurrent.getFullYear()} года (${dayName[dayIndex]})`;
		$('.week__date').text(dateCurrentDisplay)
	}

	$(document).ready(getCurrentDate());
	setInterval(getCurrentDate, 1000);
	//! ================= Вывод времени над ивен одд ====================
	function getCurrentTime() {
		var timeCurrentDisplay = "Время: ";
		if (dateCurrent.getHours() < 10) { timeCurrentDisplay = timeCurrentDisplay + "0"; }
		timeCurrentDisplay = timeCurrentDisplay + `${dateCurrent.getHours()}:`

		if (dateCurrent.getMinutes() < 10) { timeCurrentDisplay = timeCurrentDisplay + "0"; }
		timeCurrentDisplay = timeCurrentDisplay + `${dateCurrent.getMinutes()}:`

		if (dateCurrent.getSeconds() < 10) { timeCurrentDisplay = timeCurrentDisplay + "0"; }
		timeCurrentDisplay = timeCurrentDisplay + `${dateCurrent.getSeconds()}`
		// console.log(timeCurrentDisplay);
		$('.week__time').text(timeCurrentDisplay);
	}

	$(document).ready(getCurrentTime());
	setInterval(getCurrentTime, 1000)
	//! ==============  Чётный или нечётный =========================
	var dateMinus = dateCurrent.getTime() - dateBegin.getTime();		//? Сколько прошло миллисекунд с начала семестра
	var dateIndex = Math.floor(dateMinus / dateCheck);				//? Вычисление индекса чётности недели

	function oddEven() {
		dateIndex++;
		if (dateIndex % 2 == 0) {														//? Определение и запись чётности
			console.log('Чётная')
			$('.week__even-odd').removeClass('odd').addClass('even').text('Чётная неделя');
			$('.main').removeClass('odd').addClass('even');
			$('.nav__tab').removeClass('odd').addClass('even');


			$('.lesson_even').css('display', 'grid');
			$('.lesson_odd').each(function () {
				if ($(this).hasClass('lesson_even') == false) {
					$(this).css('display', 'none');
				}
			})
		} else {
			console.log('Нечётная')
			$('.week__even-odd').removeClass('even').addClass('odd').text('Нечётная неделя');
			$('.main').removeClass('even').addClass('odd');
			$('.nav__tab').removeClass('even').addClass('odd');

			$('.lesson_odd').css('display', 'grid');
			$('.lesson_even').each(function () {
				if ($(this).hasClass('lesson_odd') == false) {
					$(this).css('display', 'none');
				}
			})
		}
	}

	setTimeout(oddEven, 0)

	$('.week__even-odd').click(oddEven);
	/*
	//!====================== Переключение чётности при нажатии ==================
	$('.week__even-odd').click(function () {
		dateIndex++;
		if (dateIndex % 2 == 0) {
			console.log('Чётная')
			$('.week__even-odd').text('Чётная неделя');
			$('.odd').removeClass('odd').addClass('even');

			$('.lesson__odd').hide();
			$('.lesson__even').css('display', 'grid');
		} else {
			console.log('Нечётная')
			$('.week__even-odd').text('Нечётная неделя');
			$('.even').removeClass('even').addClass('odd');

			$('.lesson__even').hide();
			$('.lesson__odd').css('display', 'grid');
		}
	});
	*/

	// !========================== Текущая пара ================================================
	var timeIndex = dateCurrent.getHours() * 3600 + dateCurrent.getMinutes() * 60 + dateCurrent.getSeconds();		//? Перевод часов и минус в секунды


	if (timeIndex > (lessonTime['start'][0] - 1)) {
		if (timeIndex < (lessonTime['end'][lessonTime['end'].length - 1] + 1)) {
			for (let i = 0; i < lessonTime['end'].length; i++) {
				if (timeIndex < lessonTime['end'][i]) {
					$('.day_' + dayIndex).children().children('.lesson_' + (i + 1)).addClass('active');
					break;
				}
			}
		}
	}


	/*
		if (timeIndex > (7 * 3600 + 59 * 60 + 59)) {
			if (timeIndex < (15 * 3600 + 35 * 60 + 1)) {
				if (timeIndex < (9 * 3600 + 35 * 60 + 1)) {
					$('.day_' + dayIndex).children().children(".lesson_1").addClass('active');
				} else {
					if (timeIndex < (11 * 3600 + 25 * 60 + 1)) {
						$('.day_' + dayIndex).children().children(".lesson_2").addClass('active');
					} else {
						if (timeIndex < (13 * 3600 + 15 * 60 + 1)) {
							$('.day_' + dayIndex).children().children(".lesson_3").addClass('active');
						} else {
							if (timeIndex < (15 * 3600 + 35 * 60 + 1)) {
								$('.day_' + dayIndex).children().children(".lesson_4").addClass('active');
							}
						}
					}
				}
			}
		}
	*/
})
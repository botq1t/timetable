// ! 117
function getNowLesson117() {
	const nowWeekIndex117 = weekIndex;
	var j = 1;
	var nowLesson = {
		1: {
			'name': '',
			'type': '',
			'auditory': '',
		},
		2: {
			'name': '',
			'type': '',
			'auditory': '',
		},
		3: {
			'name': '',
			'type': '',
			'auditory': '',
		},
		4: {
			'name': '',
			'type': '',
			'auditory': '',
		},
	};
	// ! Заполнение массива сегодняшних пар
	while (lessonsU117[dayIndex][j] != undefined) {
		var ii = lessonsU117[dayIndex][j]['index'];
		// console.log(ii);
		switch (lessonsU117[dayIndex][j]['parity']) {
			case 'both':
				nowLesson[ii]['name'] = lessonsU117[dayIndex][j]['name'];
				nowLesson[ii]['type'] = lessonsU117[dayIndex][j]['type'];
				nowLesson[ii]['auditory'] = lessonsU117[dayIndex][j]['auditory'];
				break;
			case 'even':
				if (nowWeekIndex117 % 2 == 0) {
					nowLesson[ii]['name'] = lessonsU117[dayIndex][j]['name'];
					nowLesson[ii]['type'] = lessonsU117[dayIndex][j]['type'];
					nowLesson[ii]['auditory'] = lessonsU117[dayIndex][j]['auditory'];
				}
				break;
			case 'odd':
				if (nowWeekIndex117 % 2 != 0) {
					nowLesson[ii]['name'] = lessonsU117[dayIndex][j]['name'];
					nowLesson[ii]['type'] = lessonsU117[dayIndex][j]['type'];
					nowLesson[ii]['auditory'] = lessonsU117[dayIndex][j]['auditory'];
				}
				break;
		}
		j++;
	}
	console.log('У117', nowLesson);

	// ! Вычисление количества сеггодняшних пар
	var k = 4;
	while ($('#u117-target').children(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').last().hasClass(`lesson_${k}`) == false) {
		k--;
	}
	// console.log(timeInSeconds);
	// console.log(lessonTimeSeconds[1]['begin']);
	// console.log(lessonTimeSeconds[k]['end']);
	// ? Если сейчас до первой пары
	if (timeInSeconds < lessonTimeSeconds[1]['begin']) {
		$('#now_117').children('.current').css('display', 'none');
		$('#now_117').children('.next').children('.now__auditory').text(`Следующая (${nowLesson[1]['auditory']})`)
		$('#now_117').children('.next').children('.now__lesson').children('.now__name').text(nowLesson[1]['name'])
		$('#now_117').children('.next').children('.now__lesson').children('.now__type').text(nowLesson[1]['type'])

		var nowNextCountdown = lessonTimeSeconds[1]['begin'] - timeInSeconds;
		nowNextCountdownMinutes = Math.floor(nowNextCountdown / 60);
		nowNextCountdownSeconds = nowNextCountdown - (nowNextCountdownMinutes * 60);
		if (nowNextCountdownMinutes > 60) {
			$('#now_117').children('.next').children('.now__countdown').css('display', 'none');
		} else {
			if (nowNextCountdownMinutes > 0) {
				$('#now_117').children('.next').children('.now__countdown').css('display', 'block');
				$('#now_117').children('.next').children('.now__countdown').text(`До начала - ${nowNextCountdownMinutes} мин ${nowNextCountdownSeconds} сек`);
			} else {
				$('#now_117').children('.next').children('.now__countdown').css('display', 'block');
				$('#now_117').children('.next').children('.now__countdown').text(`До начала - ${nowNextCountdownSeconds} сек`);
			}
		}
	} else {
		// ? Если сейчас после последней пары
		if (timeInSeconds > (lessonTimeSeconds[k]['end'] - 1)) {
			$('#now_117').children('.current').css('display', 'none');
			$('#now_117').children('.next').css('display', 'none');
			$('#now_117').children('.now__gone').css('display', 'block').text('На сегодня пары закончились)');

		} else {
			// ? Если сейчас во время пар
			$('#now__117').children('.now__gone').css('display', 'none');
			// ? Номер текущей пары
			for (let i = 1; i < 5; i++) {
				if (timeInSeconds > (lessonTimeSeconds[i]['begin'] - 1)) {
					if (timeInSeconds < (lessonTimeSeconds[i]['end'] + 1)) {
						var nowLessonIndex = i;
						break;
					}
				}
			}
			// ? Пара текущая
			if (nowLessonIndex == undefined) {
				$('#now_117').children('.current').css('display', 'none');
			} else {
				if (nowLesson[nowLessonIndex]['name'] == 'no') {
					$('#now_117').children('.current').css('display', 'none');
				} else {
					$('#now_117').children('.current').css('display', 'flex');
					$('#now_117').children('.current').children('.now__auditory').text(`Сейчас (${nowLesson[nowLessonIndex]['auditory']})`);
					$('#now_117').children('.current').children('.now__lesson').children('.now__name').text(nowLesson[nowLessonIndex]['name']);
					$('#now_117').children('.current').children('.now__lesson').children('.now__type').text(nowLesson[nowLessonIndex]['type']);

					var nowCountdownEnd = lessonTimeSeconds[nowLessonIndex]['end'] - timeInSeconds;
					nowCountdownMinutes = Math.floor(nowCountdownEnd / 60);
					nowCountdownSeconds = nowCountdownEnd - (nowCountdownMinutes * 60);
					// console.log(nowCountdownEnd);
					// console.log(nowCountdownMinutes);
					// console.log(nowCountdownSeconds);

					if (nowCountdownMinutes > 0) {
						$('#now_117').children('.current').children('.now__countdown').html(`<p>До конца пары:</p><p>${nowCountdownMinutes} мин. ${nowCountdownSeconds} сек.</p>`);
					} else {
						$('#now_117').children('.current').children('.now__countdown').html(`<p>До конца пары:</p><p>${nowCountdownSeconds} сек.</p>`);
					}

				}
			}
			// ? Пара следующая
			if (nowLessonIndex < k) {
				$('#now_117').children('.next').css('display', 'flex');
				$('#now_117').children('.next').children('.now__auditory').text(`Следующая (${nowLesson[nowLessonIndex + 1]['auditory']})`);
				$('#now_117').children('.next').children('.now__lesson').children('.now__name').text(nowLesson[nowLessonIndex + 1]['name']);
				$('#now_117').children('.next').children('.now__lesson').children('.now__type').text(nowLesson[nowLessonIndex + 1]['type']);

				/*var nowNextCountdownBegin = lessonTimeSeconds[nowLessonIndex + 1]['begin'] - timeInSeconds;
				nowNextCountdownMinutes = Math.floor(nowNextCountdownBegin / 60);
				nowNextCountdownSeconds = nowNextCountdownBegin - (nowNextCountdownMinutes * 60);
				// console.log(nowNextCountdownBegin);
				// console.log(nowNextCountdownMinutes);
				// console.log(nowNextCountdownSeconds);
	
				if (nowNextCountdownMinutes > 0) {
					$('#now_117').children('.next').children('.now__countdown').html(`<p>До начала пары:</p><p>${nowNextCountdownMinutes} мин. ${nowNextCountdownSeconds} сек.</p>`);
				} else {
					$('#now_117').children('.next').children('.now__countdown').html(`<p>До начала пары:<p></p>${nowNextCountdownSeconds} сек.</p>`);
				}*/
				if (nowLesson[nowLessonIndex]['name'] == 'no') {
					$('#now_117').children('.next').children('.now__countdown').css('display', 'flex').prev().removeClass('hidden');
					var nowNextCountdownBegin = lessonTimeSeconds[nowLessonIndex + 1]['begin'] - timeInSeconds;
					nowNextCountdownMinutes = Math.floor(nowNextCountdownBegin / 60);
					nowNextCountdownSeconds = nowNextCountdownBegin - (nowNextCountdownMinutes * 60);
					// console.log(nowNextCountdownBegin);
					// console.log(nowNextCountdownMinutes);
					// console.log(nowNextCountdownSeconds);

					if (nowNextCountdownMinutes > 0) {
						$('#now_117').children('.next').children('.now__countdown').html(`<p>До начала пары:</p><p>${nowNextCountdownMinutes} мин. ${nowNextCountdownSeconds} сек.</p>`);
					} else {
						$('#now_117').children('.next').children('.now__countdown').html(`<p>До начала пары:<p></p>${nowNextCountdownSeconds} сек.</p>`);
					}
				} else {
					$('#now_117').children('.next').children('.now__countdown').css('display', 'none').prev().addClass('hidden');
				}
			} else {
				$('#now_117').children('.next').css('display', 'none');
				$('#now_117').children('.current').addClass('noNext');
			}
			if (nowLessonIndex == undefined) {
				for (let i = 1; i < 4; i++) {
					if (timeInSeconds > (breakTimeSeconds['big'][i]['begin'] - 1)) {
						if (timeInSeconds < (breakTimeSeconds['big'][i]['end'] + 1)) {
							var nowLessonIndex = i;
							break;
						}
					}
				}
				$('#now_117').children('.next').css('display', 'flex');
				$('#now_117').children('.next').children('.now__auditory').text(`Следующая (${nowLesson[nowLessonIndex + 1]['auditory']})`);
				$('#now_117').children('.next').children('.now__lesson').children('.now__name').text(nowLesson[nowLessonIndex + 1]['name']);
				$('#now_117').children('.next').children('.now__lesson').children('.now__type').text(nowLesson[nowLessonIndex + 1]['type']);

				var nowNextCountdownBegin = lessonTimeSeconds[nowLessonIndex + 1]['begin'] - timeInSeconds;
				nowNextCountdownMinutes = Math.floor(nowNextCountdownBegin / 60);
				nowNextCountdownSeconds = nowNextCountdownBegin - (nowNextCountdownMinutes * 60);
				// console.log(nowNextCountdownBegin);
				// console.log(nowNextCountdownMinutes);
				// console.log(nowNextCountdownSeconds);
				$('#now_117').children('.next').children('.now__countdown').css('display', 'flex').prev().removeClass('hidden');
				if (nowNextCountdownMinutes > 0) {
					$('#now_117').children('.next').children('.now__countdown').html(`<p>До начала пары:</p><p>${nowNextCountdownMinutes} мин. ${nowNextCountdownSeconds} сек.</p>`);
				} else {
					$('#now_117').children('.next').children('.now__countdown').html(`<p>До начала пары:<p></p>${nowNextCountdownSeconds} сек.</p>`);
				}
			}
		}
	}
}
// ! 217
function getNowLesson217() {
	const nowWeekIndex217 = weekIndex;
	var j = 1;
	var nowLesson = {
		1: {
			'name': '',
			'type': '',
			'auditory': '',
		},
		2: {
			'name': '',
			'type': '',
			'auditory': '',
		},
		3: {
			'name': '',
			'type': '',
			'auditory': '',
		},
		4: {
			'name': '',
			'type': '',
			'auditory': '',
		},
	};
	// ! Заполнение массива сегодняшних пар
	while (lessonsU217[dayIndex][j] != undefined) {
		var ii = lessonsU217[dayIndex][j]['index'];
		// console.log(ii);
		switch (lessonsU217[dayIndex][j]['parity']) {
			case 'both':
				nowLesson[ii]['name'] = lessonsU217[dayIndex][j]['name'];
				nowLesson[ii]['type'] = lessonsU217[dayIndex][j]['type'];
				nowLesson[ii]['auditory'] = lessonsU217[dayIndex][j]['auditory'];
				break;
			case 'even':
				if (nowWeekIndex217 % 2 == 0) {
					nowLesson[ii]['name'] = lessonsU217[dayIndex][j]['name'];
					nowLesson[ii]['type'] = lessonsU217[dayIndex][j]['type'];
					nowLesson[ii]['auditory'] = lessonsU217[dayIndex][j]['auditory'];
				}
				break;
			case 'odd':
				if (nowWeekIndex217 % 2 != 0) {
					nowLesson[ii]['name'] = lessonsU217[dayIndex][j]['name'];
					nowLesson[ii]['type'] = lessonsU217[dayIndex][j]['type'];
					nowLesson[ii]['auditory'] = lessonsU217[dayIndex][j]['auditory'];
				}
				break;
		}
		j++;
	}
	// console.log(nowLesson);

	// ! Вычисление количества сеггодняшних пар
	var k = 4;
	while ($('#u217-target').children(`.day_${dayIndex}`).children('.day__timetable').children('.lesson').last().hasClass(`lesson_${k}`) == false) {
		k--;
	}
	// console.log(timeInSeconds);
	// console.log(lessonTimeSeconds[1]['begin']);
	// console.log(lessonTimeSeconds[k]['end']);
	// ? Если сейчас до первой пары
	if (timeInSeconds < lessonTimeSeconds[1]['begin']) {
		$('#now_217').children('.current').css('display', 'none');
		$('#now_217').children('.next').children('.now__auditory').text(`Следующая (${nowLesson[1]['auditory']})`)
		$('#now_217').children('.next').children('.now__lesson').children('.now__name').text(nowLesson[1]['name'])
		$('#now_217').children('.next').children('.now__lesson').children('.now__type').text(nowLesson[1]['type'])

		var nowNextCountdown = lessonTimeSeconds[1]['begin'] - timeInSeconds;
		nowNextCountdownMinutes = Math.floor(nowNextCountdown / 60);
		nowNextCountdownSeconds = nowNextCountdown - (nowNextCountdownMinutes * 60);
		if (nowNextCountdownMinutes > 60) {
			$('#now_217').children('.next').children('.now__countdown').css('display', 'none');
		} else {
			if (nowNextCountdownMinutes > 0) {
				$('#now_217').children('.next').children('.now__countdown').css('display', 'block');
				$('#now_217').children('.next').children('.now__countdown').text(`До начала - ${nowNextCountdownMinutes} мин ${nowNextCountdownSeconds} сек`);
			} else {
				$('#now_217').children('.next').children('.now__countdown').css('display', 'block');
				$('#now_217').children('.next').children('.now__countdown').text(`До начала - ${nowNextCountdownSeconds} сек`);
			}
		}
	} else {
		// ? Если сейчас после последней пары
		if (timeInSeconds > (lessonTimeSeconds[k]['end'] - 1)) {
			$('#now_217').children('.current').css('display', 'none');
			$('#now_217').children('.next').css('display', 'none');
			$('#now_217').children('.now__gone').css('display', 'block').text('На сегодня пары закончились)');

		} else {
			// ? Если сейчас во время пар
			$('#now__217').children('.now__gone').css('display', 'none');
			// ? Номер текущей пары
			for (let i = 1; i < 5; i++) {
				if (timeInSeconds > (lessonTimeSeconds[i]['begin'] - 1)) {
					if (timeInSeconds < (lessonTimeSeconds[i]['end'] + 1)) {
						var nowLessonIndex = i;
						break;
					}
				}
			}
			// ? Пара текущая
			if (nowLessonIndex == undefined) {
				$('#now_217').children('.current').css('display', 'none');
			} else {
				if (nowLesson[nowLessonIndex]['name'] == 'no') {
					$('#now_217').children('.current').css('display', 'none');
				} else {
					$('#now_217').children('.current').css('display', 'flex');
					$('#now_217').children('.current').children('.now__auditory').text(`Сейчас (${nowLesson[nowLessonIndex]['auditory']})`);
					$('#now_217').children('.current').children('.now__lesson').children('.now__name').text(nowLesson[nowLessonIndex]['name']);
					$('#now_217').children('.current').children('.now__lesson').children('.now__type').text(nowLesson[nowLessonIndex]['type']);

					var nowCountdownEnd = lessonTimeSeconds[nowLessonIndex]['end'] - timeInSeconds;
					nowCountdownMinutes = Math.floor(nowCountdownEnd / 60);
					nowCountdownSeconds = nowCountdownEnd - (nowCountdownMinutes * 60);
					// console.log(nowCountdownEnd);
					// console.log(nowCountdownMinutes);
					// console.log(nowCountdownSeconds);

					if (nowCountdownMinutes > 0) {
						$('#now_217').children('.current').children('.now__countdown').html(`<p>До конца пары:</p><p>${nowCountdownMinutes} мин. ${nowCountdownSeconds} сек.</p>`);
					} else {
						$('#now_217').children('.current').children('.now__countdown').html(`<p>До конца пары:</p><p>${nowCountdownSeconds} сек.</p>`);
					}

				}
			}
			// ? Пара следующая
			if (nowLessonIndex < k) {
				$('#now_217').children('.next').css('display', 'flex');
				$('#now_217').children('.next').children('.now__auditory').text(`Следующая (${nowLesson[nowLessonIndex + 1]['auditory']})`);
				$('#now_217').children('.next').children('.now__lesson').children('.now__name').text(nowLesson[nowLessonIndex + 1]['name']);
				$('#now_217').children('.next').children('.now__lesson').children('.now__type').text(nowLesson[nowLessonIndex + 1]['type']);

				/*var nowNextCountdownBegin = lessonTimeSeconds[nowLessonIndex + 1]['begin'] - timeInSeconds;
				nowNextCountdownMinutes = Math.floor(nowNextCountdownBegin / 60);
				nowNextCountdownSeconds = nowNextCountdownBegin - (nowNextCountdownMinutes * 60);
				// console.log(nowNextCountdownBegin);
				// console.log(nowNextCountdownMinutes);
				// console.log(nowNextCountdownSeconds);
	
				if (nowNextCountdownMinutes > 0) {
					$('#now_217').children('.next').children('.now__countdown').html(`<p>До начала пары:</p><p>${nowNextCountdownMinutes} мин. ${nowNextCountdownSeconds} сек.</p>`);
				} else {
					$('#now_217').children('.next').children('.now__countdown').html(`<p>До начала пары:<p></p>${nowNextCountdownSeconds} сек.</p>`);
				}*/
				if (nowLesson[nowLessonIndex]['name'] == 'no') {
					$('#now_217').children('.next').children('.now__countdown').css('display', 'flex').prev().removeClass('hidden');
					var nowNextCountdownBegin = lessonTimeSeconds[nowLessonIndex + 1]['begin'] - timeInSeconds;
					nowNextCountdownMinutes = Math.floor(nowNextCountdownBegin / 60);
					nowNextCountdownSeconds = nowNextCountdownBegin - (nowNextCountdownMinutes * 60);
					// console.log(nowNextCountdownBegin);
					// console.log(nowNextCountdownMinutes);
					// console.log(nowNextCountdownSeconds);

					if (nowNextCountdownMinutes > 0) {
						$('#now_217').children('.next').children('.now__countdown').html(`<p>До начала пары:</p><p>${nowNextCountdownMinutes} мин. ${nowNextCountdownSeconds} сек.</p>`);
					} else {
						$('#now_217').children('.next').children('.now__countdown').html(`<p>До начала пары:<p></p>${nowNextCountdownSeconds} сек.</p>`);
					}
				} else {
					$('#now_217').children('.next').children('.now__countdown').css('display', 'none').prev().addClass('hidden');
				}
			} else {
				$('#now_217').children('.next').css('display', 'none');
				$('#now_217').children('.current').addClass('noNext');
			}
			if (nowLessonIndex == undefined) {
				for (let i = 1; i < 4; i++) {
					if (timeInSeconds > (breakTimeSeconds['big'][i]['begin'] - 1)) {
						if (timeInSeconds < (breakTimeSeconds['big'][i]['end'] + 1)) {
							var nowLessonIndex = i;
							break;
						}
					}
				}
				$('#now_217').children('.next').css('display', 'flex');
				$('#now_217').children('.next').children('.now__auditory').text(`Следующая (${nowLesson[nowLessonIndex + 1]['auditory']})`);
				$('#now_217').children('.next').children('.now__lesson').children('.now__name').text(nowLesson[nowLessonIndex + 1]['name']);
				$('#now_217').children('.next').children('.now__lesson').children('.now__type').text(nowLesson[nowLessonIndex + 1]['type']);

				var nowNextCountdownBegin = lessonTimeSeconds[nowLessonIndex + 1]['begin'] - timeInSeconds;
				nowNextCountdownMinutes = Math.floor(nowNextCountdownBegin / 60);
				nowNextCountdownSeconds = nowNextCountdownBegin - (nowNextCountdownMinutes * 60);
				// console.log(nowNextCountdownBegin);
				// console.log(nowNextCountdownMinutes);
				// console.log(nowNextCountdownSeconds);
				$('#now_217').children('.next').children('.now__countdown').css('display', 'flex').prev().removeClass('hidden');
				if (nowNextCountdownMinutes > 0) {
					$('#now_217').children('.next').children('.now__countdown').html(`<p>До начала пары:</p><p>${nowNextCountdownMinutes} мин. ${nowNextCountdownSeconds} сек.</p>`);
				} else {
					$('#now_217').children('.next').children('.now__countdown').html(`<p>До начала пары:<p></p>${nowNextCountdownSeconds} сек.</p>`);
				}
			}
		}
	}
}



$(document).ready(function () {
	setTimeout(getNowLesson117, 0);
	setInterval(getNowLesson117, 1000);
	setTimeout(getNowLesson217, 0);
	setInterval(getNowLesson217, 1000);

})
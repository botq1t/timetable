var nowLessonArray = {
	117: {
		1: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		},
		2: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		},
		3: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		},
		4: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		}
	},
	217: {
		1: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		},
		2: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		},
		3: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		},
		4: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no'
		}
	}
}
var nowNextLessonArray = {
	117: {
		0: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
		1: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
		2: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
		3: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
	},
	217: {
		0: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
		1: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
		2: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
		3: {
			'name': 'no',
			'type': 'no',
			'auditory': 'no',
			'begin': 0,
			'index': 0,
		},
	},
}

if (lessons[117][dayIndex]['lessons'] == false) {
	$('#now_117').children('.now__content').slideUp(300);
	$('#now_117').children('.now__gone').html(`<span class="icon-bokal"></span>Выходной<span class="icon-bokal"></span>`).slideDown(300, function () { $(this).css('display', 'flex'); })
	$('#now_217').children('.now__content').slideUp(300);
	$('#now_217').children('.now__gone').html('<span class="icon-bokal"></span>Выходной<span class="icon-bokal"></span>').slideDown(300, function () { $(this).css('display', 'flex'); })
} else {
	// * ====================================================================
	// ! ========================= Update ===================================
	function nowUpdate(group) {
		// console.log('check updates', timeInSeconds);
		if (timeInSeconds >= 0 && timeInSeconds <= 5) {
			makeNowLessonArray(group);
			makeNowNextLessonArray(group);
			nowCheckAfter(group);
			nowCheck(group);
			nowNextLesson(group);
			$(`#now_${group}`).children('.now__gone').slideUp(300);
		}
		if (timeInSeconds >= lessonTimeSeconds[getLessonAmount(group)]['end'] && timeInSeconds <= (lessonTimeSeconds[getLessonAmount(group)]['end'] + 3)) {
			console.log('update1');
			nowCheckAfter(group);
			nowCheck(group);
			nowNextLesson(group);
			nowLesson(group);
		}
		if (timeInSeconds >= lessonTimeSeconds[1]['begin'] && timeInSeconds <= (lessonTimeSeconds[getLessonAmount(group)]['end'] + 3)) {
			if (getCurrentLessonIndex() == undefined) {
				console.log('update2');
				nowCheck(group);
				nowLesson(group);
				nowNextLesson(group);
			}
		}
	}

	setInterval(nowUpdate, 500, 117);
	setInterval(nowUpdate, 500, 217);
	// * ====================================================================
	// ! ================= Массив пар сегодняшних ===========================
	function makeNowLessonArray(group) {
		var i = 1;
		while (lessons[group][dayIndex][i] != undefined) {
			switch (lessons[group][dayIndex][i]['parity']) {
				case 'both':
					nowLessonArray[group][lessons[group][dayIndex][i]['index']]['name'] = lessons[group][dayIndex][i]['name'];
					nowLessonArray[group][lessons[group][dayIndex][i]['index']]['type'] = lessons[group][dayIndex][i]['type'];
					nowLessonArray[group][lessons[group][dayIndex][i]['index']]['auditory'] = lessons[group][dayIndex][i]['auditory'];
					break;
				case 'odd':
					if (nowWeekIndex % 2 != 0) {
						nowLessonArray[group][lessons[group][dayIndex][i]['index']]['name'] = lessons[group][dayIndex][i]['name'];
						nowLessonArray[group][lessons[group][dayIndex][i]['index']]['type'] = lessons[group][dayIndex][i]['type'];
						nowLessonArray[group][lessons[group][dayIndex][i]['index']]['auditory'] = lessons[group][dayIndex][i]['auditory'];
					}
					break;
				case 'even':
					if (nowWeekIndex % 2 == 0) {
						nowLessonArray[group][lessons[group][dayIndex][i]['index']]['name'] = lessons[group][dayIndex][i]['name'];
						nowLessonArray[group][lessons[group][dayIndex][i]['index']]['type'] = lessons[group][dayIndex][i]['type'];
						nowLessonArray[group][lessons[group][dayIndex][i]['index']]['auditory'] = lessons[group][dayIndex][i]['auditory'];
					}
					break;
			}
			i++;
		}
	}


	makeNowLessonArray(117);
	makeNowLessonArray(217);
	console.log('nowLessonArray', nowLessonArray)
	// * ====================================================================
	// ! ================== Массив пар следующих ============================
	function makeNowNextLessonArray(group) {
		var i = 0;
		while (i < getLessonAmount(group)) {
			console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

			j = i + 1;
			while (nowLessonArray[group][j]['name'] == 'no')
				j++;
			nowNextLessonArray[group][i]['name'] = nowLessonArray[group][j]['name'];
			nowNextLessonArray[group][i]['type'] = nowLessonArray[group][j]['type'];
			nowNextLessonArray[group][i]['auditory'] = nowLessonArray[group][j]['auditory'];
			nowNextLessonArray[group][i]['begin'] = lessonTimeSeconds[j]['begin'];
			nowNextLessonArray[group][i]['index'] = j;
			// console.log(group, 'для', i, 'это', j);
			i++;
		}
	}

	makeNowNextLessonArray(117);
	makeNowNextLessonArray(217);
	console.log('nowNextLessonArray', nowNextLessonArray)
	// * ====================================================================
	// ! ============== Проверка окончания пар =========================
	function nowCheckAfter(group) {
		var groupTag = `#now_${group}`;
		if (timeInSeconds >= lessonTimeSeconds[getLessonAmount(group)]['end']) {
			console.log(group, 'сейчас после окончания пар')
			$(groupTag).children('.current').slideUp(300);
			$(groupTag).children('.now__gone').html('На сегодня пары закончились!').slideDown(300, function () { $(this).css('display', 'flex'); })
		} /*else {
			$(groupTag).children('.now__gone').slideUp(300);
			$(groupTag).children('.current').slideDown(300, function () { $(this).css('display', 'flex'); });
		}*/


	}

	$(document).ready(function () {
		nowCheckAfter(117);
		nowCheckAfter(217);
	})
	// * ====================================================================
	// ! ============== Проверка наличия текущей пары =======================
	function nowCheck(group) {
		var groupTag = `#now_${group}`;
		var nowLessonIndex = getCurrentLessonIndex();
		if (nowLessonIndex == undefined) {
			console.log(group, 'сейчас нет пары');
			$(groupTag).children('.current').slideUp(300);
		} else if (nowLessonArray[group][nowLessonIndex]['name'] != 'no' && timeInSeconds < lessonTimeSeconds[getLessonAmount(group)]['end']) {
			console.log(group, 'сейчас есть пара');
			$(groupTag).children('.current').slideDown(300, function () { $(this).css('display', 'flex'); });
		}
	}

	$(document).ready(function () {
		nowCheck(117);
		nowCheck(217);
	})
	// * ====================================================================
	// ! ================ Прописывание текущей пары =========================
	function nowLesson(group) {
		var groupTag = `#now_${group}`;
		var nowLessonIndex = getCurrentLessonIndex();
		if (nowLessonIndex != undefined) {
			$(groupTag).children('.current').children('.now__auditory').html(`Сейчас: ${nowLessonIndex}-ая (${nowLessonArray[group][nowLessonIndex]['auditory']})`);
			$(groupTag).children('.current').children('.now__lesson').children('.now__name').html(nowLessonArray[group][nowLessonIndex]['name']);
			$(groupTag).children('.current').children('.now__lesson').children('.now__type').html(nowLessonArray[group][nowLessonIndex]['type']);

			function nowLessonTimeUpdate(group) {
				var groupTag = `#now_${group}`;
				var nowLessonTimeEstimateInSeconds = lessonTimeSeconds[nowLessonIndex]['end'] - timeInSeconds;
				var nowLessonTimeEstimate = getHMS(nowLessonTimeEstimateInSeconds);
				var nowLessonTimeString = getTimeString(nowLessonTimeEstimate['hours'], nowLessonTimeEstimate['minutes'], nowLessonTimeEstimate['seconds']);

				$(groupTag).children('.current').children('.now__countdown').html(`До конца: ${nowLessonTimeString}`)
				// console.log(group, 'now lesson time updated')
			}
			/*if (nowLessonArray[group][nowLessonIndex]['name'] == 'no')
				$(groupTag).children('.current').slideUp(300);
			else $(groupTag).children('.current').slideDown(300, function () { $(this).css('display', 'flex'); });*/
			nowLessonTimeUpdate(group);
			setInterval(nowLessonTimeUpdate, 500, group);
		}
	}

	$(document).ready(function () {
		nowLesson(117);
		// setInterval(nowLesson, 1000, 117);
		nowLesson(217);
		// setInterval(nowLesson, 1000, 217);
	})
	// * ====================================================================
	// ! ================ Прописывание следующей пары =======================
	// * ====================================================================
	function nowNextLesson(group) {
		var groupTag = `#now_${group}`;
		console.log(group, 'сегодня пар', getLessonAmount(group));
		var i;
		if (timeInSeconds < lessonTimeSeconds[1]['begin']) {
			console.log(group, 'перед первой парой');
			i = 0;
		} else if (timeInSeconds >= lessonTimeSeconds[1]['begin'] && timeInSeconds < lessonTimeSeconds[getLessonAmount(group)]['begin']) {
			i = getCurrentLessonIndex(group)
			if (i == undefined)
				i = getCurrentBreakIndex(group)
			console.log(group, 'между началом первой и началом последней');
		} else if (timeInSeconds >= lessonTimeSeconds[getLessonAmount(group)]['begin']) {
			$(groupTag).children('.next').slideUp(300);
			$(groupTag).children('.current').addClass('noNext');
			console.log(group, 'после начала последней');
			return;
		}
		console.log(group, 'текущая пара', i);
		var bufer = $(groupTag).children('.next');
		bufer.slideDown(300, function () { $(this).css('display', 'flex') });
		bufer.children('.now__auditory').html(`Следующая: ${nowNextLessonArray[group][i]['index']}-ая (${nowNextLessonArray[group][i]['auditory']})`)
		bufer.children('.now__lesson').children('.now__name').html(nowNextLessonArray[group][i]['name'])
		bufer.children('.now__lesson').children('.now__type').html(nowNextLessonArray[group][i]['type'])

		function nowNextLessonTimeUpdate(group) {
			var temp = nowNextLessonArray[group][i]['begin'] - timeInSeconds;
			temp2 = getHMS(temp);
			temp3 = getTimeString(temp2['hours'], temp2['minutes'], temp2['seconds'])
			bufer.children('.now__countdown').html(`До начала: ${temp3}`);
			// console.log(group, 'next lesson time updated')
		}
		nowNextLessonTimeUpdate(group);
		setInterval(nowNextLessonTimeUpdate, 500, group);
	}

	nowNextLesson(117);
	nowNextLesson(217);
}
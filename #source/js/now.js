let nowLesson = {
	117: { 'now': [], 'next': [] },
	217: { 'now': [], 'next': [] },
};
let nowDayIndex = null;



nowUpdate();
setInterval(nowUpdate, 1000);
nowUpdate();
setInterval(nowUpdate, 1000);

nowDisplayItems(117);
nowDisplayItems(217);
// setInterval(nowDisplayItemsUpdate, 1000, 117);
// setInterval(nowDisplayItemsUpdate, 1000, 217);

// ? Functions
function nowCreateArray(group) {
	nowLesson[group] = { 'now': [], 'next': [] };
	var i = 1;
	var j = 1;
	nowLesson[group]['now'].push(null);
	// ! Now
	while (lessons[group][dayIndex][i] != undefined) {
		switch (lessons[group][dayIndex][i]['parity']) {
			case 'both':
				nowLesson[group]['now'].push({ 'name': '', 'type': '', 'auditory': '', 'endTime': 0 });
				nowLesson[group]['now'][j]['name'] = lessons[group][dayIndex][i]['name'];
				nowLesson[group]['now'][j]['type'] = lessons[group][dayIndex][i]['type'];
				nowLesson[group]['now'][j]['auditory'] = lessons[group][dayIndex][i]['auditory'];
				nowLesson[group]['now'][j]['endTime'] = lessonTimeSeconds[j]['end'];
				j++;
				break;
			case 'odd':
				if (weekIndex % 2 != 0) {
					nowLesson[group]['now'].push({ 'name': '', 'type': '', 'auditory': '', 'endTime': 0 });
					nowLesson[group]['now'][j]['name'] = lessons[group][dayIndex][i]['name'];
					nowLesson[group]['now'][j]['type'] = lessons[group][dayIndex][i]['type'];
					nowLesson[group]['now'][j]['auditory'] = lessons[group][dayIndex][i]['auditory'];
					nowLesson[group]['now'][j]['endTime'] = lessonTimeSeconds[j]['end'];
					j++;
				}
				break;
			case 'even':
				if (weekIndex % 2 == 0) {
					nowLesson[group]['now'].push({ 'name': '', 'type': '', 'auditory': '', 'endTime': 0 });
					nowLesson[group]['now'][j]['name'] = lessons[group][dayIndex][i]['name'];
					nowLesson[group]['now'][j]['type'] = lessons[group][dayIndex][i]['type'];
					nowLesson[group]['now'][j]['auditory'] = lessons[group][dayIndex][i]['auditory'];
					nowLesson[group]['now'][j]['endTime'] = lessonTimeSeconds[j]['end'];
					j++;
				}
				break;
		}

		i++;
	}
	// ! Next

	for (let i = 0; i < (nowLesson[group]['now'].length - 1); i++) {
		nowLesson[group]['next'].push({ 'name': '', 'type': '', 'auditory': '', 'beginTime': 0 });
		j = i + 1;
		while (nowLesson[group]['now'][j]['name'] == 'no') {
			j++;
		}
		nowLesson[group]['next'][i]['name'] = nowLesson[group]['now'][j]['name'];
		nowLesson[group]['next'][i]['type'] = nowLesson[group]['now'][j]['type'];
		nowLesson[group]['next'][i]['auditory'] = nowLesson[group]['now'][j]['auditory'];
		nowLesson[group]['next'][i]['beginTime'] = lessonTimeSeconds[j]['begin'];


	}
}

function nowCreateLessons(group) {
	let groupTag = `#now-${group}`;

	// ? Текущие пары
	let temp = $(groupTag).children('.current');
	temp.empty();
	for (let i = 1; i < nowLesson[group]['now'].length; i++) {
		temp = $(groupTag).children('.current');
		temp.append(`<div class="now__lesson now__lesson_${i}"></div>`);
		temp = temp.children().last();
		temp.append(`
			<div class="now__auditory now__item">Сейчас (${nowLesson[group]['now'][i]['auditory']})</div>
			<div class="now__body now__item">
				<div class="now__name">${nowLesson[group]['now'][i]['name']}</div>
				<div class="now__type">${nowLesson[group]['now'][i]['type']}</div>
			</div>
			<div class="now__countdown now__item">End in MM minutes (lil break in MM)</div>
		`);

		if (nowLesson[group]['now'][i]['name'] == 'no')
			temp.remove()
	}

	// ? Следующие пары
	temp = $(groupTag).children('.next');
	temp.empty();
	for (let i = 0; i < nowLesson[group]['next'].length; i++) {
		temp = $(groupTag).children('.next');
		temp.append(`<div class="now__lesson now__lesson_${i}"></div>`);
		temp = temp.children().last();
		temp.append(`
			<div class="now__auditory now__item">Следующая (${nowLesson[group]['next'][i]['auditory']})</div>
			<div class="now__body now__item">
				<div class="now__name">${nowLesson[group]['next'][i]['name']}</div>
				<div class="now__type">${nowLesson[group]['next'][i]['type']}</div>
			</div>
			<div class="now__countdown now__item">Begin in MM minutes</div>
		`);
	}
}

function nowTimeUpdate(group) {
	let groupTag = `#now-${group}`;
	let nowIndex = getCurrentLessonIndex();
	// ? Now
	if (nowIndex && nowIndex <= getLessonAmount(group)) {
		// console.log('nowTimeUpdate');
		let temp = $(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).children('.now__countdown');
		let nowCurrentTimeRemain = nowLesson[group]['now'][nowIndex]['endTime'] - timeInSeconds;
		nowCurrentTimeRemain = getHMS(nowCurrentTimeRemain);
		nowCurrentTimeRemain = getTimeString(nowCurrentTimeRemain['hours'], nowCurrentTimeRemain['minutes'], nowCurrentTimeRemain['seconds']);
		temp.html(`До конца пары: ${nowCurrentTimeRemain}`);
	}

	// ? Next
	if (nowIndex === undefined)
		if (timeInSeconds < lessonTimeSeconds[1]['begin'])
			nowIndex = 0;
		else
			nowIndex = getCurrentBreakIndex();

	if (nowIndex != undefined && nowIndex < getLessonAmount(group)) {
		// console.log('nextTimeUpdate');
		let temp = $(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).children('.now__countdown');
		let nowCurrentTimeRemain = nowLesson[group]['next'][nowIndex]['beginTime'] - timeInSeconds;
		nowCurrentTimeRemain = getHMS(nowCurrentTimeRemain);
		nowCurrentTimeRemain = getTimeString(nowCurrentTimeRemain['hours'], nowCurrentTimeRemain['minutes'], nowCurrentTimeRemain['seconds']);
		temp.html(`До начала пары: ${nowCurrentTimeRemain}`);
	}

}

function nowUpdate() {
	if (nowDayIndex != dayIndex) {
		nowDayIndex = dayIndex;
		console.log('now update');
		nowCreateArray(117);
		nowCreateArray(217);
		nowCreateLessons(117)
		nowCreateLessons(217)
		console.log('Сегодняшние пары', nowLesson);

	}

	if (lessons[117][dayIndex]['lessons'])
		nowTimeUpdate(117);

	if (lessons[217][dayIndex]['lessons'])
		nowTimeUpdate(217);

	if (timeInSeconds >= 0 && timeInSeconds <= 3) {
		nowDisplayItemsUpdate(117);
		nowDisplayItemsUpdate(217);
	}

	for (let i = 1; i <= 4; i++) {
		if ((timeInSeconds >= lessonTimeSeconds[i]['begin'] - 2) && (timeInSeconds <= lessonTimeSeconds[i]['end'] + 2)) {
			nowDisplayItemsUpdate(117);
			nowDisplayItemsUpdate(217);
		}
	}

}

function nowDisplayItems(group) {
	let groupTag = `#now-${group}`;
	if (lessons[group][dayIndex]['lessons'] === false) {
		$(groupTag).children('.now__gone').addClass('active').css('display', 'flex').html(`<span class="icon-bokal"></span>Выходной!<span class="icon-bokal"></span>`);
	} else {
		if (timeInSeconds < lessonTimeSeconds[1]['begin']) {
			$(groupTag).children('.next').addClass('active').css('display', 'flex');
			$(groupTag).children('.next').children('.now__lesson_0').addClass('active').css('display', 'flex');
		} else if (timeInSeconds >= lessonTimeSeconds[getLessonAmount(group)]['end']) {

			$(groupTag).children('.now__gone').addClass('active').html(`<span class="icon-happy"></span>На сегодня пары закончились!<span class="icon-happy"></span>`).css('display', 'flex');
		} else {
			$(groupTag).children('.now__content').addClass('active').css('display', 'flex');

			// ? Now
			let nowIndex = getCurrentLessonIndex();
			if (nowIndex) {
				$(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).addClass('active').css('display', 'flex');
			}

			if (nowIndex == getLessonAmount(group))
				$(groupTag).children(`.current`).addClass('noNext');

			// ? Next
			if (nowIndex === undefined)
				nowIndex = getCurrentBreakIndex();
			if (nowIndex != undefined && nowIndex < getLessonAmount(group)) {
				$(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).addClass('active').css('display', 'flex');
			}
		}
	}
}

function nowDisplayItemsUpdate(group) {
	let groupTag = `#now-${group}`;
	if (lessons[group][dayIndex]['lessons'] === false) {
		if ($(groupTag).children('.now__content').hasClass('active'))
			$(groupTag).children('.now__content').removeClass('active').slideUp(300);

		if ($(groupTag).children('.now__gone').hasClass('active') === false)
			$(groupTag).children('.now__gone').addClass('active').slideDown(300, function () {
				$(this).css('display', 'flex');
			})

		$(groupTag).children('.now__gone').html(`<span class="icon-bokal"></span>Выходной!<span class="icon-bokal"></span>`)

	} else {
		if (timeInSeconds < lessonTimeSeconds[1]['begin']) {
			if ($(groupTag).children('.now__gone').hasClass('active'))
				$(groupTag).children('.now__gone').removeClass('active').slideUp(300);

			if ($(groupTag).children('.current').hasClass('active'))
				$(groupTag).children('.current').removeClass('active').slideUp(300);

			if ($(groupTag).children('.next').hasClass('active') === false)
				$(groupTag).children('.next').addClass('active').delay(300).slideDown(300, function () {
					$(this).css('display', 'flex');
				})

			$(groupTag).children('.next').children().not('.now__lesson_0').each(function () {
				if ($(this).hasClass('active'))
					$(this).removeClass('active').slideUp(300);
			});

			if ($(groupTag).children('.next').children('.now__lesson_0').hasClass('active') === false)
				$(groupTag).children('.next').children('.now__lesson_0').addClass('active').slideDown(300, function () {
					$(this).css('display', 'flex');
				})
		} else if (timeInSeconds >= lessonTimeSeconds[getLessonAmount(group)]['end']) {
			if ($(groupTag).children('.now__content').hasClass('active'))
				$(groupTag).children('.now__content').removeClass('active').slideUp(300);

			if ($(groupTag).children('.now__gone').hasClass('active') === false)
				$(groupTag).children('.now__gone').addClass('active').html(`<span class="icon-happy"></span>На сегодня пары закончились!<span class="icon-happy"></span>`).slideDown(300, function () {
					$(this).css('display', 'flex');
				})
		} else {
			if ($(groupTag).children('.now__content').hasClass('active') === false)
				$(groupTag).children('.now__content').addClass('active').slideDown(300, function () {
					$(this).css('display', 'flex');
				});

			if ($(groupTag).children('.now__gone').hasClass('active'))
				$(groupTag).children('.now__gone').removeClass('active').slideUp(300);

			// ? Now
			let nowIndex = getCurrentLessonIndex();
			if (nowIndex) {
				$(groupTag).children('.current').children().not(`.now__lesson_${nowIndex}`).each(function () {
					if ($(this).hasClass('active'))
						$(this).removeClass('active').slideUp(300);
				});

				if ($(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).hasClass('active') === false)
					$(groupTag).children('.current').children(`.now__lesson_${nowIndex}`).addClass('active').slideDown(300, function () {
						$(this).css('display', 'flex');
					})
			} else {
				if ($(groupTag).children('.current').children('.now__lesson').hasClass('active'))
					$(groupTag).children('.current').children('.now__lesson').removeClass('active').slideUp(300);
			}

			if (nowIndex == getLessonAmount(group))
				if ($(groupTag).children(`.current`).hasClass('noNext') === false)
					$(groupTag).children(`.current`).addClass('noNext');

			// ? Next
			if (nowIndex === undefined)
				nowIndex = getCurrentBreakIndex();
			if (nowIndex != undefined && nowIndex < getLessonAmount(group)) {
				$(groupTag).children('.next').children().not(`.now__lesson_${nowIndex}`).each(function () {
					if ($(this).hasClass('active'))
						$(this).removeClass('active').slideUp(300);
				});

				if ($(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).hasClass('active') === false)
					$(groupTag).children('.next').children(`.now__lesson_${nowIndex}`).addClass('active').slideDown(300, function () {
						$(this).css('display', 'flex');
					});
			} else {
				if ($(groupTag).children('.next').children('.now__lesson').hasClass('active'))
					$(groupTag).children('.next').children('.now__lesson').removeClass('active').slideUp(300);
			}
		}

	}
}

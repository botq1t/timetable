$(document).ready(function () {
	var date = new Date();
	// var date = new Date(1631253600000);


	var dayIndex = date.getDay();
	if (dayIndex == 0) { dayIndex = 7; }
	console.log('День: ' + dayIndex)

	var dateMinus = date.getTime() - dateBegin.getTime();		//? Сколько прошло миллисекунд с начала семестра
	var dateIndex = Math.floor(dateMinus / dateCheck) + 1;
	console.log('Номер недели: ', + dateIndex)

	var time = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
	console.log(time)

	if (time > (lessonTime['start'][0] - 1)) {
		if (time < (lessonTime['end'][lessonTime['end'].length - 1] + 1)) {
			for (let i = 0; i < lessonTime['end'].length; i++) {
				if (time < lessonTime['end'][i]) {
					if (dateIndex % 2 == 0) {
						// ! У117 чётная неделя
						var nowName = $('#u117-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_even').children('.lesson__name').text();
						var nowAuditory = $('#u117-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_even').children('.lesson__autidory').text();
						var nowType = $('#u117-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_even').children('.lesson__type').text();
						console.log(nowAuditory, nowName, nowType);
						if (nowName == '') {
							$('#now_117').children('.now__content').html('<p>Ничаго няма</p>');
						} else {
							$('#now_117').children('.now__content').children('.now__auditory').text(nowAuditory);
							$('#now_117').children('.now__content').children('.now__lesson').children('.now__name').text(nowName);
							$('#now_117').children('.now__content').children('.now__lesson').children('.now__type').text(nowType);
						}
						// ? У217 чётная неделя
						var nowName = $('#u217-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_even').children('.lesson__name').text();
						var nowAuditory = $('#u217-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_even').children('.lesson__autidory').text();
						var nowType = $('#u217-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_even').children('.lesson__type').text();
						console.log(nowAuditory, nowName, nowType);

						if (nowName == '') {
							$('#now_217').children('.now__content').html('<p>Ничаго няма</p>');
						} else {
							$('#now_217').children('.now__content').children('.now__auditory').text(nowAuditory);
							$('#now_217').children('.now__content').children('.now__lesson').children('.now__name').text(nowName);
							$('#now_217').children('.now__content').children('.now__lesson').children('.now__type').text(nowType);
						}
						// ! ===============================
						break;
					} else {
						// ! У117 нечётная неделя
						var nowName = $('#u117-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_odd').children('.lesson__name').text();
						var nowAuditory = $('#u117-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_odd').children('.lesson__autidory').text();
						var nowType = $('#u117-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_odd').children('.lesson__type').text();
						console.log(nowAuditory, nowName, nowType);

						if (nowName == '') {
							$('#now_117').children('.now__content').html('<p>Ничаго няма</p>');
						} else {
							$('#now_117').children('.now__content').children('.now__auditory').text(nowAuditory);
							$('#now_117').children('.now__content').children('.now__lesson').children('.now__name').text(nowName);
							$('#now_117').children('.now__content').children('.now__lesson').children('.now__type').text(nowType);
						}
						// ? У217 нечётная неделя
						var nowName = $('#u217-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_odd').children('.lesson__name').text();
						var nowAuditory = $('#u217-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_odd').children('.lesson__autidory').text();
						var nowType = $('#u217-target').children('.day_' + dayIndex).children('.day__timetable').children('.lesson_' + (i + 1)).filter('.lesson_odd').children('.lesson__type').text();
						console.log(nowAuditory, nowName, nowType);

						if (nowName == '') {
							$('#now_217').children('.now__content').html('<p>Ничаго няма</p>');
						} else {
							$('#now_217').children('.now__content').children('.now__auditory').text(nowAuditory);
							$('#now_217').children('.now__content').children('.now__lesson').children('.now__name').text(nowName);
							$('#now_217').children('.now__content').children('.now__lesson').children('.now__type').text(nowType);
						}
						// ! ===============================
						break;
					}

				}
			}
		} else {
			$('#now_117').children('.now__content').html('<p>Ничаго няма</p>');
			$('#now_217').children('.now__content').html('<p>Ничаго няма</p>');
		}
	} else {
		$('#now_117').children('.now__content').html('<p>Ничаго няма</p>');
		$('#now_217').children('.now__content').html('<p>Ничаго няма</p>');
	}

});
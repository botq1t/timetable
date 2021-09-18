console.log('++++++++++++++++++++++++++++++++++++++++++');
if (!settings.defaultGroup) {
	setTimeout(checkPrefsGroup, 2000);
}
$('.prefs__block').each(function () {
	let id = $(this).attr('id');
	id = id.split('_')[1];
	console.log(id);
	if (!$(this).hasClass('time')) {
		$(this).children('.prefs__options').children().each(function () {
			let checker = $(this).attr('id');
			checker = checker.split('_')[2];
			if (checker == String(settings[id])) {
				$(this).addClass('active');
			}
		});
	} else {
		let timeString = getPrefsTime(id);
		console.log(id, timeString);
		$(this).children('.prefs__options').children().children().val(timeString);

	}



});

$('.prefs__tab').click(function () {
	$('.prefs__tab').removeClass('active');
	$('.prefs__card').removeClass('active');

	$(this).addClass('active');
	let id = $(this).attr('id');
	id = id.split('_')[2];
	console.log(id);
	$(`#prefs_target_${id}`).addClass('active');
});

$('.prefs__options').children('il').click(function () {
	$(this).parent().children().removeClass('active');
	$(this).addClass('active');
});

$('.prefs__close').click(function () {
	$('#prefs-target').removeClass('active');
	$('body').removeClass('lock');
});

$('#prefs').click(function () {
	$('#prefs-target').addClass('active');
	$('body').addClass('lock');
});

$('.prefs__submit').click(function () {
	$('.prefs__options').each(function () {

		if (!$(this).children('il').hasClass('time')) {
			$(this).children().each(function () {
				let id = $(this).attr('id');
				let name = id.split('_')[1];
				id = id.split('_')[2];

				if ($(this).hasClass('active')) {
					if (!isNaN(Number(id))) {
						settings[name] = +id;
					} else if (id == 'true') {
						settings[name] = true;
					} else if (id == 'false') {
						settings[name] = false;
					} else {
						settings[name] = id;
					}
				}
			});
		} else {
			let time = $(this).children().children().val();
			let id = $(this).children().children().attr('name');
			let timeSeconds = (+time.split(':')[0] * 3600) + (+time.split(':')[1] * 60);
			settings[id] = timeSeconds;
			// console.log(id, time, timeSeconds);
		}

	});
	localStorage['timetable_settings'] = JSON.stringify(settings);
	console.log(settings);
	document.location.reload();
});

function getPrefsTime(id) {
	let timeString = '';
	let time = Math.floor(settings[id] / 3600);
	if (time < 10) {
		timeString = timeString + '0';
	}
	timeString = timeString + time;
	timeString = timeString + ':';

	time = (settings[id] - time * 3600) / 60;
	if (time < 10) {
		timeString = timeString + '0';
	}
	timeString = timeString + time;
	return timeString;
}

function checkPrefsGroup() {
	$('#prefs-target').addClass('active');
	$('body').addClass('lock');

	$('.prefs__tab').removeClass('active');
	$('.prefs__card').removeClass('active');

	$('#prefs_tab_other').addClass('active');
	$('#prefs_target_other').addClass('active');

	alert('Выберите свою группу плез)');
}

console.log('++++++++++++++++++++++++++++++++++++++++++');

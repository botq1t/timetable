
// ! Selected
$('.prefs__option').children('select').each(function () {
	let id = $(this).attr('id');
	id = id.split('_')[1];
	$(`#prefs_${id}`).children().each(function () {
		if ($(this).attr('value') == String(settings[`${id}`])) {
			$(this).prop('selected', true);
		}
	});

})
// ! Click events
$('#prefs').click(function () {
	$('#prefs-target').addClass('active');
});

$('.prefs__close').click(function () {
	$('#prefs-target').removeClass('active');
});

$('#prefs_button-submit').click(function () {
	$('.prefs__option').each(function () {
		let select = $(this).children('select');
		let id = select.attr('id');
		id = id.split('_')[1];

		let value = select.val();

		if (!isNaN(Number(value))) {
			settings[id] = Number(value);
		} else if (value == 'true') {
			settings[id] = true;
		} else if (value == 'false') {
			settings[id] = false;
		} else {
			settings[id] = value;
		}
		// settings[id] = select.val();
	})
	localStorage['timetable_settings'] = JSON.stringify(settings);
});

$('#prefs_button-reset').click(function () {
	localStorage.clear();
	document.location.reload();
});
// ! Popups
if (!settings['defaultGroup']) {
	setTimeout(chooseDefaultGroup, 1000);
}

$('#popup_group').children('.popup__option').children('div').click(function () {
	let id = $(this).attr('id');
	id = id.split('_')[1];
	settings['defaultGroup'] = +id;
	localStorage['timetable_settings'] = JSON.stringify(settings);
	document.location.reload();
})

function chooseDefaultGroup() {
	$('.popup').css('display', 'flex');
}
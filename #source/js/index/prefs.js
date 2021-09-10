$('#prefs_colorScheme').children().each(function () {
	if ($(this).attr('value') == settings['colorScheme']) {
		$(this).prop('selected', true);
	}
})

$('#prefs').click(function () {
	$('#prefs-target').addClass('active').fadeIn(300, function () {
		$(this).css('display', 'flex');
	});
});

$('.prefs__close').click(function () {
	$('#prefs-target').removeClass('active').fadeOut(300);
});

$('#prefs_appearance-button').click(function () {
	let select;
	select = document.getElementById('prefs_colorScheme');
	settings['colorScheme'] = select.value;

	select = document.getElementById('prefs_group');
	settings['defauldGroup'] = select.value;
	localStorage['settings'] = JSON.stringify(settings);
});
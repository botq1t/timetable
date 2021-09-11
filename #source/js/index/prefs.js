// $('#prefs-target').hide();

$('#prefs_colorScheme').children().each(function () {
	if ($(this).attr('value') == settings['colorScheme']) {
		$(this).prop('selected', true);
	}
});

$('#prefs_group').children().each(function () {
	if ($(this).attr('value') == settings['defaultGroup']) {
		$(this).prop('selected', true);
	}
});

$('#prefs').click(function () {
	$('#prefs-target').addClass('active');
});

$('.prefs__close').click(function () {
	$('#prefs-target').removeClass('active');
});

$('#prefs_appearance-button').click(function () {
	let select;
	select = document.getElementById('prefs_colorScheme');
	settings['colorScheme'] = select.value;

	select = document.getElementById('prefs_group');
	settings['defaultGroup'] = select.value;
	localStorage['settings'] = JSON.stringify(settings);
});
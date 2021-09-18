let colorSchemeArray = ['light', 'dark'];

// console.log(colorSchemeArray);

if (settings.colorSchemeDarkBegin > settings.colorSchemeDarkEnd) {
	if (timeInSeconds >= settings.colorSchemeDarkBegin || timeInSeconds < settings.colorSchemeDarkEnd) {
		setColorScheme(settings['colorSchemeDark']);
	} else {
		setColorScheme(settings['colorScheme']);
	}
} else {
	if (timeInSeconds < settings.colorSchemeDarkEnd && timeInSeconds >= settings.colorSchemeDarkBegin) {
		setColorScheme(settings['colorSchemeDark']);
	} else {
		setColorScheme(settings['colorScheme']);
	}
}

/*if (timeInSeconds >= 20 * 3600 || timeInSeconds < 8 * 3600) {
	setColorScheme(settings['colorSchemeDark']);
} else {
	setColorScheme(settings['colorScheme']);
}*/

/*$('.footer').click(function () {
	switch (settings['colorScheme']) {
		case 'light':
			settings['colorScheme'] = 'dark';
			localStorage['timetable_settings'] = JSON.stringify(settings);
			break;
		case 'dark':
			settings['colorScheme'] = 'light';
			localStorage['timetable_settings'] = JSON.stringify(settings);
			break;
	}
	console.log('color scheme:', settings['colorScheme'])
	setColorScheme(settings['colorScheme']);
});*/

// ? Functions
function setColorScheme(mode) {
	for (let i = 0; i < colorSchemeArray.length; i++) {
		$('body').removeClass(colorSchemeArray[i]);
	}
	$('body').addClass(mode);
}


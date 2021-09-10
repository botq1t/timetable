console.log('color scheme:', settings['colorScheme']);
let colorSchemeArray = ['light', 'dark'];
console.log(colorSchemeArray);
setColorScheme(settings['colorScheme']);
$('.footer').click(function () {
	switch (settings['colorScheme']) {
		case 'light':
			settings['colorScheme'] = 'dark';
			localStorage['settings'] = JSON.stringify(settings);
			break;
		case 'dark':
			settings['colorScheme'] = 'light';
			localStorage['settings'] = JSON.stringify(settings);
			break;
	}
	console.log('color scheme:', settings['colorScheme'])
	setColorScheme(settings['colorScheme']);
});

// ? Functions
function setColorScheme(mode) {
	for (let i = 0; i < colorSchemeArray.length; i++) {
		$('.header__body').removeClass(colorSchemeArray[i]);
		$('.header__title').removeClass(colorSchemeArray[i]);
		$('.header__nav').removeClass(colorSchemeArray[i]);

		$('.week__today').removeClass(colorSchemeArray[i]);
		$('.week__parity').removeClass(colorSchemeArray[i]);
		$('.week__update').removeClass(colorSchemeArray[i]);

		$('.nav__tab').removeClass(colorSchemeArray[i]);
		$('.nav__settings').removeClass(colorSchemeArray[i]);

		$('.main').removeClass(colorSchemeArray[i]);

		$('.now__gone').removeClass(colorSchemeArray[i]);
		$('.now__title').removeClass(colorSchemeArray[i]);
		$('.now__item').not('.now__title').removeClass(colorSchemeArray[i]);
		$('.now__card').removeClass(colorSchemeArray[i]);
		$('.now__name').removeClass(colorSchemeArray[i]);
		$('.current').removeClass(colorSchemeArray[i]);
		$('.next').removeClass(colorSchemeArray[i]);

		$('.footer').removeClass(colorSchemeArray[i]);
		$('.footer__time').removeClass(colorSchemeArray[i]);

		$('.day__name').removeClass(colorSchemeArray[i]);
		$('.day').removeClass(colorSchemeArray[i]);
		$('.lesson').removeClass(colorSchemeArray[i]);
		$('.lesson__item').removeClass(colorSchemeArray[i]);
	}
	$('.header__body').addClass(mode);
	$('.header__title').addClass(mode);
	$('.header__nav').addClass(mode);

	$('.week__today').addClass(mode);
	$('.week__parity').addClass(mode);
	$('.week__update').addClass(mode);

	$('.nav__tab').addClass(mode);
	$('.nav__settings').addClass(mode);

	$('.main').addClass(mode);

	$('.now__gone').addClass(mode);
	$('.now__title').addClass(mode);
	$('.now__item').not('.now__title').addClass(mode);
	$('.now__card').addClass(mode);
	$('.now__name').addClass(mode);
	$('.current').addClass(mode);
	$('.next').addClass(mode);

	$('.footer').addClass(mode);
	$('.footer__time').addClass(mode);

	$('.day__name').addClass(mode);
	$('.day').addClass(mode);
	$('.lesson').addClass(mode);
	$('.lesson__item').addClass(mode);
}


if (localStorage['colorScheme'] === undefined)
	localStorage['colorScheme'] = 'light';

console.log('color scheme:', localStorage['colorScheme'])
toggleDarkMode(localStorage['colorScheme']);

$('.footer').click(function () {
	switch (localStorage['colorScheme']) {
		case 'light':
			localStorage['colorScheme'] = 'dark';
			break;
		case 'dark':
			localStorage['colorScheme'] = 'light';
			break;
	}
	console.log('color scheme:', localStorage['colorScheme'])
	toggleDarkMode(localStorage['colorScheme']);
});

// ? Functions
function toggleDarkMode(mode) {
	switch (mode) {
		case 'dark':
			$('.header__body').addClass('dark');
			$('.header__title').addClass('dark');
			$('.header__nav').addClass('dark');

			$('.week__today').addClass('dark');
			$('.week__parity').addClass('dark');

			$('.nav__tab').addClass('dark');

			$('.main').addClass('dark');

			$('.now__gone').addClass('dark');
			$('.now__title').addClass('dark');
			$('.now__item').not('.now__title').addClass('dark');
			$('.now__card').addClass('dark');
			$('.now__name').addClass('dark');
			$('.current').addClass('dark');
			$('.next').addClass('dark');

			$('.footer').addClass('dark');
			$('.footer__time').addClass('dark');

			$('.day__name').addClass('dark');
			$('.day').addClass('dark');
			$('.lesson').addClass('dark');
			$('.lesson__item').addClass('dark');
			break;
		case 'light':
			$('.header__body').removeClass('dark');
			$('.header__title').removeClass('dark');
			$('.header__nav').removeClass('dark');

			$('.week__today').removeClass('dark');
			$('.week__parity').removeClass('dark');

			$('.nav__tab').removeClass('dark');

			$('.main').removeClass('dark');

			$('.now__gone').removeClass('dark');
			$('.now__title').removeClass('dark');
			$('.now__item').not('.now__title').removeClass('dark');
			$('.now__card').removeClass('dark');
			$('.now__name').removeClass('dark');
			$('.current').removeClass('dark');
			$('.next').removeClass('dark');

			$('.footer').removeClass('dark');
			$('.footer__time').removeClass('dark');

			$('.day__name').removeClass('dark');
			$('.day').removeClass('dark');
			$('.lesson').removeClass('dark');
			$('.lesson__item').removeClass('dark');
			break;
	}

}
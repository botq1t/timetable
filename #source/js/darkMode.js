if (timeInSeconds >= (21 * 3600) || timeInSeconds <= (7 * 3600)) {
	toggleDarkMode();
}

$('.footer').click(toggleDarkMode);

function toggleDarkMode() {
	$('.header__body').toggleClass('dark');
	$('.header__title').toggleClass('dark');
	$('.header__nav').toggleClass('dark');

	$('.week__today').toggleClass('dark');
	$('.week__parity').toggleClass('dark');

	$('.nav__tab').toggleClass('dark');

	$('.main').toggleClass('dark');

	$('.now__gone').toggleClass('dark');
	$('.now__title').toggleClass('dark');
	$('.now__item').not('.now__title').toggleClass('dark');
	$('.now__card').toggleClass('dark');
	$('.now__name').toggleClass('dark');
	$('.current').toggleClass('dark');
	$('.next').toggleClass('dark');

	$('.footer').toggleClass('dark');
	$('.footer__time').toggleClass('dark');

	$('.day__name').toggleClass('dark');
	$('.day').toggleClass('dark');
	$('.lesson').toggleClass('dark');
	$('.lesson__item').toggleClass('dark');
}
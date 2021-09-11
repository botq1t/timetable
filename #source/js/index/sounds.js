let soundsObject = {
	'Пилипчук': [
		new Audio('audio/victor/pepuk-1.mp3'),
		new Audio('audio/victor/pepuk-2.mp3'),
		new Audio('audio/victor/cunt.mp3'),
		new Audio('audio/victor/chert.mp3'),
		new Audio('audio/victor/rat.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'Барабан': [
		new Audio('audio/victor/baraban-1.mp3'),
		new Audio('audio/victor/rat.mp3'),
	],
	'Вишневский': [
		new Audio('audio/victor/heroes.mp3'),
		new Audio('audio/victor/maslyak.mp3'),
		new Audio('audio/victor/respect.mp3'),
	],
	'Лазовский': [
		new Audio('audio/victor/heroes.mp3'),
		new Audio('audio/victor/maslyak.mp3'),
		new Audio('audio/victor/respect.mp3'),
	],
	'Александров': [
		new Audio('audio/victor/maslyak.mp3'),
	],
	'Науменко': [
		new Audio('audio/victor/cunt.mp3'),
		new Audio('audio/victor/chert.mp3'),
		new Audio('audio/victor/zavtra.mp3'),
		new Audio('audio/victor/rat.mp3'),
		new Audio('audio/victor/want-to-die-1.mp3'),
		new Audio('audio/victor/want-to-die-2.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'Дубовский': [
		new Audio('audio/victor/chert.mp3'),
		new Audio('audio/victor/rat.mp3'),
		new Audio('audio/victor/blevon.mp3'),
		new Audio('audio/victor/dubec.mp3'),
	],
	'Худолей': [
		new Audio('audio/victor/blevon.mp3'),
	],

	'Суббота': [
		new Audio('audio/victor/saturdays.mp3'),
		new Audio('audio/victor/saturday-salt.mp3'),
		new Audio('audio/victor/godno.mp3'),
		new Audio('audio/victor/want-to-die-1.mp3'),
		new Audio('audio/victor/want-to-die-2.mp3'),
		new Audio('audio/victor/roger.mp3'),
		new Audio('audio/victor/hate.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'08': [
		new Audio('audio/victor/too-early.mp3'),
		new Audio('audio/victor/why-first.mp3'),
		new Audio('audio/victor/want-to-die-1.mp3'),
		new Audio('audio/victor/want-to-die-2.mp3'),
		new Audio('audio/victor/hate.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'Можно спать': [
		new Audio('audio/victor/cool.mp3'),
	],
	'Форточка': [
		new Audio('audio/victor/naggets.mp3'),
		new Audio('audio/victor/godno.mp3'),
		new Audio('audio/victor/smthng-wrong.mp3'),
		new Audio('audio/victor/roger.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],
	'На сегодня пары закончились!': [
		new Audio('audio/victor/naggets.mp3'),
	],

	'У117': [
		new Audio('audio/victor/crazy-koren.mp3'),
		new Audio('audio/victor/koren-dontmark.mp3'),
		new Audio('audio/victor/koren-change-surname.mp3'),
		new Audio('audio/victor/koreniuuuk.mp3'),
		new Audio('audio/victor/koren-dont-mark.mp3'),
		new Audio('audio/victor/koren-dont-mark-2.mp3'),
		new Audio('audio/victor/dont-mark.mp3'),
		new Audio('audio/victor/allo.mp3'),
	],
	'У217': [
		new Audio('audio/victor/dauni-217.mp3'),
	],

	'Сейчас': [
		new Audio('audio/victor/kliga.mp3'),
		new Audio('audio/victor/spravka.mp3'),
		new Audio('audio/victor/belching-1.mp3'),
		new Audio('audio/victor/dying-laught.mp3'),
		new Audio('audio/victor/laught.mp3'),
		new Audio('audio/victor/narkoman.mp3'),
		new Audio('audio/victor/naggets.mp3'),
		new Audio('audio/victor/fuck-you.mp3'),
		new Audio('audio/victor/fuck-you-2.mp3'),
		new Audio('audio/victor/fuck-you-3.mp3'),
		new Audio('audio/victor/fuck-you-4.mp3'),
		new Audio('audio/victor/ne-doljen.mp3'),
		new Audio('audio/victor/content.mp3'),
		new Audio('audio/victor/pomoika.mp3'),
		new Audio('audio/victor/turbo-pushka.mp3'),
		new Audio('audio/victor/yes-me.mp3'),
		new Audio('audio/victor/blr-topchik.mp3'),
		new Audio('audio/victor/fart.mp3'),
		new Audio('audio/victor/blevon.mp3'),
	],

	'parity': [
		new Audio('audio/victor/huinya.mp3'),
	],

	'auditory': [
		new Audio('audio/victor/pomoika.mp3'),
		new Audio('audio/victor/roger.mp3'),
	],
}

$('.lesson__teacher').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.lesson__name').click(function () {
	let name = $(this).next().next().next().text();
	name = name.split(' ')[0];
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.lesson__time').click(function () {
	let name = $(this).text();
	name = name.split(':')[0];
	name = name.slice(-2);
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.lesson__auditory').click(function () {
	playSound('auditory');
});

$('.lesson_out').click(function () {
	let name = $(this).text();
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.nav__tab').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.day__name').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.now__title').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.now__gone').click(function () {
	let name = $(this).text();
	// console.log(name);
	if (name in soundsObject) playSound(name);
});

$('.week__parity').click(function () {
	playSound('parity');
});

$('.header__title').click(function () {
	playSound('Сейчас');
});

function playSound(key) {
	let random = Math.floor(Math.random() * (soundsObject[key].length));
	// console.log(random);
	for (let keyStop in soundsObject) {
		for (let i = 0; i < soundsObject[keyStop].length; i++) {
			soundsObject[keyStop][i].pause();
			soundsObject[keyStop][i].currentTime = 0;
		}
	}

	soundsObject[key][random].play();
}
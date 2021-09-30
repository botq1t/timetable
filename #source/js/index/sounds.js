import { soundsObject, playSound } from './modules/sounds.js';

$('.lesson__teacher').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.lesson__name').click(function () {
	let name = $(this).next().next().next().text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.lesson__time').click(function () {
	let name = $(this).text();
	name = name.split(':')[0];
	name = name.slice(-2);
	if (name in soundsObject) playSound(name);
});

$('.lesson__auditory').click(function () {
	if (!settings['sounds']) return;
	playSound('auditory');
});

$('.lesson_out').click(function () {
	let name = $(this).text();
	if (name in soundsObject) playSound(name);
});

$('.nav__tab').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.day__name').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.now__title').click(function () {
	let name = $(this).text();
	name = name.split(' ')[0];
	if (name in soundsObject) playSound(name);
});

$('.now__gone').click(function () {
	let name = $(this).text();
	if (name in soundsObject) playSound(name);
});

$('.week__parity').click(function () {
	if (!settings['sounds']) return;
	playSound('parity');
});

$('.header__title').click(function () {
	if (!settings['sounds']) return;
	playSound('Сейчас');
});


'use strict'
import { fillHours, fillPassedHours } from './modules/hours/createHelpers.js';
import { getDate, getWeekIndex } from './modules/date.js';
import { corrections } from './modules/hours/corrections.js';
let settings;
if (localStorage['timetable_settings']) settings = JSON.parse(localStorage['timetable_settings']);

let dayIndex = getDate().dayIndex;
// if (dayIndex != 0) dayIndex--;
if (dayIndex == 0) dayIndex = 6;
const weekIndex = getWeekIndex(getDate().date);

let hours = {
	117: fillHours(117, dayIndex, weekIndex),
	217: fillHours(217, dayIndex, weekIndex),
};

// console.log(corrections);
for (let group in hours) {
	for (let lesson in hours[group]) {
		hours[group][lesson].lection = hours[group][lesson].lection + corrections[group][lesson].lection;
		hours[group][lesson].practice = hours[group][lesson].practice + corrections[group][lesson].practice;
	}
}

console.log(`Неделя №${weekIndex}, День №${dayIndex}`);
console.log(hours);

fillPassedHours(117, hours);
fillPassedHours(217, hours);

if (settings.defaultGroup) {
	$(`#target_tab_${settings.defaultGroup}`).css('display', 'flex');
	$(`#tab_${settings.defaultGroup}`).addClass('active');
} else {
	$(`#target_tab_117`).css('display', 'flex');
	$(`#tab_117`).addClass('active');
}

$('.nav__tab').on('click', function () {
	if ($(this).text() == 'Расписание' || $(this).hasClass('active')) return;

	let id = $(this).attr('id').split('_')[1];
	$('.nav__tab').removeClass('active');
	$(this).addClass('active');

	$('.card').fadeOut(250);
	$(`#target_tab_${id}`).delay(255).fadeIn(250, function () {
		$(this).css('display', 'flex');
	});
});
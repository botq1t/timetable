"use strict"
// ! ================== Settings =========================
let settings, defaultSettings = {
	colorScheme: 'light',
	colorSchemeDark: 'dark',
	colorSchemeDarkBegin: 20 * 3600,
	colorSchemeDarkEnd: 8 * 3600,
	defaultGroup: null,
	dynamicTitle: true,
	sounds: true,
};

if (localStorage['settings']) {
	localStorage['timetable_settings'] = localStorage['settings'];
	localStorage.removeItem('settings');
}

if (!localStorage['timetable_settings']) {
	localStorage['timetable_settings'] = JSON.stringify(defaultSettings);
}

settings = JSON.parse(localStorage['timetable_settings']);
console.log('Settings', settings);
export { settings };
// ! ====================== Date ======================================
// @prepros-append "index/date.js"
// ! =================== Schedule creation ============================
import { createSchedule } from './modules/schedule.js';
import { setLessonType } from './modules/lessonBreak.js';
console.log('Расписания', lessons);

createSchedule(117);
createSchedule(217);

$('.lesson__type').each(setLessonType);

//  ! ======================= Lessons Time =============================
import { lessonTime, lessonTimeSeconds, breakTime, breakTimeSeconds } from './modules/lessonTime.js';

console.log('Пары:', lessonTime);
console.log('Пары в секундах', lessonTimeSeconds);

console.log('Перерывы', breakTime);
console.log('Перерывы в секундах', breakTimeSeconds);

for (let i in lessonTime) {
	$(`.time_${i}`).each(function () {
		$(this).children('.time__start').text(lessonTime[i].begin);
		$(this).children('.time__end').text(lessonTime[i].end);
	});
}

// @prepros-append "darkMode.js"
// @prepros-append "index/now.js"
// @prepros-append "index/tabs.js"
// @prepros-append "index/prefs.js"
// ! ===================== Full Lesson Name =======================
import { fullLessonName, fullTeacherName } from './modules/lessonTeacherName.js';

$('.lesson__name').click(fullLessonName);
$('.now__name').click(fullLessonName);

$('.lesson__teacher').click(fullTeacherName);
// @prepros-append "titleChanger.js"
// @prepros-append "index/sounds.js"
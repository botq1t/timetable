"use strict"
console.log('====================== main.js ========================');
let settings, defaultSettings = {
	'colorScheme': 'light',
	'colorSchemeDark': 'dark',
	'defaultGroup': 'undefined',
	'dynamicTitle': 'true',
	'sounds': 'true',
};

if (!localStorage['settings']) {
	localStorage['settings'] = JSON.stringify(defaultSettings);
}

settings = JSON.parse(localStorage['settings']);
console.log('Settings', settings);

// @prepros-append "index/date.js"
// @prepros-append "index/schedule.js"
// @prepros-append "index/lessonTime.js"
// @prepros-append "darkMode.js"
// @prepros-append "index/now.js"
// @prepros-append "index/tabs.js"
// @prepros-append "index/prefs.js"
// @prepros-append "index/fullLessonName.js"
// @prepros-append "titleChanger.js"
// @prepros-append "index/sounds.js"
"use strict"
if (localStorage['colorScheme']) {
	localStorage.clear();
}

let settings, defaultSettings = {
	'colorScheme': 'light',
	'defaultGroup': undefined,
};

if (!localStorage['settings']) {
	localStorage['settings'] = JSON.stringify(defaultSettings);
}
// localStorage['settings'] = localStorage['settings'] ?? JSON.stringify(defaultSettings);
settings = JSON.parse(localStorage['settings']);
console.log('Settings', settings);



/*if (!settings['defaultGroup']) {
	settings['defaultGroup'] = prompt('Группа по умолчанию?', [117]);
	localStorage['settings'] = JSON.stringify(settings);

}*/

// @prepros-append "index/date.js"
// @prepros-append "index/schedule.js"
// @prepros-append "index/lessonTime.js"
// @prepros-append "darkMode.js"
// @prepros-append "index/now.js"
// @prepros-append "index/tabs.js"
// @prepros-append "index/prefs.js"
// @prepros-append "index/fullLessonName.js"
// @prepros-append "index/lectionsPractice.js"
// @prepros-append "titleChanger.js"
// @prepros-append "index/sounds.js"
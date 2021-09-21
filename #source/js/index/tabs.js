// ! ================ Переключение вкладок ============================
import { getFirstLesson } from './modules/lessonBreak.js';

if (settings.defaultGroup) {
	if (dayIndex == 0 ||
		timeInSeconds < lessonTimeSeconds[getFirstLesson(settings.defaultGroup)].begin ||
		timeInSeconds >= lessonTimeSeconds[getLessonAmount(settings.defaultGroup)].end) {
		$('#now').removeClass('active');
		$('#now-target').css('display', 'none');

		$(`#u${settings.defaultGroup}`).addClass('active');
		$(`#u${settings.defaultGroup}-target`).css('display', 'flex');
	}
}

$('.nav__tab').each(function () {
	if ($(this).hasClass('active')) {
		let tabIndex = $(this).attr('id');
		$(`#${tabIndex}-target`).css('display', 'flex');
	}
});

$('.nav__tab').click(function () {
	if (!$(this).hasClass('active')) {
		let tabIndex = $(this).attr('id');
		$('.nav__tab').removeClass('active');
		$(this).addClass('active');
		$('.main__tab').fadeOut(150);
		$(`#${tabIndex}-target`).delay(160).fadeIn(150, function () {
			$(this).css('display', 'flex');
		});
	}
});

// ! ================ Раскрытие списка дня ============================
$('.day__name').click(function () {
	if ($(this).hasClass('slide')) {
		$(this).next().slideUp(300)
	} else {
		$(this).next().slideDown(300, function () {
			$(this).css('display', 'grid')
		})
	}
	$(this).toggleClass('slide');
})

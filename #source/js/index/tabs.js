/*$(document).ready(function () {
	$('.nav__tab').each(function () {
		if ($(this).hasClass('active')) {
			var tabIndex = $(this).attr('id');
			$(`#${tabIndex}-target`).css('display', 'grid');
			if ($(`#${tabIndex}-target`).hasClass('now')) { $(`#${tabIndex}-target`).css('display', 'flex'); }
		}
	})


	$('.nav__tab').click(function (event) {
		if ($(this).hasClass('active') == false) {
			$('.nav__tab').removeClass('active');
			$(this).addClass('active');
			var tabIndex = $(this).attr('id');
			$('.main__tab').fadeOut(150);
			$(`#${tabIndex}-target`).delay(160).fadeIn(150, function () {
				$(this).css('display', 'grid');
				if ($(`#${tabIndex}-target`).hasClass('now')) { $(`#${tabIndex}-target`).css('display', 'flex'); }
			});
		}
	});

	$('.day__name').click(function (event) {
		if ($(this).hasClass('slide')) {
			$(this).next().slideUp(300)
		} else {
			$(this).next().slideDown(300, function () {
				$(this).css('display', 'grid')
			})
		}
		$(this).toggleClass('slide');
	})
});*/
// ! ================ Переключение вкладок ============================
if (settings['defaultGroup'] != 'undefined') {
	if (dayIndex == 0 ||
		timeInSeconds < lessonTimeSeconds[1]['begin'] ||
		timeInSeconds >= lessonTimeSeconds[getLessonAmount(settings['defaultGroup'])]['end']) {
		$('#now').removeClass('active');
		$('#now-target').css('display', 'none');

		$(`#u${settings['defaultGroup']}`).addClass('active');
		$(`#u${settings['defaultGroup']}-target`).css('display', 'flex');
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

// ! ================= Прилипающая навигация ==============================

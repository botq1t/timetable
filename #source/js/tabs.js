$(document).ready(function () {
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
			$('.main__tab').fadeOut(300);
			$(`#${tabIndex}-target`).delay(300).fadeIn(300, function () {
				$(this).css('display', 'grid');
				if ($(`#${tabIndex}-target`).hasClass('now')) { $(`#${tabIndex}-target`).css('display', 'flex'); }
			});
		}
	});


	/*$('.nav__tab').click(function (event) {
		if ($(this).hasClass('active') == false) {
			$('.nav__tab').not(this).removeClass('active');
			$('.timetable').fadeOut(300);
			$(this).addClass('active');
			if ($(this).hasClass('nav__tab__117')) {
				$('.timetable_117').delay(300).fadeIn(300, function () {
					$(this).css('display', 'grid')
				});
			} else {
				$('.timetable_217').delay(300).fadeIn(300, function () {
					$(this).css('display', 'grid')
				});
			}
		}
	});*/

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
});
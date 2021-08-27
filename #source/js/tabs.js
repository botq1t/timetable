$(document).ready(function () {
	$('.nav__tab').click(function (event) {
		if ($(this).hasClass('active') == false) {
			$('.nav__tab').not(this).removeClass('active');
			$('.main__body').fadeOut(300);
			$(this).addClass('active');
			if ($(this).hasClass('nav__tab__117')) {
				$('.main__body_117').delay(300).fadeIn(300, function () {
					$(this).css('display', 'grid')
				});
			} else {
				$('.main__body_217').delay(300).fadeIn(300, function () {
					$(this).css('display', 'grid')
				});
			}
		}
	});

	$('.day__name').click(function (event) {
		if ($(this).next().hasClass('active')) {
			$(this).next().slideUp(300)
		} else {
			$(this).next().slideDown(300, function () {
				$(this).css('display', 'grid')
			})
		}
		$(this).next().toggleClass('active');
	})
});
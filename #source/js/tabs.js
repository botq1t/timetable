$(document).ready(function () {
	$('.nav__tab').click(function (event) {
		$('.nav__tab').not(this).removeClass('active');
		$('.main__body').hide();
		$(this).addClass('active');
		if ($(this).hasClass('nav__tab__117')) {
			$('.main__body_117').show();
		} else {
			$('.main__body_217').show();
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
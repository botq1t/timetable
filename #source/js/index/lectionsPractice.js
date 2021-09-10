$(document).ready(function () {
	$('.lesson__type').each(function () {
		if ($(this).text() == 'ЛК') {
			$(this).parent('.lesson').addClass('lesson_lection');
		} else {
			$(this).parent('.lesson').addClass('lesson_practice');
		};
	});
});
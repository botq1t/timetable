let titleChangerArray = [
	'Хочу передать привет Сивцу P.S. Сашка Бурбик',
	'Коренислав, где Бурбислав?',
	'Нэ атмечай у мения жёпа болыт',
	'Разбрёмсь',
	'Жирнолею привет завтра передавайте',
	'Пары в субботу? Почему настолько кайф?',
	'Папаня орёт!',
	'Значиць генератор генератор генерирует генерирует',
	'Дополнительная литература дополняет',
	'Шарага на любителя, но тем самым любителям она понравится',
	'Продам гараж',
	'ПэПэПэ ПэВэПэ',
	'Сайт проспонсирован Старановичем',
	'Здороваться, значиць, не будем',
	'У Лукоморья дуб зелёный...',
	'Напрягают алкоголики',
	'Замечательное место',
	'Ты что игнорируешь? Занятия никто не отменял',
	'Та ти, ти ти та ти. Или просто ти ти та',
	'Пугачёва умерла',
]
let birthFlag = false;
/*
let titleChangerHappyBirthday = {
	'date': ['24.9', '14.10', '3.0'],
	'name': ['Грузик', 'Корнеслав', 'Медвежонок'],
}


function titleBirthCheker() {
	var titleDate = `${date.getDate().toString()}.${date.getMonth().toString()}`;
	console.log('title string', titleDate);

	if (titleChangerHappyBirthday['date'].includes(titleDate)) {
		var titleIndex = titleChangerHappyBirthday['date'].indexOf(titleDate);
		birthFlag = true;
	}

	if (birthFlag) {
		clearInterval(titleChanger);
		$('.header__title').html(`<span class="icon-cake"></span><p>С Днём Рождения, ${titleChangerHappyBirthday['name'][titleIndex]}!</p><span class="icon-cake"></span>`);
	} else {
		setInterval(titleChanger, 5000);
	}
}

*/

let titleChangerHappyBirthday = {
	'24.9': 'Грузик',
	'14.10': 'Корнеславик',
	'3.0': 'Медвежонок',
	'3.0': 'Медвежонок',
	'13.8': 'Настя Куш',
	'25.8': 'Маша',
}


function titleBirthCheker() {
	let titleDate = `${date.getDate().toString()}.${date.getMonth().toString()}`;
	console.log('title string', titleDate);

	if (titleDate in titleChangerHappyBirthday) {
		birthFlag = true;
	}

	if (birthFlag) {
		clearInterval(titleChanger);
		$('.header__title').html(`<span class="icon-cake"></span><p>С Днём Рождения, ${titleChangerHappyBirthday[titleDate]}!</p><span class="icon-cake"></span>`);
	} else {
		setInterval(titleChanger, 5000);
	}
}

titleBirthCheker();
setInterval(titleBirthCheker, 10000);


function titleChanger() {
	$('.header__title').fadeOut(400, function () {
		$(this).fadeIn(400).children('p').html(titleChangerArray[Math.floor(Math.random() * titleChangerArray.length)]);
	})
}


// titleChanger();
// setInterval(titleChanger, 5000);
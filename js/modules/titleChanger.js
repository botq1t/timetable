const titleChangerArray = [
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
	'Ты меня презираешь',
];

const titleChangerHappyBirthday = {
	'3.0': 'Медвежонок',
	'10.0': 'Таня',
	'10.2': 'Артурчик Крутилкин',
	'20.2': 'Иветта',
	'18.4': 'Юля Танцовщица',
	'25.6': 'Даша Квак',
	'2.6': 'Юля',
	'18.7': 'Саша фром Финлядния',
	'13.8': 'Настя Куш',
	'25.8': 'Маша',
	// '24.9': 'Грузик',
	'2.10': 'Ягрон',
	'14.10': 'Корнеславик',
};

const titleBirthCheker = function (date, flag) {
	let titleDate = `${date.getDate().toString()}.${date.getMonth().toString()}`;
	// console.log('title string', titleDate);

	if (titleDate in titleChangerHappyBirthday) {
		$('.header__title').html(`<span class="icon-cake"></span><p>С Днём Рождения, ${titleChangerHappyBirthday[titleDate]}!</p><span class="icon-cake"></span>`);
	} else if (flag) {
		setInterval(titleChanger, 5000);
	}
}

function titleChanger() {
	$('.header__title').fadeOut(400, function () {
		$(this).fadeIn(400).children('p').html(titleChangerArray[Math.floor(Math.random() * titleChangerArray.length)]);
	})
}

export { titleBirthCheker };
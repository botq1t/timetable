$(document).ready(function () {
	function getRemain() {
		var semCurrentDate = new Date();
		var semEnd = 1640898000000;
		var semRemain = semEnd - semCurrentDate;

		semRemain = Math.floor(semRemain / 1000);
		semRemainDays = Math.floor(semRemain / 86400);
		semRemainTime = (semRemain % 86400);
		semRemainHours = Math.floor(semRemainTime / 3600);
		semRemainMinutes = Math.floor((semRemainTime % 3600) / 60);
		semRemainSeconds = ((semRemainTime % 86400) % 60);

		semRemainTimeString = `До Нового Года: ${semRemainDays} дней, `;
		if (semRemainHours < 10) { semRemainTimeString = semRemainTimeString + '0' }
		semRemainTimeString = semRemainTimeString + semRemainHours + ':';
		if (semRemainMinutes < 10) { semRemainTimeString = semRemainTimeString + '0' }
		semRemainTimeString = semRemainTimeString + semRemainMinutes + ':';
		if (semRemainSeconds < 10) { semRemainTimeString = semRemainTimeString + '0' }
		semRemainTimeString = semRemainTimeString + semRemainSeconds;
		$('.footer__time').text(semRemainTimeString);
	}
	setTimeout(getRemain, 0);
	setInterval(getRemain, 1000);
});
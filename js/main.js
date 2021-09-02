let lessonsDayName=["Понедельник","Вторник","Среда","Четверг","Пятница"],lessonsU117={1:{1:{index:1,parity:"both",name:"АИП и ЧФ",type:"ЛК",auditory:"3207",teacher:"Козлова О.Г."},2:{index:2,parity:"both",name:"ПАП при ОВД",type:"ПЗ",auditory:"3204",teacher:"Александров О.В."},3:{index:3,parity:"both",name:"ПП и ТОВД",type:"ЛК",auditory:"3203",teacher:"Дубовский А.В."},4:{index:4,parity:"both",name:"ФРО на АЯ",type:"ПЗ",auditory:"1305",teacher:"Лазовский Г.Б."}},2:{1:{index:1,parity:"both",name:"ЭО",type:"ЛК",auditory:"3103",teacher:"Науменко А.И."},2:{index:2,parity:"both",name:"ЭО",type:"ПЗ",auditory:"3209",teacher:"Науменко А.И."},3:{index:3,parity:"both",name:"АИП и ЧФ",type:"ПЗ",auditory:"3204",teacher:"Козлова О.Г."}},3:{1:{index:1,parity:"both",name:"ОПВД",type:"ПЗ",auditory:"3204",teacher:"Вишневский Р.А."},2:{index:2,parity:"both",name:"ФРО на АЯ",type:"ПЗ",auditory:"1305",teacher:"Лазовский Г.Б."},3:{index:3,parity:"both",name:"ПП и ТОВД",type:"ПЗ",auditory:"3204",teacher:"Дубовский А.В."}},4:{1:{index:1,parity:"odd",name:"МОМАН",type:"ЛК",auditory:"3203",teacher:"Барабан И.И."},2:{index:1,parity:"even",name:"АП и ПНК",type:"ЛК",auditory:"3103",teacher:"Пилипчук В.С."},3:{index:2,parity:"both",name:"ОПВД",type:"ЛК",auditory:"3204",teacher:"Вишневский Р.А."},4:{index:3,parity:"both",name:"ПАП при ОВД",type:"ЛК",auditory:"3204",teacher:"Вишневский Р.А."}},5:{1:{index:1,parity:"both",name:"ФРО на АЯ",type:"ПЗ",auditory:"1305",teacher:"Лазовский Г.Б."},2:{index:2,parity:"odd",name:"АП и ПНК",type:"ПЗ",auditory:"3103",teacher:"Пилипчук В.С."},3:{index:2,parity:"even",name:"МОМАН",type:"ПЗ",auditory:"3203",teacher:"Барабан И.И."},4:{index:3,parity:"both",name:"ПП и ТОВД",type:"ПЗ",auditory:"3203",teacher:"Дубовский А.В."}}},lessonsU217={1:{1:{index:1,parity:"both",name:"АИП и ЧФ",type:"ЛК",auditory:"3207",teacher:"Козлова О.Г."},2:{index:2,parity:"both",name:"ФРО на АЯ",type:"ПЗ",auditory:"1305, 1307",teacher:"Лазовский Г.Б., Швайко Е. П."},3:{index:3,parity:"both",name:"ПП и ТОВД",type:"ЛК",auditory:"3203",teacher:"Дубовский А.В."},4:{index:4,parity:"both",name:"ОПВД",type:"ПЗ",auditory:"3204",teacher:"Вишневский Р.А."}},2:{1:{index:1,parity:"both",name:"ЭО",type:"ЛК",auditory:"3103",teacher:"Науменко А.И."},2:{index:2,parity:"both",name:"АИП и ЧФ",type:"ПЗ",auditory:"3204",teacher:"Козлова О.Г."},3:{index:3,parity:"both",name:"ЭО",type:"ПЗ",auditory:"3209",teacher:"Науменко А.И."}},3:{1:{index:1,parity:"both",name:"ФРО на АЯ",type:"ПЗ",auditory:"1305, 1307",teacher:"Лазовский Г.Б., Швайко Е. П."},2:{index:2,parity:"both",name:"ПП и ТОВД",type:"ПЗ",auditory:"3204",teacher:"Дубовский А.В."},3:{index:3,parity:"both",name:"ПАП при ОВД",type:"ПЗ",auditory:"3103",teacher:"Александров О.В."}},4:{1:{index:1,parity:"odd",name:"МОМАН",type:"ЛК",auditory:"3203",teacher:"Барабан И.И."},2:{index:1,parity:"even",name:"АП и ПНК",type:"ЛК",auditory:"3103",teacher:"Пилипчук В.С."},3:{index:2,parity:"both",name:"ОПВД",type:"ЛК",auditory:"3204",teacher:"Вишневский Р.А."},4:{index:3,parity:"both",name:"ПАП при ОВД",type:"ЛК",auditory:"3204",teacher:"Вишневский Р.А."}},5:{1:{index:1,parity:"odd",name:"no",type:"no",auditory:"no",teacher:"no"},2:{index:1,parity:"even",name:"МОМАН",type:"ПЗ",auditory:"3203",teacher:"Барабан И.И."},3:{index:2,parity:"both",name:"ФРО на АЯ",type:"ПЗ",auditory:"1305, 1307",teacher:"Лазовский Г.Б., Швайко Е. П."},4:{index:3,parity:"odd",name:"АП и ПНК",type:"ПЗ",auditory:"3103",teacher:"Пилипчук В.С."},5:{index:3,parity:"even",name:"no",type:"no",auditory:"no",teacher:"no"},6:{index:4,parity:"both",name:"ПП и ТОВД",type:"ПЗ",auditory:"3203",teacher:"Дубовский А.В."}}};function schedule(){let e,n,s,o,t,a,d,i,r,l,c,y;$("#u117-target").empty(),$("#u217-target").empty();for(let m=1;m<6;m++){for(e=1,d=1,$("#u117-target").append("<div></div>"),$("#u117-target").children("div").last().addClass(`main__day day day_${m}`),$("#u217-target").append("<div></div>"),$("#u217-target").children("div").last().addClass(`main__day day day_${m}`),t=$("#u117-target").children(`.day_${m}`),c=$("#u217-target").children(`.day_${m}`),t.append(`<h2 class="day__name">${lessonsDayName[m-1]}</h2>`),t.append('<ul class="day__timetable"></ul>'),c.append(`<h2 class="day__name">${lessonsDayName[m-1]}</h2>`),c.append('<ul class="day__timetable"></ul>'),a=t.children(".day__timetable"),y=c.children(".day__timetable");null!=lessonsU117[m][e];){switch(n=lessonsU117[m][e],a.append(`<li class="day__lesson lesson lesson_${n.index}"></li>`),s=a.children().last(),n.parity){case"both":s.addClass("lesson_odd lesson_even");break;case"odd":s.addClass("lesson_odd");break;case"even":s.addClass("lesson_even")}if(s.append(`<div class="lesson__time time time_${n.index} lesson__item"></div>`),o=s.children().last(),o.append('<div class="time__start"></div>').append('<div class="time__end"></div>'),"no"==n.name)switch(n.index){case 1:s.append('<div class="lesson__item lesson_out"><span class="icon-sleep"></spanМожно спать между прочим!<span class="icon-sleep"></span></div>');break;default:s.append('<div class="lesson__item lesson_out"><span class="icon-sad"></span>Форточка<span class="icon-sad"></span></div>')}else s.append(`<div class="lesson__name lesson__item">${n.name}</div>`),s.append(`<div class="lesson__type lesson__item">${n.type}</div>`),s.append(`<div class="lesson__autidory lesson__item">${n.auditory}</div>`),s.append(`<div class="lesson__teacher lesson__item">${n.teacher}</div>`);e++}for(;null!=lessonsU217[m][d];){switch(i=lessonsU217[m][d],y.append(`<li class="day__lesson lesson lesson_${i.index}"></li>`),r=y.children().last(),i.parity){case"both":r.addClass("lesson_odd lesson_even");break;case"odd":r.addClass("lesson_odd");break;case"even":r.addClass("lesson_even")}if(r.append(`<div class="lesson__time time time_${i.index} lesson__item"></div>`),l=r.children().last(),l.append('<div class="time__start"></div>').append('<div class="time__end"></div>'),"no"==i.name)switch(i.index){case 1:r.append('<div class="lesson__item lesson_out"><span class="icon-sleep"></span>Можно спать между прочим!<span class="icon-sleep"></span></div>');break;default:r.append('<div class="lesson__item lesson_out"><span class="icon-sad"></span>Форточка<span class="icon-sad"></span></div>')}else r.append(`<div class="lesson__name lesson__item">${i.name}</div>`),r.append(`<div class="lesson__type lesson__item">${i.type}</div>`),r.append(`<div class="lesson__autidory lesson__item">${i.auditory}</div>`),r.append(`<div class="lesson__teacher lesson__item">${i.teacher}</div>`);d++}}}console.log("Расписание У117:"),console.log(lessonsU117),console.log("Расписание У217:"),console.log(lessonsU217),$(document).ready(schedule);let lessonTime={1:{begin:"08:00",end:"09:35"},2:{begin:"09:50",end:"11:25"},3:{begin:"11:40",end:"13:15"},4:{begin:"14:00",end:"15:35"}},breakTime={big:{1:{begin:"09:35",end:"09:50"},2:{begin:"11:25",end:"11:40"},3:{begin:"13:15",end:"14:00"}},little:{1:{begin:"08:45",end:"08:50"},2:{begin:"10:35",end:"10:40"},3:{begin:"11:25",end:"11:30"},4:{begin:"14:45",end:"14:50"}}},lessonTimeSeconds={1:{begin:0,end:0},2:{begin:0,end:0},3:{begin:0,end:0},4:{begin:0,end:0}},breakTimeSeconds={big:{1:{begin:0,end:0},2:{begin:0,end:0},3:{begin:0,end:0}},little:{1:{begin:0,end:0},2:{begin:0,end:0},3:{begin:0,end:0},4:{begin:0,end:0}}};function timeToSeconds(e){return 3600*e.split(":")[0]+60*e.split(":")[1]}for(let e=1;e<5;e++)lessonTimeSeconds[e].begin=timeToSeconds(lessonTime[e].begin),lessonTimeSeconds[e].end=timeToSeconds(lessonTime[e].end);console.log("Пары:",lessonTime),console.log("Пары в секундах",lessonTimeSeconds);for(let e=1;e<4;e++)breakTimeSeconds.big[e].begin=timeToSeconds(breakTime.big[e].begin),breakTimeSeconds.big[e].end=timeToSeconds(breakTime.big[e].end);for(let e=1;e<5;e++)breakTimeSeconds.little[e].begin=timeToSeconds(breakTime.little[e].begin),breakTimeSeconds.little[e].end=timeToSeconds(breakTime.little[e].end);console.log("Перерывы",breakTime),console.log("Перерывы в секундах",breakTimeSeconds),$(document).ready((function(){for(let e=1;e<5;e++)$(`.time_${e}`).each((function(){$(this).children(".time__start").text(lessonTime[e].begin),$(this).children(".time__end").text(lessonTime[e].end)}))}));let monthName=["января","февраля","марта","апреля","мая","июня","илюя","августа","сентября","октября","ноября","декабря"],dayName=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];const remainEnd=16405524e5,weekCheck=6048e5,semBegin=16304544e5;let nextDayLastLessonTime,currentLessonBegin,currentLessonEnd;var date,dayIndex,timeInSeconds;function getDate(){date=new Date,dayIndex=date.getDay(),timeInSeconds=3600*date.getHours()+60*date.getMinutes()+date.getSeconds()}function getTimeString(e,n,s){var o="";return e<10&&(o+="0"),o=o+e+":",n<10&&(o+="0"),o=o+n+":",s<10&&(o+="0"),o+=s}function getHMS(e){var n={hours:0,minutes:0,seconds:0};return n.hours=Math.floor(e/3600),n.minutes=Math.floor((e-3600*n.hours)/60),n.seconds=e-3600*n.hours-60*n.minutes,n}function getRemain(){var e=remainEnd-date.getTime();e=Math.floor(e/1e3);var n=Math.floor(e/86400),s=getHMS(e-86400*n),o=`${n} дней, ${getTimeString(s.hours,s.minutes,s.seconds)}`;$(".footer__time").text(`До сессии осталось ${o}`)}function hlToday(){$(`.day_${dayIndex}`).children(".day__name").addClass("active slide").next().css("display","grid")}function getWeekIndex(){var e=date.getTime()-semBegin;return Math.floor(e/6048e5)+1}getDate(),setInterval(getDate,1e3),console.log("Дата:",date),console.log("Номер дня:",dayIndex),console.log("Время в секундах:",timeInSeconds),console.log();var weekIndex=getWeekIndex();function setWeekParity(){weekIndex%2==0?($(".week__even-odd").removeClass("odd").addClass("even").text("Чётная неделя"),$(".main").removeClass("odd").addClass("even"),$(".nav__tab").removeClass("odd").addClass("even"),$(".lesson_even").css("display","grid"),$(".lesson_odd").each((function(){0==$(this).hasClass("lesson_even")&&$(this).css("display","none")}))):($(".week__even-odd").removeClass("even").addClass("odd").text("Нечётная неделя"),$(".main").removeClass("even").addClass("odd"),$(".nav__tab").removeClass("even").addClass("odd"),$(".lesson_odd").css("display","grid"),$(".lesson_even").each((function(){0==$(this).hasClass("lesson_odd")&&$(this).css("display","none")}))),weekIndex++}function getLessonAmount(e,n){null==n&&(n=dayIndex),6!=n&&0!=n||(n=1);for(var s=$(`#u${e}-target`).children(`.day_${n}`).children(".day__timetable").children(".lesson").last(),o=5;0==s.hasClass(`lesson_${o}`);)o--;return o}console.log("Номер текущей недели:",weekIndex);var nextDayIndex=dayIndex+1;function setNextDay(e,n){var s=getLessonAmount(e);console.log(`Количество пар У${e} сегодня:`,s),function(e,n){var o=`#u${e}-target`;6!=dayIndex&&0!=dayIndex?timeInSeconds>=lessonTimeSeconds[s].end+n&&($(o).children(`.day_${nextDayIndex}`).children(".day__name").addClass("nextDay slide").next().css("display","grid"),$(o).children(`.day_${dayIndex}`).children(".day__name").removeClass("slide").next().slideUp()):($(o).children(".day_1").children(".day__name").addClass("nextDay slide").next().css("display","grid"),$(o).children(`.day_${dayIndex}`).children(".day__name").removeClass("slide").next().slideUp())}(e,n)}function getCurrentBreakIndex(){for(var e=1;e<=3;e++)if(timeInSeconds>=breakTimeSeconds.big[e].begin&&timeInSeconds<breakTimeSeconds.big[e].end)var n=e;return n}function getCurrentLessonIndex(){for(var e=1;e<=4;e++)if(timeInSeconds>=lessonTimeSeconds[e].begin&&timeInSeconds<lessonTimeSeconds[e].end)var n=e;return n}function getCurrentLesson(){var e=getCurrentLessonIndex();$(`.day_${dayIndex}`).children(".day__timetable").children(".lesson").each((function(){$(this).removeClass("active")})),$(`.day_${dayIndex}`).children(".day__timetable").children(`.lesson_${e}`).each((function(){$(this).addClass("active")}))}nextDayIndex>5&&(nextDayIndex=1),console.log("Завтра:",dayName[nextDayIndex]),$(document).ready((function(){function e(){$(".week__date").text(`Сегодня: ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()} г. (${dayName[dayIndex]}, ${nowWeekIndex}-ая неделя)`);var e=getTimeString(date.getHours(),date.getMinutes(),date.getSeconds());$(".week__time").text(`Время: ${e}`)}e(),setInterval(e,1e3),getRemain(),setInterval(getRemain,1e3),hlToday(),setWeekParity(),$(".week__even-odd").click(setWeekParity),setNextDay(117,300),setNextDay(217,300),getCurrentLesson(),setInterval(getCurrentLesson,1e3)})),$(document).ready((function(){$(".nav__tab").each((function(){if($(this).hasClass("active")){var e=$(this).attr("id");$(`#${e}-target`).css("display","grid"),$(`#${e}-target`).hasClass("now")&&$(`#${e}-target`).css("display","flex")}})),$(".nav__tab").click((function(e){if(0==$(this).hasClass("active")){$(".nav__tab").removeClass("active"),$(this).addClass("active");var n=$(this).attr("id");$(".main__tab").fadeOut(150),$(`#${n}-target`).delay(160).fadeIn(150,(function(){$(this).css("display","grid"),$(`#${n}-target`).hasClass("now")&&$(`#${n}-target`).css("display","flex")}))}})),$(".day__name").click((function(e){$(this).hasClass("slide")?$(this).next().slideUp(300):$(this).next().slideDown(300,(function(){$(this).css("display","grid")})),$(this).toggleClass("slide")}))}));let lessonName={short:["ФРО на АЯ","АИП и ЧФ","ПАП при ОВД","ПП и ТОВД","ЭО","ОПВД","АП и ПНК","МОМАН"],full:["Фразеология радиообмена на английском языке","Авиационная инженерная психология и человеческий фактор","Предотвращение АП при обслуживании ВД","Правила, процедуры и технология обслуживания воздушного движения","Экономика отрасли","Организация потоков воздушного движения","Авиационные приборы и ПНК","Метеорологическое обеспечение международной АН"]},teacherName={short:["Лазовский Г.Б., Швайко Е. П.","Науменко А.И.","Козлова О.Г.","Александров О.В.","Дубовский А.В.","Лазовский Г.Б.","Вишневский Р.А.","Пилипчук В.С.","Барабан И.И."],full:["Лазовский Георгий Борисович, Швайко Елена Петровна","Науменко Александр Иванович","Козлова Ольга Григорьевна","Александров Олег Валерьевич","Дубовский Алексей Викторович","Лазовский Георгий Борисович","Вишневский Роман Анатольевич","Пилипчук Владимир Сергеевич","Барабан Иван Иванович"]};$(document).ready((function(){function e(){for(let e=0;e<lessonName.short.length;e++)switch($(this).text()){case lessonName.short[e]:$(this).fadeOut(100,(function(){$(this).text(lessonName.full[e]).fadeIn(100)}));break;case lessonName.full[e]:$(this).fadeOut(100,(function(){$(this).text(lessonName.short[e]).fadeIn(100)}))}}$(".lesson__name").click(e),$(".now__name").click(e),$(".lesson__teacher").click((function(){console.log($(this).text());for(let e=0;e<teacherName.short.length;e++)switch($(this).text()){case teacherName.short[e]:$(this).fadeOut(100,(function(){$(this).text(teacherName.full[e]).fadeIn(100)}));break;case teacherName.full[e]:$(this).fadeOut(100,(function(){$(this).text(teacherName.short[e]).fadeIn(100)}))}}))})),$(document).ready((function(){$(".lesson__type").each((function(){"ЛК"==$(this).text()?$(this).parent(".lesson").addClass("lesson_lection"):$(this).parent(".lesson").addClass("lesson_practice")}))}));const nowWeekIndex=getWeekIndex();var nowLessonArray={117:{1:{name:"no",type:"no",auditory:"no"},2:{name:"no",type:"no",auditory:"no"},3:{name:"no",type:"no",auditory:"no"},4:{name:"no",type:"no",auditory:"no"}},217:{1:{name:"no",type:"no",auditory:"no"},2:{name:"no",type:"no",auditory:"no"},3:{name:"no",type:"no",auditory:"no"},4:{name:"no",type:"no",auditory:"no"}}},nowNextLessonArray={117:{0:{name:"no",type:"no",auditory:"no",begin:0,index:0},1:{name:"no",type:"no",auditory:"no",begin:0,index:0},2:{name:"no",type:"no",auditory:"no",begin:0,index:0},3:{name:"no",type:"no",auditory:"no",begin:0,index:0}},217:{0:{name:"no",type:"no",auditory:"no",begin:0,index:0},1:{name:"no",type:"no",auditory:"no",begin:0,index:0},2:{name:"no",type:"no",auditory:"no",begin:0,index:0},3:{name:"no",type:"no",auditory:"no",begin:0,index:0}}};if(6==dayIndex||0==dayIndex)$("#now_117").children(".now__content").slideUp(300),$("#now_117").children(".now__gone").html("Выходной!").slideDown(300,(function(){$(this).css("display","flex")})),$("#now_217").children(".now__content").slideUp(300),$("#now_217").children(".now__gone").html("Выходной!").slideDown(300,(function(){$(this).css("display","flex")}));else{function nowUpdate(e){0!=timeInSeconds&&timeInSeconds!=lessonTimeSeconds[getLessonAmount(e)].end||(console.log("update1"),nowCheckAfter(e),nowCheck(e),nowNextLesson(e)),null!=getCurrentLessonIndex()&&(timeInSeconds!=lessonTimeSeconds[getCurrentLessonIndex()].begin&&timeInSeconds!=lessonTimeSeconds[getCurrentLessonIndex()].end||(console.log("update1"),nowCheck(e),nowLesson(e),nowNextLesson(e))),0==timeInSeconds&&$(`#now_${e}`).children(".now__gone").slideUp(300)}function makeNowLessonArray(e){var n=1;switch(e){case 117:for(;null!=lessonsU117[dayIndex][n];){switch(lessonsU117[dayIndex][n].parity){case"both":nowLessonArray[e][lessonsU117[dayIndex][n].index].name=lessonsU117[dayIndex][n].name,nowLessonArray[e][lessonsU117[dayIndex][n].index].type=lessonsU117[dayIndex][n].type,nowLessonArray[e][lessonsU117[dayIndex][n].index].auditory=lessonsU117[dayIndex][n].auditory;break;case"odd":nowWeekIndex%2!=0&&(nowLessonArray[e][lessonsU117[dayIndex][n].index].name=lessonsU117[dayIndex][n].name,nowLessonArray[e][lessonsU117[dayIndex][n].index].type=lessonsU117[dayIndex][n].type,nowLessonArray[e][lessonsU117[dayIndex][n].index].auditory=lessonsU117[dayIndex][n].auditory);break;case"even":nowWeekIndex%2==0&&(nowLessonArray[e][lessonsU117[dayIndex][n].index].name=lessonsU117[dayIndex][n].name,nowLessonArray[e][lessonsU117[dayIndex][n].index].type=lessonsU117[dayIndex][n].type,nowLessonArray[e][lessonsU117[dayIndex][n].index].auditory=lessonsU117[dayIndex][n].auditory)}n++}break;case 217:for(;null!=lessonsU217[dayIndex][n];){switch(lessonsU217[dayIndex][n].parity){case"both":nowLessonArray[e][lessonsU217[dayIndex][n].index].name=lessonsU217[dayIndex][n].name,nowLessonArray[e][lessonsU217[dayIndex][n].index].type=lessonsU217[dayIndex][n].type,nowLessonArray[e][lessonsU217[dayIndex][n].index].auditory=lessonsU217[dayIndex][n].auditory;break;case"odd":nowWeekIndex%2!=0&&(nowLessonArray[e][lessonsU217[dayIndex][n].index].name=lessonsU217[dayIndex][n].name,nowLessonArray[e][lessonsU217[dayIndex][n].index].type=lessonsU217[dayIndex][n].type,nowLessonArray[e][lessonsU217[dayIndex][n].index].auditory=lessonsU217[dayIndex][n].auditory);break;case"even":nowWeekIndex%2==0&&(nowLessonArray[e][lessonsU217[dayIndex][n].index].name=lessonsU217[dayIndex][n].name,nowLessonArray[e][lessonsU217[dayIndex][n].index].type=lessonsU217[dayIndex][n].type,nowLessonArray[e][lessonsU217[dayIndex][n].index].auditory=lessonsU217[dayIndex][n].auditory)}n++}}}function makeNowNextLessonArray(e){for(var n=0;n<getLessonAmount(e);){for(j=n+1;"no"==nowLessonArray[e][j].name;)j++;nowNextLessonArray[e][n].name=nowLessonArray[e][j].name,nowNextLessonArray[e][n].type=nowLessonArray[e][j].type,nowNextLessonArray[e][n].auditory=nowLessonArray[e][j].auditory,nowNextLessonArray[e][n].begin=lessonTimeSeconds[j].begin,nowNextLessonArray[e][n].index=j,n++}}function nowCheckAfter(e){var n=`#now_${e}`;timeInSeconds>=lessonTimeSeconds[getLessonAmount(e)].end&&(console.log(e,"сейчас после окончания пар"),$(n).children(".current").slideUp(300),$(n).children(".now__gone").html("На сегодня пары закончились!").slideDown(300,(function(){$(this).css("display","flex")})))}function nowCheck(e){var n=`#now_${e}`,s=getCurrentLessonIndex();null==s?(console.log(e,"сейчас нет пары"),$(n).children(".current").slideUp(300)):"no"!=nowLessonArray[e][s].name&&timeInSeconds<lessonTimeSeconds[getLessonAmount(e)].end&&(console.log(e,"сейчас есть пара"),$(n).children(".current").slideDown(300,(function(){$(this).css("display","flex")})))}function nowLesson(e){var n=`#now_${e}`,s=getCurrentLessonIndex();if(null!=s){function o(e){var n=`#now_${e}`,o=getHMS(lessonTimeSeconds[s].end-timeInSeconds),t=getTimeString(o.hours,o.minutes,o.seconds);$(n).children(".current").children(".now__countdown").html(`До конца: ${t}`)}$(n).children(".current").children(".now__auditory").html(`Сейчас: ${s}-ая (${nowLessonArray[e][s].auditory})`),$(n).children(".current").children(".now__lesson").children(".now__name").html(nowLessonArray[e][s].name),$(n).children(".current").children(".now__lesson").children(".now__type").html(nowLessonArray[e][s].type),o(e),setInterval(o,1e3,e)}}function nowNextLesson(e){var n,s=`#now_${e}`;if(console.log(e,"сегодня пар",getLessonAmount(e)),timeInSeconds<lessonTimeSeconds[1].begin)console.log(e,"перед первой парой"),n=0;else if(timeInSeconds>=lessonTimeSeconds[1].begin&&timeInSeconds<lessonTimeSeconds[getLessonAmount(e)].begin)null==(n=getCurrentLessonIndex(e))&&(n=getCurrentBreakIndex(e)),console.log(e,"между началом первой и началом последней");else if(timeInSeconds>=lessonTimeSeconds[getLessonAmount(e)].begin)return $(s).children(".next").slideUp(300),$(s).children(".current").addClass("noNext"),void console.log(e,"после начала последней");console.log(e,"текущая пара",n);var o=$(s).children(".next");function t(e){var s=nowNextLessonArray[e][n].begin-timeInSeconds;temp2=getHMS(s),temp3=getTimeString(temp2.hours,temp2.minutes,temp2.seconds),o.children(".now__countdown").html(`До начала: ${temp3}`)}o.slideDown(300,(function(){$(this).css("display","flex")})),o.children(".now__auditory").html(`Следующая: ${nowNextLessonArray[e][n].index}-ая (${nowNextLessonArray[e][n].auditory})`),o.children(".now__lesson").children(".now__name").html(nowNextLessonArray[e][n].name),o.children(".now__lesson").children(".now__type").html(nowNextLessonArray[e][n].type),t(e),setInterval(t,1e3,e)}setInterval(nowUpdate,1e3,117),setInterval(nowUpdate,1e3,217),makeNowLessonArray(117),makeNowLessonArray(217),console.log("nowLessonArray",nowLessonArray),makeNowNextLessonArray(117),makeNowNextLessonArray(217),console.log("nowNextLessonArray",nowNextLessonArray),$(document).ready((function(){nowCheckAfter(117),nowCheckAfter(217)})),$(document).ready((function(){nowCheck(117),nowCheck(217)})),$(document).ready((function(){nowLesson(117),nowLesson(217)})),nowNextLesson(117),nowNextLesson(217)}
function AddHeightToWrap(inner, outer) {

    let wrapCard = document.querySelectorAll(outer);
    for (let unit of wrapCard) {
        unit.style.removeProperty('height');
    }

    const arrHeight = [];

    let cnt = 0;
    const getImg = document.querySelectorAll(inner);
    for (let imgHeight of getImg) {
        let size = imgHeight.getBoundingClientRect().height;
        arrHeight.push(size)
    }

    wrapCard = document.querySelectorAll(outer);
    for (let unit of wrapCard) {
        heightStr = arrHeight[cnt] + 4;
        if (arrHeight[cnt] == 0) {
            heightStr = arrHeight[cnt]
        }
        unit.style.height = heightStr.toString() + "px";
        cnt++
    }
    cnt = 0;
}

function ControlBodySize() {
    AddHeightToWrap('.main__knowing .contentCard', '.main__knowing .wrapAnimationEl');
    AddHeightToWrap('.main__aboutUs .contentCard', '.main__aboutUs .wrapAnimationEl');
    AddHeightToWrap('.main__iGet .contentCard', '.main__iGet .wrapAnimationEl');
    AddHeightToWrap('.carousel .contentCard', '.carousel .wrapAnimationEl');
    AddHeightToWrap('.carousel .contentCard', '.wrapArrow');


}

const resizeObsToAddHeightToWrap = new ResizeObserver(ControlBodySize);
resizeObsToAddHeightToWrap.observe(document.querySelector('body'));

const popUpSleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// AddHeightToWrap('.main__knowing .contentCard', '.main__knowing .wrapAnimationEl');
// AddHeightToWrap('.main__aboutUs .contentCard', '.main__aboutUs .wrapAnimationEl');

// ////////////////////////////////////////////////////////////////////////////////

// page auto-scroll
function slowSmoothScrollToBottomAnimationFrame(duration = 3000, step = 100) {
    const start = window.pageYOffset;
    const end = document.documentElement.scrollHeight - window.innerHeight;
    if(end <= start){
        return;
    }

    let startTime;
    let isScrolling = true;

    function scrollAnimation(currentTime) {
        if (!isScrolling) {
            return;
        }
        if (!startTime) {
            startTime = currentTime;
        }

        const progress = Math.min((currentTime - startTime) / duration, 1);
          let  targetScroll = start + (end - start) * progress;
        window.scrollTo(0, targetScroll)


        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        } else {checkBoxScroll.checked = false;}
    }
    function handleEsc(event) {
        if (event.key === 'Escape' || event.code === 'Escape') {
            isScrolling = false;
            checkBoxScroll.checked = false;
          document.removeEventListener('keydown', handleEsc);
        }
    }

    document.addEventListener('keydown', handleEsc);
    requestAnimationFrame(scrollAnimation);
}

const checkBoxScroll = document.querySelector('#header__scroll');
checkBoxScroll.onclick = () => {
    if (checkBoxScroll.checked) {
        console.log('on');
        slowSmoothScrollToBottomAnimationFrame(100000, 0.5)
    }
}




const headerBtn = document.querySelectorAll('.header__bottom-button .onlineRegister');
const headerPopup = document.querySelector('.header__popup');

for (let item of headerBtn) {
    item.addEventListener('click', () => {
        headerPopup.classList.toggle('popupOpen');
        headerPopup.classList.toggle('popupClosed');
        (async () => {
            await popUpSleep(1200);
            AddHeightToWrap('.header__popup-form .contentCard', '.header__popup-form .wrapAnimationEl');
            // Запускаем ресайз для контроля изменения размеров body и пересчета wrapAnimationEl попапа
            function ControlBodySizePopUp() {
                AddHeightToWrap('.header__popup-form .contentCard', '.header__popup-form .wrapAnimationEl');
            }
            const resizeObsToAddHeightToWrap = new ResizeObserver(ControlBodySizePopUp);
            resizeObsToAddHeightToWrap.observe(document.querySelector('body'));
        })();
    })
}

// // Закрываем попап по  клику вне окна

const headerPopupInput = document.querySelector('#popup');
const headerPopupWrap = document.querySelector('.header__popup-wrap');
const popupSecond = document.querySelector('.popupSecond');

headerPopup.addEventListener("click", function (event) {
    let klick = (event.composedPath()).includes(headerPopupWrap);
    if (!klick) {
        headerPopup.classList.toggle('popupOpen');
        headerPopup.classList.toggle('popupClosed');
        // убираем классы после закрытия для плавновности анимации
        (async () => {
            await popUpSleep(1500);
            popupSecond.classList.add('popupSecondClosed');
            popupSecond.classList.remove('popupSecondOpen');
            popupSecond.style.removeProperty('height');
        })()
    }
})

// Закрываем по клику на крестик 
const closePopUp = document.querySelector('.header__popup-close .icon');
closePopUp.addEventListener("click", () => {
    headerPopup.classList.toggle('popupOpen');
    headerPopup.classList.toggle('popupClosed');

    (async () => {
        await popUpSleep(1500);
        popupSecond.classList.add('popupSecondClosed');
        popupSecond.classList.remove('popupSecondOpen');
        popupSecond.style.removeProperty('height');
    })()

})

// Валидация имени //
// /////////////////
const popupBtn = document.querySelector('.popup-button')

function AddClassErr(name) {
    name.classList.add('err');

    const arrErrName = name.className.split(' ');
    if (arrErrName.length >= 2) {
        let error = false;
        let errNameBtnOn = "err" + arrErrName[0];
        console.log(errNameBtnOn);
        const listNames = popupBtn.className.split(' ');
        for (let er of listNames) {
            if (er == errNameBtnOn) {
                let error = true
            }
        }
        if (error == false) {
            popupBtn.classList.add(errNameBtnOn);
        }
    }
}

function OffClassErr(name) {
    name.classList.remove('err');

    console.log(name.className);
    const arrErrName = name.className.split(' ')
    console.log(arrErrName);
    if (arrErrName.length <= 2) {
        let errNameBtnOn = "err" + arrErrName[0];
        console.log(errNameBtnOn);
        const listNames = popupBtn.className.split(' ');
        for (let er of listNames) {
            if (er == errNameBtnOn) {
                popupBtn.classList.remove(errNameBtnOn);
            }
        }
    }
}

const russianPattern = /^[А-ЯЁа-яё]{3,}\s[А-ЯЁа-яё]{3,}(\s[А-ЯЁа-яё]{3,})?$/;
const englishPattern = /^[A-Za-z]{3,}\s[A-Za-z]{3,}(\s[A-Za-z]{3,}){0,3}$/;
const getName = document.querySelector('form .userName');
getName.addEventListener('input', () => {
    if (russianPattern.test(getName.value)) {
        OffClassErr(getName)
    } else if (englishPattern.test(getName.value)) { OffClassErr(getName) }
    else (AddClassErr(getName))
})

// Валидация телефона //
// /////////////////////

const phonePattern = /^[+0-9]{1}[0-9]{8,11}$/;
const getPhone = document.querySelector('form .userTel')
// console.log(getPhone);
getPhone.addEventListener('input', () => {
    if (phonePattern.test(getPhone.value)) {
        OffClassErr(getPhone)
    } else {
        AddClassErr(getPhone);
    }
})
// Валидация mail //
// /////////////////////

const emailPattern = /^[a-zA-Zа-яА-Я0-9._-]+@[a-zA-Zа-яА-Я0-9.-]+.[a-zA-Zа-яА-Я]{2,}$/;
const getEmail = document.querySelector('form .userEmail');
getEmail.addEventListener('input', () => {
    if (emailPattern.test(getEmail.value)) {
        OffClassErr(getEmail)
    } else { AddClassErr(getEmail) }
})

// Анимация открытия поля с выбором дат //
// ///////////////////////////////////////

const iconOpenDiv = document.querySelector('.header__popup-outputClose');
const iconOpen = document.querySelector('.header__popup-outputClose .icon');
// const popupSecond = document.querySelector('.popupSecond');
const userChoice = document.querySelector('.userChoice');


iconOpenDiv.addEventListener('click', () => {
    iconOpen.classList.toggle('open');
    popupSecond.classList.toggle('popupSecondClosed');
    popupSecond.classList.toggle('popupSecondOpen');
    (async () => {
        await popUpSleep(600);
        AddHeightToWrap('.header__popup-form .contentCard', '.header__popup-form .wrapAnimationEl');
    })();
})

// Поле с выбором месяцев//
/////////////////////////////

const month = document.querySelector('.header__popup-month p');

// Эта функция выдает количество дней в месяце. Включая февраль высокосного года
Date.prototype.daysInMonth = function () {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
// -----------------------------------------------------------

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDay = date.getDate();
let daysInMonth = date.daysInMonth();
let currentHour = date.getHours();

let countMonth = 0;
let newCurrentMonth;

// Поля ввода даты, и времени  //
const inputData = document.querySelector('.header__popup-text span:nth-child(1)');
const inputData2 = document.querySelector('.header__popup-text span:nth-child(2)');
// ------------------------------
const arrMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль'];
let arrMonthToChange = [arrMonth[currentMonth], arrMonth[currentMonth + 1], arrMonth[currentMonth + 2]];
month.innerHTML = arrMonthToChange[countMonth];

// Листаем месяц вперед-назад //
// ///////////////////////

const svgNext = document.querySelector('.header__popup-next');
const svgPrevious = document.querySelector('.header__popup-previous');

function ChangeUp() {
    countMonth++;
    if (countMonth <= 2) {
        month.innerHTML = arrMonthToChange[countMonth];

        date.setMonth(currentMonth + countMonth);
        newCurrentMonth = date.getMonth();
        daysInMonth = date.daysInMonth();
        const dataList = document.querySelectorAll('.header__popup-bodyData li');
        for (let day of dataList) {
            day.remove();
        }
        GetClassOnDay(0, daysInMonth, newCurrentMonth);
        CurrentHour(date);
        let timer = setInterval(CurrentHour(date), 1000);
        svgPrevious.classList.remove('iconOff');
        svgPrevious.addEventListener('click', ChangeDown);
    }
    if (countMonth == 2) {
        svgNext.classList.add('iconOff');
        svgNext.removeEventListener('click', ChangeUp)
    };
    const choiceTime = document.querySelectorAll(".time .iconOff");
    for (let tm of choiceTime) {
        tm.classList.remove('iconOff');
    }
}
function ChangeDown() {
    countMonth--;
    if (countMonth >= 0) {
        console.log(countMonth)
        month.innerHTML = arrMonthToChange[countMonth];

        date.setMonth(currentMonth + countMonth);
        newCurrentMonth = date.getMonth();
        daysInMonth = date.daysInMonth();
        const dataList = document.querySelectorAll('.header__popup-bodyData li');
        for (let day of dataList) {
            day.remove();
        }
        GetClassOnDay(0, daysInMonth, newCurrentMonth);
        svgNext.classList.remove('iconOff');
        svgNext.addEventListener('click', ChangeUp);
    }
    if (countMonth == 0) {
        const dataList = document.querySelectorAll('.header__popup-bodyData li');
        let newCurrentMonth = date.getMonth();
        for (let day of dataList) {
            day.remove();
        }
        svgPrevious.classList.add('iconOff');
        GetClassOnDay(currentDay, daysInMonth, newCurrentMonth)
        svgPrevious.removeEventListener('click', ChangeDown)
        CurrentHour(date, date.getDate());
    };
}

svgNext.addEventListener('click', ChangeUp);
svgPrevious.addEventListener('click', ChangeDown);

// Выбор времени //
// ////////////////

let time = date.getHours();
function CurrentHour(date) {
    // console.log("Выбрали новую дату ", date)
    const choiceTime = document.querySelector('.time:nth-child(5)');
    // console.log(choiceTime);
    const choiceTime2 = document.querySelector('.time:nth-child(6)');
    // console.log(choiceTime2);
    const choiceTime3 = document.querySelector('.time:nth-child(7)');
    // console.log(choiceTime3);

    if (date.getDate() == currentDay) {
        let time = date.getHours();
        if (time >= 14) {
            choiceTime.classList.add("iconOff");
            choiceTime2.classList.add("iconOff");
            choiceTime3.classList.add("iconOff");
        } else if (time >= 12) {
            choiceTime.classList.add("iconOff");
            choiceTime2.classList.add("iconOff");
        }
        else if (time >= 10) {
            choiceTime.classList.add("iconOff");
        }
    } else if (date.getDate() > currentDay) {
        choiceTime.classList.remove("iconOff");
        choiceTime2.classList.remove("iconOff");
        choiceTime3.classList.remove("iconOff");
    }
}
let timer = setInterval(CurrentHour(date), 1000);

//  Формирование календаря //
// //////////////////////////

GetClassOnDay(currentDay, daysInMonth, currentMonth);

function GetClassOnDay(currentDay, daysInMonth, month) {

    const dataList = document.querySelector('.header__popup-bodyData ul');
    const tmplCalendar = document.querySelector('#tmplCalendar');
    const textLi = tmplCalendar.content.querySelector('li');
    for (let day = 1; day <= daysInMonth; day++) {
        textLi.textContent = `${day}`;
        let li = tmplCalendar.content.cloneNode(true);
        dataList.append(li);
        if (currentDay > day) {
            const dayOff = document.querySelector(`.header__popup-bodyData li:nth-child(${day})`);
            dayOff.classList.add('iconOff');
        } else {
            const getDataFromCalendar = document.querySelectorAll('.header__popup-bodyData li:not(.iconOff)');
            for (let unit of getDataFromCalendar) {
                unit.addEventListener('click', () => {
                    // console.log(unit);
                    inputData.textContent = unit.textContent + ' ' + arrMonth[month];
                    inputData2.textContent = 'Время';

                    const newDayChoice = new Date();
                    newDayChoice.setDate(unit.textContent);
                    // console.log("Выбираем новую дату: ", newDayChoice.getDate())
                    CurrentHour(newDayChoice);
                })
            }
        }
    }
}

const getTimeFromChoice = document.querySelectorAll(".time");
for (let unit of getTimeFromChoice) {
    unit.addEventListener('click', () => {
        const getDataTime = unit.textContent;
        inputData2.textContent = ' ';

        const dataFromSpan = inputData.textContent;
        if (dataFromSpan == 'Дата') {
            inputData2.textContent = 'Сперва выберите дату';
        } else {
            const arrGetDate = dataFromSpan.split(" ");
            if (arrGetDate[1] == arrMonth[currentMonth]) {
                if (arrGetDate[0] == currentDay) {
                    inputData2.textContent = ' ';
                    if ((currentHour + 1) >= getDataTime.split('.')[0].slice(-1)) {
                        inputData2.textContent = 'Время';
                    } else {
                        inputData2.textContent = getDataTime;
                    }
                } else if (arrGetDate[0] > currentDay) {
                    inputData2.textContent = ' ';
                    inputData2.textContent = getDataTime;
                }
            } else {
                inputData2.textContent = ' ';
                inputData2.textContent = getDataTime;
            }
        }
    })
}

// Устанавливаеи mutation observer на див выбора 
// даты и времени, так как функ Add(err) и Off(err)
// пришлось бы ставить много раз в разных частях кода

let mutationObserver = new MutationObserver(CorrectAttr);
const config = {
    attributes: true,
    childList: true,
    subtree: true,
};
mutationObserver.observe(userChoice, config);

const mutationObj = {};
let correctResult = 0;
const reTime = /^(0[0-9]|1[0-9]|2[0-3])\.(0[0-9]|[1-5][0-9])$/;
const reData = /^([1-9]|[12][0-9]|3[01])\s(?:Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь)$/;
function CorrectAttr(mutationsList, observer) {
    if (mutationsList[0].target.className == 'dataChoice') {
        delete mutationObj.timeChoice;
    }
    mutationObj[mutationsList[0].target.className] = mutationsList[0].target.innerText;
    const arrKeyMutationObj = Object.keys(mutationObj);
    if (arrKeyMutationObj.length >= 2) {
        if (reData.test(mutationObj.dataChoice) && reTime.test(mutationObj.timeChoice)) {
            popupBtn.classList.remove('erruserChoice');
        } else {
            popupBtn.classList.add('erruserChoice')
        }
    } else { popupBtn.classList.add('erruserChoice'); }
}

//  MutationObserver на btn для отслеживания классов и снятия-установки disabled

let btnObserver = new MutationObserver(CorrectClassBtn);
const configBtn = {
    attributes: true,
};
const getPopupBtn = document.querySelector('form .onlineRegister');
btnObserver.observe(popupBtn, configBtn);
function CorrectClassBtn(mutationsList, observer) {
    const arrClassBtn = mutationsList[0].target.className.split(' ');
    if (arrClassBtn.length == 1) {
        getPopupBtn.disabled = false;
    } else { getPopupBtn.disabled = true; }
}

// ///////////////////////////////////
// Анимируем секцию main_aboutUs
// ///////////////////////////////////

let objSizeAnimEl = {};
const wrapAnimationElSection = document.querySelectorAll('main .wrapAnimationEl');
const getSizeFromResizObserver = new ResizeObserver(FuncAnimation);

const options = {
    rootMargin: '0px 500px'
}

function FuncAnimation(entries) {
    // console.log(entries);

    Object.keys(objSizeAnimEl).forEach(key => delete objSizeAnimEl[key]);
    let count = 0;

    for (let unit of entries) {
        widPX = Math.round(unit.contentRect.width);
        heiPX = Math.round(unit.contentRect.height);
        objSizeAnimEl[count] = [unit.target.childNodes[1], widPX, heiPX];
        count++;
    }
    // console.log("resize is dane. ", objSizeAnimEl);
    FuncStopAnimationRect(objSizeAnimEl);
    FuncStartAnimationRect(objSizeAnimEl)
}

function FuncStartAnimationRect(arrDataSize) {
    for (let unit in arrDataSize) {
        animation = anime({
            targets: arrDataSize[unit][0],
            keyframes: [
                {
                    translateX: arrDataSize[unit][1] - 50
                }, {
                    translateX: arrDataSize[unit][1] - 25,
                    translateY: 25,
                    rotate: 90
                }, {
                    translateY: arrDataSize[unit][2] - 25
                }, {
                    translateX: arrDataSize[unit][1] - 50,
                    translateY: arrDataSize[unit][2] - 5,
                    rotate: 180
                }, {
                    translateX: 5
                }, {
                    translateX: -20,
                    translateY: arrDataSize[unit][2] - 25,
                    rotate: 270
                }, {
                    translateY: 25
                }, {
                    translateX: 0,
                    translateY: 0,
                    rotate: 360
                }
            ],
            duration: 10000,
            easing: 'linear',
            loop: true,
        })
    }
}

function FuncStopAnimationRect(arrData) {
    for (let unit in arrData) {
        anime.remove(arrData[unit][0]);
        arrData[unit][0].style.removeProperty('transform');
    }
}

function AnimationLineOnEdge(div) {
    const arrActualAnim = {};
    const aboutUsCollback = function (entries, observer) {

        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                for (let item of document.querySelectorAll(`${div} .wrapAnimationEl`)) {
                    getSizeFromResizObserver.observe(item)
                }

            } else {
                // console.log('NO')
                arrActualAnim.length = 0;
                entry.target.childNodes.forEach((f) => {
                    if (f.className == "wrapAnimationEl") {
                        getSizeFromResizObserver.unobserve(f);
                        FuncStopAnimationRect(objSizeAnimEl);
                    }
                })
                objSizeAnimEl = {}
            }
        })
    }

    const wrapIntersectionObserver = new IntersectionObserver(aboutUsCollback, options);
    wrapIntersectionObserver.observe(document.querySelector(div));
}

AnimationLineOnEdge('.main__aboutUs .wrapIntersectionObserving');

// ////////////////////////////////////////////////////////////////
// Анимируем секцию main_ai, main__whatForOurCiurse, main__author /
// ////////////////////////////////////////////////////////////////
function SetNamingElement(partOfName) {
    let newNameTarget = getRandomNumber(0, 1000);
    let divNameStr = newNameTarget.toString();
    return (partOfName + divNameStr)
}

async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

function SectionObserver(section) {
    count = 0;
    let pathForAnim = `${section} .animationLineBox`;
    let booleanAnimData = true;
    let booleanLineStartStop;
    let getDataAnim = [];
    let getDataCorrect = [];

    let AIoptions = {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.3
    }

    const MainLineAnimation = function (entries, observer) {
        if (entries[0].isIntersecting) {
            ResizeObserverMainAI.observe(entries[0].target);
        } else {

            booleanLineStartStop = 0;
            for (let unit of document.querySelectorAll(pathForAnim)) {
                booleanLineStartStop = 0;
                StopAnimLine(unit);
            }
            ResizeObserverMainAI.unobserve(entries[0].target);
        }

    }


    const ResizeInMainLineAnimation = function (entry) {
        if (booleanAnimData == true) {

            // Сперва останавливаем анимацию (необходимо при ресайзе во время анимации)
            const animationLineBox = document.querySelectorAll(pathForAnim);
            for (let unit of animationLineBox) {

                booleanLineStartStop = 0;
                StopAnimLine(unit);
            }

            // -----------------------------------------

            // Получаем данные для будущей анимации
            for (let unit of document.querySelectorAll(pathForAnim)) {
                getData = GetDataForAnimation(unit);
                getDataAnim.push(getData);

                // функция gpt, которая удаляет из массива подмассив со значением [0. 0],
                // если таковой есть. (Отсутствует в секции main__author)
                function removeZeroZero(arr) {
                    return arr.map(subArr => {
                        return subArr.filter(pair => !(pair[0] === 0 && pair[1] === 0));
                    });
                }
                // ---------------------------------------------------------------

                getDataCorrect = removeZeroZero(getDataAnim)

            }

            // -----------------------------------------

            // Запускаем анимацию
            booleanLineStartStop = 1;
            for (let unit of getDataCorrect) {
                StartAnimLine(unit);
            }
            booleanAnimData = false;
        }
    }

    function StopAnimLine(data) {
        // console.log(data)

        const arrNames = data.className.split(' ');
        if (arrNames.length > 2) {
            // console.log(data.childNodes[1])
            anime.remove(data.childNodes[1]);
            data.childNodes[1].style.removeProperty('transform');
            data.classList.remove(arrNames[arrNames.length - 1]);
        }

        booleanAnimData = true;
        getDataAnim = [];
    }

    function GetDataForAnimation(box) {

        // give new individual class for animationLineBox
        nameP = SetNamingElement('P');
        box.classList.add(nameP);

        count = 0;
        // сравнение необходимо для работы все секций. 
        // В main__author 5р, в остальных - 1р
        for (let item of box.children) {
            if (count != 0) {
                count++;

                // converting 'p' to 'span'
                // Заменяем символ переноса строки на пробелы и удаляем их
                const cleanText = item.textContent.replace(/\n/g, ' ').trim();
                // Делим текст на слова по пробелам
                const words = cleanText.split(/\s+/);

                let newTextP = '';
                for (let itemWord of words) {
                    newTextP = newTextP + '<span>' + itemWord + ' ' + '</span>';
                }
                item.innerHTML = newTextP;
            } else {
                count++;
            }
        }

        // get size of evry line
        const getWidthTop = document.querySelectorAll(`.${nameP} span`);
        let mainAITop = 0;
        let mainAIWidth = 0;
        const widthTop = [];

        for (let itemTagSpan of getWidthTop) {
            if (itemTagSpan.offsetTop !== mainAITop) {
                widthTop.push([mainAITop, mainAIWidth]);
                mainAITop = itemTagSpan.offsetTop;
                mainAIWidth = itemTagSpan.offsetWidth;
            } else {
                mainAIWidth += itemTagSpan.offsetWidth;
            }
        }

        widthTop.push([mainAITop, mainAIWidth]);
        widthTop.unshift(nameP);
        return widthTop;
    }

    ms = 7000;

    async function StartAnimLine(data) {

        const animLineSVG = document.querySelector(`.${data[0]} .anim-ai`);
        while (booleanLineStartStop == 1) {

            if (booleanLineStartStop == 0) {
                break
            }

            for (let sumAnim = 1; sumAnim < data.length; sumAnim++) {
                animLineSVG.style.transform = 'translate(0px,' + (data[sumAnim][0] - 5) + 'px)';
                anime({
                    targets: animLineSVG,
                    translateX: [
                        { value: data[sumAnim][1] - 30, duration: 7000 }],
                    easing: 'linear'
                });

                await sleep(ms);
                anime.remove(animLineSVG);
                animLineSVG.style.removeProperty("transform");

                if (booleanLineStartStop == 0) {
                    // console.log('break', data[0]);
                    break
                }
            }
        }
    }

    const observerMainAI = new IntersectionObserver(MainLineAnimation, AIoptions);
    const targetMainAI = document.querySelectorAll(section);
    for (let unit of targetMainAI) {
        observerMainAI.observe(unit)
    }
    const ResizeObserverMainAI = new ResizeObserver(ResizeInMainLineAnimation);
}

SectionObserver('.main__ai .mainIMG');
SectionObserver('.main__whatForOurCiurse .mainIMG');

// --------------------------------------------------------------------

const mainAIBtn = document.querySelector('.main__ai-button .onlineRegister');
const mainAIPopup = document.querySelector('.main__ai__popup')
mainAIBtn.addEventListener('click', () => {
    headerPopup.classList.toggle('popupOpen');
    headerPopup.classList.toggle('popupClosed')
})

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// ----------------------------------------------

// section main__knowing //
// ////////////////////////

AnimationLineOnEdge('.main__knowing .wrapIntersectionObserving');

// ----------------------------------------------

// section main__iGet //
// /////////////////////

function DetailsCustom(icon, head, bodyWrap, span, span650) {

    const constiGetIcon = document.querySelector(icon);
    const details = document.querySelector(head);
    const detailsBody = document.querySelector(bodyWrap);

    const detailsSpan = document.querySelectorAll(span);
    // console.log(detailsSpan);
    for (unit of detailsSpan) {
        unit.classList.toggle('inDevelopOFF')
    }
    const detailsSpan650 = document.querySelectorAll(span650);
    // console.log(detailsSpan650);
    for (unit of detailsSpan650) {
        console.log(unit)
        unit.classList.toggle('inDevelopOFF')
    }
    details.addEventListener('click', () => {
        detailsBody.classList.toggle('detailsOpen');
        detailsBody.classList.toggle('detailsClosed');
        constiGetIcon.classList.toggle('open');
    })
}
DetailsCustom('#main__iGet-details1 .iGet-icon .icon', '#main__iGet-details1 .main__iGet-detailHead', '#main__iGet-detailsBodyWrap1', '.inDevelopON1', '.main__iGet-span .inDevelopOn1')

// При заполнении двух других акардеонов, раскомментировать
// DetailsCustom ('#main__iGet-details2 .iGet-icon .icon', '#main__iGet-details2 .main__iGet-detailHead','#main__iGet-detailsBodyWrap2', '.inDevelopON2', '.main__iGet-span .inDevelopOn2')
// DetailsCustom ('#main__iGet-details3 .iGet-icon .icon', '#main__iGet-details3 .main__iGet-detailHead','#main__iGet-detailsBodyWrap3', '.inDevelopON3', '.main__iGet-span .inDevelopOn3')
// --------------------------------------------

// section main__author//
// //////////////////////

// Change section 'wrapChngedToRight'
function ShiftWrapToRight(purpose) {
    const ShiftToRightSection = document.querySelector(purpose);
    const ShiftToRightSectionPattern = document.querySelector('.main__iGet .wrap');
    const widthBody = ShiftToRightSection.getBoundingClientRect().width;
    function ShiftWrap(entry) {
        ShiftToRightSection.style.translate = `${ShiftToRightSectionPattern.getBoundingClientRect().left}px`;
        const ActuaWidth = widthBody - ShiftToRightSectionPattern.getBoundingClientRect().left;
        ShiftToRightSection.style.width = `${ActuaWidth}px`;
    }
    const FuncResizeControlSection = new ResizeObserver(ShiftWrap);
    FuncResizeControlSection.observe(document.querySelector('body'));
}
ShiftWrapToRight('.main__author .JScontrol');
SectionObserver('.main__author .mainIMG');
// --------------------------------------------

// section main__announcements //
// //////////////////////////////
const flexCardLine = document.querySelector(".main__announcements .JSboxCard");
const tmplCardMainAnn = document.querySelector('#tmplCardMainAnn');
const imgCardMainAnn = tmplCardMainAnn.content.querySelector('img');
const h3CardMainAnn = tmplCardMainAnn.content.querySelector('h3');
const textCardMainAnn = tmplCardMainAnn.content.querySelector('p');
const spanInCalendar = tmplCardMainAnn.content.querySelector('span')

spanInCalendar.textContent = '1 июля 2025';
textCardMainAnn.textContent = 'Искусственный интеллект - это не одна дисциплина, как думают многие, а совокупность различных между собой направлений.'
h3CardMainAnn.textContent = "Заголовок объявления из несколькиз слов1";
imgCardMainAnn.src = "./static/images/ann1.jpg";
let newCard = tmplCardMainAnn.content.cloneNode(true);
flexCardLine.append(newCard);

spanInCalendar.textContent = '1 сентября 2025';
textCardMainAnn.textContent = 'Другой текст про искусственный интллект. Вcе добавляем через js'
h3CardMainAnn.textContent = "Заголовок объявления из несколькиз слов2";
imgCardMainAnn.src = "./static/images/ann2.jpg";
newCard = tmplCardMainAnn.content.cloneNode(true);
flexCardLine.append(newCard);

spanInCalendar.textContent = '1 августа 2023';
textCardMainAnn.textContent = 'Заголовок и дату в календаре тоже добавляем через js'
h3CardMainAnn.textContent = "Заголовок объявления из несколькиз слов3";
imgCardMainAnn.src = "./static/images/ann3.jpg";
newCard = tmplCardMainAnn.content.cloneNode(true);
flexCardLine.append(newCard);

spanInCalendar.textContent = '1 марта 2024';
textCardMainAnn.textContent = 'Карточки также размножаются через JS'
h3CardMainAnn.textContent = "Заголовок объявления из несколькиз слов4";
imgCardMainAnn.src = "./static/images/ann4.jpg";
newCard = tmplCardMainAnn.content.cloneNode(true);
flexCardLine.append(newCard);

let boxArrow;
let boxCard;
let arrowLeft;
let arrowRight;
let addNewClass;

function CheckColorCard() {
    console.log('start')
    for (let item of document.querySelectorAll(`.${addNewClass} .JSCard`)) {

        if (item.getBoundingClientRect().right < boxArrow.getBoundingClientRect().left) {
            item.classList.add('JScolorDark');
            item.classList.remove('JScolorWhite')
        } else {
            item.classList.remove('JScolorDark');
            item.classList.add('JScolorWhite')
        }
        if (item.getBoundingClientRect().left >= boxArrow.getBoundingClientRect().right) {
            item.classList.add('JScolorDark');
            item.classList.remove('JScolorWhite')
        }
    }
}

let leftSideBoxCard;
let rightSideBoxCard;
let leftSideBoxArrow;
let rightSideBoxArrow;

function CheckColorArrow() {
    leftSideBoxCard = boxCard.getBoundingClientRect().x;
    rightSideBoxCard = boxCard.getBoundingClientRect().right;
    leftSideBoxArrow = boxArrow.getBoundingClientRect().x;
    rightSideBoxArrow = boxArrow.getBoundingClientRect().right;

    if ((leftSideBoxCard == leftSideBoxArrow) && (rightSideBoxCard > rightSideBoxArrow)) {
        // console.log('left');
        // console.log(leftSideBoxCard," ",rightSideBoxCard);
        // console.log(leftSideBoxArrow," ",rightSideBoxArrow);
        arrowLeft.classList.add('leftarrowOff');
        arrowLeft.classList.remove('leftarrowOnn');
        arrowRight.classList.add('rightarrowOnn');
        arrowRight.classList.remove('rightarrowOff');
    }

    if ((rightSideBoxCard == rightSideBoxArrow) && (leftSideBoxCard < leftSideBoxArrow)) {
        // console.log('right');
        // console.log(rightSideBoxCard," ", rightSideBoxArrow);
        // console.log(leftSideBoxCard," ", leftSideBoxArrow)
        arrowRight.classList.add('rightarrowOff');
        arrowRight.classList.remove('rightarrowOnn');
        arrowLeft.classList.add('leftarrowOnn');
        arrowLeft.classList.remove('leftarrowOff');
    }

    if ((rightSideBoxCard > rightSideBoxArrow) && (leftSideBoxCard < leftSideBoxArrow)) {
        // console.log('center');
        // console.log(leftSideBoxCard," ", rightSideBoxCard);
        // console.log(leftSideBoxArrow," ", rightSideBoxArrow)
        arrowLeft.classList.add('leftarrowOnn');
        arrowLeft.classList.remove('leftarrowOff');
        arrowRight.classList.add('rightarrowOnn');
        arrowRight.classList.remove('rightarrowOff');
    }

}

function ControlCarousel(entry) {
    boxCard.dataset.positioncard = '0';
    // InterSectCarousel('.carousel');
    // AnimationLineOnEdge('.carousel .wrapIntersectionObserving');
    // функ тормозят до завершения анимации, иначе ошибка в рассчетах getBoundingClientRect
    (async () => {
        await sleep(1100);
        {
            CheckColorCard();
            CheckColorArrow();
            // InterSectCarousel('.carousel');
            // AnimationLineOnEdge('.carousel .wrapIntersectionObserving');
        }
    })();
}

let widthBodyForCarousel;
function InterSectCarousel(section) {
    const mainAnnOptioin = {
        rootMargin: '0px',
    }

    function mainImprtantIntersObs(entry) {
        const resizeWrapToRight = new ResizeObserver(ControlCarousel);
        // widthBodyForCarousel = document.querySelector('.JSobserved')

        if (entry[0].isIntersecting) {
            addNewClass = SetNamingElement('JSObserved');

            entry[0].target.classList.add(`${addNewClass}`);
            // В Intersection Observer обе карусели пересекаются, чтобы при удалении
            //  ресайза не было ошибок, сохраняем класс в дата-атрибут
            entry[0].target.dataset.class = `${addNewClass}`;
            widthBodyForCarousel = entry[0].target;

            arrowLeft = document.querySelector(`.${addNewClass} .arrowleft`)
            arrowRight = document.querySelector(`.${addNewClass} .arrowright`)

            boxCard = document.querySelector(`.${addNewClass} .JSboxCard`);
            boxArrow = document.querySelector(`.${addNewClass} .wrapArrow`);

            // click on arrow
            arrowLeft.onclick = () => {
                if (boxCard.getBoundingClientRect().right > boxArrow.getBoundingClientRect().right) {
                    console.log(boxCard.getBoundingClientRect().right, " ", boxArrow.getBoundingClientRect().right);
                    console.log(boxCard.getBoundingClientRect().right > boxArrow.getBoundingClientRect().right)
                    boxCard.dataset.positioncard--;
                    // функ тормозят до завершения анимации, иначе ошибка в рассчетах getBoundingClientRect
                    (async () => {
                        await sleep(1100);
                        {
                            CheckColorCard();
                            CheckColorArrow();
                        }
                    })();
                } else { boxCard.dataset.positioncard = boxCard.dataset.positioncard }
                console.log(boxCard.getBoundingClientRect().right, " ", boxArrow.getBoundingClientRect().right);

            }
            arrowRight.onclick = () => {
                if (boxCard.getBoundingClientRect().x < boxArrow.getBoundingClientRect().x) {
                    boxCard.dataset.positioncard++;

                    (async () => {
                        await sleep(1100);
                        {
                            CheckColorCard();
                            CheckColorArrow();
                        }
                    })();
                } else { boxCard.dataset.positioncard = boxCard.dataset.positioncard }
            }

            resizeWrapToRight.observe(entry[0].target);
        } else {
            resizeWrapToRight.unobserve(entry[0].target);
            const dataAttr = entry[0].target.dataset.class;
            // Проверяем дата-атрибут. Если в нем есть имя класса, удаляем его.
            if (dataAttr != 'none') {
                entry[0].target.classList.remove(`${dataAttr}`);
                entry[0].target.dataset.class = 'none';
            }
        }
    }

    const mainAnnouncenmentIntersectionObs = new IntersectionObserver(mainImprtantIntersObs, mainAnnOptioin);
    mainAnnouncenmentIntersectionObs.observe(document.querySelector(`${section}`))
}

InterSectCarousel('.main__announcements .carousel');
AnimationLineOnEdge('.main__announcements .carousel .wrapIntersectionObserving');

// section main__vacancy //
// ////////////////////////

// InterSectCarousel('.main__vacancy .carousel');
// AnimationLineOnEdge('.main__vacancy .carousel .wrapIntersectionObserving');

const tmplCard = document.querySelector('#tmplCard');
const boxLine = document.querySelector('.main__vacancy .JSboxCard');
const imgCard = tmplCard.content.querySelector('img');
const h3Card = tmplCard.content.querySelector('h3');
const value1 = tmplCard.content.querySelector('.value1');
const value2 = tmplCard.content.querySelector('.value2');
const value3 = tmplCard.content.querySelector('.value3');

h3Card.textContent = 'Требуется администратор';
value1.textContent = 'от 1 года';
value2.textContent = 'Высшее';
value3.textContent = '25-30 лет';
imgCard.src = "./static/images/ann4.jpg";
let newDiv = tmplCard.content.cloneNode(true);
boxLine.append(newDiv);

h3Card.textContent = 'Требуется менеджер';
value1.textContent = 'от 3 лет';
value2.textContent = 'Высшее';
value3.textContent = '30-45 лет';
imgCard.src = "./static/images/ann3.jpg";
newDiv = tmplCard.content.cloneNode(true);
boxLine.append(newDiv);

h3Card.textContent = 'Требуется уборщица';
value1.textContent = 'от 3 мес';
value2.textContent = 'Высшее';
value3.textContent = '25-60 лет';
imgCard.src = "./static/images/ann2.jpg";
newDiv = tmplCard.content.cloneNode(true);
boxLine.append(newDiv);

h3Card.textContent = 'Требуется ментор';
value1.textContent = 'от 6 лет';
value2.textContent = 'Высшее';
value3.textContent = '25-45 лет';
imgCard.src = "./static/images/ann1.jpg";
newDiv = tmplCard.content.cloneNode(true);
boxLine.append(newDiv);

InterSectCarousel('.main__vacancy .carousel');
AnimationLineOnEdge('.main__vacancy .carousel .wrapIntersectionObserving');

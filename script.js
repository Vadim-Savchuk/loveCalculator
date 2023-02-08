"use strict";

const form           = document.querySelector('.form');
const resultOffer    = document.querySelector('.result-offer');
const inputManName   = document.querySelector('#name-men');
const inputWomanName = document.querySelector('#name-women');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '1eb6c2cd6emshdba4bd70a0043a8p10543ajsndf8e6cb4e29c',
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
    }
};

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (validations(inputManName.value, inputWomanName.value)) {
        try {

            // Запит на API
            const response = await fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${translit(inputWomanName.value)}&fname=${translit(inputManName.value)}`, options)
            const data     = await response.json();

            // Генерую результа
            resultOffer.innerHTML =
                `<div class="result">
                    <div class="result-names">
                        <span class="man">${inputManName.value}</span> та <span class="women">${inputWomanName.value}</span>
                    </div>
                    <div class="result-percentages">
                        <p class="result-percentages-text">${data.percentage}% сумісності</p>
                        <img class="result-percentages-img" src=${imagesResultNumber(data.percentage)} alt="images">
                    </div>
                    <div class="result-text" >${textResult(data.percentage)}</div>
                </div>`

            // Чищу Інпути
            inputManName.value   = '';
            inputWomanName.value = '';

        } catch (e) {

            // Показую результат про помилку
            resultOffer.innerHTML =
                `<div class="result">
                    <p class="result-text">'Сталась помилка! Спробуйте будьласка пізніше'</p>
                </div>`

            console.log('Error!' + e);
        }
    } else {

        // Чищу Офер
        resultOffer.innerHTML = '';
    }
});

// Функції
function validations(nameOne, nameTwo) {
    if (nameOne && nameTwo) {
        if (/[0-9]/.test(nameOne) === false && /[0-9]/.test(nameTwo) === false) {
            return true;
        } else {
            alert('Текст інпутів мають містити тільки букви')
        }
    }
}

function translit(word) {
    let answer = '';
    const converter = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
        'д': 'd', 'е': 'e', 'є': 'ie', 'ж': 'zh', 'з': 'z',
        'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k', 'л': 'l',
        'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
        'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh',
        'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'и': 'y',
        'ь': '', 'ю': 'iu', 'я': 'ya',

        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G',
        'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z',
        'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L',
        'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
        'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh',
        'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
        'Ь': '', 'Ю': 'Yu', 'Я': 'Ya', 'И': 'Y',
    };

    for (let i = 0; i < word.length; ++i) {
        if (converter[word[i]] == undefined) {
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }

    return answer;
}

function textResult(parcantage) {
    const badResult    = [
        'Невдалий вибір',
        'Не рекомендую',
        'Нуууу незнаю, думай',
        'Червоне то любов а чорне то журба',
        'Побачим побачим',
        'Без любові жити легше',
        'У любові немає невинних, є тільки жертви',
        'Закохатися не означає любити',
    ];

    const mediumResult = [
        'Може завдати болю',
        'Не жаль мені, що я тебе кохаю',
        'Прийшла любов непрохана й неждана',
        'У коханні як на війні – горе переможеному',
        'Поки я не любив, я сам теж відмінно знав, що таке любов',
        'А який це має стосунок до любові?',
        'Хто воно за таке – любов?',
        'Любов і прихильність. Ми часто плутаємо ці почуття',
    ];

    const mormalResult = [
        'Любов – це коли забуваєш про себе і насолоджуєшся радістю іншої людини',
        'Неможливо любити, а потім нічого не відчувати. Або ти брехав тоді, або ти брешеш зараз',
        'Вона мені дуже подобається, але я не закоханий в неї',
        'А вона закохана в вас, хоча подобаєтеся ви їй не дуже',
        'Просто любиш',
        'Вже й любов доспіла під промінням теплим',
    ];
    
    const heppyResult  = [
        'Я море люблю, бо воно нагадує очі твої',
        'Така любов буває раз в ніколи...',
        'Любов – відповідь на проблему людського існування',
        '– Це ваша біда',
        'У сімейному житті головне – терпіння',
        'Де є любов, там є життя',
        'Скільки років кохаю, а закохуюсь в тебе щодня',
        'В одній годині кохання - ціле життя',
    ];

    let result;

    if (parcantage < 25) {
        result = badResult[getRandomInt(0, badResult.length -1)];

    } else if (parcantage >= 25 && parcantage < 50 ) {
        result = mediumResult[getRandomInt(0, badResult.length -1)];

    } else if (parcantage >= 50 && parcantage < 75) {
        result = mormalResult[getRandomInt(0, badResult.length -1)];

    } else if (parcantage >= 75) {
        result = heppyResult[getRandomInt(0, badResult.length -1)];
    }

    return result;
}

function imagesResultNumber(parcantage) {
    const images = ['./img/result-img/0.png', './img/result-img/1.png', './img/result-img/2.png', './img/result-img/3.png'];
    let result;

    if (parcantage < 25) {
        result = 0;
    } else if (parcantage >= 26 &&  parcantage <= 50) {
        result = 1;
    } else if (parcantage >= 51 &&  parcantage <= 75) {
        result = 2;
    } else if (parcantage >= 76 &&  parcantage <= 100) {
        result = 3;
    }

    return images[result];
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
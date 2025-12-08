let textClose = 'Скрыть';
document.querySelector('.info__button').addEventListener('click', function () {
    document.querySelector('.info__text').classList.toggle('info__text--active');
    let textOpen = this.textContent;
    this.textContent = textClose;
    textClose = textOpen;
});


const popup = document.querySelector('.popup');
document.addEventListener('DOMContentLoaded', function () {
    const PopupShow = document.querySelector('.show-popup');
    if (PopupShow) {
        PopupShow.addEventListener('click', function () {
            if (popup) {
                document.body.classList.add('no-scroll');
                popup.classList.add('popup--show');
                setTimeout(function () {
                    popup.classList.add('popup--active');
                }, 10);
            }
        });
    }

    const PopupClose = document.querySelector('.popup__close');
    if (PopupClose) {
        PopupClose.addEventListener('click', function () {
            popup.classList.remove('popup--active');
            setTimeout(function () {
                popup.classList.remove('popup--show');
                document.body.classList.remove('no-scroll');
            }, 300);
        });
    }

    const navigation_links = ['Пицца', 'Паста', 'Супы', 'Салаты', 'Напитки', 'Десерты', 'Бакалея', 'Антипасти', 'Акции', 'Комбо', 'Контакты'];

    const navigation = document.querySelector('.header__list');
    if (navigation) {
        let navigation_items = "";
        for (let i = 0; i < navigation_links.length; i++) {
            navigation_items += `<li class="header__link"><a href="#">${navigation_links[i]}</a></li>`;
        }
        navigation.innerHTML = navigation_items;
    }



    souces = [
        {
            icon: "images/chees-souce.jpg",
            title: "Сырный соус",
            price: "от 120 ₽"
        },
        {
            icon: "images/bbq-souce.jpg",
            title: "Барбекью",
            price: "от 120 ₽"
        },
        {
            icon: "images/varenie-souce.jpg",
            title: "Варенье",
            price: "от 120 ₽"
        },
        {
            icon: "images/ranch-souce.jpg",
            title: "Ранч",
            price: "от 120 ₽"
        },
        {
            icon: "images/tartar-souce.jpg",
            title: "Тар-тар",
            price: "от 120 ₽"
        },
        {
            icon: "images/chees-souce.jpg",
            title: "Сырный соус",
            price: "от 120 ₽"
        },
        {
            icon: "images/tartar-souce.jpg",
            title: "Тар-тар",
            price: "от 120 ₽"
        }

    ]

    let souces_item = document.querySelector('.souces__block');
    if (souces_item) {
        let souces_cards = " ";
        souces.forEach(function (souce) {
            souces_cards = souces_cards + `<div class="souces__card">
                        <img src=${souce.icon} alt="souce">
                        <p>${souce.title}</p>
                        <p class="souces__price">${souce.price}</p>
                    </div>`
        });
        souces_item.innerHTML = souces_cards;
    }
});

let textClose = 'Скрыть';
let buttonInfo = document.querySelector('.info__button');
if (buttonInfo != null) {
    buttonInfo.addEventListener('click', function () {
        let textBlock = document.querySelector('.info__text');
        textBlock.classList.toggle('info__text--active');

        let temp = buttonInfo.textContent;
        buttonInfo.textContent = textClose;
        textClose = temp;
    });
}

let popupWindow = document.querySelector('.popup');
document.addEventListener('DOMContentLoaded', function () {
    let openPopupBtn = document.querySelector('.show-popup');
    if (openPopupBtn) {
        openPopupBtn.onclick = function () {
            document.body.classList.add('no-scroll');
            popupWindow.classList.add('popup--show');
            setTimeout(function () {
                popupWindow.classList.add('popup--active');
            }, 10);
        };
    }

    let closePopupBtn = document.querySelector('.popup__close');
    if (closePopupBtn) {
        closePopupBtn.onclick = function () {
            popupWindow.classList.remove('popup--active');
            setTimeout(function () {
                popupWindow.classList.remove('popup--show');
                document.body.classList.remove('no-scroll');
            }, 300);
        };
    }

    let menuItems = ['Пицца', 'Паста', 'Супы', 'Салаты', 'Напитки', 'Десерты', 'Бакалея', 'Антипасти', 'Акции', 'Комбо', 'Контакты'];
    let menuList = document.querySelector('.header__list');
    if (menuList) {
        let allLinks = '';
        for (let i = 0; i < menuItems.length; i++) {
            allLinks = allLinks + '<li class="header__link"><a href="#">' + menuItems[i] + '</a></li>';
        }
        menuList.innerHTML = allLinks;
    }

    let allSouces = [
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
    ];

    let soucesBlock = document.querySelector('.souces__block');
    if (soucesBlock) {
        let cards = '';
        for (let i = 0; i < allSouces.length; i++) {
            cards += '<div class="souces__card">' +
                '<img src="' + allSouces[i].icon + '" alt="souce">' +
                '<p>' + allSouces[i].title + '</p>' +
                '<p class="souces__price">' + allSouces[i].price + '</p>' +
                '</div>';
        }
        soucesBlock.innerHTML = cards;
    }

    let productsInCart = [];
    let totalSum = 0;
    let promoDiscount = 0;

    fetch("https://example.shaklein.dev/cart/")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            productsInCart = data.cartItems;
            drawCart();
        });

    function drawCart() {
        let cartBlock = document.querySelector('.cart__list');
        if (cartBlock == null) return;

        totalSum = 0;
        let allHtml = '';

        for (let i = 0; i < productsInCart.length; i++) {
            let item = productsInCart[i];
            let priceOne = item.price * item.quantity;
            totalSum = totalSum + priceOne;

            allHtml += '<div class="cart__item">' +
                '<div class="cart__item-left">' +
                '<img src="' + item.image + '" alt="" class="cart__item-image">' +
                '<div class="cart__item-info">' +
                '<div class="cart__item-name">' + item.name + '</div>' +
                '<div class="cart__item-desc">' + item.desc + '</div>' +
                '</div>' +
                '</div>' +
                '<div class="cart__item-right">' +
                '<div class="cart__item-price">' + item.price + ' ₽</div>' +
                '<div class="cart__counter">' +
                '<button class="cart__counter-btn minus" data-index="' + i + '">−</button>' +
                '<span class="cart__counter-value">' + item.quantity + '</span>' +
                '<button class="cart__counter-btn plus" data-index="' + i + '">+</button>' +
                '</div>' +
                '<button class="cart__remove" data-index="' + i + '">✕</button>' +
                '</div>' +
                '</div>';
        }

        cartBlock.innerHTML = allHtml;
        updateSum();
    }

    function updateSum() {
        let finalPrice = totalSum - promoDiscount;
        let totalText = document.querySelector('.cart__total');
        if (totalText) {
            totalText.textContent = finalPrice.toLocaleString() + ' ₽';
        }

        let cartButtons = document.querySelectorAll('.cartTotalHTML');
        for (let i = 0; i < cartButtons.length; i++) {
            cartButtons[i].textContent = finalPrice;
        }
    }

    document.addEventListener('click', function (event) {
        let btnPlus = event.target.closest('.plus');
        let btnMinus = event.target.closest('.minus');
        let btnDelete = event.target.closest('.cart__remove');

        if (btnPlus || btnMinus || btnDelete) {
            let index = (btnPlus || btnMinus || btnDelete).getAttribute('data-index');
            let product = productsInCart[index];

            if (btnPlus) {
                product.quantity = product.quantity + 1;
                totalSum = totalSum + product.price;
            }

            if (btnMinus && product.quantity > 0) {
                product.quantity = product.quantity - 1;
                totalSum = totalSum - product.price;
            }

            if (btnDelete) {
                totalSum = totalSum - (product.price * product.quantity);
                productsInCart.splice(index, 1);
            }

            drawCart();
            updateSum();
        }
    });

    let applyPromoBtn = document.querySelector('.cart__promo-form button');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function (event) {
            event.preventDefault();
            let promoInput = document.querySelector('.cart__promo-form input');
            let code = promoInput.value;

            if (code === '777') {
                promoDiscount = Math.round(totalSum * 0.1);
                alert('Ура! Промокод 777 сработал — скидка 10%!');
            } else {
                promoDiscount = 0;
                alert('Промокод не подходит :(');
            }

            promoInput.value = '';
            updateSum();
        });
    }

    let orderBtn = document.querySelector('.cart__submit');
    if (orderBtn) {
        orderBtn.onclick = function () {
            let nameField = document.querySelector('input[value="Илья"]');
            let phoneField = document.querySelector('input[type="tel"]');
            let emailField = document.querySelector('input[type="email"]');

            let name = nameField.value;
            let phone = phoneField.value;
            let email = emailField.value;

            if (name === '' || phone === '' || email === '') {
                alert('Пожалуйста, заполни все поля!');
                return;
            }

            fetch("https://example.shaklein.dev/cart/", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                    cartItems: productsInCart,
                    name: name,
                    phone: phone,
                    email: email
                })
            })
                .then(function (res) { return res.json(); })
                .then(function (result) {
                    console.log(result);
                    alert('Заказ отправлен! Скоро с вами свяжутся :)');
                })
                .catch(function () {
                    alert('Что-то пошло не так... Попробуй позже');
                });
        };
    }
});
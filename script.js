let textClose = 'Скрыть';
let hasDiscount = false;

const buttonInfo = document.querySelector('.info__button');
if (buttonInfo) {
    buttonInfo.addEventListener('click', function () {
        const textBlock = document.querySelector('.info__text');
        if (textBlock) {
            textBlock.classList.toggle('info__text--active');

            const temp = buttonInfo.textContent;
            buttonInfo.textContent = textClose;
            textClose = temp;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    const popupWindow = document.querySelector('.popup');
    const openPopupBtn = document.querySelector('.show-popup');

    if (openPopupBtn && popupWindow) {
        openPopupBtn.onclick = function () {
            document.body.classList.add('no-scroll');
            popupWindow.classList.add('popup--show');
            setTimeout(() => popupWindow.classList.add('popup--active'), 10);
        };
    }

    const closePopupBtn = document.querySelector('.popup__close');
    if (closePopupBtn && popupWindow) {
        closePopupBtn.onclick = function () {
            popupWindow.classList.remove('popup--active');
            setTimeout(() => {
                popupWindow.classList.remove('popup--show');
                document.body.classList.remove('no-scroll');
            }, 300);
        };
    }

    const menuItems = [
        'Пицца', 'Паста', 'Супы', 'Салаты', 'Напитки',
        'Десерты', 'Бакалея', 'Антипасти', 'Акции', 'Комбо', 'Контакты'
    ];

    const menuList = document.querySelector('.header__list');
    if (menuList) {
        menuList.innerHTML = menuItems
            .map(item => `<li class="header__link"><a href="#">${item}</a></li>`)
            .join('');
    }

    const allSouces = [
        { icon: "images/chees-souce.jpg", title: "Сырный соус", price: "от 120 ₽" },
        { icon: "images/bbq-souce.jpg", title: "Барбекью", price: "от 120 ₽" },
        { icon: "images/varenie-souce.jpg", title: "Варенье", price: "от 120 ₽" },
        { icon: "images/ranch-souce.jpg", title: "Ранч", price: "от 120 ₽" },
        { icon: "images/tartar-souce.jpg", title: "Тар-тар", price: "от 120 ₽" },
    ];

    const soucesBlock = document.querySelector('.souces__block');
    if (soucesBlock) {
        soucesBlock.innerHTML = allSouces
            .map(s => `
                <div class="souces__card">
                    <img src="${s.icon}" alt="${s.title}">
                    <p>${s.title}</p>
                    <p class="souces__price">${s.price}</p>
                </div>
            `)
            .join('');
    }

    let cartItems = [];

    cartItems = [
        { name: "Пепперони", price: 890, quantity: 2, image: "https://via.placeholder.com/100", desc: "Классика" },
        { name: "Маргарита",  price: 690, quantity: 1, image: "https://via.placeholder.com/100" }
    ];
    renderCart();


    fetch("https://example.shaklein.dev/cart/")
        .then(res => res.json())
        .then(data => {
            cartItems = data.cartItems || [];
            renderCart();
        })
        .catch(err => {
            console.error("Ошибка загрузки корзины:", err);
        });

    function renderCart() {
        const cartBlock = document.querySelector('.cart__list');
        if (!cartBlock) return;

        const cartHtml = cartItems.map((item, i) => `
            <div class="cart__item" data-index="${i}">
                <div class="cart__item-left">
                    <img class="cart__item-image"
                         src="${item.image}"
                         alt="${item.name || 'Товар в корзине'}">
                    <div class="cart__item-info">
                        <div class="cart__item-name">${item.name}</div>
                        ${item.desc ? `<div class="cart__item-desc">${item.desc}</div>` : ''}
                    </div>
                </div>

                <div class="cart__item-right">
                    <div class="cart__item-price">${item.price} ₽</div>

                    <div class="cart__counter">
                        <button class="cart__counter-btn minus" type="button">-</button>
                        <span class="cart__counter-value">${item.quantity}</span>
                        <button class="cart__counter-btn plus" type="button">+</button>
                    </div>

                    <button class="cart__remove" type="button">✕</button>
                </div>
            </div>
        `).join('');

        cartBlock.innerHTML = cartHtml;
        updateTotal();
    }

    function updateTotal() {
        let total = cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        if (hasDiscount) {
            total *= 0.9;
        }

        document.querySelectorAll('.cartTotalHTML').forEach(el => {
            el.textContent = total.toLocaleString('ru-RU') + ' ₽';
        });
    }
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.cart__counter-btn, .cart__remove');
        if (!btn) return;

        const itemEl = btn.closest('.cart__item');
        if (!itemEl) return;

        const index = Number(itemEl.dataset.index);
        if (isNaN(index) || !cartItems[index]) return;

        if (btn.classList.contains('plus')) {
            cartItems[index].quantity++;
        }
        else if (btn.classList.contains('minus')) {
            cartItems[index].quantity--;
            if (cartItems[index].quantity <= 0) {
                cartItems.splice(index, 1);
            }
        }
        else if (btn.classList.contains('cart__remove')) {
            cartItems.splice(index, 1);
        }

        renderCart(); 
    });

    const promoBtn = document.querySelector('.cart__promo-form button');
    if (promoBtn) {
        promoBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const input = document.querySelector('.cart__promo-form input');
            if (!input) return;

            hasDiscount = false;

            if (input.value.trim() === '777') {
                hasDiscount = true;
                alert('Скидка 10% применена!');
            } else {
                alert('Неверный промокод');
            }

            input.value = '';
            updateTotal();
        });
    }

    const orderBtn = document.querySelector('.cart__submit');
    if (orderBtn) {
        orderBtn.addEventListener('click', function () {
            const name  = document.querySelector('input[name="name"]')?.value?.trim();
            const phone = document.querySelector('input[name="phone"]')?.value?.trim();
            const email = document.querySelector('input[name="email"]')?.value?.trim();

            if (!name || !phone || !email) {
                alert('Заполните все обязательные поля');
                return;
            }

            fetch("https://example.shaklein.dev/cart/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email, cartItems })
            })
                .then(res => res.json())
                .then(() => {
                    alert('Заказ успешно отправлен!');
                    cartItems = [];           
                    renderCart();
                })
                .catch(err => {
                    console.error(err);
                    alert('Ошибка при отправке заказа');
                });
        });
    }
});
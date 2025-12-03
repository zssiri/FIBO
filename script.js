let textClose = 'Скрыть';
document.querySelector('.button').addEventListener('click', function () {
    document.querySelector('.info__text').classList.toggle('info__text--active');
    let textOpen = this.textContent;
    this.textContent = textClose;
    textClose = textOpen;
});


const popup = document.querySelector('.popup');

document.addEventListener('DOMContentLoaded', function() {
    const PopupShow = document.querySelector('.show-popup');
    if (PopupShow) {
        PopupShow.addEventListener('click', function() {
            if (popup) {
                document.body.classList.add('no-scroll');
                popup.classList.add('popup--show');
                setTimeout(function() {
                    popup.classList.add('popup--active');
                }, 10);
            }
        });
    }

    const PopupClose = document.querySelector('.popup__close');
    if (PopupClose) {
        PopupClose.addEventListener('click', function () {
            popup.classList.remove('popup--active');
            setTimeout(function() {
                popup.classList.remove('popup--show');
                document.body.classList.remove('no-scroll');
            }, 300);
        });
    }
});

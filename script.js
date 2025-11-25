let textClose = 'Скрыть';
document.querySelector('.button').addEventListener('click', function() {
    document.querySelector('.info__text').classList.toggle('info__text--active');
    let textOpen = this.textContent;
    this.textContent = textClose;
    textClose = textOpen;
});
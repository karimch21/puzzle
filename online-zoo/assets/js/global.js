const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-wrap');
const btnMenuOpen = document.querySelector('.menu-close');

burger.addEventListener('click', (e) => {
    burgerClickHandler(e, menu)
});
btnMenuOpen.addEventListener('click', (e) => {
    btnMenuOpenClickHandler(e, menu)
});


function switchClassBackground() {
    document.documentElement.classList.toggle('html--active-bg')
}

function burgerClickHandler(e, menu) {
    menu.classList.add('menu-wrap--active')
    switchClassBackground()
}

function btnMenuOpenClickHandler(e, menu) {
    menu.classList.remove('menu-wrap--active')
    switchClassBackground()
}
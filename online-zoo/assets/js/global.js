const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-wrap');
const btnMenuOpen = document.querySelector('.menu-close');
const wrapperContent = document.querySelector('.wrapper')

burger.addEventListener('click', (e) => {
    burgerClickHandler(e, menu)
});
btnMenuOpen.addEventListener('click', (e) => {
    btnMenuOpenClickHandler(e, menu)
});

document.body.addEventListener('click', (e) => {
    bodyClickHandler(e);
});

function bodyClickHandler(e) {

    closeMenu(e)
}

function closeMenu(e) {
    if (!e.target.closest('.menu-wrap') && !e.target.closest('.burger')) {
        menu.classList.remove('menu-wrap--active')
        switchClassBackground()
    }
}

function switchClassBackground() {
    wrapperContent.classList.toggle('wrapper--active-bg')
}

function burgerClickHandler(e, menu) {
    menu.classList.add('menu-wrap--active')
    switchClassBackground()
}

function btnMenuOpenClickHandler(e, menu) {
    menu.classList.remove('menu-wrap--active')
    switchClassBackground()
}
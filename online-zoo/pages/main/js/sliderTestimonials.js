const testimonialsCardsWrap = document.querySelector('.testimonials__cards-wrap');
const testimonialsCards = document.querySelector('.testimonials__cards');
const allCardsTestimonials = document.querySelectorAll('.testimonials__card');
const testimonialsScrollbar = document.querySelector('.testimonials-scrollbar input');
const testimonialsCard = document.querySelector('.testimonials__card');

let fullWidthTestimonialsCards = testimonialsCards.scrollWidth;
let widthCard = testimonialsCard.getBoundingClientRect().width;
let sumWidthCard = 0;
let gapCards = (fullWidthTestimonialsCards - (allCardsTestimonials.length * widthCard)) / 10;

let translateX = 0;
testimonialsScrollbar.addEventListener('input', (e) => {
    sumWidthCard += widthCard;
    translateX = -(testimonialsScrollbar.value * (widthCard + gapCards));

    testimonialsCards.style.transform = `translateX(${translateX}px)`
})

window.addEventListener('resize', handlerChangeWidthWindow)

window.addEventListener('click', handlerClickWindow);

function handlerClickWindow(e) {
    closeTestimonialsCard(e)
}
handlerChangeWidthWindow()

function handlerChangeWidthWindow() {
    let windowWidth = document.documentElement.clientWidth;
    if (640 >= windowWidth) {
        testimonialsCards.addEventListener('click', handlerClickTestimonialsBox)
    } else {
        console.log(77777)
        testimonialsCards.removeEventListener('click', handlerClickTestimonialsBox)
    }
}

function handlerClickTestimonialsBox(e) {
    console.log(11)
    let card = e.target.closest('.testimonials__card');
    if (!card) return
    card = createTestimonialsCardClone(card);

    let testimonialsBoxPopup = createTestimonialsCardsBoxPopup();
    deleteTestimonialsCardsBoxPopup(testimonialsBoxPopup)
    openTestimonialsCard()
    addActiveBgBody()

    testimonialsBoxPopup.append(card);
    testimonialsCardsWrap.prepend(testimonialsBoxPopup)
}

function createTestimonialsCardClone(card) {
    card = card.cloneNode(true)
    card.classList.add('testimonials__card-popup');
    let btnClose = document.createElement('button');
    btnClose.classList.add('testimonials__card-btn-close')
    card.appendChild(btnClose)
    return card
}

function openTestimonialsCard() {
    testimonialsCardsWrap.classList.add('testimonials__cards-wrap--active')
}

function closeTestimonialsCard(e) {

    if (!e.target.closest('.testimonials__cards-wrap') || e.target.closest('.testimonials__card-btn-close')) {
        testimonialsCardsWrap.classList.remove('testimonials__cards-wrap--active')
        removeActiveBgBody()
    }

}

function createTestimonialsCardsBoxPopup() {
    let testimonialsCardsBoxPopup = document.createElement('div');
    testimonialsCardsBoxPopup.classList.add('testimonials__box-popup', 'testimonials__box-popup--active');
    return testimonialsCardsBoxPopup;
}

function deleteTestimonialsCardsBoxPopup(testimonialsBoxPopup) {
    testimonialsBoxPopup = document.querySelector('.testimonials__box-popup');
    if (!testimonialsBoxPopup) return;
    testimonialsBoxPopup.remove()
}

function addActiveBgBody() {
    document.querySelector('.wrapper').classList.add('wrapper--active-bg-testimonials-card');
}

function removeActiveBgBody() {
    document.querySelector('.wrapper').classList.remove('wrapper--active-bg-testimonials-card');
}
const testimonialsCards = document.querySelector('.testimonials__cards');
const allCardsTestimonials = document.querySelectorAll('.testimonials__card');
const testimonialsScrollbar = document.querySelector('.testimonials-scrollbar input');
const testimonialsCard = document.querySelector('.testimonials__card');

let fullWidthTestimonialsCards = testimonialsCards.scrollWidth;
let widthCard = testimonialsCard.getBoundingClientRect().width;
let sumWidthCard = 0;
let gapCards = (fullWidthTestimonialsCards - (allCardsTestimonials.length * widthCard)) / 10;
console.log(gapCards, widthCard, fullWidthTestimonialsCards)

window.addEventListener('load', () => {

})
let translateX = 0;
testimonialsScrollbar.addEventListener('input', (e) => {
    sumWidthCard += widthCard;
    translateX = -(testimonialsScrollbar.value * (widthCard + gapCards));
    // if (testimonialsScrollbar.value == testimonialsScrollbar.max) {
    //     translateX = -fullWidthTestimonialsCards;
    // }

    testimonialsCards.style.transform = `translateX(${translateX}px)`

})
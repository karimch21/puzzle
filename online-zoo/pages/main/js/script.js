const petsItems = document.querySelector('.pets__items');
const petItem = document.querySelector('.pets__item');
const petItemAll = document.querySelectorAll('.pets__item');
const prevBtn = document.querySelector('.pets__btn-previous');
const nextBtn = document.querySelector('.pets__btn-next');
let overallWidth = petsItems.scrollWidth;
let visibleWidth = petsItems.getBoundingClientRect().width;
let petItemWidth = petItem.getBoundingClientRect().width;
let translatex = 0;

let items = document.querySelectorAll('.pets__item');
let arr = [...items]
let deletedArr = [];

nextBtn.addEventListener('click', handlerClickNextBtn);
prevBtn.addEventListener('click', handlerClickPrevBtn);



let totalCountItems = Math.floor(visibleWidth / petItemWidth);
let sumVisibleWidthPetItems = totalCountItems * petItemWidth;
let gapItem = (visibleWidth - totalCountItems * petItemWidth) / (totalCountItems - 1)




console.log(gapItem)
console.log('width cont', visibleWidth)
console.log('clinet width item', petItem.getBoundingClientRect().width)
console.log(totalCountItems)

console.log('видимая сумма ширин petitem ', sumVisibleWidthPetItems)
console.log('gapCol ', gapItem)



function handlerClickNextBtn() {
    deletedArr.push(...arr.splice(0, 6))
    if (arr.length == 0) {
        arr = [...deletedArr];
        deletedArr = [];
        translatex = 0;
        petsItems.style.transform = `translatex(${Math.abs(translatex)}px)`
        return
    }
    translatex -= visibleWidth + gapItem;
    petsItems.style.transform = `translatex(-${Math.abs(translatex)}px)`
}

function handlerClickPrevBtn() {
    if (deletedArr.length == 0) {
        deletedArr = [...arr];
        arr = []
        translatex = -(overallWidth - visibleWidth);
        petsItems.style.transform = `translatex(${translatex}px)`
        arr.push(...deletedArr.splice(0, 6))

        return
    } else {
        if (translatex <= 0) {
            translatex += visibleWidth + gapItem;
        }
        petsItems.style.transform = `translatex(${translatex}px)`
        arr.push(...deletedArr.splice(0, 6))
    }
}
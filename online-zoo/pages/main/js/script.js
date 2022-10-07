const petsItems = document.querySelector('.pets__items');
const petItem = document.querySelector('.pets__item');
const prevBtn = document.querySelector('.pets__btn-previous');
const nextBtn = document.querySelector('.pets__btn-next');
let overallWidth = petsItems.scrollWidth;
let visibleWidth = petsItems.clientWidth;
let translatex = 0;

let items = document.querySelectorAll('.pets__item');
let arr = [...items]
let deletedArr = [];

nextBtn.addEventListener('click', handlerClickNextBtn);
prevBtn.addEventListener('click', handlerClickPrevBtn);
console.log(arr)


function handlerClickNextBtn() {
    deletedArr.push(...arr.splice(0, 6))
    if (arr.length == 0) {
        arr = [...deletedArr];
        deletedArr = [];
        translatex = 0;
        petsItems.style.transform = `translatex(${Math.abs(translatex)}px)`

        return
    }

    let marginItem = Math.floor((visibleWidth - (Math.floor(visibleWidth / petItem.clientWidth) * petItem.clientWidth)) / 2);

    translatex -= visibleWidth + 30;
    petsItems.style.transform = `translatex(-${Math.abs(translatex)}px)`
}

function handlerClickPrevBtn() {
    console.log(deletedArr)

    if (deletedArr.length == 0) {

        deletedArr = [...arr];

        arr = []
        translatex = -(overallWidth - visibleWidth);

        petsItems.style.transform = `translatex(${translatex}px)`
        arr.push(...deletedArr.splice(0, 6))
        console.log(34567890)
        return
    } else {


        if (translatex <= 0) {
            translatex += visibleWidth + 30;
        }


        console.log(translatex)
        petsItems.style.transform = `translatex(${translatex}px)`
        arr.push(...deletedArr.splice(0, 6))
    }



}
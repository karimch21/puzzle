const petsItems = document.querySelector('.pets__items');
const prevBtn = document.querySelector('.pets__btn-previous');
const nextBtn = document.querySelector('.pets__btn-next');
const petsContainerBox = document.querySelector('.pets__container')
let visibleWidth = petsItems.getBoundingClientRect().width;
let translatex = 0;

import dataPetItems from "../../../assets/database/petItems.js";
let dataPetItemsCopy = [...dataPetItems];
let items = dataPetItems;
let arrPetsNext = [...items]
let arrPetsPrev = [];


addingPetsItem()
let overallWidth = petsItems.scrollWidth;
let petItem = document.querySelector('.pets__item');
let petItemAll = document.querySelectorAll('.pets__item');
let petItemWidth = petItem.getBoundingClientRect().width;

nextBtn.addEventListener('click', handlerClickNextBtn);
prevBtn.addEventListener('click', handlerClickPrevBtn);

let totalCountItems = Math.floor(visibleWidth / petItemWidth);
let sumVisibleWidthPetItems = totalCountItems * petItemWidth;
let gapItem = (visibleWidth - totalCountItems * petItemWidth) / (totalCountItems - 1)

function handlerClickNextBtn() {

    arrPetsPrev.push(...arrPetsNext.splice(0, 6))
    if (arrPetsNext.length == 0) {
        arrPetsNext = [...arrPetsPrev];
        arrPetsPrev = [];
        translatex = 0;
        petsItems.style.transform = `translatex(${Math.abs(translatex)}px)`
        return
    }
    translatex -= visibleWidth + gapItem;
    petsItems.style.transform = `translatex(-${Math.abs(translatex)}px)`
}

function handlerClickPrevBtn() {

    if (arrPetsPrev.length == 0) {

        arrPetsPrev = [...arrPetsNext];
        arrPetsNext = []
        translatex = -(overallWidth - visibleWidth);

        petsItems.style.transform = `translatex(${translatex}px)`
        arrPetsNext.push(...arrPetsPrev.splice(0, 6))

        return
    } else {
        if (translatex <= 0) {
            translatex += visibleWidth + gapItem;
        }
        petsItems.style.transform = `translatex(${translatex}px)`
        arrPetsNext.push(...arrPetsPrev.splice(0, 6))

    }
}

function generatePetItems(dataPetItemsCopy, dataPetItems) {
    let petsItems = [];
    if (dataPetItemsCopy.length === 0) {
        dataPetItemsCopy = [...dataPetItems]
        petsItems = []
        petsContainerBox.innerHTML = ''
    }
    for (let i = 0; i < dataPetItems.length; i++) {
        let index = getRandomNumber(0, dataPetItemsCopy.length - 1);

        petsItems.push(dataPetItemsCopy[index]);
        dataPetItemsCopy.splice(index, 1);

    }

    return petsItems
}

function createPetItem(petsItems) {
    let items = document.createDocumentFragment();
    for (let i = 0; i < petsItems.length; i++) {
        let item = petsItems[i];
        let petsItem = document.createElement('div');
        let petsImg = document.createElement('div');
        let img = document.createElement('img');
        let petsContent = document.createElement('div');
        let petsContentBlock = document.createElement('div');
        let petsTitle = document.createElement('div');
        let p = document.createElement('p');

        petsItem.classList.add('pets__item');
        petsImg.classList.add('pets__img');
        petsContent.classList.add('pets__content');
        petsContentBlock.classList.add('pets__content-block');
        petsTitle.classList.add('pets__title');

        img.src = item.srcImg
        petsTitle.textContent = item.namePet;
        p.textContent = item.inform;

        petsItem.appendChild(petsImg)
        petsImg.appendChild(img)
        petsItem.appendChild(petsContent)
        petsContent.appendChild(petsContentBlock)
        petsContentBlock.appendChild(petsTitle)
        petsContentBlock.appendChild(p)

        items.appendChild(petsItem);
    }
    return items;
}

function addingPetsItem(petContainer) {

    let uniquePetItems = generatePetItems(dataPetItemsCopy, dataPetItems)
    let cardPetItems = createPetItem(uniquePetItems);
    petsItems.appendChild(cardPetItems)

}

function getRandomNumber(min, max) {
    return Math.round(min + Math.random() * (max - min))
}
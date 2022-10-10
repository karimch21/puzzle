const feedFormAmount = document.querySelector('.feed__form-amount');
const feedForm = document.forms['feed__form'];
const feedFormRanges = feedForm.range;

feedForm.addEventListener('click', clickHandlerFeedForm);
feedFormAmount.addEventListener('input', inputHandlerfeedFormAmount);
window.addEventListener('resize',
    () => {
        resizeHandlerWindow(feedFormAmount, feedFormRanges)
    })
resizeHandlerWindow(feedFormAmount, feedFormRanges)

function clickHandlerFeedForm(e) {
    let rangeFeed = e.target.closest('.feed__num');
    if (!rangeFeed) return
    feedFormAmount.value = rangeFeed.value;
}

function inputHandlerfeedFormAmount() {
    seekRadioInputByValue(feedFormAmount, feedFormRanges)
}

function seekRadioInputByValue(feedFormAmount, feedFormRanges) {
    for (let input of feedFormRanges) {
        if (input.value == feedFormAmount.value) {
            input.checked = true;
            return
        } else {
            input.checked = false;
        }
    }
}


function resizeHandlerWindow(feedFormAmount, feedFormRanges) {
    let windowWidth = document.documentElement.clientWidth;

    if (1600 >= windowWidth) {
        feedFormAmount.value = 100;
        seekRadioInputByValue(feedFormAmount, feedFormRanges)
    }
    if (1000 <= windowWidth && windowWidth < 1600) {
        feedFormAmount.value = 2000;
        seekRadioInputByValue(feedFormAmount, feedFormRanges)
    }
    if (0 <= windowWidth && windowWidth < 1000) {
        feedFormAmount.value = 500;
        seekRadioInputByValue(feedFormAmount, feedFormRanges)
    }
}
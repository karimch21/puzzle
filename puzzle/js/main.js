let fifteen = document.querySelector('.fifteen');
let page = document.querySelector('.page');
let tiles;
let tilesItems;
let matrix = [];
let countItems;
let modePuzzle;
let blankTileNumber;
let maxMixin = 10;
let timer;
let lockedCoordinates = null;
let moveCount = 0;
let second = 0;
let minute = 0;
let valideMove;



window.addEventListener('load', initPuzzleGame);
page.addEventListener('click', pageClickHandler);

function initPuzzleGame() {
    let tiles = createTiles();
    let btnsWrap = createWrapBtns();
    let btnMixin = createMixinBtn();
    let btnRestart = createRestartBtn();
    let btnSave = createSaveBtn();
    let btnDelteSave = createDelteSaveBtn();
    let btnSoundMoveTile = createBtnSoundMoveTile()
    let informationTable = createInformationTable();

    appendCreatedElement(fifteen, tiles);
    appendCreatedElement(btnsWrap, btnMixin);
    appendCreatedElement(btnsWrap, btnSave)
    appendCreatedElement(btnsWrap, btnRestart);
    appendCreatedElement(btnsWrap, btnDelteSave);
    appendCreatedElement(btnsWrap, btnSoundMoveTile)


    appendCreatedElement(page, btnsWrap);
    appendCreatedElement(page, informationTable)

    fifteenClickHandler()
    definitionTiles(tiles);
    setPosition(matrix)

    if (!checkDataGameLocalStorage('dataGame')) {
        mixinClickHandler(true)
    }

}

function definitionTiles(tiles) {
    if (!tiles) return
    tilesItems = Array.from(document.querySelectorAll('.tile'))
    countItems = tilesItems.length
    modePuzzle = 4;
    matrix = getMatrix(tilesItems.map(tile => tile.dataset.matrixId))
    hiddenLastTile(tilesItems)
    blankTileNumber = tilesItems.length;
}

function getMatrix(arrTiles) {
    let x = 0;
    let y = 0;
    matrix = []
    for (let i = 0; i < modePuzzle; i++) {
        matrix.push([])
    }

    for (let i = 0; i < arrTiles.length; i++) {
        if (x < modePuzzle) {
            matrix[y].push(+arrTiles[i]);
        }
        x++;
        if (x === modePuzzle) {
            y++;
            x = 0;
        }
    }

    return matrix;
}

function createTiles(countTiles = 16) {
    let tilesFragment = document.createDocumentFragment();
    for (let i = 1; i <= countTiles; i++) {
        let tile = document.createElement('button');
        let spanVal = document.createElement('span');
        tile.classList.add('tile', 'item');
        spanVal.classList.add('val');
        tile.dataset.matrixId = i;
        // if (i > 0) {
        //     tile.textContent = i;
        // }
        spanVal.textContent = i;
        tile.appendChild(spanVal)
        tilesFragment.appendChild(tile);
    }

    return tilesFragment;
}

function hiddenLastTile(tilesItems) {

    tilesItems[tilesItems.length - 1].style.display = 'none';
}

function createInformationTable() {
    deleteInformationTable()
    let wrapInformTable = document.createElement('div');
    let timeWrap = document.createElement('div');
    let timeText = document.createElement('span');
    let time = document.createElement('div');
    let moveWrap = document.createElement('div');
    let moveText = document.createElement('span');
    let move = document.createElement('div');

    wrapInformTable.classList.add('inform-table');
    move.classList.add('move-count');
    time.classList.add('time');

    timeText.textContent = 'Время: '
    time.textContent = '00:00';
    moveText.textContent = 'Количесто ходов: '
    move.textContent = 0;

    moveWrap.appendChild(moveText);
    moveWrap.appendChild(move)
    timeWrap.appendChild(timeText)
    timeWrap.appendChild(time)
    wrapInformTable.appendChild(timeWrap);
    wrapInformTable.appendChild(moveWrap);

    return wrapInformTable;
}

function deleteInformationTable() {
    let wrapInformTable = document.querySelector('.inform-table');
    if (wrapInformTable) wrapInformTable.remove()
}

function resetInformTable() {
    moveCount = 0;
    let informationTable = createInformationTable();
    appendCreatedElement(page, informationTable)
    fifteenClickHandler()
}

function createWrapBtns() {
    deleteWrapBtns()
    let btnsWrap = document.createElement('div');
    btnsWrap.classList.add('btns-wrap');
    return btnsWrap
}

function createSaveBtn() {
    let saveBtn = document.createElement('button');
    saveBtn.classList.add('save-btn');
    saveBtn.textContent = 'Сохранить игру'
    return saveBtn
}

function createDelteSaveBtn() {
    let delteSaveBtn = document.createElement('button');
    delteSaveBtn.classList.add('delte-save');
    delteSaveBtn.textContent = 'Удалить сохранение игры'
    return delteSaveBtn
}

function createBtnSoundMoveTile() {
    let btnSound = document.createElement('button');
    btnSound.classList.add('btn-sound');
    return btnSound;
}

function deleteWrapBtns() {
    let btnsWrap = document.querySelector('.btns-wrap');

    if (btnsWrap) btnsWrap.remove();
}

function createMixinBtn() {
    let btnMixin = document.createElement('button');
    btnMixin.classList.add('mixin');
    btnMixin.textContent = 'Пермешать'
    return btnMixin
}

function createRestartBtn() {
    let btnRestart = document.createElement('button');
    btnRestart.classList.add('restart');
    btnRestart.textContent = 'Начать заново'
    return btnRestart
}

function appendCreatedElement(place, elem) {
    if (!place) return
    place.appendChild(elem)
}

function setPosition(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            let value = matrix[y][x];
            let node = tilesItems[value - 1]
            setNodeStyles(node, x, y)
        }
    }
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

function pageClickHandler(e) {
    let btnMixin = e.target.closest('.mixin');
    let tile = e.target.closest('.tile');
    let restartBtn = e.target.closest('.restart');

    mixinClickHandler(btnMixin)
    tileClickHandler(tile)
    restartClickHandler(restartBtn)
}

function fifteenClickHandler() {
    fifteen = document.querySelector('.fifteen');
    if (!fifteen) return;

    fifteen.addEventListener('click', () => {
        startTime()
        console.log(fifteen);
    }, { once: true })

}

function mixinClickHandler(btnMixin) {
    if (!btnMixin) return
    let mixinCount = 0;
    clearInterval(timer)
    randomSwap(matrix)
    setPosition(matrix)
    resetInformTable()
    if (mixinCount === 0) {
        timer = setInterval(() => {
            randomSwap(matrix)
            setPosition(matrix);
            mixinCount++;
            if (mixinCount >= maxMixin) {
                mixinCount = 0;
                clearInterval(timer)
            }
        }, 70);
    }
}

function restartClickHandler(restartBtn) {

    if (!restartBtn) return


    fifteen = document.querySelector('.fifteen');
    page = document.querySelector('.page')
    fifteen.innerHTML = ''
    tilesItems = null
    matrix = [];
    countItems = 0
    modePuzzle = 0
    blankTileNumber = 0

    timer = null
    lockedCoordinates = null;
    initPuzzleGame()
}

function randomSwap(matrix) {
    let blankTileCoords = findCoordinatesByNumber(blankTileNumber, matrix);
    let validCoords = findValideCoords(matrix, blankTileCoords, lockedCoordinates)
    const swapCoords = validCoords[Math.floor(Math.random() * validCoords.length)]
    swap(blankTileCoords, swapCoords, matrix)
    lockedCoordinates = blankTileCoords;
}

function findValideCoords(matrix, blankTileCoords, lockedCoordinates) {
    const valideCoords = []
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (isValide({ x, y }, blankTileCoords)) {
                if (!lockedCoordinates || !(lockedCoordinates.x === x && lockedCoordinates.y === y)) {
                    valideCoords.push({ x, y })
                }

            }
        }
    }

    return valideCoords
}

function shuffleArray(arrMatrix) {
    return arrMatrix.map(item => {
        return { item: item, ranNum: Math.random() }
    }).sort((a, b) => a.ranNum - b.ranNum).map(item => item.item)
}

function tileClickHandler(tile) {
    if (!tile) return
    let tileNumber = +tile.dataset.matrixId;
    let tileCoords = findCoordinatesByNumber(tileNumber, matrix);
    let blankTileCoords = findCoordinatesByNumber(blankTileNumber, matrix);
    let valide = isValide(tileCoords, blankTileCoords);
    valideMove = valide;

    if (!valide) return

    swap(tileCoords, blankTileCoords, matrix)
    moveTiles()
}

function findCoordinatesByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) {
                return { x: x, y: y }
            }
        }
    }
}

function isValide(tileCoords, blankTileCoords) {
    let differenceX = Math.abs(tileCoords.x - blankTileCoords.x);
    let differenceY = Math.abs(tileCoords.y - blankTileCoords.y);

    return (differenceY === 1 || differenceX === 1) && (differenceY === 0 || differenceX === 0)
}

function swap(tileCoords, blankTileCoords, matrix) {
    let coords1 = matrix[tileCoords.y][tileCoords.x];
    let coords2 = matrix[blankTileCoords.y][blankTileCoords.x];
    matrix[tileCoords.y][tileCoords.x] = coords2;
    matrix[blankTileCoords.y][blankTileCoords.x] = coords1;
    setPosition(matrix)
}

function startTime() {
    let time = document.querySelector('.time');
    if (!time) return


    let timer = setTimeout(function t() {
        second++;

        if (second == 60) {
            minute += 1;
            second = 0;
        }
        time.textContent = `${minute.toString().length === 1 ? '0' + minute : minute}:${('0' + second).slice(-2)}`
        setTimeout(t, 1000)
    }, 0)
}

function moveTiles() {
    moveCount++;
    let blockMove = document.querySelector('.move-count');
    if (!blockMove) return;
    blockMove.textContent = moveCount
}

function checkDataGameLocalStorage(data) {
    let dataGame = localStorage.getItem('dataGame');
    return dataGame
}
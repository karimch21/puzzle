(function() {

    window.addEventListener('click', windowClickHandler);
    window.addEventListener('load', loadingSavedData)
    const gameInformation = 'dataGame'

    function windowClickHandler(e) {
        let btnSave = e.target.closest('.save-btn');
        let btnDeleteSave = e.target.closest('.delte-save')
        btnSaveHandler(btnSave)
        delteDataGame(btnDeleteSave, gameInformation)
    }

    function loadingSavedData() {
        let stringDataGame = getDataInLocalStorage(gameInformation)
        let parsedDataGame = dataTransformParse(stringDataGame)
        if (!parsedDataGame) return
        resetVariables()

        modePuzzle = parsedDataGame.modePuzzle;
        initPuzzleGame()
        matrix = parsedDataGame.matrix
        setPosition(parsedDataGame.matrix)
        updateInformTable(parsedDataGame)
    }

    function updateInformTable(data) {
        let time = document.querySelector('.time');
        let move = document.querySelector('.move-count');
        moveCount = +data.move
        let timeGame = data.time.replace(/0/gi, '').split(':');
        minute = +timeGame[0] || 0;
        second = +timeGame[1] || 0;
        if (!move && !time) return

        time.textContent = data.time;
        move.textContent = data.move
    }

    function btnSaveHandler(btnSave) {
        if (!btnSave) return
        console.log(678)
        let time = document.querySelector('.time');
        let move = document.querySelector('.move-count');
        if (!time && !move) return

        let dataGame = {
            time: time.textContent,
            move: move.textContent,
            modePuzzle,
            matrix: matrix
        }
        let jsonDataGame = dataTtranformStringify(dataGame);
        saveDataInLocalStorage(jsonDataGame, gameInformation);
        console.log(34567890)
    }

    function dataTtranformStringify(data) {
        return JSON.stringify(data);
    }

    function dataTransformParse(data) {
        console.log(data)
        if (!data) return
        if (typeof data === 'string') return JSON.parse(data);
    }

    function saveDataInLocalStorage(data, nameData) {
        console.log(777)
        localStorage.setItem(nameData, data);
    }

    function getDataInLocalStorage(nameData) {
        let data = localStorage.getItem(nameData);
        if (!data) return
        return data
    }

    function delteDataGame(btnDeleteSave, nameData) {
        if (!btnDeleteSave) return
        localStorage.removeItem(nameData)
    }
})()
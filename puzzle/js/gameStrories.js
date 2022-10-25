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
        let messageSave = createMessageSave();
        appendMesageSave(messageSave)
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
        addingInfroSaveMessage()
    }

    function dataTtranformStringify(data) {
        return JSON.stringify(data);
    }

    function dataTransformParse(data) {

        if (!data) return
        if (typeof data === 'string') return JSON.parse(data);
    }

    function saveDataInLocalStorage(data, nameData) {

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

    function createMessageSave() {
        let messageWrap = document.createElement('div');
        let messageContent = document.createElement('div');
        let messageTitle = document.createElement('div');
        let messageText = document.createElement('div');

        messageWrap.classList.add('message-wrap', 'message-save', 'message');
        messageContent.classList.add('message__content');
        messageTitle.classList.add('message__title');
        messageText.classList.add('message__text');

        messageWrap.appendChild(messageContent)
        messageContent.appendChild(messageTitle)
        messageContent.appendChild(messageText)

        return messageWrap
    }

    function appendMesageSave(messageSave) {
        if (!messageSave) return
        document.body.appendChild(messageSave);
    }

    function addingInfroSaveMessage() {
        let message = document.querySelector('.message-save');
        let messageTitle = document.querySelector('.message-save .message__title');
        let messageText = document.querySelector('.message-save .message__text');
        if (!messageTitle && !messageText && !message) return;
        messageTitle.innerHTML = '';
        messageText.innerHTML = '';
        message.classList.add('message-save--active')
        messageTitle.textContent = 'Сохранено!';
        messageText.innerHTML = `Последнее состояние игры сохранено.`
        removeClassActiveMessageSave()
    }

    function removeClassActiveMessageSave() {
        let message = document.querySelector('.message-save');
        if (!message) return
        let timerCount = 0;
        setTimeout(function f() {

            if (timerCount === 2) {
                message.classList.remove('message-save--active')
                return
            }
            timerCount++;
            setTimeout(f, 1000);
        }, 1000);
    }
})()
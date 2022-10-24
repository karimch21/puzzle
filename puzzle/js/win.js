(function() {
    window.addEventListener('load', () => {
        window.addEventListener('click', clickWindowHandledr);
        appendMessageWin()
    })

    function clickWindowHandledr(e) {
        console.log('MOse')
        let tile = e.target.closest('.tile');
        let btnMixin = e.target.closest('.mixin');
        let btnRestartGame = e.target.closest('.restart');
        let btnMode = e.target.closest('.btn-mode');
        closeMessageWin(btnMixin, btnRestartGame, btnMode)
        checkWin(tile)
    }

    function checkWin(tile) {
        if (!tile) return
        let oneDimensionalMatrix = JSON.stringify(matrix.flat());
        let winMatrix = [];
        for (let i = 1; i <= (modePuzzle * modePuzzle); i++) {
            winMatrix.push(i);
        }

        if (oneDimensionalMatrix === JSON.stringify(winMatrix)) {
            stopGameTimer()
            addingWinMessageInfo()
            addClassBodyWin()
            addClassDisabledFifteen()
        }
    }

    function appendMessageWin() {
        let message = createWinMessage();
        document.body.appendChild(message)
    }

    function stopGameTimer() {
        removeClassActiveFifteen()
    }

    function createWinMessage() {
        let messageWrap = document.createElement('div');
        let messageContent = document.createElement('div');
        let messageTitle = document.createElement('div');
        let messageText = document.createElement('div');

        messageWrap.classList.add('message-wrap', 'message-win', 'message');
        messageContent.classList.add('message__content');
        messageTitle.classList.add('message__title');
        messageText.classList.add('message__text');

        messageWrap.appendChild(messageContent)
        messageContent.appendChild(messageTitle)
        messageContent.appendChild(messageText)
        return messageWrap
    }

    function addingWinMessageInfo() {
        let message = document.querySelector('.message-win');
        let messageTitle = document.querySelector('.message-win .message__title');
        let messageText = document.querySelector('.message-win .message__text');
        if (!messageTitle && !messageText && !message) return;

        message.classList.add('message-win--active')
        messageTitle.textContent = 'Вы выйграли!';
        messageText.innerHTML = `<p>Потраченное время: ${minute}:${second}</p> <p>Количество ходов: ${moveCount}</p>`
    }

    function addClassBodyWin() {
        document.body.classList.add('game-win');
    }

    function deleteWinInfo() {
        let message = document.querySelector('.message-win--active');
        if (!message) return
        document.body.classList.remove('game-win');
        message.classList.remove('message-win');
    }

    function addClassDisabledFifteen() {
        if (!fifteen) return
        fifteen.classList.add('fifteen--disbled')
    }

    function removeClassDisabledFifteen() {
        if (!fifteen) return
        fifteen.classList.remove('fifteen--disbled')
    }

    function closeMessageWin(btnMixin, btnRestartGame, btnMode) {
        if (btnMixin || btnRestartGame || btnMode) {
            console.log(btnMixin || btnRestartGame || btnMode)
            deleteWinInfo()
            removeClassDisabledFifteen()
        }
    }
})()
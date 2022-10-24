(function() {
    window.addEventListener('load', () => {
        window.addEventListener('click', clickWindowHandledr);
    })

    function clickWindowHandledr(e) {
        let tile = e.target.closest('.tile');
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
            let message = createWinMessage();
            document.body.appendChild(message)
            alert('win')
        }
    }

    function stopGameTimer() {
        removeClassActiveFifteen()
    }

    function createWinMessage() {
        let messageWrap = document.createElement('div');
        let messageContent = document.createElement('div');
        let messageTitle = document.createElement('div');
        let messageText = document.createElement('div');

        messageWrap.classList.add('message-wrap', 'message');
        messageContent.classList.add('message__content');
        messageTitle.classList.add('message__title');
        messageText.classList.add('message__text');

        messageTitle.textContent = 'Вы выйграли!';
        messageText.innerHTML = `<p>Потраченное время: ${minute}:${second}</p> <p>Количество ходов: ${moveCount}</p>`

        messageWrap.appendChild(messageContent)
        messageContent.appendChild(messageTitle)
        messageContent.appendChild(messageText)
        return messageWrap
    }

})()
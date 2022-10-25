(function() {
    window.addEventListener('load', () => {
        window.addEventListener('click', clickWindowHandledr);
        appendMessageWin()
    })

    function clickWindowHandledr(e) {

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
        let messageWin = document.querySelector('.message-win');
        if (!messageWin) {
            appendMessageWin()
            return
        }

        if (btnMixin || btnRestartGame || btnMode) {
            deleteWinInfo()
            removeClassDisabledFifteen()
        }
    }
})()

console.log("1.layout, design, responsive UI: +10\n\n2.at the beginning state of the game, the frame is filled with randomly generated and shuffled numbers: +10\n\n3.on click on a tile next to an empty cell, the tile moves to the empty cell: +10\n\n4.the game can be restarted without reloading the page: +10\n\n5.game duration and number of moves are displayed: +10\n\n6.sound accompaniment (on/off) of tiles movement: +10\n\n7.implemented saving the state of the game and saving the top 10 results using LocalStorage: +5\n\n8.implemented selection of different sizes for frame: +10\n\n9.when the game is finished, the following message is displayed \"Hooray! You solved the puzzle in ##:## and N moves!\". So that shuffled algorithm should work correctly - user can solve puzzle +10\n\n10.animation of tiles' movement on frame: +15\n\nTotal points:100")
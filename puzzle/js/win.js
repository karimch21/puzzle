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
            alert('win')
        }
    }
})()
function createModeSelectionPuzzle() {
    let wrapMode = document.createElement('div');
    wrapMode.classList.add('wrap-mode');
    for (let i = 3; i < 9; i++) {
        let btnMode = document.createElement('div');
        btnMode.dataset.mode = i;
        btnMode.classList.add('btn-mode');
        btnMode.textContent = `${i}x${i}`;
        wrapMode.appendChild(btnMode);
    }
    return wrapMode;
}
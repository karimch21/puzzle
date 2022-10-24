(function() {
    let audioMoveTile = new Audio();

    audioMoveTile.classList.add('audio', 'audio-move-tile')
    window.addEventListener('click', windowClickHandler);
    window.addEventListener('load', loadDom);

    function loadDom() {
        appendAudioMoveTitle(audioMoveTile)

    }

    function windowClickHandler(e) {
        let tile = e.target.closest('.tile');
        let btnSound = e.target.closest('.btn-sound')
        togglePlayBackSound(tile, audioMoveTile, btnSound);
        tileMove(tile, audioMoveTile)
    }

    function togglePlayBackSound(tile, audioMoveTile, btnSound) {
        if (!btnSound) return
        if (btnSound) {

            btnSound.classList.toggle('btn-sound--off')
            if (btnSound.classList.contains('btn-sound--off')) {
                audioMoveTile.muted = true;
            } else {
                audioMoveTile.muted = false;
            }
        }

    }

    function tileMove(tile, audioMoveTile) {
        if (!tile) return

        if (valideMove) {

            audioMoveTile.play()
            audioMoveTile.playbackRate = 3
        }
    }

    function appendAudioMoveTitle(audioMoveTile) {
        document.body.appendChild(audioMoveTile);
    }


    audioMoveTile.src = './assets/sound/moveTile.mp3'
    audioMoveTile.controls = true
})()
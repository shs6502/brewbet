document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const resetButton = document.getElementById('resetGame');
    const playerCountInput = document.getElementById('playerCount');
    const gameBoard = document.getElementById('gameBoard');
    const breakSound = document.getElementById('breakSound');
    const bellSound = document.getElementById('bellSound');

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        gameBoard.innerHTML = '';
        playerCountInput.value = '';
        startButton.disabled = false;
        playerCountInput.disabled = false;
    }

    function startGame() {
        const playerCount = parseInt(playerCountInput.value);
        
        if (playerCount < 2) {
            alert('최소 2명 이상의 인원수를 입력해주세요!');
            return;
        }

        gameBoard.innerHTML = '';
        const losingCup = Math.floor(Math.random() * playerCount);
        playerCountInput.disabled = true;

        for (let i = 0; i < playerCount; i++) {
            const cup = document.createElement('img');
            cup.src = 'image/cup.png';
            cup.classList.add('coffee-cup');
            cup.dataset.index = i;

            cup.addEventListener('click', function() {
                if (parseInt(this.dataset.index) === losingCup) {
                    this.classList.remove('broken');
                    void this.offsetWidth;
                    this.classList.add('broken');
                    
                    breakSound.play();
                    
                    setTimeout(() => {
                        this.src = 'image/broken.png';
                    }, 100);
                    
                    setTimeout(() => {
                        alert('당신이 커피를 사게 되었습니다! ☕');
                        startButton.disabled = false;
                        playerCountInput.disabled = false;
                    }, 1000);
                } else {
                    bellSound.play();
                    this.style.display = 'none';
                }
            }, { once: true });

            gameBoard.appendChild(cup);
        }

        startButton.disabled = true;
    }
}); 
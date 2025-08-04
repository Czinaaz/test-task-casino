let spinCount = 0;
let chances = 1;

const wheel = document.getElementById('bonus-wheel');
const spinButton = document.getElementById('spin-button');
const playButton = document.getElementById('play-button');
const messagesContainer = document.getElementById('messages');

spinButton.addEventListener('click', handleSpin);

const backgroundCircle = document.getElementById('background-circle');
backgroundCircle.classList.add('spinning-left');



function handleSpin() {
    if (spinCount >= 3) return;

    spinCount++;
    wheel.classList.add('spinning');
    spinButton.disabled = true;

    setTimeout(() => {
        wheel.classList.remove('spinning');
        revealMessage(spinCount);
        if (spinCount === 1) {
        spinButton.style.display = 'none';
        } else {
        spinButton.disabled = false;
        }
    }, 5000);
}

document.querySelector('.close-button').addEventListener('click', () => {
    const modal = document.getElementById('message-modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('message-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
});


function revealMessage(count) {
    const modal = document.getElementById('message-modal');
    const modalContent = document.getElementById('modal-message-content');

    let html = '';

    if (count === 1) {
        html = `
            <div <div class="modal-message">
                <p style="color: #00FF00; font-size: 1.5rem;">You have won 1 free chance to win €1,000,000.00</p>
                <p style="color: #666; font-style: italic;">Spin the wheel again for more chances to win.</p>
                <button id="modal-spin-button" aria-label="Spin the Wheel">SPIN AGAIN</button>
            </div>
        `;
        chances = 1;
    } else if (count === 2) {
        html = `
            <div <div class="modal-message">
                <p style="color: #FFD700; font-size: 1.5rem;">You have unlocked a 50X multiplier</p>
                <p>50 free chances to win €1,000,000.00</p>
                <p style="color: #666; font-style: italic;">Keep spinning to keep winning.</p>
                <button id="modal-spin-button" aria-label="Spin the Wheel">SPIN AGAIN</button>
            </div>
        `;
        chances *= 50;
    } else if (count === 3) {
        html = `
            <div <div class="modal-message">
                <p style="color: #00FF00; font-size: 1.5rem;">Your chances are doubled</p>
                <p>100 free chances to win €1,000,000.00</p>
                <button id="modal-spin-button" aria-label="Play Now">PLAY NOW</button>
            </div>
        `;
        chances *= 2;
    }

    modalContent.innerHTML = html;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');

    const modalSpinButton = document.getElementById('modal-spin-button');
    if (modalSpinButton) {
        modalSpinButton.addEventListener('click', () => {
            console.log('Modal spin button clicked, count:', count);
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');

            if (count < 3) {
                handleSpin();
            } else {
                window.location.href = 'https://luxury.casino/en/';
            }
        });
    }
}





document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

let touchStartX = null;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX !== null && Math.abs(touchEndX - touchStartX) > 50) {
        handleSpin();
        touchStartX = null;
    }
}

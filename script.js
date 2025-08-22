const answers = ['api', 'bebek', 'maret', 'wukong', '3 september'];
let currentLevel = 0;

// DOM Elements
const homeSection = document.getElementById('home');
const gameSection = document.getElementById('game');
const congratsSection = document.getElementById('congrats');
const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const answerInput = document.getElementById('answerInput');
const gameMsg = document.getElementById('gameMsg');
const levelNum = document.getElementById('levelNum');
const inputNum = document.getElementById('inputNum');
const touchBtn = document.getElementById('touchBtn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const fireworks = document.getElementById('fireworks');

// Show/Hide helpers
function showSection(sec) {
  [homeSection, gameSection, congratsSection].forEach(s => s.classList.add('hidden'));
  sec.classList.remove('hidden');
  if (sec === congratsSection) launchFireworks();
}
function hidePopup() { popup.classList.add('hidden'); }
function showPopup() { popup.classList.remove('hidden'); }

// Event: Start Game
startBtn.onclick = () => {
  currentLevel = 0;
  answerInput.value = '';
  gameMsg.textContent = '';
  updateLevel();
  showSection(gameSection);
  answerInput.focus();
};

// Event: Submit answer
submitBtn.onclick = () => {
  let val = answerInput.value.trim().toLowerCase();
  if (!val) {
    gameMsg.textContent = "Yuk isi dulu jawabannya!";
    return;
  }
  if (val === answers[currentLevel]) {
    gameMsg.textContent = "Yeayyy benar! 🎉";
    setTimeout(() => {
      currentLevel++;
      if (currentLevel < answers.length) {
        answerInput.value = '';
        updateLevel();
        gameMsg.textContent = '';
        answerInput.focus();
      } else {
        showSection(congratsSection);
        setTimeout(() => { fireworks.style.pointerEvents = "none"; }, 3000);
      }
    }, 700);
  } else {
    gameMsg.textContent = "Oops, coba lagi yaa!";
    answerInput.value = '';
    answerInput.focus();
  }
};

function updateLevel() {
  levelNum.textContent = currentLevel + 1;
  inputNum.textContent = (currentLevel + 1) + ".";
}

// Event: Touch me button
touchBtn.onclick = () => {
  showPopup();
};
// Event: Close popup
closePopup.onclick = () => {
  hidePopup();
};

// Fireworks Animation - More Meriah!
function launchFireworks() {
  fireworks.innerHTML = '';
  let bursts = 9; // More bursts!
  for (let i = 0; i < bursts; i++) {
    setTimeout(() => fireworkBurst(i), i * 300);
  }
}

function fireworkBurst(burstIdx) {
  let count = 22 + Math.round(Math.random() * 22); // more sparks per burst
  let centerX = 35 + Math.random() * 30; // vw
  let centerY = 38 + Math.random() * 20; // vh
  for (let i = 0; i < count; i++) {
    let angle = (2 * Math.PI * i) / count;
    setTimeout(() => {
      createSpark(centerX, centerY, angle, burstIdx);
      // Add some star shapes randomly for extra party!
      if (Math.random() > 0.85) createStar(centerX, centerY, angle, burstIdx);
    }, Math.random() * 350);
  }
}

function createSpark(centerX, centerY, angle, burstIdx) {
  const spark = document.createElement('div');
  spark.className = 'spark';
  // Colorful and random
  const colors = ['#ffe066', '#ff9ad7', '#b5e686', '#ffb861', '#a67c52', '#ff6f91', '#ffecb3', '#fff', '#ffd700', '#c6e2ff', '#ffb6c1'];
  spark.style.background = colors[Math.floor(Math.random() * colors.length)];
  // Start at center, then animate outward
  spark.style.left = `${centerX}vw`;
  spark.style.top = `${centerY}vh`;
  spark.style.opacity = 0.92;
  // Animate outwards using transform
  let dist = 68 + Math.random() * 28;
  let x = Math.cos(angle) * dist;
  let y = Math.sin(angle) * dist;
  spark.style.transition = 'transform 0.95s cubic-bezier(0.5,0,0.5,1), opacity 0.95s';
  setTimeout(() => {
    spark.style.transform = `translate(${x}px, ${-y}px) scale(1.7)`;
    spark.style.opacity = 0.1;
  }, 30);
  // Remove after animation
  setTimeout(() => spark.remove(), 1000);
  fireworks.appendChild(spark);
}

// Star Shape for extra sparkle (SVG inline)
function createStar(centerX, centerY, angle, burstIdx) {
  const star = document.createElement('div');
  star.className = 'star-spark';
  star.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"
        fill="${['#ffd700','#ffe066','#fff700','#ffb6c1', '#b5e686'][Math.floor(Math.random()*5)]}" />
    </svg>
  `;
  star.style.position = 'absolute';
  star.style.left = `${centerX}vw`;
  star.style.top = `${centerY}vh`;
  let dist = 60 + Math.random() * 32;
  let x = Math.cos(angle) * dist;
  let y = Math.sin(angle) * dist;
  star.style.opacity = 0.92;
  star.style.transition = 'transform 1.1s cubic-bezier(0.5,0,0.5,1), opacity 1.1s';
  setTimeout(() => {
    star.style.transform = `translate(${x}px, ${-y}px) scale(1.4)`;
    star.style.opacity = 0.1;
  }, 60);
  setTimeout(() => star.remove(), 1200);
  fireworks.appendChild(star);

}

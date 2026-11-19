// Defining variables for the game:
let patience = 50;
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let scoreInterval;
let patienceInterval;
let itemTimeout;
let spawnTimeout;
let floatingItems = [];
const clickSound = new Audio("assets/sfx-click.mp3");
const itemTypes = {
  banana: {
    src: "assets/prop-banana.svg",
    points: 40,
    multiplier: 1,
    expireTime: 3000,
    turnsInto: "rottenBanana",
    clickIs: "good",
    sound: new Audio("assets/sfx-eat.mp3"),
  },
  rottenBanana: {
    src: "assets/prop-rotten-banana.svg",
    points: -15,
    multiplier: 1,
    expireTime: 3000,
    turnsInto: null,
    clickIs: "bad",
    sound: new Audio("assets/sfx-squish.mp3"),
  },
  poop: {
    src: "assets/prop-poop.svg",
    points: 0,
    multiplier: 2,
    expireTime: null,
    turnsInto: null,
    clickIs: "good",
    sound: new Audio("assets/sfx-clean.mp3"),
  },
};
let lastState = null; // Save the monkeyState for the monkeyExpressions() function
const monkeyState = [
  {
    limit: 20,
    img: "assets/monkey1.svg",
    class: "angry-monkey",
    sound: new Audio("assets/monkey-angry.mp3"),
  },
  {
    limit: 40,
    img: "assets/monkey2.svg",
    class: "sad-monkey",
  },
  {
    limit: 60,
    img: "assets/monkey3.svg",
    class: "bored-monkey",
    sound: new Audio("assets/monkey-bored.mp3"),
  },
  {
    limit: 80,
    img: "assets/monkey4.svg",
    class: "happy-monkey",
  },
  {
    limit: 100,
    img: "assets/monkey5.svg",
    class: "pleased-monkey",
    sound: new Audio("assets/monkey-pleased.mp3"),
  },
];

// Capturing the elements needed from the HTML:
const patienceGauge = document.querySelector("#patience-gauge");
const monkey = document.querySelector("#monkey");
const monkeyAnimation = document.querySelector("#monkey-animation");
const scoreOutput = document.querySelector("#score-output");
const hiScoreOutput = document.querySelector("#hi-score-output");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const gameOverScreen = document.querySelector("#game-over-screen");

const startMusic = new Audio("assets/digital-bananas.mp3");
startMusic.loop = true;
startMusic.volume = 0.2;
document.addEventListener(
  "click",
  () => {
    if (startMusic.paused && bgMusic.paused) {
      startMusic.play().catch(() => {});
    }
  },
  { once: true },
);

const bgMusic = new Audio("assets/banana-track.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.05;

const gameOverSound = new Audio("assets/game-over.mp3");
gameOverSound.volume = 0.2;

// START SCREEN ----------------------------------

// Start/Retry buttons settings:
const startBtn = document.querySelectorAll("#start-btn, #restart-btn");
startBtn.forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    // Reseting the game variables
    score = 0;
    patience = 50;

    // Changing the screens
    startScreen.classList.remove("active");
    startScreen.classList.add("hidden");
    gameOverScreen.classList.remove("active");
    gameOverScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    gameScreen.classList.add("active");
    // Starting the game music
    startMusic.pause();
    bgMusic.play();

    //Starting game functions:
    scoreInterval = setInterval(timerScore, 595);
    patienceInterval = setInterval(patienceDepletionTimer, 1000);
    itemTimeout = setTimeout(() => {
      spawnItem();
    }, 5950);
  });
});

// GAME LOOP -------------------------------------

// Game Over functions:
function clearAllItems() {
  // Look for all the floatingItems on the screen:
  floatingItems.forEach((item) => {
    clearTimeout(item.timer); // Clean all items timeout.
    item.element.remove(); // Remove the element visuals from the screen.
  });
  // Clean the items array:
  floatingItems = [];
}

function gameOver() {
  if (patience <= 0) {
    // Changing the screens
    gameScreen.classList.remove("active");
    gameScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
    gameOverScreen.classList.add("active");
    // Pausing the game music
    bgMusic.pause();
    bgMusic.currentTime = 0;

    //Stopping game functions:
    clearInterval(scoreInterval);
    clearInterval(patienceInterval);
    clearTimeout(itemTimeout);
    clearTimeout(spawnTimeout);

    clearAllItems();
    gameOverSound.play();
  }
}

// petMonkey(): Click the monkey to gain 5% patience until it gets 100% using the function Math.min():
monkey.addEventListener("pointerdown", petMonkey);

function petMonkey() {
  patience = Math.min(100, patience + 5);
  clickSound.currentTime = 0;
  clickSound.play();

  // Refresh the CSS variable present inside the HTML span (#patience-gauge):
  patienceGauge.style.setProperty("--patience", `${patience}%`);
}

// Monkey expressions:
function monkeyExpressions() {
  // Verify the current state based in the patience:
  let currentState = monkeyState.find((s) => patience <= s.limit);

  // If the state has changed since last verification:
  if (currentState !== lastState) {
    //1. Update the state image:
    document.getElementById("monkey").src = currentState.img;

    // 2. Remove all possible monkey classes with map:
    const allClasses = monkeyState.map((s) => s.class);
    monkeyAnimation.classList.remove(...allClasses);

    // 3. Adding the new animation class
    monkeyAnimation.classList.add(currentState.class);

    // 4. Play a sound if this state has one:
    if (currentState.sound) {
      currentState.sound.currentTime = 0;
      currentState.sound.play();
    }

    // Update the lastState:
    lastState = currentState;
  }
}

// The Patience depletes every second until it reaches 0:
function patienceDepletionTimer() {
  // Setting the totalMultiplier from items:
  let totalMultiplier = 1;
  for (let i = 0; i < floatingItems.length; i++) {
    totalMultiplier *= floatingItems[i].config.multiplier;
  }

  // Setting score dificulty:
  let scoreDificultyBonus = Math.min(20, Math.floor(score / 50)); // Raises 1 point of the depletionRate for each 50 points in the score.

  // Setting depletionRate:
  let depletionRate = (3 + scoreDificultyBonus) * totalMultiplier;

  patience = Math.max(0, patience - depletionRate);

  // Refresh the CSS variable present inside the HTML span
  patienceGauge.style.setProperty("--patience", `${patience}%`);

  // Verify the monkey current expression:
  monkeyExpressions();
}

// Show the Hi-Score:
hiScoreOutput.textContent = highScore.toString().padStart(5, "0");

// Score function:
function timerScore() {
  if (patience > 0) {
    score += 1;
    scoreOutput.textContent = score.toString().padStart(5, "0");

    // Verify Hi-record in real time:
    if (score > highScore) {
      highScore = score;
      hiScoreOutput.textContent = highScore.toString().padStart(5, "0");
      localStorage.setItem("highScore", highScore);
    }
  } else {
    gameOver();
  }
}

// Floating Itens:

// Function for changing the item state if it is ignored:
function itemRot(item) {
  // Verify if the item has a next state (turnsInto):
  if (item.config.turnsInto) {
    const nextKey = item.config.turnsInto;
    const nextConfig = itemTypes[nextKey];

    // 1. Update the instance data and image:
    item.element.classList.remove(item.config.clickIs);
    item.type = nextKey;
    item.config = nextConfig;
    item.element.src = nextConfig.src;
    item.element.classList.add(nextConfig.clickIs);

    // 2. Set the next item timer:
    if (nextConfig.expireTime) {
      item.timer = setTimeout(() => {
        itemRot(item);
      }, nextConfig.expireTime);
    }
  } else {
    // If turnsInto is (null) the item just disapears:
    item.element.remove();
    const index = floatingItems.indexOf(item);
    if (index > -1) {
      floatingItems.splice(index, 1);
    }
  }
}

function spawnItem() {
  if (floatingItems.length <= 5) {
    // Sort the keys inside itemTypes (banana, rottenBanana, poop):
    const types = Object.keys(itemTypes);
    const randomKey = types[Math.floor(Math.random() * types.length)];
    const config = itemTypes[randomKey]; // Take the corresponding object (ex: itemTypes.banana)

    // Create a <img> tag for the object and define the path for the SVG and the CSS class:
    const itemElement = document.createElement("img");
    itemElement.src = config.src;
    itemElement.classList.add("floating-item");
    itemElement.classList.add(config.clickIs);

    // Insert the object in the DOM:
    gameScreen.appendChild(itemElement);

    // Take the real dimensions of the item's hitbox rendered by the browser:
    const hitbox = itemElement.getBoundingClientRect();

    // Sorting initial position:
    let randomX = Math.random() * (gameScreen.clientWidth - hitbox.width);
    let randomY = Math.random() * (gameScreen.clientHeight - hitbox.height);

    // Applying the initial position now to avoid first-frame delay:
    itemElement.style.translate = `${randomX}px ${randomY}px`;

    // Creating the instance data object:
    let itemData = {
      element: itemElement,
      type: randomKey, // ex: "banana"
      config: config, // points, multiplier, etc.
      width: hitbox.width,
      height: hitbox.height,
      x: randomX,
      y: randomY,
      vx: (Math.random() - 0.5) * 3, // Horizontal speed
      vy: (Math.random() - 0.5) * 3, // Vertical speed
    };

    // Timeout logic for the items:
    if (config.expireTime) {
      itemData.timer = setTimeout(() => {
        // Logic to turn banana into rottenBanana:
        itemRot(itemData);
      }, config.expireTime);
    }

    // Setting the click interaction of this element:
    itemElement.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      // 1. Removing from the DOM and clearing the timer:
      itemData.config.sound.play(); // Play the item sound
      itemElement.remove();
      clearTimeout(itemData.timer);

      // 2. Removing from the array floatingItems:
      const index = floatingItems.indexOf(itemData);
      if (index > -1) {
        floatingItems.splice(index, 1);
      }

      // 3. Setting logic (points):
      patience = Math.min(100, patience + itemData.config.points);
    });

    floatingItems.push(itemData);
  }
  spawnTimeout = setTimeout(
    () => {
      spawnItem();
    },
    score >= 1 ? Math.max(350, 5950 - score * 55) : 5950,
  );
}

function itemMovement() {
  // Iterates each item on the list:
  for (let i = 0; i < floatingItems.length; i++) {
    let item = floatingItems[i];

    // Update positions:
    item.x += item.vx;
    item.y += item.vy;

    // X-Axis Clamp and Collision
    if (item.x + item.width > gameScreen.clientWidth) {
      item.x = gameScreen.clientWidth - item.width;
      item.vx *= -1;
    } else if (item.x < 0) {
      item.x = 0;
      item.vx *= -1;
    }

    // Y-Axis Clamp and Collision
    if (item.y + item.height > gameScreen.clientHeight) {
      item.y = gameScreen.clientHeight - item.height;
      item.vy *= -1;
    } else if (item.y < 0) {
      item.y = 0;
      item.vy *= -1;
    }

    // Apply in the DOM
    item.element.style.translate = `${item.x}px ${item.y}px`; // Still not respecting the gameScreen borders...
  }

  // Mantain the cycle running:
  requestAnimationFrame(itemMovement);
}

requestAnimationFrame(itemMovement);

// SOUND OPTIONS ---------------------------------
const soundBoard = []; // Empty list where all the sound of the game will be saved.

// Function to colect the audio of the game:
function registerAudio(audioObj) {
  if (audioObj instanceof Audio) soundBoard.push(audioObj);
}

// Colecting all the audio for the soundBoard:
registerAudio(startMusic);
registerAudio(bgMusic);
registerAudio(gameOverSound);
registerAudio(clickSound);
Object.values(itemTypes).forEach((item) => registerAudio(item.sound));
monkeyState.forEach((state) => registerAudio(state.sound));

// Function for de audio-btn to play and mute sound:
const audioBtn = document.getElementById("audio-btn");
let isMuted = localStorage.getItem("isMuted") === "true";
audioBtn.textContent = isMuted ? "🔇" : "🔊";
soundBoard.forEach((audio) => {
  if (audio) audio.muted = isMuted;
  audio.volume = Math.min(0.3, audio.volume);
}); // Apply muted in every sound and a maximum volume after collecting

// The function:
audioBtn.addEventListener("click", () => {
  isMuted = !isMuted;

  soundBoard.forEach((audio) => {
    if (audio) audio.muted = isMuted;
  });

  audioBtn.textContent = isMuted ? "🔇" : "🔊";
  localStorage.setItem("isMuted", isMuted);
});

/* 
Credits for the music: 
1. Title: Digital Bananas - Locomule
https://opengameart.org/content/digital-bananas
2. Game music: Banana track - skrjablin
https://opengameart.org/content/banana-track
*/

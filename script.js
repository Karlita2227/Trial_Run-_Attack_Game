let gameState = {
  players: 2,
  whoseTurn: 1,
  gameOver: false
};

// Change turns and update UI
function changePlayer() {
  gameState.whoseTurn = gameState.whoseTurn === 1 ? 2 : 1;
  document.getElementById("playerName").innerHTML = `Player ${gameState.whoseTurn}`;
}

// Handle game over
function gameOver() {
  document.getElementById("title").style.display = "none";
  document.getElementById("playerTurn").style.display = "none";
  document.getElementById("winningPlayer").innerHTML = `Player ${gameState.whoseTurn} wins!`;
  document.getElementById("gameOverScreen").style.display = "flex";
  gameState.gameOver = true;
}

// Reset game
function restartGame() {
  updateScore(initialScore); // Ensure initialScore is defined elsewhere
  document.getElementById("game-over-message").style.display = "none";
  document.getElementById("restart-button").style.display = "none";
  startNewGame(); // Ensure this function is defined
}

// Update score display
function updateScore(score) {
  document.getElementById("score").innerText = score;
  if (score <= 0) gameOver();
}

// Toggle button active/inactive
function toggleButtonState(activeId, inactiveId) {
  const activeBtn = document.getElementById(activeId);
  const inactiveBtn = document.getElementById(inactiveId);

  activeBtn.disabled = false;
  activeBtn.classList.add("active");
  activeBtn.classList.remove("inactive");

  inactiveBtn.disabled = true;
  inactiveBtn.classList.add("inactive");
  inactiveBtn.classList.remove("active");
}

// Animate sprite
function animatePlayer(playerId, frames, enemyId) {
  const playerSprite = document.getElementById(playerId);
  const enemySprite = document.getElementById(enemyId);
  const enemyDamage = document.getElementById("SFX_PlayerDamage");

  playerSprite.src = frames[1];
  playerSprite.classList.remove("idle");
  playerSprite.classList.add("attack");

  enemySprite.classList.remove("idle");
  enemySprite.classList.add("damage");
  enemyDamage.play();

  setTimeout(() => {
    enemySprite.classList.remove("damage");
    enemySprite.classList.add("idle");
    playerSprite.src = frames[0];
    playerSprite.classList.remove("attack");
    playerSprite.classList.add("idle");
  }, 350);
}

// Attack logic for Player 1
function attackPlayerOne() {
  if (gameState.whoseTurn !== 2 || gameState.gameOver) return;

  animatePlayer("playerTwoSprite", ["./images/L_Idle.png", "./images/L_Attack.png"], "playerOneSprite");
  toggleButtonState("playerOneAttack", "playerTwoAttack");

  let playerOneHealth = document.getElementById("playerOneHealth");
  let health = Number(playerOneHealth.innerHTML) - 10;
  playerOneHealth.innerHTML = Math.max(health, 0);

  if (health <= 0) gameOver();
  else changePlayer();
}

// Attack logic for Player 2
function attackPlayerTwo() {
  if (gameState.whoseTurn !== 1 || gameState.gameOver) return;

  animatePlayer("playerOneSprite", ["./images/R_Idle.png", "./images/R_Attack.png"], "playerTwoSprite");
  toggleButtonState("playerTwoAttack", "playerOneAttack");

  let playerTwoHealth = document.getElementById("playerTwoHealth");
  let health = Number(playerTwoHealth.innerHTML) - 10;
  playerTwoHealth.innerHTML = Math.max(health, 0);

  if (health <= 0) gameOver();
  else changePlayer();
}

// Generic button toggle
document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

// Log button index
document.querySelectorAll("button").forEach((button, index) => {
  button.addEventListener("click", () => {
    console.log("Button index:", index);
  });
});


// let player1 = { hp: 100, defending: false };
// let player2 = { hp: 100, defending: false };
// let turn = 1; // 1 for Player 1, 2 for Player 2

// function playerAction(playerNumber, action) {
//   if (turn !== playerNumber) {
//     alert("It's not your turn!");
//     return;
//   }

//   const attacker = playerNumber === 1 ? player1 : player2;
//   const defender = playerNumber === 1 ? player2 : player1;

//   if (action === 'attack') {
//     let damage = Math.floor(Math.random() * 20) + 5;
//     if (defender.defending) {
//       damage = Math.floor(damage / 2);
//       defender.defending = false;
//     }
//     defender.hp -= damage;
//     if (defender.hp < 0) defender.hp = 0;
//     logStatus(`Player ${playerNumber} attacks for ${damage} damage!`);
//   } else if (action === 'defend') {
//     attacker.defending = true;
//     logStatus(`Player ${playerNumber} is defending!`);
//   }

//   updateHP();

//   if (player1.hp <= 0 || player2.hp <= 0) {
//     endGame();
//   } else {
//     turn = turn === 1 ? 2 : 1;
//     document.getElementById("status").textContent = `Player ${turn}'s turn`;
//   }
// }

// function updateHP() {
//   document.getElementById("hp1").textContent = player1.hp;
//   document.getElementById("hp2").textContent = player2.hp;
// }

// function logStatus(message) {
//   document.getElementById("status").textContent = message;
// }

// function endGame() {
//   let winner = player1.hp <= 0 ? "Player 2" : "Player 1";
//   document.getElementById("status").textContent = `${winner} wins!`;
//   disableButtons();
// }

// function disableButtons() {
//   document.querySelectorAll("button").forEach(btn => btn.disabled = true);
// }

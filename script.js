let player1 = { hp: 100, defending: false };
let player2 = { hp: 100, defending: false };
let turn = 1; // 1 for Player 1, 2 for Player 2

function playerAction(playerNumber, action) {
  if (turn !== playerNumber) {
    alert("It's not your turn!");
    return;
  }

  const attacker = playerNumber === 1 ? player1 : player2;
  const defender = playerNumber === 1 ? player2 : player1;

  if (action === 'attack') {
    let damage = Math.floor(Math.random() * 20) + 5;
    if (defender.defending) {
      damage = Math.floor(damage / 2);
      defender.defending = false;
    }
    defender.hp -= damage;
    if (defender.hp < 0) defender.hp = 0;
    logStatus(`Player ${playerNumber} attacks for ${damage} damage!`);
  } else if (action === 'defend') {
    attacker.defending = true;
    logStatus(`Player ${playerNumber} is defending!`);
  }

  updateHP();

  if (player1.hp <= 0 || player2.hp <= 0) {
    endGame();
  } else {
    turn = turn === 1 ? 2 : 1;
    document.getElementById("status").textContent = `Player ${turn}'s turn`;
  }
}

function updateHP() {
  document.getElementById("hp1").textContent = player1.hp;
  document.getElementById("hp2").textContent = player2.hp;
}

function logStatus(message) {
  document.getElementById("status").textContent = message;
}

function endGame() {
  let winner = player1.hp <= 0 ? "Player 2" : "Player 1";
  document.getElementById("status").textContent = `${winner} wins!`;
  disableButtons();
}

function disableButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

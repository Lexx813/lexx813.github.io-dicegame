let scores, roundScore, activePlayer, gamePlaying;
init();

let lastDice;

// for roll button
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random number
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
    // if (dice === 6  && lastDice === 6) {
    //   //player loses score
    //    scores[activePlayer] = 0;
    //        document.querySelector("#score-" + activePlayer).textContent = '0';
    // }   else if (dice !== 1) {
    //       //Add score
    //       roundScore += dice;
    //       document.querySelector(
    //         "#current-" + activePlayer
    //       ).textContent = roundScore;
    //     } else {
    //       nextPlayer();
    //     }


  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add Current score to GLOBAL score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    let input = document.querySelector('.final-score').value;
    let winningScore;
    // Undefined, 0, nukk or "" COERCED to false
    //anything else is coerced to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }




    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;



  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 1";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
//getter
// var x = document.querySelector("#score-0").textContent;
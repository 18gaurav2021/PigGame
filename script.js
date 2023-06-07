'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1'); //same thing can be done with getElementById()
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
let score, currentScore, activePlayer, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //changing the background to activeplayer
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// const check_Greater_Than_20_or_Not = function () {
//   if (score[activePlayer] >= 20) {
//     //Finish game

//     playing = false;
//     diceEl.classList.add('hidden');
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.add('player--winner');
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.remove('player--active');
//     document.querySelector(`current--${activePlayer}`).textContent = 0;
//   } else {
//     //switch player
//     switchPlayer();
//   }
// };

//Roll dice  functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generrate random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for the 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // score[activePlayer] += currentScore;
      // document.getElementById(`score--${activePlayer}`).textContent =
      //   score[activePlayer];

      // //2. check for total score >=100
      if (currentScore >= 20) {
        //Finish game
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
          score[activePlayer];
        playing = false;
        diceEl.classList.remove('hidden');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
      }
    }
    //Switch the player
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to total score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2. check for total score >=100
    if (score[activePlayer] >= 20) {
      //Finish game

      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
    } else {
      //switch player
      switchPlayer();
    }
  }
});
//New game on button click-
btnNew.addEventListener('click', init);

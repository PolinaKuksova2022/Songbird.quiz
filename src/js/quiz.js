const quiz = document.getElementById("quiz");
const indicator = document.getElementById("indicator");
const answers = document.getElementById("answers");
const btnNext = document.getElementById("btn-next");
const audio = document.getElementById("player");
const title = document.getElementById("title");
const quizImg = document.getElementById("quetion-img");
const info = document.getElementById("info");

import { playSmall } from "./audiosmall.js";
import "./audio";

import birdsData from "./birds";

let attempt = 0;
let currentRandomBird;
let currentBird;
let i = 0;

const renderAudioQuestion = (index) => {
  let random = Math.round(Math.random() * 5);
  currentRandomBird = birdsData[index][random];
  currentBird = birdsData[index];

  audio.src = `${currentRandomBird.audio}`; // загрузка аудио
  const renderAnswers = birdsData[index]
    .map(
      (x) => `
            <li class="answers__list-item">
                <label class="answers__list-label">
                    <input class="answer-input" id="answer-input" type="radio" name=${index} value=${x.id}>
                    ${x.name}
                </label>
            </li>  
        `
    )
    .join("");

  answers.innerHTML = `
        <ul class="answers__list">
         ${renderAnswers}    
        </ul>
    `;
};

renderAudioQuestion(i);

const level = quiz.addEventListener("change", (event) => {
  if (event.target.classList.contains("answer-input")) {
    const chosen = event.target.value;
    const chosenIndex = Number(chosen) - 1;

    if (!btnNext.disabled) return;
    if (chosen == currentRandomBird.id) {
      indicator.innerHTML = Number(indicator.innerHTML) + 5 - attempt;
      attempt = 0;
      btnNext.disabled = false;
      // вывод названия птицы перед аудио
      title.innerHTML = `${currentRandomBird.name}`;

      //аудио ответа
      const answerSound = new Audio("right.mp3");
      answerSound.play();

      //картинка ответа
      quizImg.classList.replace("quiz__quetion-img", "quiz__quetion-done");
      quizImg.classList.replace("quiz__quetion-fail", "quiz__quetion-done");

      //вывод информации о птице при нажатиии на вариант ответа
      info.innerHTML = `<img class="info__img" src=${currentBird[chosenIndex].image} alt=""> 
              <h2 class="info__name">${currentBird[chosenIndex].name}</h2>
              <h3 class="info__species">${currentBird[chosenIndex].species}</h3>
              <h4 class="info__description">${currentBird[chosenIndex].description}</h4>
              <div class="info__player">
                  <audio id="player-small" src=${currentBird[chosenIndex].audio}></audio>
                  <div class="player">
                      <div class="control">
                          <i class="fas fa-play" id="playbtn-small"></i>
                      </div>
                      <div class="bar">
                          <div id="progress-small"></div>
                      </div>
                  </div>
                  <div id="currentSmall">0:00</div>
              </div>
              `;

      //появление доп аудио
      playSmall();

      //остановка основного аудио
      player.pause();
      return;
    }

    attempt++;

    //аудио ответа
    const answerSound = new Audio("mistake.mp3");
    answerSound.play();

    //картинка ответа
    quizImg.classList.replace("quiz__quetion-img", "quiz__quetion-fail");

    //вывод информации о птице при нажатиии на вариант ответа
    info.innerHTML = `<img class="info__img" src=${currentBird[chosenIndex].image} alt=""> 
            <h2 class="info__name">${currentBird[chosenIndex].name}</h2>
            <h3 class="info__species">${currentBird[chosenIndex].species}</h3>
            <h4 class="info__description">${currentBird[chosenIndex].description}</h4>
            <div class="info__player">
                <audio id="player-small" src=${currentBird[chosenIndex].audio}></audio>
                <div class="player">
                    <div class="control">
                        <i class="fas fa-play" id="playbtn-small"></i>
                    </div>
                    <div class="bar">
                        <div id="progress-small"></div>
                    </div>
                </div>
                <div id="currentSmall">0:00</div>
            </div>
            `;

    //появление доп аудио
    playSmall();
  }
});
quiz.addEventListener("click", (event) => {
  //работа кнопки
  if (event.target.classList.contains("btn-next")) {
    while (i < 7) {
      // переход к след. вопросу
      btnNext.disabled = false;
      i++;
      if (i === 6) {
        quiz.innerHTML = `
                    <div class="result">               
                        <audio src="result.mp3" autoplay></audio>
                        <div class="result__img"></div>   
                        <h2> Итог: ${Number(indicator.innerHTML)}</h2>
                        <form action="./quize.html">
                         <button class="btn-quize" style="margin-top: 30px;">Повторим?</button>
                        </form>
                    </div>
                `;
      }
      let round = document.getElementById(`${i}`); //для изменения индикатора уровня
      renderAudioQuestion(i);
      quizImg.classList.replace("quiz__quetion-done", "quiz__quetion-img");
      title.innerHTML = "***";
      info.innerHTML = "";
      btnNext.disabled = true;
      console.log(round);
      round.classList.add("level");
      level();
    }
  }
});

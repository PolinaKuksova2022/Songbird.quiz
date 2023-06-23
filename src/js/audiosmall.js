export function playSmall() {
  const playerSmall = document.getElementById("player-small");
  let progress = document.getElementById("progress-small");
  let playbtnSmall = document.getElementById("playbtn-small");

  const playpause = function () {
    if (playerSmall.paused) {
      playerSmall.play();
    } else {
      playerSmall.pause();
    }
  };

  playbtnSmall.addEventListener("click", playpause);

  playerSmall.onplay = function () {
    playbtnSmall.classList.replace("fa-play", "fa-pause");
  };

  playerSmall.onpause = function () {
    playbtnSmall.classList.replace("fa-pause", "fa-play");
  };

  playerSmall.ontimeupdate = function () {
    let ct = playerSmall.currentTime;
    currentSmall.innerHTML = timeFormat(ct);

    //progress
    let duration = playerSmall.duration;
    prog = Math.floor((ct * 100) / duration);
    progress.style.setProperty("--progress", prog + "%");
  };

  function timeFormat(ct) {
    minutes = Math.floor(ct / 60);
    seconds = Math.floor(ct % 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }
}

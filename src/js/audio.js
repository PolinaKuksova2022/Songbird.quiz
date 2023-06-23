const player = document.getElementById("player");
let progress = document.getElementById("progress");
let playbtn = document.getElementById("playbtn");

const playpause = function playpause() {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
};

playbtn.addEventListener("click", playpause);

player.onplay = function () {
  playbtn.classList.replace("fa-play", "fa-pause");
};

player.onpause = function () {
  playbtn.classList.replace("fa-pause", "fa-play");
};

player.ontimeupdate = function () {
  let ct = player.currentTime;
  current.innerHTML = timeFormat(ct);
  //progress
  let duration = player.duration;
  console.log(current);

  prog = Math.floor((ct * 100) / duration);
  progress.style.setProperty("--progress", prog + "%");
};

function timeFormat(ct) {
  minutes = Math.floor(ct / 60);
  seconds = Math.floor(ct % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // console.log(timeFormat(ct));
  return minutes + ":" + seconds;
}

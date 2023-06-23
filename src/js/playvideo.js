window.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".video-btn");
  const video = document.querySelector(".video");

  btn.addEventListener("click", function () {
    if (btn.classList.contains("video-btn-click")) {
      document.getElementById("video1").remove();
      btn.classList.replace("video-btn-click", "video-btn");
      return;
    }

    if (btn.classList.contains("video-btn")) {
      /*     if (video.classList.contains("ready")) {
        return;
      }

      video.classList.add("ready");*/

      video.insertAdjacentHTML(
        "afterbegin",
        '<iframe id="video1" style="position: absolute; top: 40%" src="https://www.youtube.com/embed/tbodhmmqa-g?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      );

      btn.classList.replace("video-btn", "video-btn-click");
    }
  });
});

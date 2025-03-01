document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const playBtn = document.getElementById("playBtn");
    const backwardBtn = document.getElementById("backwardBtn");
    const progress = document.querySelector(".progress");
    const progressBar = document.querySelector(".progress-bar");
    const volumeBtn = document.getElementById("volumeBtn");
    const volumeSlider = document.querySelector(".volume-slider");
    const overlayButton = document.querySelector(".overlayButton");
    const videoContainer = document.querySelector(".dff");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
  
    if (!video || !playBtn || !backwardBtn || !progress || !progressBar || !volumeBtn || !volumeSlider || !overlayButton || !videoContainer || !fullscreenBtn) {
      console.error("One or more required elements are missing.");
      return;
    }
  
    // Play/Pause toggle
    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playBtn.innerHTML = pauseIcon();
        overlayButton.style.display = "none";
      } else {
        video.pause();
        playBtn.innerHTML = playIcon();
        overlayButton.style.display = "block";
      }
    });
  
    // Overlay Button Play Functionality
    overlayButton.addEventListener("click", () => {
      video.play();
    });
  
    video.addEventListener("play", function () {
      overlayButton.style.display = "none";
  
      // Add event listener to the container if it's not already added
      if (!videoContainer.hasAttribute("data-listener")) {
        videoContainer.addEventListener("click", pauseVideo);
        videoContainer.setAttribute("data-listener", "true"); // Prevent duplicate listeners
      }
    });
  
    function pauseVideo(event) {
      if (!video.paused && event.target !== video) {
        video.pause();
        playBtn.innerHTML = playIcon();
        overlayButton.style.display = "block";
      } else {
        video.play();
        playBtn.innerHTML = pauseIcon();
      }
    }
  
    // 10-second backward
    backwardBtn.addEventListener("click", () => {
      video.currentTime = Math.max(0, video.currentTime - 10);
    });
  
    // Progress bar updates
    video.addEventListener("timeupdate", () => {
      const progressPercent = (video.currentTime / video.duration) * 100;
      progress.style.width = `${progressPercent}%`;
    });
  
    // Seek functionality
    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    });
  
    // Volume controls
    volumeSlider.addEventListener("input", (e) => {
      video.volume = e.target.value;
      video.muted = e.target.value == 0;
      updateVolumeIcon();
    });
  
    volumeBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (!video.muted) video.volume = volumeSlider.value;
      updateVolumeIcon();
    });
  
    function updateVolumeIcon() {
      volumeBtn.textContent = video.muted || video.volume === 0 ? "🔇" : "🔊";
      volumeSlider.value = video.volume;
    }
  
    // Fullscreen functionality
    fullscreenBtn.addEventListener("click", () => {
      const container = document.querySelector(".video-container");
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch((err) => {
          alert(`Error entering fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });
  
    // Icons for Play/Pause Button
    function playIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15">
          <path d="M60.54,512c-17.06,0-30.43-13.86-30.43-31.56V31.55C30.12,13.86,43.48,0,60.55,0A32.94,32.94,0,0,1,77,4.52L465.7,229c10.13,5.85,16.18,16,16.18,27s-6,21.2-16.18,27L77,507.48A32.92,32.92,0,0,1,60.55,512Z" fill="#fff"/>
        </svg>`;
    }
  
    function pauseIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15">
          <path d="M395,512a73.14,73.14,0,0,1-73.14-73.14V73.14a73.14,73.14,0,1,1,146.29,0V438.86A73.14,73.14,0,0,1,395,512Z" fill="#fff"/> 
          <path d="M117,512a73.14,73.14,0,0,1-73.14-73.14V73.14a73.14,73.14,0,1,1,146.29,0V438.86A73.14,73.14,0,0,1,117,512Z" fill="#fff"/>
        </svg>`;
    }
  });
  
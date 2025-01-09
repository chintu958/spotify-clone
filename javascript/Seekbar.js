let intervalId = null;
let lastUpdateTime = 0;

const updateSeekbar = (progress) => {
  progress = Math.max(0, Math.min(progress, 100));
  const filler = document.querySelector(".seekbar-filler");
  filler.style.width = `${progress}%`;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const handleLoadedData = (audio, startTimeElement, endTimeElement) => {
  audio.addEventListener("loadedmetadata", () => {
    const totalDuration = formatTime(audio.duration);
    console.log("totalDuration: ", totalDuration);
    endTimeElement.textContent = totalDuration;
  });

  audio.addEventListener("timeupdate", () => {
    const now = Date.now();

    if (now - lastUpdateTime > 1000) {
      lastUpdateTime = now;
      const currentTime = formatTime(audio.currentTime);
      startTimeElement.textContent = currentTime;
      updateSeekbar((audio.currentTime / audio.duration) * 100);
    }
  });
};

export { handleLoadedData };

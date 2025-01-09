import {
  togglePlayPause,
  toggleNext,
  togglePrevious,
  toggleRepeat,
  toggleShuffle,
} from "./PlayMusic.js";
import { loadMoreSongs } from "./LoadMoreSong.js";
import "./scroll-behavior.js";

console.log("lets write java script");

async function main() {
  await loadMoreSongs();

  const songPlaylist = document.querySelector(".song-playlist");
  songPlaylist.addEventListener("scroll", () => {
    if (
      songPlaylist.scrollTop + songPlaylist.clientHeight >=
      songPlaylist.scrollHeight - 0
    ) {
      loadMoreSongs();
    }
  });
  const playBarPlayButtonElement = document.querySelector(".play-pause");

  playBarPlayButtonElement.addEventListener("click", () => {
    togglePlayPause(playBarPlayButtonElement);
  });

  const playBarNextButtonElement = document.querySelector(".next");
  playBarNextButtonElement.addEventListener("click", () => {
    console.log("next");
    toggleNext();
  });

  const playBarPreviousButtonElement = document.querySelector(".previous");
  playBarPreviousButtonElement.addEventListener("click", () => {
    console.log("previous");
    togglePrevious();
  });

  const playBarRepeatButtonElement = document.querySelector(".repeat");
  playBarRepeatButtonElement.addEventListener("click", () => {
    console.log("repeat");
    toggleRepeat(playBarRepeatButtonElement);
  });

  const playBarShuffleButtonElement = document.querySelector(".shuffle");
  playBarShuffleButtonElement.addEventListener("click", () => {
    console.log("shuffle");
    toggleShuffle(playBarShuffleButtonElement);
  });
}

main();

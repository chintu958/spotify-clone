import { handleLoadedData } from "./Seekbar.js";
import { attachEventListeners } from "./LoadMoreSong.js";
import { getSongDetails } from "./GetSongs.js";

let currentAudio = null;
let currentTrack = null;
let currentPlayingElement = null;
let currentAudioCurrentTime = 0;
let shuffledPlaylist = [];
let playlist = [];
let currentIndex = 0;
let isRepeating = false;
let isShuffling = false;

async function playMusic(track, element, index) {
  const startTimeElement = document.querySelector(".start");
  const endTimeElement = document.querySelector(".end");
  const playBarPlayButtonElement = document.querySelector(".play-pause");

  console.log(`Playing music: ${track}, Element: ${element}, Index: ${index}`);

  const songDetails = await getSongDetails(track);
  if (!songDetails || !songDetails.filePath) {
    console.error("Invalid song details or filePath not found");
    return;
  }

  if (currentAudio) {
    if (currentTrack === track) {
      if (currentAudio.paused) {
        currentAudioCurrentTime = currentAudio.currentTime;
        currentAudio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        console.log("CurrentAudio is Paused, trying to play again");
        element.querySelector(".play-now img").src = "/pause.svg";
        playBarPlayButtonElement.src = "/pause-white.svg";
        handleLoadedData(currentAudio, startTimeElement, endTimeElement);
      } else {
        currentAudioCurrentTime = currentAudio.currentTime;
        currentAudio.pause();
        element.querySelector(".play-now img").src = "/play-green.svg";
        playBarPlayButtonElement.src = "/play-white.svg";
        console.log("CurrentAudio is Paused");
      }

      return;
    } else {
      console.log("CurrentAudio is not there");

      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentPlayingElement) {
        currentPlayingElement.querySelector(".play-now img").src =
          "/play-green.svg";
        playBarPlayButtonElement.src = "/play-white.svg";
      }
    }
  }

  console.log("Before 1: ", songDetails);

  currentAudio = new Audio(songDetails.filePath);
  currentAudio.loop = isRepeating;
  currentAudio.addEventListener("canplaythrough", () => {
    currentAudio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  });
  currentTrack = track;
  currentPlayingElement = element;
  currentIndex = index;
  element.querySelector(".play-now img").src = "/pause.svg";
  playBarPlayButtonElement.src = "/pause-white.svg";

  console.log("CurrentAudio is playing");

  handleLoadedData(currentAudio, startTimeElement, endTimeElement);
}

const togglePlayPause = (playBarPlayButtonElement) => {
  const songCardElement =
    document.querySelector(".song-card") != null
      ? document.querySelector(".song-card")
      : null;
  if (currentAudio && songCardElement != null) {
    let libraryListElementAffectedByPlayBarButtonClick = null;

    libraryListElementAffectedByPlayBarButtonClick = document
      .getElementsByClassName(
        songCardElement.getElementsByTagName("div").item(1).title
      )
      .item(0);

    if (currentAudio.paused) {
      currentAudio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      libraryListElementAffectedByPlayBarButtonClick.src = "/pause.svg";
      playBarPlayButtonElement.src = "/pause-white.svg";
    } else {
      currentAudio.pause();
      libraryListElementAffectedByPlayBarButtonClick.src = "/play-green.svg";
      playBarPlayButtonElement.src = "/play-white.svg";
    }
  }
};

const toggleNext = () => {
  const currentPlaylist = isShuffling ? shuffledPlaylist : playlist;
  if (currentIndex < currentPlaylist.length) {
    currentIndex++;
    console.log("Current Index: ", currentIndex);

    const nextTrack = currentPlaylist[currentIndex - 1];
    console.log("FilePath Next: ", nextTrack.songId);
    let playBarSongCard = document.querySelector(".song-card");

    playBarSongCard.innerHTML = nextTrack.element.innerHTML;
    let playNowChildElement = playBarSongCard.querySelector(".play-now");
    if (playNowChildElement) {
      playBarSongCard.removeChild(playNowChildElement);
    }
    const nextElement = document.querySelector(
      `[data-index="${currentIndex}"]`
    );
    playMusic(nextTrack.songId, nextElement, currentIndex);
  }
};

const togglePrevious = () => {
  const currentPlaylist = isShuffling ? shuffledPlaylist : playlist;
  if (currentIndex > 1) {
    currentIndex--;
    const prevTrack = currentPlaylist[currentIndex - 1];

    let playBarSongCard = document.querySelector(".song-card");

    playBarSongCard.innerHTML = prevTrack.element.innerHTML;
    let playNowChildElement = playBarSongCard.querySelector(".play-now");
    if (playNowChildElement) {
      playBarSongCard.removeChild(playNowChildElement);
    }

    const previousElement = document.querySelector(
      `[data-index="${currentIndex}"]`
    );
    playMusic(prevTrack.songId, previousElement, currentIndex);
  }
};

const toggleRepeat = (playBarRepeatButtonElement) => {
  if (currentAudio) {
    currentAudio.loop = !currentAudio.loop;
    isRepeating = currentAudio.loop;
    if (isRepeating) {
      playBarRepeatButtonElement.src = "/repeat-multiple.svg";
    } else {
      playBarRepeatButtonElement.src = "/repeat.svg";
    }
  }
};

const shufflePlaylist = () => {
  shuffledPlaylist = [...playlist];
  console.log(
    "Shuffled Playlist before: ",
    shuffledPlaylist,
    "currentIndex: ",
    currentIndex
  );
  for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    console.log("Swapping: ", i, j);

    [shuffledPlaylist[i], shuffledPlaylist[j]] = [
      shuffledPlaylist[j],
      shuffledPlaylist[i],
    ];
  }

  console.log(
    "Shuffled Playlist after: ",
    shuffledPlaylist,
    "currentIndex: ",
    currentIndex
  );

  const songUnorderedList = document.querySelector(".song-playlist ul");
  songUnorderedList.innerHTML = "";
  shuffledPlaylist.forEach((track, index_music) => {
    track.element.setAttribute("data-index", index_music + 1);
    songUnorderedList.appendChild(track.element);
  });
  attachEventListeners();
};

const toggleShuffle = (playBarShuffleButtonElement) => {
  if (currentAudio) {
    isShuffling = !isShuffling;

    if (isShuffling) {
      shufflePlaylist();
      playBarShuffleButtonElement.src = "/shuffle-on.svg";
    } else {
      playBarShuffleButtonElement.src = "/shuffle.svg";
    }
  }
};

const setPlaylist = (newPlaylist) => {
  playlist = newPlaylist;
  if (isShuffling) {
    shufflePlaylist();
  }
};

export {
  playMusic,
  togglePlayPause,
  setPlaylist,
  toggleNext,
  togglePrevious,
  toggleRepeat,
  toggleShuffle,
};

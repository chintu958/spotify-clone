import { getSongs } from "./GetSongs.js";
import { playMusic, setPlaylist } from "./PlayMusic.js";

let offset = 1;
const limit = 15;
let isLoading = false;
let playList = [];
let countMusic = 1;

const loadMoreSongs = async () => {
  if (isLoading) return;
  isLoading = true;

  let songs = await getSongs(offset, limit);
  let songUnorderedList = document
    .querySelector(".song-playlist")
    .getElementsByTagName("ul")[0];

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    let songIcon =
      song.imageIcon == null
        ? "/song-metadata/music.svg"
        : song.imageIcon + ".jpg";
    songUnorderedList.innerHTML += `
      <li class="song m-1" data-index="${countMusic++}">
        <img class="image-size-small" src="${songIcon}" alt="" />
        <div class="info">
          <div title="${song.id}">
            ${song.title
              .replace("- Songspk.LINK", "")
              .replace("- Songspk.LIVE", "")
              .replace("- www.Songs.PK", "")
              .replace("- Songspk.SITE", "")}
          </div>
          <div>${song.artist}</div>
        </div>
        <div class="play-now">
          <img class="${song.id}" src="/play-green.svg" alt="" />
        </div>
      </li>`;

    playList.push({
      songId: song.id,
      element: songUnorderedList.lastElementChild,
    });
  }

  songUnorderedList.firstElementChild.remove();

  setPlaylist(playList);
  attachEventListeners();

  offset++;
  isLoading = false;
};

function attachEventListeners() {
  Array.from(
    document.querySelector(".song-playlist").getElementsByTagName("li")
  ).forEach((e, index) => {
    e.addEventListener("click", () => {
      const track = e.querySelector(".info").firstElementChild.title;
      playMusic(track, e, index + 1);

      const playBarSongCard = document.querySelector(".song-card");
      playBarSongCard.innerHTML = `<img class="image-size-small" src="${
        e.querySelector(".image-size-small").src
      }" alt="" />
    <div class="info">
      <div title="${e.querySelector(".info").firstElementChild.title}">
        ${e
          .querySelector(".info")
          .firstElementChild.innerHTML.replace("- Songspk.LINK", "")
          .replace("- Songspk.LIVE", "")
          .replace("- www.Songs.PK", "")
          .replace("- Songspk.SITE", "")}
      </div>
      <div>${e.querySelector(".info").lastElementChild.innerHTML}</div>
    </div>`;
    });
  });
}

export { loadMoreSongs, attachEventListeners };

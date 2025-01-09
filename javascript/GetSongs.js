import MediaModel from "./MusicModel.js";

async function getSongs(offset, limit) {
  try {
    let response = await fetch("http://localhost:8081/spotify/music/songs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        limit: limit,
        offset: offset,
      },
    });

    let data = await response.json();

    let songs = data.map(
      (song) =>
        new MediaModel(
          song.title,
          song.id,
          song.album,
          song.artist,
          song.duration,
          song.filePath,
          song.imageIcon
        )
    );

    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

async function getSongDetails(songId) {
  try {
    let response = await fetch(
      "http://localhost:8081/spotify/music/song/" + songId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await response.json();

    let songs = new MediaModel(
      data.title,
      data.id,
      data.album,
      data.artist,
      data.duration,
      data.filePath,
      data.imageIcon
    );

    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

export { getSongs, getSongDetails };

class MediaModel {
  constructor(title, id, album, artist, duration, filePath, imageIcon) {
    this.title = title;
    this.id = id;
    this.album = album;
    this.artist = artist;
    this.duration = duration;
    this.filePath = filePath;
    this.imageIcon = imageIcon;
  }

  // Getter for all data
  getData() {
    return {
      title: this.title,
      id: this.id,
      album: this.album,
      artist: this.artist,
      duration: this.duration,
      filePath: this.filePath,
      imageIcon: this.imageIcon,
    };
  }

  // Setter for all data
  setData({ title, id, album, artist, duration, filePath, imageIcon }) {
    this.title = title;
    this.id = id;
    this.album = album;
    this.artist = artist;
    this.duration = duration;
    this.filePath = filePath;
    this.imageIcon = imageIcon;
  }

  // Update a specific property in the model
  //   updateProperty(key, value) {
  //     if (this.hasOwnProperty(key)) {
  //       this[key] = value;
  //     } else {
  //       console.log(`Property ${key} does not exist in the model.`);
  //     }
  //   }

  // Print the current state of the model
  print() {
    console.log(
      `Title: ${this.title}, ID: ${this.id}, Album: ${this.album}, Artist: ${this.artist}, Duration: ${this.duration}, Filepath: ${this.filePath}`
    );
  }
}

export default MediaModel;

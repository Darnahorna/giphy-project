import GiphyAPI from "./GiphyAPI.js";
import GiphyView from "./GiphyView.js";
//import LoadingView from "./LoadingView.js";
//import WatchingView from "./WatchingView.js";

export default class App {
  constructor(root) {
    this.gifs = [];
    this.selectedGIF = null;
    //this.watchingView = new WatchingView(root, this._handlers());
    this.giphyView = new GiphyView(root, this._handlers());
    // this.loadingView = new LoadingView(root);
    this._getRandomImg();
    //this._getRandomImg();
  }

  async _getRandomImg() {
    const search = await GiphyAPI.getRandomGifTitle();
    this._refreshGifs(search);
  }

  async _refreshGifs(search) {
    const gifs = await GiphyAPI.getGIFs(search);
    console.log(gifs);
    this._setGifs(gifs);
  }
  // _getRandomGifs() {
  //   // const gifs = GiphyAPI.getRandomGif();
  //   // this._setGifs(gifs);
  // }

  // _setActiveNote(note) {
  //   this.activeNote = note;
  //   this.view.updateActiveNote(note); //update text in form
  // }

  _setGifs(gifs) {
    this.gifs = gifs;
    this.giphyView.updateGIFList(gifs);
  }

  _handlers() {
    return {
      // onGifClose: (noteId) => {
      //   NotesAPI.deleteNote(noteId);
      //   this._refreshActiveNotes();
      //   this._refreshStats();
      // },
      // onGifSelect: (noteId) => {
      //   NotesAPI.archiveNote(noteId);
      //   this._refreshActiveNotes();
      //   this._refreshArchiveNotes();
      //   this._refreshStats();
      // },
      onRefresh: () => {
        this._getRandomImg();
      },
    };
  }
}

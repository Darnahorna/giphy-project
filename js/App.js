import GiphyAPI from "./GiphyAPI.js";
import GiphyView from "./GiphyView.js";
import { getPortion, findElementById, getFirst, getLast } from "./helpers.js";

export default class App {
  constructor(root) {
    this.isLoading = false;
    this.giphyView = new GiphyView(root, this._handlers());
    this.gifs = [];
    this.offset = 0;
    this.randomSearch = null;
    this._refreshGifs();
  }

  async _refreshGifs() {
    this.giphyView.showLoader(true);
    const searchTerms = [
      "love",
      "peace",
      "freedom",
      "sun",
      "rain",
      "mood",
      "flower",
      "cat",
      "dog",
      "happy",
      "sad",
      "angry",
      "funny",
      "cute",
    ];
    const randomIndex = Math.floor(Math.random() * searchTerms.length);
    const search = searchTerms[randomIndex];
    console.log(search);
    this._setRandomSearch(search);

    const gifs = await GiphyAPI.getGiphyResponse(this.randomSearch);
    this.giphyView.showLoader(false);

    this._updateOffset(gifs);
    this._setGifs(gifs.data);
  }

  async _updateOffset(response) {
    const offset = response.pagination.offset;
    const count = response.pagination.count;
    this._setOffset(offset + count);
  }

  async _refreshSearch() {
    this._setOffset(0);
    this._refreshGifs();
  }

  _setGifs(gifs) {
    this.gifs = gifs;
    this.giphyView.updateGIFList(gifs);
  }

  _setOffset(offset) {
    this.offset = offset;
  }

  async _setRandomSearch(search) {
    this.randomSearch = search;
  }

  async _setMoreGifs() {
    const newGifs = await GiphyAPI.getGiphyResponse(
      this.randomSearch,
      this.offset
    );
    this._updateOffset(newGifs);
    const currentGifs = [...this.gifs, ...newGifs.data];
    this._setGifs(currentGifs);
  }

  _selectGifById(gifId) {
    const gifById = findElementById(this.gifs, gifId);
    const portion = getPortion(this.gifs, gifById.id);
    const last = getFirst(this.gifs);
    const first = getLast(this.gifs);

    if (portion.prev === undefined) {
      portion.prev = last;
    }
    if (portion.next === undefined) {
      portion.next = first;
    }
    this._setSelectedPortion(portion);
  }

  _setSelectedPortion(portion) {
    this.giphyView.updateSelectedGif(
      portion.cur,
      portion.prev,
      portion.next,
      this.gifs
    );
  }

  _handlers() {
    return {
      onRefresh: () => {
        this._refreshSearch();
      },
      onLoadMore: () => {
        this._setMoreGifs();
      },
      onGifSelect: (gifId) => {
        this._selectGifById(gifId);
        this.giphyView.showResults(false);
        this.giphyView.showView(true);
      },
      onClose: () => {
        this.giphyView.showResults(true);
        this.giphyView.showView(false);
      },
      onPrev: (gifId) => {
        this._selectGifById(gifId);
      },
      onNext: (gifId) => {
        this._selectGifById(gifId);
      },
    };
  }
}

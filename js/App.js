import GiphyAPI from "./GiphyAPI.js";
import GiphyView from "./GiphyView.js";
import { getPortion, findElementById } from "./helpers.js";

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
    const search = await GiphyAPI.getRandomGifTitle();
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
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    const newGifs = await GiphyAPI.getGiphyResponse(
      this.randomSearch,
      this.offset
    );
    this._updateOffset(newGifs);
    const currentGifs = [...this.gifs, ...newGifs.data];
    this._setGifs(currentGifs);
    this.isLoading = false;
  }

  _selectGifById(gifId) {
    const gifById = findElementById(this.gifs, gifId);
    const portion = getPortion(this.gifs, gifById.id);
    this._setSelectedPortion(portion);
  }

  _setSelectedPortion(portion) {
    this.giphyView.updateSelectedGif(
      portion.cur,
      portion.previous,
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

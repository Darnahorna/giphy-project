export default class GiphyView {
  constructor(
    root,
    { onGifSelect, onRefresh, onClose, onPrev, onNext, onLoadMore } = {}
  ) {
    this.root = root;
    this.onGifSelect = onGifSelect;
    this.onRefresh = onRefresh;
    this.onClose = onClose;
    this.onPrev = onPrev;
    this.onNext = onNext;
    this.onLoadMore = onLoadMore;

    this.root.innerHTML = `
    <nav class="navbar fixed-top bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          ><img src="images/cdon-logotype.svg" alt="logo" title="logo"
        /></a>
        <div class="navbar-nav">
          <a class="nav-link active refresh-search" href=""
            ><img src="images/refresh.svg" alt="refresh" title="refresh"
          /></a>
        </div>
      </div>
    </nav>

    <section class="loader-block">
      <div class="flex-parent">
        <img
          src="images/loading.svg"
          class="loader"
          alt="loader"
          title="loader"
        />
      </div>
    </section>

    <!--MAIN_VIEW-->
    <section class="search">
      <div class="container">
        <div class="result">
          <div class="grid desk"></div>
        </div>
      </div>
    </section>

    <div class="view"></div>
    `;

    const refreshSearch = this.root.querySelector(".refresh-search");

    refreshSearch.addEventListener("click", () => {
      this.onRefresh();
    });

    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        this.onLoadMore();
      }
    });
  }

  _createListItemHTML(id, url, title) {
    return `<div class="photo-item flow" data-gif-id="${id}">
            <a href="" target="_blanket" title="Original in a new tab" class="photo-url">
              <img
                src='${url}'
                alt='${title}'
                title='${title}'
                class="img-fluid shadow-1-light rounded mb-3"
              />
            </a>
          </div>
          `;
  }

  updateGIFList(gifs) {
    const gifsListContainer = this.root.querySelector(".grid");

    gifsListContainer.innerHTML = "";

    for (const gif of gifs) {
      const html = this._createListItemHTML(
        gif.id,
        gif.images.original.url,
        gif.title
      );

      gifsListContainer.insertAdjacentHTML("beforeend", html);
    }

    gifsListContainer.querySelectorAll(".photo-item").forEach((gifItem) => {
      gifItem.addEventListener("click", (event) => {
        event.preventDefault();
        this.onGifSelect(gifItem.dataset.gifId);
      });
    });
  }

  _createViewItemHTML(cur, prev, next) {
    return `
    <section class="photo-view">
      <div class="photo-wrapper">
        <div class="main-photo" >
          <img src="${cur.images.original.url}" title = "${cur.title}" alt = "${cur.title}" class="big-photo" />
        </div>
      </div>
      <div class="bottom-section">
        <div class="previous-photo controller" data-prev-id="${prev.id}">
          <img src="${prev.images.original.url}" title = "${prev.title}" alt = "${prev.title}" class="small-photo" />
        </div>
        <div class="close-photo">
          <img src="images/close.svg" alt="close" title="close" class="close-img" />
        </div>
        <div class="next-photo controller"  data-next-id="${next.id}">
          <img src="${next.images.original.url}" title = "${next.title}" alt = "${next.title}" class="small-photo" />
        </div>
      </div>
    </section>
        `;
  }

  updateSelectedGif(cur, prev, next, gifs) {
    const gifGallery = this.root.querySelector(".view");

    gifGallery.innerHTML = ``;

    const html = this._createViewItemHTML(cur, prev, next);

    gifGallery.insertAdjacentHTML("beforeend", html);

    const gallery = gifGallery.querySelector(".photo-view");

    const prevBtn = gallery.querySelector(".previous-photo");
    prevBtn.addEventListener("click", () => {
      this.onPrev(prevBtn.dataset.prevId, gifs);
    });

    const nextBtn = gallery.querySelector(".next-photo");
    nextBtn.addEventListener("click", () => {
      this.onNext(nextBtn.dataset.nextId, gifs);
    });

    const close = gallery.querySelector(".close-photo");
    close.addEventListener("click", (event) => {
      event.preventDefault();
      this.onClose();
    });
  }

  showLoader(isNeeded) {
    if (isNeeded) {
      this.root.querySelector(".flex-parent").classList.add("d-flex");
      this.root.querySelector(".flex-parent").classList.remove("d-none");
    } else {
      this.root.querySelector(".flex-parent").classList.add("d-none");
      this.root.querySelector(".flex-parent").classList.remove("d-flex");
    }
  }
  showResults(isNeeded) {
    if (isNeeded) {
      this.root.querySelector(".result").classList.add("d-block");
      this.root.querySelector(".result").classList.remove("d-none");
    } else {
      this.root.querySelector(".result").classList.add("d-none");
      this.root.querySelector(".result").classList.remove("d-block");
    }
  }
  showView(isNeeded) {
    if (isNeeded) {
      this.root.querySelector(".view").classList.add("d-block");
      this.root.querySelector(".view").classList.remove("d-none");
    } else {
      this.root.querySelector(".view").classList.add("d-none");
      this.root.querySelector(".view").classList.remove("d-block");
    }
  }
}

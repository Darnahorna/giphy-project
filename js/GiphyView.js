export default class GiphyView {
  //class for rendering data
  constructor(root, { onGifSelect, onRefresh } = {}) {
    //initialization of all functions
    this.root = root;
    this.onGifSelect = onGifSelect;
    this.onRefresh = onRefresh;

    this.root.innerHTML = `
    <nav class="navbar fixed-top bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          ><img src="images/cdon-logotype.svg" alt="logo" title="logo"
        /></a>
        <div class="navbar-nav">
          <a class="nav-link active refresh-search" href="#"
            ><img src="images/refresh.svg" alt="refresh"
          /></a>
        </div>
      </div>
    </nav>

    <div class="container">
      <section class="search">
        <div class="grid desk">
          
        </div>
      </section>
    </div>
    `;

    const refreshSearch = this.root.querySelector(".refresh-search");

    refreshSearch.addEventListener("click", () => {
      this.onRefresh();
    });
  }

  _createListItemHTML(id, url, title) {
    return `<div class="photo-item flow" key='${id}'>
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

    // gifsListContainer.querySelectorAll(".photo-item").forEach((gifListItem) => {
    //   const photoBtn = gifListItem.querySelector(".photo-url");
    //   photoBtn.addEventListener("click", () => {
    //     const doOpen = confirm("Are you sure you want to open this item?");

    //     if (doOpen) {
    //       this.onGifSelect(parseInt(gifListItem.dataset.noteId));
    //     }
    //   });
    // });
  }
}

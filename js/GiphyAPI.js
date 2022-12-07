import { API_KEY } from "./../API_KEY.js";

export default class GiphyAPI {
  static async getRandomGifTitle() {
    let apiUrl = `https://random-words-api.vercel.app/word/noun`;
    const response = await axios.get(apiUrl);
    return response.data[0].word;
  }

  static async getGiphyResponse(search, offset = 0) {
    let apiUrl = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${search}&limit=20&offset=${offset}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }
}

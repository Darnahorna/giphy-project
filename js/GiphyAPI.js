import { API_KEY } from "./../API_KEY.js";

export default class GiphyAPI {
  static async getGiphyResponse(search, offset = 0) {
    let apiUrl = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${search}&limit=20&offset=${offset}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }
}

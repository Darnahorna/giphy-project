import { API_KEY } from "../API_KEY";

export default class GiphyAPI {
  static async getRandomGifTitle() {
    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
    const response = await axios.get(apiUrl);
    return response.data.data.title;
  }

  static getGifById() {}

  static refreshPage() {}

  static async getGIFs(search) {
    let apiUrl = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${search}&limit=20`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
}

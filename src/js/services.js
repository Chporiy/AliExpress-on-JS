export default class aliExpressServices {
  constructor() {

  }

  async loadContent(url) {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  }
}
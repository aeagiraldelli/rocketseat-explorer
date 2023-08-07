export class BgManager {
  backgrounds = {};
  add(routename, bglink) {
    this.backgrounds[routename] = bglink;
  }

  handle(routename) {
    document.body.style.backgroundImage = `url(${this.backgrounds[routename]})`;
  }
}

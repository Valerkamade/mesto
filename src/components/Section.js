export default class Section {
  constructor({renderer, containerSelector}) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод добавления контента
  addItem(element) {
    this._container.append(element);
  }

  // Метод отрисовки контента
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
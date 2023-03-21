export default class Section {
  constructor({renderer, containerSelector}) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод добавления контента
  addItem(element) {
    this._container.append(element);
  }

   // Метод добавления контента
   prependItem(element) {
    this._container.prepend(element);
  }

  // Метод отрисовки контента
  renderItems(items, user) {
    items.forEach(item => {
      this._renderer(item, user);
    });
  }
}
export default class Section {
  constructor({renderer, containerSelector}) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод добавления контента на странице в конец
  addItem(element) {
    this._container.append(element);
  }

   // Метод добавления контента на странице в начало
   prependItem(element) {
    this._container.prepend(element);
  }

  // Метод отрисовки контента
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
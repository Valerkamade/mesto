// Экспорт по умолчанию класса создания карточки
export default class Card {
  constructor(data, templateSelector, handleOpenPhotoPopup) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._handleOpenPhotoPopup = handleOpenPhotoPopup;
  }

  // Метод получения шаблона
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  // Метод генерации карточки
  generateCard() {
    // Находим карточку и все ее необходимые элементы
    this._element = this._getTemplate();
    this._photo = this._element.querySelector('.gallery__photo');
    this._title = this._element.querySelector('.gallery__title');
    this._buttonLike = this._element.querySelector('.gallery__button-like');
    this._buttonTrash = this._element.querySelector('.gallery__button-trash');

    // Вносим данные в генерируемую карточку
    this._photo.src = this._link;
    this._title.textContent = this._name;
    this._photo.alt = this._alt;

    // Устанавливаем слушатель
    this._setEventListener();

    return this._element;
  }

  // Обработчик клика по кнопке лайк
  _handleToggleLike() {
    this._buttonLike.classList.toggle('gallery__button-like_active');
  }

// Обработчик клика по кнопке корзина
  _handleDeleteCard() {
    this._element.remove();
  }

  // Метод добавления слушателей
  _setEventListener() {
    this._buttonLike.addEventListener('click', () => {
      this._handleToggleLike();
    });

    this._buttonTrash.addEventListener('click', () => {
      this._handleDeleteCard();
    })

    this._photo.addEventListener('click', () => {
      this._handleOpenPhotoPopup({
            link: this._link,
            name: this._name,
            alt: this._alt,
          });
    })
  };
}

// Экспорт по умолчанию класса создания карточки
export default class Card {
  constructor({ data, templateSelector, handleCardLikeClick, handelCardTrashClick, user }) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._idCard = data._id;
    // this._idUserCard = data.owner._id;
    this._likesCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardLikeClick = handleCardLikeClick;
    this._handelCardTrashClick = handelCardTrashClick;
    this._userId = user._id;
    // console.log(this._idCard);
    // console.log(this._idUser);
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
    this._counterLikes = this._element.querySelector('.gallery__likes-count');
    this._buttonTrash = this._element.querySelector('.gallery__button-trash');
    this._idCard = this._element.querySelector('.gallery__item-id');

    // Вносим данные в генерируемую карточку
    this._photo.src = this._link;
    this._title.textContent = this._name;
    this._photo.alt = this._alt;
    this._counterLikes.textContent = this._likesCounter;
    this._idCard = '';

    if (this._idCard === this._userId) {
      this._buttonTrash.classList.add('gallery__button-trash_active');
    }
    // console.log(this._userId)
    // Устанавливаем слушатель
    this._setEventListeners();

    return this._element;
  }

  // Обработчик клика по кнопке лайк
  _handleToggleLike() {
    this._buttonLike.classList.toggle('gallery__button-like_active');
    const count = this._counterLikes.textContent;
    this._buttonLike.classList.contains('gallery__button-like_active')
      ? this._counterLikes.textContent = Number(count) + 1
      : this._counterLikes.textContent = Number(count) - 1;
  }

  // Метод добавления слушателей
  _setEventListeners() {
    
    this._buttonLike.addEventListener('click', () => {
      this._handleToggleLike();
    });

    this._buttonTrash.addEventListener('click', (evt) => {
      console.log(evt);
      this._handelCardTrashClick(evt);
    })

    this._photo.addEventListener('click', () => {
      this._handleCardLikeClick();
    })
  };
}

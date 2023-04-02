// Экспорт по умолчанию класса создания карточки
export default class Card {
  constructor(
    {
      data,
      userId,
      templateSelector,
      handleCardClick,
      handelCardTrashClick,
      handleToggleLike
    }) {
    this.dataLikes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this.idCard = data._id;
    this._idUserCard = data.owner._id;
    this._likesCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handelCardTrashClick = handelCardTrashClick;
    this._handleToggleLike = handleToggleLike;
    this._userId = userId;
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

    // Вносим данные в генерируемую карточку
    this._photo.src = this._link;
    this._title.textContent = this._name;
    this._photo.alt = this._alt;
    this._counterLikes.textContent = this._likesCounter;

    // Проверка пользователем ли добавлена карточка для активации кнопки удаления
    if (this._idUserCard !== this._userId) {
      this._buttonTrash.remove();
    }

    // Установка активного лайка по данным с сервера 
    if (this.isLiked(this.dataLikes)) {
      this._buttonLike.classList.add('gallery__button-like_active');
    }

    // Устанавливаем слушатель
    this._setEventListeners();

    return this._element;
  }

  // Метод проверки наличия лайка пользователя на крточке
  isLiked(likes) {
    return likes.some((like) => {
      return like._id === this._userId;
    })
  }

  // Переключатель лайка
  toggleLike({ likes }) {
    this._buttonLike.classList.toggle('gallery__button-like_active');
    this._counterLikes.textContent = likes.length;
    // this.dataLikes = likes;
  }

  // Метод удаления карточки
  deletCard() {
    this._element.remove();
    this._element = null;
  }

  // Метод добавления слушателей
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleToggleLike(this);
    });

    this._buttonTrash.addEventListener('click', () => {
      this._handelCardTrashClick();
    })

    this._photo.addEventListener('click', () => {
      this._handleCardClick();
    })

    this._photo.onerror = () => {
      this._photo.src = 'https://i.postimg.cc/pdZyYzXq/img-01.png';
    }
  };

}

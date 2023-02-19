import {openPhotoPopup} from './index.js'

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector('.gallery__photo').src = this._link;
    this._element.querySelector('.gallery__title').textContent = this._title;
    this._element.querySelector('.gallery__photo').alt = this._alt;

    return this._element;
  }

  _hendelToggleLike() {
    this._element.querySelector('.gallery__button-like').classList.toggle('gallery__button-like_active');
  }

  _hendelDeleteCard() {
    this._element.remove();
  }

  _hendelOpenPhotoPopup() {
    openPhotoPopup({
      link: this._link,
      name: this._title,
      alt: this._alt,
    });
  }

  _setEventListener() {
    this._element.querySelector('.gallery__button-like').addEventListener('click', () => {
      this._hendelToggleLike();
    });

    this._element.querySelector('.gallery__button-trash').addEventListener('click', () => {
      this._hendelDeleteCard();
    })

    this._element.querySelector('.gallery__photo').addEventListener('click', () => {
      this._hendelOpenPhotoPopup();
    })
  };
}

export { Card };

// Функция открытия попапа картинки с подтягиванием нужных параметров
const setOpenPhotoPopupEventListener = (photo) => {
  photo.addEventListener('click', (evt) => {
    openPopup(popupPhoto);
    elementPopupTitle.textContent =
      evt.target.closest('.gallery__item').textContent;
    elementPopupPhoto.src = photo.src;
    elementPopupPhoto.alt = photo.alt;
  });
};

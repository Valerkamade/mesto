import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__photo');
    this._title = this._popupElement.querySelector('.popup__title');
  }

  // Метод открытия попапа с вставкой данных
  open(photo) {
    this._image.src = photo.link;
    this._image.alt = photo.alt;
    this._title.textContent = photo.name;
    super.open();
  }
}
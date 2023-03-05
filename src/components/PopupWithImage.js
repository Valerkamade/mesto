import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, photo) {
    super(popupSelector);
    this._name = photo.name;
    this._link = photo.link;
    this._alt = photo.alt;
    this._image = this._popupElement.querySelector('.popup__photo');
    this._title = this._popupElement.querySelector('.popup__title');
  }

  open() {
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._title.textContent = this._name;
    super.open();
  }
}
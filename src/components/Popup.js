export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._buttonClose = this._popupElement.querySelector('.popup__button-close');
  }

  _handleEscClose(evt) {
    if (evt.key === ('Escape' || 'Esc')) {
      this.close(this._popupElement);
    };
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close(this._popupElement);
    }
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close(this._popupElement);
    });

    this._popupElement.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }
}
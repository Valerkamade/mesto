export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._buttonClose = this._popupElement.querySelector('.popup__button-close');
  }

  // Метод закрытия попапа по Escape
  _handleEscClose(evt) {
    if (evt.key === ('Escape' || 'Esc')) {
      this.close(this._popupElement);
    };
  }

  // Метод закрытия попапа по оверлею
  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close(this._popupElement);
    }
  }

  // Метод открытия попапа с навешиванием слушателя закрытия по Escape
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод закрытия попапа со снятием слушателя закрытия по Escape
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Метод установки слушателей
  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close(this._popupElement);
    });

    this._popupElement.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }
}
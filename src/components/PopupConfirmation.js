import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popupElement.querySelector('.popup__button-save');
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._submitCallback();
      this.close();
    });
  }

  getElement() {
    return this._element;
  }

  setElement(element) {
    this._element = element;
  }
}
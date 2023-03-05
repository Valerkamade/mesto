import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this._formSubmit = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();

    this._formSubmit.addEventListener('submit', this.submitCallback);
  }
  close() {
    super.close();
    this._formSubmit.reset();
  }
}
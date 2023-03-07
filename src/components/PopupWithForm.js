import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formSubmit = this._popupElement.querySelector('form');
    this._inputList = Array.from(this._formSubmit.querySelectorAll('input'));
    this._inputsValues = {};
  }

  // Метод сбора данных инпутов формы
  _getInputValues() {
    this._inputList.forEach((inputElement) => {
      const inputName = inputElement.getAttribute('name')
      this._inputsValues[inputName] = inputElement.value;
    });
    return this._inputsValues;
  }

  // Метод установки слушателей 
  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  // Метод закрытия попапа со сбросом формы
  close() {
    super.close();
    this._formSubmit.reset();
  }
}
import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitCallback}) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formSubmit = this._popupElement.querySelector('form');
    this._inputList = Array.from(this._formSubmit.querySelectorAll('input'));
    this._inputsValues = {};
  }

  // Метод сбора данных инпутов формы
  _getInputValues() {
    this._inputList.forEach((inputElement) => {
      const inputName = inputElement['name'];
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

  setElement(element) {
    this._element = element;
  }

  getElement() {
    return this._element;
  }

  // Метод закрытия попапа со сбросом формы
  close() {
    super.close();
    this._formSubmit.reset();
  }

  // Метод заполнения инпутов формы переданными данными по ключу совпадающему с именем инпута
  fillInputs(data) {
    this._inputList.forEach((input) => {
      const inputName = input['name'];
      input.value = data[`${inputName}`];
    });
  }
}
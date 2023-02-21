export default class FormValidator {
  // Конструктор класса
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Метод получения спана конкретного инпута
  _getErrorElement(inputElement) {
    return this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
  }

  // Метод отображения ошибок ввода
  _showInputError(inputElement) {
    inputElement.classList.add(`${this._inputErrorClass}`); // Добавление класса ошибки инпуту
    this._getErrorElement(inputElement).textContent = inputElement.validationMessage; // Присвоение спану текста системной ошибки
    this._getErrorElement(inputElement).classList.add(`${this._errorClass}`); // Добавление класса ошибки спану
  };

  // Метод скрытия ошибок ввода
  _hideInputError(inputElement) {
    inputElement.classList.remove(`${this._inputErrorClass}`); // Снятие класса ошибки с инпута
    this._getErrorElement(inputElement).classList.remove(`${this._errorClass}`); // Снятие класса ошибки с спана
    this._getErrorElement(inputElement).textContent = ''; // Очищение текста спана
  };

  // Метод проверки валидности инпута
  _checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement)
      : this._hideInputError(inputElement);
  };

  // Метод проверки валидности всей формы
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Метод деактивации кнопки формы
  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // Метод активации кнопки формы
  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // Метод переключения кнопки из состояния disabled
  _toggleButtonState() {
    (this._hasInvalidInput())
      ? this._disableButton()
      : this._enableButton();
  }

  // Слушатель инпутов
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => { // Валидация в режиме реального рвемени
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
      this._toggleButtonState();
    });
  };

  // Метод очистки валидации после закрытия попапа
  clearValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // Метод запуска валидации
  enableValidation() {
    this._setEventListeners();
  }
}

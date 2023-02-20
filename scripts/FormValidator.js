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
  }

  // Метод получения спана конкретного инпута
  _getErrorElement(inputElement) {
    return this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
  }

   // Метод получения массива инпутов формы
  _getArryInputs() {
    return this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

   // Метод получения получения кнопки фоормы
  _getButtonSubmit() {
    return this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
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
    return this._getArryInputs().some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Метод деактивации кнопки формы
  _addDisabledButton() {
    this._getButtonSubmit().classList.add(this._inactiveButtonClass);
    this._getButtonSubmit().disabled = true;
  }

  // Метод активации кнопки формы
  _removeDisabledButton() {
    this._getButtonSubmit().classList.remove(this._inactiveButtonClass);
    this._getButtonSubmit().disabled = false;
  }

  // Метод переключения кнопки из состояния disabled
  _toggleButtonState(inputElement) {
    (this._hasInvalidInput(inputElement))
      ? this._addDisabledButton()
      : this._removeDisabledButton();
  }

  // Слушатель инпутов
  _setEventListeners() {
    this._getArryInputs().forEach((inputElement) => {
      inputElement.addEventListener('input', () => { // Валидация в режиме реального рвемени
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
      this._toggleButtonState(inputElement);
    });
  };

  // Метод очистки валидации после закрытия попапа
  clearValidation() {
    this._getArryInputs().forEach((inputElement) => {
      this._toggleButtonState(inputElement);
      this._hideInputError(inputElement);
    });
    
  }

  // Метод запуска валидации
  enableValidation() {
    this._setEventListeners();
  }
}

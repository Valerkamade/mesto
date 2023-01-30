const objectData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Отключение браузерной валидации форм при подключенном JS
const forms = document.querySelectorAll('.popup__form'); // Поиск всех форм на странице
forms.forEach((item) => {
  item.setAttribute('novalidate', '');
});

// Функция показывния ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(`${obj['inputErrorClass']}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${obj['errorClass']}`);
};

// Функция скрытия ошибки валидации
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(`${obj['inputErrorClass']}`);
  errorElement.classList.remove(`${obj['errorClass']}`);
  errorElement.textContent = '';
};

// Функция проверки правильности ввода
const checkInputValidity = (formElement, inputElement, obj) => {
  !inputElement.validity.valid ?
    showInputError(formElement, inputElement, inputElement.validationMessage, obj) :
    hideInputError(formElement, inputElement, obj);
};

// Функция проверки валидности инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция переключения кнопки из состояния disabled
const toggleButtonState = (inputList, buttonElement, obj) => {
  hasInvalidInput(inputList) ?
    buttonElement.classList.add(obj['inactiveButtonClass']) :
    buttonElement.classList.remove(obj['inactiveButtonClass']);
}

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj['inputSelector']));
  const buttonElement = formElement.querySelector(obj['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });

};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj['formSelector']));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};

enableValidation(objectData); 

const obj = {//не забыть убрать
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Отключение браузерной валидации форм при подключенном JS
const forms = document.querySelectorAll('.popup__form'); // Поиск всех форм на странице
forms.forEach((item) => {
  item.setAttribute('novalidate', '');
});

// Функция показывния ошибки валидации
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Функция скрытия ошибки валидации
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

// Функция проверки правильности ввода
const checkInputValidity = (formElement, inputElement) => {
  !inputElement.validity.valid ?
    showInputError(formElement, inputElement, inputElement.validationMessage) :
    hideInputError(formElement, inputElement);
};

// Функция проверки валидности инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция переключения кнопки из состояния disabled
const toggleButtonState = (inputList, buttonElement) => {
  hasInvalidInput(inputList) ?
    buttonElement.classList.add('popup__button-save_disabled') :
    buttonElement.classList.remove('popup__button-save_disabled')
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  forms.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(); 

console.log(obj['inputErrorClass']);
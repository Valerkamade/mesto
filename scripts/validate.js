// Отключение браузерной валидации форм при подключенном JS
const forms = document.querySelectorAll('.popup__form'); // Поиск всех форм на странице
forms.forEach((item) => {
  item.setAttribute('novalidate', '');
});

// Функция показывния ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(`${obj['inputErrorClass']}`); // Добавление класса ошибки инпуту
  errorElement.textContent = errorMessage; // Присвоение спану текста системной ошибки
  errorElement.classList.add(`${obj['errorClass']}`); // Добавление класса ошибки спану
};

// Функция скрытия ошибки валидации
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(`${obj['inputErrorClass']}`); // Снятие класса ошибки с инпута
  errorElement.classList.remove(`${obj['errorClass']}`); // Снятие класса ошибки с спана
  errorElement.textContent = ''; // Очищение текста спана
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

// Функция добавления неактивного класса и атрибута
const addDisabledButton = (buttonElement, obj) => {
  buttonElement.classList.add(obj['inactiveButtonClass']);
  buttonElement.setAttribute('disabled', '');
}

// Функция снятия неактивного класса и атрибута
const removeDisabledButton = (buttonElement, obj) => {
  buttonElement.classList.remove(obj['inactiveButtonClass']);
  buttonElement.removeAttribute('disabled', '');
}

// Функция переключения кнопки из состояния disabled
const toggleButtonState = (inputList, buttonElement, obj) => {
  (hasInvalidInput(inputList)) ?
    addDisabledButton(buttonElement, obj) :
    removeDisabledButton(buttonElement, obj);
}

// Слушатель инпутов во время ввода с предварительной проверкой валидации
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj['inputSelector']));
  const buttonElement = formElement.querySelector(obj['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement, obj); // Предварительная проверка кнопок
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => { // Валидация в режиме реального рвемени
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

// Функция валидации всех форм
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj['formSelector']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, obj);
  });
};

enableValidation(objectData); // Вызов валидации

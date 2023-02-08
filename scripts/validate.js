const {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
} = objectData;

// Функция показывния ошибки валидации
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(`${inputErrorClass}`); // Добавление класса ошибки инпуту
  errorElement.textContent = errorMessage; // Присвоение спану текста системной ошибки
  errorElement.classList.add(`${errorClass}`); // Добавление класса ошибки спану
};

// Функция скрытия ошибки валидации
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(`${inputErrorClass}`); // Снятие класса ошибки с инпута
  errorElement.classList.remove(`${errorClass}`); // Снятие класса ошибки с спана
  errorElement.textContent = ''; // Очищение текста спана
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

// Функция добавления неактивного класса и атрибута
const addDisabledButton = (buttonElement) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
}

// Функция снятия неактивного класса и атрибута
const removeDisabledButton = (buttonElement) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', '');
}

// Функция переключения кнопки из состояния disabled
const toggleButtonState = (inputList, buttonElement) => {
  (hasInvalidInput(inputList)) ?
    addDisabledButton(buttonElement) :
    removeDisabledButton(buttonElement);
}

// Слушатель инпутов во время ввода с предварительной проверкой валидации
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement); // Предварительная проверка кнопок
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => { // Валидация в режиме реального рвемени
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция валидации всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement);
  });
};

enableValidation(); // Вызов валидации

const popupProfile = document.querySelector('.popup_type_profile'); // Поиск попапа профиля
const popupCard = document.querySelector('.popup_type_place'); // Поиск поапа добавления карточки
const popupPhoto = document.querySelector('.popup_type_img'); // Поиск поапа просмотра картинки
const cardTemplate = document.querySelector('.card-template').content; //Поиск шаблона для генерации карточек

const formProfile = popupProfile.querySelector('.popup__form_type_profile'); // Поиск формы профиля
const formCard = popupCard.querySelector('.popup__form_type_place'); // Поиск формы добавления карточки
const elementPopupPhoto = popupPhoto.querySelector('.popup__photo'); // Поиск картинки попапа
const elementPopupTitle = popupPhoto.querySelector('.popup__title'); // Поиск заголовка поапа

const profileName = document.querySelector('.profile__name'); // Поиск данных имени
const profileJob = document.querySelector('.profile__job'); // Поиск данных работы

const titleInput = formCard.querySelector('.popup__input_type_title'); // Поиск поля формы title
const linkInput = formCard.querySelector('.popup__input_type_link'); // Поиск поля формы link
const inputName = formProfile.querySelector('.popup__input_type_name'); // Поиск поля формы имя попапа
const inputJob = formProfile.querySelector('.popup__input_type_job'); // Поиск поля формы работа попапа

const listGallery = document.querySelector('.gallery__list'); // Поиск списка, куда будут вставлятся карточки

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__button-close'); // Поиск всех кнопок закрытия в этих попапах
const buttonEdit = document.querySelector('.profile__button-edit'); // Поиск кнопки редактирования профиля
const buttonAdd = document.querySelector('.profile__button-add'); // Поиск кнопки добавления карточки

// Функция открытия попапа
const openPopup = (popupElement) => {

  popupElement.classList.add('popup_opened'); // Добавление класса открытия
  setPopupEventListener(popupElement);
};

// Функция закрытия поапа
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened'); // Удаление класса открытия
};

// Функция открытия попапа картинки с подтягиванием нужных параметров
const setOpenPhotoPopupEventListener = (photo) => {
  photo.addEventListener('click', (evt) => {
    const buttonClose = evt.target.closest('.popup__button-close')
    openPopup(popupPhoto, buttonClose);
    elementPopupTitle.textContent =
      evt.target.closest('.gallery__item').textContent;
    elementPopupPhoto.src = photo.src;
    elementPopupPhoto.alt = photo.alt;
  });
};

// Функция сохранения изменений в полях формы и в профиле с закрытием окна
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

// Функция лайка/диздайка карточек
const setToggleLikeEventListener = (element) => {
  element.addEventListener('click', (evt) => {
    evt.target.classList.toggle('gallery__button-like_active');
  });
};

// Функция удаления карточки
const setDeleteCardEventListener = (element) => {
  element.addEventListener('click', (evt) => {
    const listItem = evt.target.closest('.gallery__item'); // Выбрать карточку по нажатию на фото
    listItem.remove(); // Удалить карточку
  });
};

// Функция закрытия попапа по крестику без формы
const setClosePopupEventListener = (element) => {
  element.addEventListener('click', (evt) => {
    const popupItem = evt.target.closest('.popup');
    closePopup(popupItem);
  });
};

// Функция очистки ошибок и состояния кнопки отправки
const clearValidation = (popup, obj) => {
  const formElement = popup.querySelector('.popup__form');
  const inputElements = formElement.querySelectorAll('.popup__input');
  inputElements.forEach((input) => {
    hideInputError(formElement, input, obj);
  });
  const saveButton = popupProfile.querySelector('.popup__button-save');
  saveButton.classList.remove('popup__button-save_disabled');
}

// Функция создания карточки с приемом объекта
const createCard = (item) => {
  const cardElement = cardTemplate.cloneNode(true); // Клонирование разметки из шаблона
  const cardPhoto = cardElement.querySelector('.gallery__photo'); // Поиск фото в шаблоне
  const cardTitle = cardElement.querySelector('.gallery__title'); // Поиск заголовка в шаблоне
  const likeButton = cardElement.querySelector('.gallery__button-like'); // Поиск кнопки лайк карточки
  const trashButton = cardElement.querySelector('.gallery__button-trash'); // Поиск кнопки удалить карточки

  cardTitle.textContent = item.name; // Присвоить заголовку карточки значение свойства name
  cardPhoto.src = item.link; // Присвоить ссылке на картинку значение ствойства link
  cardPhoto.alt = item.alt; // Присвоить описанию картинки значение свойства alt

  setToggleLikeEventListener(likeButton); // Добавить и убрать лайк на добавленную карточку
  setDeleteCardEventListener(trashButton); // Удалить добавленную карточку
  setOpenPhotoPopupEventListener(cardPhoto); // Открыть попап добавленной карточки

  return cardElement; // Вернуть готовую карточку
};

// Генерация карточек из массива
initialCards.forEach((element) => {
  listGallery.append(createCard(element)); // Добавление карточки в конец списка
});

// Функция добавления картоочки
const addCard = (evt) => {
  evt.preventDefault();
  // Вставить карточку в начало списка
  listGallery.prepend(createCard({
    name: titleInput.value,
    link: linkInput.value,
    alt: titleInput.value,
  }));
  closePopup(popupCard); //Закрыть попап добавленной карточки
};

const setKeyEscapeEventListener = (element) => {
  element.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(element);
  };
});
};

// Слушатель закрытия поапапов по кнопке закрыть
const setClosePopupButtonCloseEventListener = (btn, element) => {
  btn.addEventListener('click', () => {
    closePopup(element);
  });
};

// Слушатель закрытия попапав по оверлею
const setClosePopupEscapeEventListener = (element) => {
  element.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(element);
    }
  });
};

// Открытие попапа профиля с подтягиванием Имени и Вида деятельности
const setButtonEditEventListener = () => {
  buttonEdit.addEventListener('click', () => {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    clearValidation(popupProfile, objectData);
  });
  buttonEdit.removeEventListener('lclick', setButtonEditEventListener);
};

// Открытие попапа создания карточки
buttonAdd.addEventListener('click', () => {
  formCard.reset(); //Очистить форму
  titleInput.focus();
  openPopup(popupCard);
  clearValidation(popupCard, objectData);
  titleInput.focus();
  inputName.focus();
  setCaretPos(inputName, inputName.value.length)
});

// Функция установки слушателей на попап
const setPopupEventListener = (popupElement) => {
  setClosePopupEscapeEventListener(popupElement);
  const buttonClose = popupElement.querySelector('.popup__button-close');
  setClosePopupButtonCloseEventListener(buttonClose, popupElement);
  setKeyEscapeEventListener(popupElement);
}

setButtonEditEventListener();

formProfile.addEventListener('submit', submitEditProfileForm);// Слушатель отправки формы профиля
formCard.addEventListener('submit', addCard);// Слушатель отправки формы карточки
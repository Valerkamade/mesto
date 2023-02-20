// Импорт классов и данных
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, objectData } from './constants.js';

// Попапы
const popups = document.querySelectorAll('.popup'); 
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_img');

// Форма редакчтирования профиля
const formProfile = popupProfile.querySelector('.popup__form_type_profile'); 
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputJob = formProfile.querySelector('.popup__input_type_job'); 
const buttonEdit = document.querySelector('.profile__button-edit'); 

// Форма создания карточки
const formCard = popupCard.querySelector('.popup__form_type_place');
const inputTitle = formCard.querySelector('.popup__input_type_title');
const inputLink = formCard.querySelector('.popup__input_type_link');
const buttonAdd = document.querySelector('.profile__button-add'); 

// Данные попапа фото
const elementPopupPhoto = popupPhoto.querySelector('.popup__photo');
const elementPopupTitle = popupPhoto.querySelector('.popup__title');

// Доп данные со страницы
const profileName = document.querySelector('.profile__name'); 
const profileJob = document.querySelector('.profile__job');
const listGallery = document.querySelector('.gallery__list');

// Экземпляры класса валидации
const formProfileValidator = new FormValidator(objectData, formProfile);
const formCardValidator = new FormValidator(objectData, formCard);

// Функция создания экземпляра карточки по переданным данным
const createCard = (data) => {
  const card = new Card(data, '.card-template', handleOpenPhotoPopup);
  return card.generateCard();
};

// Функция открытия попапа
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydownEscape);
}

// Функция закрытия поапа
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeydownEscape);п
};

// Обработчик нажатия на клавишц Escape
const handleKeydownEscape = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

// Обработчик открытия попапа картинки
const handleOpenPhotoPopup = (photo) => {
  openPopup(popupPhoto);
  elementPopupTitle.textContent = photo.name;
  elementPopupPhoto.src = photo.link;
  elementPopupPhoto.alt = photo.alt;
};

// Функция сохранения изменений в полях формы и в профиле с закрытием окна
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

// Функция вставки карточки в начало списка
const insertiCard = () => {
  listGallery.prepend(createCard({ 
    name: inputTitle.value,
    link: inputLink.value,
    alt: inputTitle.value,
  }));
}

// Функция добавления картоочки
const addCard = (evt) => {
  evt.preventDefault();
  insertiCard();
  closePopup(popupCard); 
};

// Генерация карточек из массива
initialCards.forEach((element) => {
  listGallery.append(createCard(element));
});

// Глобальный вызов функций и методов
formProfileValidator.enableValidation();
formCardValidator.enableValidation();

// Открытие попапа профиля
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  formProfileValidator.clearValidation();
});

// Открытие попапа создания карточки
buttonAdd.addEventListener('click', () => {
  formCard.reset(); //Очистить форму
  openPopup(popupCard);
  formCardValidator.clearValidation();
});

// Слушатель закрытия поапапов по кнопке закрыть
const setClosePopupButtonCloseEventListener = (element) => {
  const buttonClose = element.querySelector('.popup__button-close');
  buttonClose.addEventListener('mousedown', () => {
    closePopup(element);
  });
};

// Слушатель закрытия попапав по оверлею
const setClosePopupOverlayEventListener = (element) => {
  element.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(element);
    }
  });
};

// Функция установки слушателей на попап
const setPopupEventListener = (popupElement) => {
  setClosePopupOverlayEventListener(popupElement);
  setClosePopupButtonCloseEventListener(popupElement);
}

// Функция установки слушателей на попапы
popups.forEach((popup) => {
  setPopupEventListener(popup);
});

// Слушатели отправки форм
formProfile.addEventListener('submit', submitEditProfileForm);
formCard.addEventListener('submit', addCard);

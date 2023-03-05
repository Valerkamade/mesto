// Импорт классов и данных
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { initialCards, objectData } from '../utils/constants.js';
import './index.css';
import PopupWithForm from '../components/PopupWithForm.js';

// Попапы
const popups = document.querySelectorAll('.popup');
// const popupProfile = document.querySelector('.popup_type_profile');
// const popupCard = document.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_img');

// Форма редакчтирования профиля
const formProfile = document.forms['profile'];
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputJob = formProfile.querySelector('.popup__input_type_job');
const buttonEdit = document.querySelector('.profile__button-edit');

// Форма создания карточки
const formCard = document.forms['place'];
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
const formValidators = {}

// Включение валидации
const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(data, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Функция создания экземпляра карточки по переданным данным
const createCard = (data) => {
  const card = new Card(data,
    '.card-template',
    () => {
      const openPopupImage = new PopupWithImage('.popup_type_img', data);
      openPopupImage.open();
      openPopupImage.setEventListeners();
    });
  return card.generateCard();
};

// Функция создания экземпляра секции
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, '.gallery__list');


cardSection.renderItems();

const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupProfile.close();
  }
);

const popupAddCard = new PopupWithForm(
  '.popup_type_place',
  (evt) => {
    evt.preventDefault();
    cardSection.addItem(createCard({
      name: inputTitle.value,
      link: inputLink.value,
      alt: inputTitle.value,
    }));
    popupAddCard.close();
  }
);

// Вызов валидации
enableValidation(objectData);

// Открытие попапа профиля
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  formValidators['profile'].clearValidation();
});

// Открытие попапа создания карточки
buttonAdd.addEventListener('click', () => {
  formCard.reset();
  openPopup(popupCard);
  formValidators['place'].clearValidation();
});



// Слушатель закрытия попапав по оверлею
// const setClosePopupOverlayEventListener = (element) => {
//   element.addEventListener('mousedown', (evt) => {
//     if (evt.target === evt.currentTarget) {
//       closePopup(element);
//     }
//   });
// };



// Слушатели отправки форм
// formProfile.addEventListener('submit', submitEditProfileForm);
// formCard.addEventListener('submit', addCard);

// Функция открытия попапа
// const openPopup = (popupElement) => {
//   popupElement.classList.add('popup_opened');
//   document.addEventListener('keydown', handleKeydownEscape);
// }

// Функция закрытия поапа
// const closePopup = (popupElement) => {
//   // popupElement.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleKeydownEscape);
// };

// Обработчик нажатия на клавишц Escape
// const handleKeydownEscape = (evt) => {

// }

// Обработчик открытия попапа картинки
// const handleOpenPhotoPopup = (photo) => {
//   openPopup(popupPhoto);
//   elementPopupTitle.textContent = photo.name;
//   elementPopupPhoto.src = photo.link;
//   elementPopupPhoto.alt = photo.alt;
// };

// Генерация карточек из массива
// initialCards.forEach((element) => {
//   listGallery.append(createCard(element));
// });

// Слушатель закрытия поапапов по кнопке закрыть
// const setClosePopupButtonCloseEventListener = (element) => {
//   const buttonClose = element.querySelector('.popup__button-close');
//   buttonClose.addEventListener('click', () => {
//     closePopup(element);
//   });
// };

// Функция установки слушателей на попап
// const setPopupEventListener = (popupElement) => {
//   setClosePopupOverlayEventListener(popupElement);
//   setClosePopupButtonCloseEventListener(popupElement);
// }

// Функция установки слушателей на попапы
// popups.forEach(setPopupEventListener);


// Функция сохранения изменений в полях формы и в профиле с закрытием окна
// const submitEditProfileForm = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileJob.textContent = inputJob.value;
//   closePopup(popupProfile);
// };

// Функция вставки карточки в начало списка
// const prependCard = () => {
//   listGallery.prepend(createCard({
//     name: inputTitle.value,
//     link: inputLink.value,
//     alt: inputTitle.value,
//   }));
// }

// Функция добавления картоочки
// const addCard = (evt) => {
//   evt.preventDefault();
//   prependCard();
//   closePopup(popupCard);
// };

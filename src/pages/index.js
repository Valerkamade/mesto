// Импорт классов и данных
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { initialCards, objectData } from '../utils/constants.js';
import './index.css';

// Кнопки открытия попапаов
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

// Экземпляр класса профиля
const userInfo = new UserInfo(
  {
    profileNameSelector: '.profile__name',
    profileInfoSelector: '.profile__job'
  },
);

// Экземпляры класса валидации
const formValidators = {};

// Включение валидации с наполнением объекта экземпляров валидации
const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(data, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Экземпляр поапа картинки
const popupImage = new PopupWithImage('.popup_type_img');

// Функция создания экземпляра карточки
const createCard = (data) => {
  const card = new Card(data,
    '.card-template',
    () => {
      popupImage.open(data);
    });
  return card.generateCard();
};

// Создание экземпляра секции
const cardSection = new Section({
  renderer: (items) => {
    cardSection.addItem(createCard(items));
  },
  containerSelector: '.gallery__list'
});

// Создание экземпляра попапа с формой профиля
const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  ({ name, job }) => {
    userInfo.setUserInfo({ name, job });
  }
);

// Создание экземпляра попапа с формой добавления карточки
const popupAddCard = new PopupWithForm(
  '.popup_type_place',
  ({ link, title }) => {
    cardSection.addItem(createCard({
      name: title,
      link: link,
      alt: title,
    }));
  }
);

// Открытие попапа профиля
buttonEdit.addEventListener('click', () => {
  popupProfile.fillInputs(userInfo.getUserInfo());
  formValidators['profile'].clearValidation();
  popupProfile.open();
});

// Открытие попапа создания карточки
buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
  formValidators['place'].clearValidation();
});

// Вызов валидации
enableValidation(objectData);

// Отрисовка первоначальных карточек
cardSection.renderItems(initialCards);

// Установка слушателей попапов
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
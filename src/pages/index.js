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

// Импуты формы профиля
const inputName = document.forms['profile'].querySelector('.popup__input_type_name');
const inputJob = document.forms['profile'].querySelector('.popup__input_type_job');

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
const openPopupImage = new PopupWithImage('.popup_type_img');

// Функция создания экземпляра карточки
const createCard = (data) => {
  const card = new Card(data,
    '.card-template',
    () => {
      openPopupImage.open(data);
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
  inputName.value = userInfo.getUserInfo()['name'];
  inputJob.value = userInfo.getUserInfo()['info'];

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
openPopupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
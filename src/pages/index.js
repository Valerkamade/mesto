// Импорт классов и данных
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import Api from '../components/Api.js';
import { initialCards, objectData } from '../utils/constants.js';
import './index.css';

// Кнопки открытия попапаов
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonProfile = document.querySelector('.profile__button-avatar');


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'bc0a2640-5424-4c06-abb5-a57662fac618',
    'Content-Type': 'application/json'
  }
});

const promUser = api.getUserInfoApi();
const promCard = api.getInitialCards();
const promDelete = (idCard) => api.deleteCard(idCard);


// Экземпляр класса профиля
const userInfo = new UserInfo(
  {
    profileNameSelector: '.profile__name',
    profileInfoSelector: '.profile__job',
    profileAvatarSelector: '.profile__avatar'
  },
);

// Экземпляры класса валидаци
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

//Экземпляр попапа удаления карточки
const popupDeleteCard = new PopupConfirmation(
  '.popup_type_delete',
  {
    submitCallback: () => {
      const el = popupDeleteCard.getElement();
      console.log(el);
      promDelete('64176aaf806b1c02c780946c');
      el.remove();
    }
  }
);

// Функция создания экземпляра карточки
const card = (data, user) => new Card({
  data: data,
  templateSelector: '.card-template',
  handleCardLikeClick: () => {
    popupImage.open(data);
  },
  handelCardTrashClick: (evt) => {
    popupDeleteCard.open();
    const element = evt.target.closest('.gallery__item');
    popupDeleteCard.setElement(element);
  },
  user: user
})

// Функция генерации карточки
const generateNewCard = (data, user) => {
  return card(data, user).generateCard();
}

// Создание экземпляра секции
const cardSection = new Section({
  renderer: (item, user) => {
    cardSection.addItem(generateNewCard(item, user));
  },
  containerSelector: '.gallery__list'
});

// Создание экземпляра попапа с формой профиля
const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  {
    submitCallback: (data) => {
      api.setUserInfoApi(data)
        .then((result) => {
          userInfo.setUserInfo(result);
        });
    }
  }
);


const popupAddCard = new PopupWithForm(
  '.popup_type_place',
  {
    submitCallback: ({ link, name }) => {
      api.setNewCard({ link, name })
        .then(({ link, name }) => {
          const newCard = card({
            name: name,
            link: link,
            alt: name,
          });
          generateNewCard(newCard);
        });
    }
  }
);

//Экземпляр попапа изменения аватара
const popupEditAvatar = new PopupWithForm(
  '.popup_type_avatar',
  {
    submitCallback: (data) => {
      userInfo.setUserAvatar(data);
    }
  }
);

// Полчение данных пользователья с сервера
// api.getUserInfoApi()
//   .then((result) => {
//     userInfo.setUserInfo(result);
//     popupEditAvatar.fillInputs(result);
//   });


// console.log(123);

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

//Открытие попапа аватара
buttonProfile.addEventListener('click', () => {
  popupEditAvatar.open();
  formValidators['avatar'].clearValidation();
});

// Вызов валидации
enableValidation(objectData);



// Установка слушателей попапов
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();








// Отрисовка первоначальных карточек
Promise.all([promCard, promUser])
  .then(([promCard, promUser]) => {
    cardSection.renderItems(promCard, promUser);
  })
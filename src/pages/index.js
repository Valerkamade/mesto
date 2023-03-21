// Импорт классов и данных
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import Api from '../components/Api.js';
import { objectData } from '../utils/constants.js';
import './index.css';

// Кнопки открытия попапаов
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonProfile = document.querySelector('.profile__button-avatar');

// Экземпляр класса запроса данных с сервера
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'bc0a2640-5424-4c06-abb5-a57662fac618',
    'Content-Type': 'application/json'
  }
});

// Ответы с сервера
const promUserInfo = api.getUserInfoApi();
const promCardInfo = api.getInitialCards();
const promAddNewCard = data => api.addNewCard(data)
const promDeleteCard = card => api.deleteCard(card);
const promToggleLike = (idCard, isLike) => api.toggleLikeCard(idCard, isLike);
const promSetUserInfo = data => api.setUserInfoApi(data);
const promSetAvatar = data => api.setUserAvatar(data);
const promAll = (...prom) => Promise.all([...prom]);

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

// Функция создания экземпляра карточки
const createCard = (data, user) => new Card({
  data: data,
  user: user,
  templateSelector: '.card-template',

  handleCardClick: () => {
    popupImage.open(data);
  },

  handelCardTrashClick: (idCard, card) => {
    popupDeleteCard.open(idCard, card);
  },

  handleToggleLike: (idCard, isLiked) => {
    promToggleLike(idCard, isLiked)
    // .then()
    // .catch()
    // .finally(() => {

    //     });;
  }
}).generateCard()

// Создание экземпляра секции
const cardSection = new Section({
  renderer: (item, user) => {
    cardSection.addItem(createCard(item, user));
  },
  containerSelector: '.gallery__list'
});

// Создание экземпляра попапа с формой профиля
const popupProfile = new PopupWithForm(
  '.popup_type_profile',
  {
    submitCallback: (data) => {
      popupProfile.renderLoading(true, 'Сохранение...');
      promSetUserInfo(data)
        .then((result) => {
          userInfo.setUserInfo(result);
          popupProfile.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupProfile.renderLoading(false);
        });
    }
  }
);

//Экземпляр попапа изменения аватара
const popupEditAvatar = new PopupWithForm(
  '.popup_type_avatar',
  {
    submitCallback: (data) => {
      popupEditAvatar.renderLoading(true, 'Сохранение...');
      promSetAvatar(data)
        .then((result) => {
          userInfo.setUserInfo(result)
          popupEditAvatar.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupEditAvatar.renderLoading(false);
        });
    }
  }
);

// Экземпляр попапа добавления картинки
const popupAddCard = new PopupWithForm(
  '.popup_type_place',
  {
    submitCallback: (data) => {
      popupAddCard.renderLoading(true, 'Создание...');
      promAll(promAddNewCard(data), promUserInfo)
        .then(([newCard, userInfo]) => {
          cardSection.prependItem(createCard(newCard, userInfo));
          popupAddCard.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupAddCard.renderLoading(false);
        });;
    }
  }
);

//Экземпляр попапа удаления карточки
const popupDeleteCard = new PopupConfirmation(
  '.popup_type_delete',
  {
    submitCallback: (cardId, card) => {
      popupDeleteCard.renderLoading(true, 'Удаление...');
      promDeleteCard(cardId)
        .then(() => {
          popupDeleteCard.close();
          card.remove();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupDeleteCard.renderLoading(false);
        });
    }
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

//Открытие попапа аватара
buttonProfile.addEventListener('click', () => {
  popupEditAvatar.fillInputs(userInfo.getUserInfo());
  popupEditAvatar.open();
  formValidators['avatar'].clearValidation();
});

// Вызов валидации
enableValidation(objectData);

// Рендер данных с сервера
promAll(promUserInfo, promCardInfo)
  .then(([promUser, promCard]) => {
    userInfo.setUserInfo(promUser);
    cardSection.renderItems(promCard, promUser);
  })
  .catch(err => console.log(err));

// Установка слушателей попапов
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();

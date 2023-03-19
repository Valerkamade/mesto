// Импорт классов и данных
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import { initialCards, objectData } from '../utils/constants.js';
import './index.css';

// Кнопки открытия попапаов
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonProfile = document.querySelector('.profile__button-avatar');

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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'bc0a2640-5424-4c06-abb5-a57662fac618',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then((result) => {
    cardSection.renderItems(result);// обрабатываем результат
  })

// Полчение данных пользователья с сервера
api.getUserInfoApi()
  .then((result) => {
    userInfo.setUserInfo(result);
    userInfo.setUserAvatar(result);
  })

// api.setUserInfoApi({name:'awfghs3', about: 'ghfk'})

// Экземпляр поапа картинки
const popupImage = new PopupWithImage('.popup_type_img');

//Экземпляр попапа удаления карточки
const popupDeleteCard = new PopupWithForm(
  '.popup_type_delete',
  {
    submitCallback: () => {
      const el = popupDeleteCard.getElement();
      el.remove();
    }
  }
);

// Функция создания экземпляра карточки
const card = (data) => new Card({
  data: data,
  templateSelector: '.card-template',
  handleCardLikeClick: () => {
    popupImage.open(data);
  },
  handelCardTrashClick: (evt) => {
    popupDeleteCard.open();
    const element = evt.target.closest('.gallery__item');
    popupDeleteCard.setElement(element);
  }
})

// Функция генерации карточки
const generateNewCard = (data) => {
  return card(data).generateCard();
}

// Создание экземпляра секции
const cardSection = new Section({
  renderer: (item) => {
    cardSection.addItem(generateNewCard(item));
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

console.log();

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
});

// Вызов валидации
enableValidation(objectData);

// Отрисовка первоначальных карточек
// cardSection.renderItems(initialCards);

// Установка слушателей попапов
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();
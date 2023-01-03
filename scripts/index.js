const popupProfile = document.querySelector('.popup_type_profile'); //Поиск попапа профиля
const popupCard = document.querySelector('.popup_type_place'); //Поиск поапа добавления карточки
const popupPhoto = document.querySelector('.popup_type_img'); //Поиск поапа просмотра картинки
const elementPopupPhoto = popupPhoto.querySelector('.popup__photo'); //Поиск картинки попапа
const elementPopupTitle = popupPhoto.querySelector('.popup__title'); //Поиск заголовка поапа

const formProfile = popupProfile.querySelector('.popup__form_type_profile'); //Поиск формы профиля
const formCard = popupCard.querySelector('.popup__form_type_place'); //Поиск формы добавления карточки

const listGallery = document.querySelector('.gallery__list'); //Поиск списка, куда будут вставлятся карточки
const cardTemplate = document.querySelector('.card-template').content; //Поиск шаблона для генерации карточек

const closeButtons = document.querySelectorAll('.popup__button-close'); //Поиск всех кнопок закрытия в этих попапах
const buttonEdit = document.querySelector('.profile__button-edit'); //Поиск кнопки редактирования профиля
const buttonAdd = document.querySelector('.profile__button-add'); //Поиск кнопки добавления карточки

const titleInput = formCard.querySelector('.popup__input_type_title'); //Поиск поля формы title
const linkInput = formCard.querySelector('.popup__input_type_link'); //Поиск поля формы link
const inputName = formProfile.querySelector('.popup__input_type_name'); //Поиск поля формы имя попапа
const inputJob = formProfile.querySelector('.popup__input_type_job'); //Поиск поля формы работа попапа
const profileName = document.querySelector('.profile__name'); //Поиск данных имени
const profileJob = document.querySelector('.profile__job'); //Поиск данных работы

//Функция открытия попапа
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened'); //Добавление класса открытия
};

//Функция закрытия поапа
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened'); //Удаление класса открытия
};

//Закрытие поапов по кнопке крестик
closeButtons.forEach((element) => {
  element.addEventListener('click', (evt) => {
    const popupItem = evt.target.closest('.popup');
    closePopup(popupItem);
  });
});

// Открытие попапа профиля с подтягиванием Имени и Вида деятельности
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

// Открытие попапа создания карточки
buttonAdd.addEventListener('click', () => {
  openPopup(popupCard);
});

// Функция открытия попапов с подтягиванием нужных параметров
const openPopupPhoto = (element) => {
  element.addEventListener('click', (evt) => {
    openPopup(popupPhoto);
    elementPopupTitle.textContent =
      evt.target.closest('.gallery__item').textContent;
    elementPopupPhoto.src = element.src;
    elementPopupPhoto.alt = element.alt;
  });
};

//Функция сохранения изменений в полях формы и в профиле с закрытием окна
const submitEditProfileForm = () => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

//Функция лайка/диздайка карточек
const setToggleLikeEventListener = (element) => {
  element.addEventListener('click', (evt) => {
    evt.target.classList.toggle('gallery__button-like_active');
  });
};

//Функция удаления карточки
const setDeleteCardEventListener = (element) => {
  element.addEventListener('click', (evt) => {
    const listItem = evt.target.closest('.gallery__item'); //Выбрать карточку по нажатию на фото
    listItem.remove(); //Удалить карточку
  });
};

//Генерация карточек из массива
const addCards = (element) => {
  const cardElement = cardTemplate.cloneNode(true); //Клонирование разметки из шаблона
  const cardPhoto = cardElement.querySelector('.gallery__photo'); //Поиск фото в шаблоне
  const cardTitle = cardElement.querySelector('.gallery__title'); //Поиск заголовка в шаблоне
  const likeButton = cardElement.querySelector('.gallery__button-like'); //Поиск кнопки лайк карточки
  const trashButton = cardElement.querySelector('.gallery__button-trash'); //Поиск кнопки удалить карточки
  //Внесение данных в разметку из массива
  cardTitle.textContent = element.name;
  cardPhoto.src = element.link;
  cardPhoto.alt = element.alt;
  setToggleLikeEventListener(likeButton); //Добавить и убрать лайк на добавленную карточку
  setDeleteCardEventListener(trashButton); //Удалить добавленную карточку
  openPopupPhoto(cardPhoto); //Открыть попап добавленной карточки
  listGallery.append(cardElement); //Добавление карточки в конец списка
};

initialCards.forEach(addCards); //Создать карточки при загрузке из массива

//Функция добавления картоочки
const addCard = () => {
  const cardElement = cardTemplate.cloneNode(true); //Клонирование разметки из template
  const cardPhoto = cardElement.querySelector('.gallery__photo'); //Поиск изображения карточки
  const likeButton = cardElement.querySelector('.gallery__button-like'); //Поиск кнопки лайк карточки
  const trashButton = cardElement.querySelector('.gallery__button-trash'); //Поиск кнопки удалить карточки
  const cardTitle = cardElement.querySelector('.gallery__title'); //Поиск заголовка карточки

  cardTitle.textContent = titleInput.value; //Присвоить заголоаок карточке из формы
  cardPhoto.src = linkInput.value; //Присвоить адрес картинке карточки из формы
  cardPhoto.alt = titleInput.value; //Присвоить описание по заголовку пока нет графы описания
  setToggleLikeEventListener(likeButton); //Добавить и убрать лайк на добавленную карточку
  setDeleteCardEventListener(trashButton); //Удалить добавленную карточку
  openPopupPhoto(cardPhoto); //Открыть попап добавленной карточки
  listGallery.prepend(cardElement); //Вставить карточку в начало
  closePopup(popupCard); //Закрыть поапа добавленной карточки
  formCard.reset(); //Очистить форму
};


// Слушатель отправки формы профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitEditProfileForm();
});

// Слушатель отправки формы карточки
formCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard();
});
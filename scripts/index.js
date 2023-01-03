const popupProfile = document.querySelector('.popup_type_profile'); //Поиск попапа профиля
const popupCard = document.querySelector('.popup_type_place'); //Поиск поапа добавления карточки
const popupPhoto = document.querySelector('.popup_type_img'); //Поиск поапа просмотра картинки
const elementPopupPhoto = popupPhoto.querySelector('.popup__photo'); //Поиск картинки попапа
const elementPopupTitle = popupPhoto.querySelector('.popup__title'); //Поиск заголовка поапа

const forms = document.querySelectorAll('.popup__form'); //Поиск всех форм
const formProfile = popupProfile.querySelector('.popup__form_type_profile'); //Поиск формы профиля
const formCard = popupCard.querySelector('.popup__form_type_place'); //Поиск формы добавления карточки

const listGallery = document.querySelector('.gallery__list'); //Поиск списка, куда будут вставлятся карточки
const cardTemplate = document.querySelector('.card-template').content; //Поиск шаблона для генерации карточек

const closeButtons = document.querySelectorAll('.popup__button-close'); //Поиск всех кнопок закрытия в этих попапах
const buttonEdit = document.querySelector('.profile__button-edit'); //Поиск кнопки редактирования профиля
const buttonAdd = document.querySelector('.profile__button-add'); //Поиск кнопки добавления карточки

const titleInput = formCard.querySelector('.popup__input_type_title'); //Поиск поля формы title
const linkInput = formCard.querySelector('.popup__input_type_link'); //Поиск поля формы link
let inputName = formProfile.querySelector('.popup__input_type_name'); //Поиск поля формы имя попапа
let inputJob = formProfile.querySelector('.popup__input_type_job'); //Поиск поля формы работа попапа
let profileName = document.querySelector('.profile__name'); //Поиск данных имени
let profileJob = document.querySelector('.profile__job'); //Поиск данных работы

const openPopupButtons = [buttonEdit, buttonAdd]; //Массив кнопок открытия попапов

//Массив данных для генерации карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Долина с водоемом на фоне зеленых горю',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Вид с берега водоема на другой берег зимой.',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Вид на многоэтажеки в перспективе.',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Травянистая земля на фоне горы.',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Однокалейная железная дорога уходящая к горизонту посреди леса.',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Лес, горы и немного озера.',
  },
];

//Генерация карточек из массива
const addCards = (element) => {
  const cardElement = cardTemplate.cloneNode(true); //Клонирование разметки из шаблона
  const cardPhoto = cardElement.querySelector('.gallery__photo'); //Поиск фото в шаблоне
  const cardTitle = cardElement.querySelector('.gallery__title'); //Поиск заголовка в шаблоне

  //Внесение данных в разметку из массива
  cardTitle.textContent = element.name;
  cardPhoto.src = element.link;
  cardPhoto.alt = element.alt;

  listGallery.append(cardElement); //Добавление карточки в конец списка
};

initialCards.forEach(addCards); //Создать карточки при загрузке из массива

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

// Функция открытия попапов с подтягиванием нужных параметров
const open = (element) => {
  element.addEventListener('click', (evt) => {
    // Проверка каокй вызван попап по клику
    if (evt.target === buttonEdit) {
      openPopup(popupProfile);
      inputName.value = profileName.textContent;
      inputJob.value = profileJob.textContent;
    } else if (evt.target === buttonAdd) {
      openPopup(popupCard);
    } else {
      openPopup(popupPhoto);
      elementPopupTitle.textContent =
        evt.target.closest('.gallery__item').textContent;
      elementPopupPhoto.src = element.src;
      elementPopupPhoto.alt = element.alt;
    }
  });
};

//Функция сохранения изменений в полях формы и в профиле с закрытием окна
const formSubmitHandler = () => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

const listPhotos = listGallery.querySelectorAll('.gallery__photo'); //Поиск фото в галереии
const likeButtons = listGallery.querySelectorAll('.gallery__button-like'); //Поиск кнопок лайк в галерее
const trashButtons = listGallery.querySelectorAll('.gallery__button-trash'); //Поиск кнопок удалить в галерее

//Лйки карточек
const addLike = (element) => {
  element.addEventListener('click', (evt) => {
    evt.target.classList.toggle('gallery__button-like_active');
  });
};

//Удаление карточки
const deleteCard = (element) => {
  element.addEventListener('click', (evt) => {
    const listItem = evt.target.closest('.gallery__item'); //Выбрать карточку по нажатию на фото
    listItem.remove(); //Удалить карточку
  });
};

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
  addLike(likeButton); //Добавить и убрать лайк на добавленную карточку
  deleteCard(trashButton); //Удалить добавленную карточку
  open(cardPhoto); //Открыть попап добавленной карточки
  listGallery.prepend(cardElement); //Вставить карточку в начало
  closePopup(popupCard); //Закрыть поапа добавленной карточки
  formCard.reset(); //Очистить форму
};

// Функция прослушивания отправки форм через проверку события
const listenFormSubmit = (element) => {
  element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (evt.target === formProfile) {
      formSubmitHandler(element);
    } else {
      addCard(element);
    }
  });
};

forms.forEach(listenFormSubmit); //Закрыть форму по событию submit
listPhotos.forEach(open); //Открыть поап по клику на картинку
openPopupButtons.forEach(open); //Открыть попап по клику на кнопки редактиировать и добавить
likeButtons.forEach(addLike); //Поставить и убрать лайк
trashButtons.forEach(deleteCard); //Удалить карточку

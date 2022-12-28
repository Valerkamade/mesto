const popup = document.querySelector('.popup'); //Поиск попапа
const form = popup.querySelector('.popup__form'); //Поиск формы
const buttonEdit = document.querySelector('.profile__button-edit'); //Поиск кнопки редактирования профиля
const popupClose = popup.querySelector('.popup__button-close'); //Поиск кнопки закрытия попапа
let nameInput = popup.querySelector('.popup__input_type_name'); //Поиск поля формы имя попапа
let jobInput = popup.querySelector('.popup__input_type_job'); //Поиск поля формы работа попапа
let profileName = document.querySelector('.profile__name'); //Поиск данных имени
let profileJob = document.querySelector('.profile__job'); //Поиск данных работы

//Функция отрытия попапа, подтягивает имя и работу с полей профиля в форму
const formOpen = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
};

//Функция закрытия попапа без сохранения изменений
const formClose = function () {
  popup.classList.remove('popup_opened');
};

//Функция сохранения изменений в полях формы и в профиле с закрытием окна
const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formClose();
};

//Слушатели событий
buttonEdit.addEventListener('click', formOpen);
popupClose.addEventListener('click', formClose);
form.addEventListener('submit', formSubmitHandler);

// Карточки из коробки
const initialCards = [
  //Массив данных для генерации карточек
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
const gallerysList = document.querySelector('.gallery__list'); //Поиск списка, куда будут вставлятся карточки
const cardTemplate = document.querySelector('.card-template').content; //Поиск шаблона для генерации карточек

//Генерация карточек из массива
initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true); //Клонирование разметки из template

  // Внесение данных в разметку из массива
  cardElement.querySelector('.gallery__title').textContent = element.name;
  cardElement.querySelector('.gallery__photo').src = element.link;
  cardElement.querySelector('.gallery__photo').alt = element.alt;

  // Добавление карточки в конец списка
  gallerysList.append(cardElement);
});

//Попапа добавления карточки
const popupCard = document.querySelector('.popup_type_place'); // Поиск попапа добавления карточек
const formCard = popupCard.querySelector('.popup__form_type_place'); //Поиск формы в попапе
const buttonAdd = document.querySelector('.profile__button-add'); //Поиск кнопки Создать этого поапа
const popupCloseCard = popupCard.querySelector('.popup__button-close'); //Поиск кнопки закрыть этого поапап

// Функция открытия попапа
const formOpenCard = function () {
  popupCard.classList.add('popup_opened');
};

// Функция закрытия поапа
const formCloseCard = function () {
  popupCard.classList.remove('popup_opened');
};

// Слушатели
buttonAdd.addEventListener('click', formOpenCard);
popupCloseCard.addEventListener('click', formCloseCard);

// Добавление карточек
const titleInput = popupCard.querySelector('.popup__input_type_title'); // Поиск поля формы title
const linkInput = popupCard.querySelector('.popup__input_type_link'); // Поиск поля формы link

//
const addCard = function (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true); //Клонирование разметки из template
  cardElement.querySelector('.gallery__title').textContent = titleInput.value;
  cardElement.querySelector('.gallery__photo').src = linkInput.value;

  const likeButton = cardTemplate.querySelector('.gallery__button-like');
  cardElement.querySelector('.gallery__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__button-like_active');
  });

  gallerysList.prepend(cardElement);

  formCloseCard();
  formCard.reset();
};

formCard.addEventListener('submit', addCard);

// Лйки карточек
const likeButton = gallerysList.querySelectorAll('.gallery__button-like');
// likeButton.addEventListener('click', function (evt) {
//   evt.target.classList.toggle('gallery__button-like_active');
// });

likeButton.forEach(function (element) {

  element.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__button-like_active');
  });
});

const popup = document.querySelector('.popup'); //Поиск любого попапа
const popups = document.querySelectorAll('.popup'); // Поиск всех поапов
const popupEdit = document.querySelector('.popup_type_profile'); //Поиск попапа профиля
const popupCard = document.querySelector('.popup_type_place'); //Поиск поапа добавления карточки
const popupPhoto = document.querySelector('.popup_type_img'); //Поиск поапапросмотра картинки

const form = popup.querySelector('.popup__form'); //Поиск формы
const formCard = popupCard.querySelector('.popup__form_type_place'); //Поиск формы в попапе профиля

const gallerysList = document.querySelector('.gallery__list'); //Поиск списка, куда будут вставлятся карточки
const cardTemplate = document.querySelector('.card-template').content; //Поиск шаблона для генерации карточек

const closeButtons = document.querySelectorAll('.popup__button-close'); //Поиск всех кнопок закрытия в этих попапах
const buttonEdit = document.querySelector('.profile__button-edit'); //Поиск кнопки редактирования профиля
const buttonAdd = document.querySelector('.profile__button-add'); //Поиск кнопки Создать этого поапа

const titleInput = popupCard.querySelector('.popup__input_type_title'); //Поиск поля формы title
const linkInput = popupCard.querySelector('.popup__input_type_link'); //Поиск поля формы link
const elementPopupPhoto = popupPhoto.querySelector('.popup__photo');
const elementPopupTitle = popupPhoto.querySelector('.popup__title');

let nameInput = popup.querySelector('.popup__input_type_name'); //Поиск поля формы имя попапа
let jobInput = popup.querySelector('.popup__input_type_job'); //Поиск поля формы работа попапа
let profileName = document.querySelector('.profile__name'); //Поиск данных имени
let profileJob = document.querySelector('.profile__job'); //Поиск данных работы

const openPopupButtons = [buttonEdit, buttonAdd]; //Массив кнопок на странице

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
  const cardElement = cardTemplate.cloneNode(true); //Клонирование разметки из template
  const cardPhoto = cardElement.querySelector('.gallery__photo');
  //Внесение данных в разметку из массива
  cardElement.querySelector('.gallery__title').textContent = element.name;
  cardPhoto.src = element.link;
  cardPhoto.alt = element.alt;

  gallerysList.append(cardElement); //Добавление карточки в конец списка
};

initialCards.forEach(addCards); //Создать карточки при загрузке из массива

//Функция открытия попапа
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
};

//Функция закрытия поапа
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
};

//Закрытие поапов по кнопке крестик
closeButtons.forEach((element) => {
  element.addEventListener('click', (evt) => {
    const popupItem = evt.target.closest('.popup');
    closePopup(popupItem);
  });
});

const open = (element) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target === buttonEdit) {
      openPopup(popupEdit);
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
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
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

const listPhotos = gallerysList.querySelectorAll('.gallery__photo'); //Поиск фото в галереии
const likeButtons = gallerysList.querySelectorAll('.gallery__button-like'); //Поиск кнопок лайк в галерее
const trashButtons = gallerysList.querySelectorAll('.gallery__button-trash'); //Поиск кнопок удалить в галерее

//Лйки карточек
const addLike = (element) => {
  element.addEventListener('click', (evt) => {
    evt.target.classList.toggle('gallery__button-like_active');
  });
};

//Удаление карточки
const deletCard = (element) => {
  element.addEventListener('click', (evt) => {
    const listItem = evt.target.closest('.gallery__item'); //Выбрать карточку по нажатию на фото
    listItem.remove(); //Удалить карточку
  });
};

//Функция добавления картоочки
const addCard = (evt) => {
  evt.preventDefault(); //Сбросить отправку формы
  const cardElement = cardTemplate.cloneNode(true); //Клонирование разметки из template
  const cardPhoto = cardElement.querySelector('.gallery__photo'); //Поиск изображения карточки
  const likeButton = cardElement.querySelector('.gallery__button-like'); //Поиск кнопки лайк карточки
  const trashButton = cardElement.querySelector('.gallery__button-trash'); //Поиск кнопки удалить карточки
  const cardTitle = cardElement.querySelector('.gallery__title'); //Поиск заголовка карточки

  cardTitle.textContent = titleInput.value; //Присвоить заголоаок карточке из формы
  cardPhoto.src = linkInput.value; //Присвомит адрес картинке карточки из формы
  addLike(likeButton); //Добавить и убрать лайк на добавленную карточку
  deletCard(trashButton); //Удалить добавленную карточку
  open(cardPhoto); //Открыть попап добавленной карточки
  gallerysList.prepend(cardElement); //Вставить карточку в начало
  closePopup(popupCard); //Закрыть поапа добавленной карточки
  formCard.reset(); //Очистить форму
};

//Слушатели событий
form.addEventListener('submit', formSubmitHandler); //Слушатель события submit формы
formCard.addEventListener('submit', addCard); //Слушатель события submit формы добавления карт

//Перебор псевдомассивов
listPhotos.forEach(open); //Открыть поап по клику на картинку
openPopupButtons.forEach(open); //Открыть попап по клику на кнопки редактиировать и добавить
likeButtons.forEach(addLike); //Поставить и убрать лайк
trashButtons.forEach(deletCard); //Удалить карточку

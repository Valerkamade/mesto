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


//Попапа добавления карточки
const popupCard = document.querySelector('.popup_type_place');
const formCard = popupCard.querySelector('.popup__form_type_place');
const buttonAdd = document.querySelector('.profile__button-add');
const popupCloseCard = popupCard.querySelector('.popup__button-close');

const formOpenCard = function () {
  popupCard.classList.add('popup_opened');
};

const formCloseCard = function () {
  popupCard.classList.remove('popup_opened');
};

buttonAdd.addEventListener('click', formOpenCard);
popupCloseCard.addEventListener('click', formCloseCard);
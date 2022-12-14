const popup = document.querySelector('.popup'); //Поиск попапа
const btnEdit = document.querySelector('.profile__btn-edit'); //Поиск кнопки редактирования профиля
const popupClose = popup.querySelector('.popup__btn-close'); //Поиск кнопки закрытия попапа
let nameInput = popup.querySelector('.popup__name'); //Поиск поля формы имя попапа
let jobInput = popup.querySelector('.popup__job'); //Поиск поля формы работа попапа
let profileName = document.querySelector('.profile__name'); //Поиск данных имени
let profileJob = document.querySelector('.profile__job'); //Поиск данных работы

//Функция отрытия попапа, подтягивает имя и работу с полей профиля в форму
const formOpen = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
};

//Функция закрытия попапа, подтягивает имя и работу с полей профиля в форму без сохранения изменений
const formClose = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
btnEdit.addEventListener('click', formOpen);
popupClose.addEventListener('click', formClose);
popup.addEventListener('submit', formSubmitHandler);

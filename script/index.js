const popup = document.querySelector('.popup'); //
const btnEdit = document.querySelector('.profile__btn-edit'); //
const popupClose = popup.querySelector('.popup__btn-close');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function formOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

btnEdit.addEventListener('click', formOpen);

function formClose() {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formClose();
}

popupClose.addEventListener('click', formClose);
popup.addEventListener('submit', formSubmitHandler);

import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  // Метод открытия попапа и получения данных о карточке и Id карточки
  open(card) {
    super.open();
    this.cardId = card.idCard;
    this.card = card;
    console.log(card)
  }

  // Метод слушателей
  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._submitCallback(this);
    });
  }
}
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers['authorization'];
    this._headers = headers;
  }

  // Метод проверки успешности запроса
  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`);
  }

  // метод запроса данных карточек с сервера
  getInitialCardsApi() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._isOk(res))
  }

  // Метод запроса данных пользователя с сервера
  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: {
          authorization: this._authorization
        }
      }
    )
      .then(res => this._isOk(res))
  }

  // Метот передачи данных пользователя на сервер
  setUserInfoApi({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    )
      .then(res => this._isOk(res))
  }

  // Метод передачи на сервер новых данных о пользователе 
  setUserAvatarApi({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      }
    )
      .then(res => this._isOk(res))
  }

  // Метод добавления новой карточки на сервер
  addNewCardApi({ name, link }) {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }
    )
      .then(res => this._isOk(res))
  }

  // Метод удаления карточки с сервера
  deleteCardApi(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      }
    )
      .then(res => this._isOk(res))
  }


  // Метод отправки данных об установке/снятии лайка на сервер
  toggleLikeCardApi(cardID, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardID}/likes`,
        {
          method: 'PUT',
          headers: this._headers
        }
      )
        .then(res => this._isOk(res))
    } else {
      return fetch(`${this._baseUrl}/cards/${cardID}/likes`,
        {
          method: 'DELETE',
          headers: this._headers
        }
      )
        .then(res => this._isOk(res))
    }
  }
}

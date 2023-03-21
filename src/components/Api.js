export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers['authorization'];
    this._headers = headers;
  }

  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`);
  }

  errorMessage() {
    
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._isOk(res))
  }

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

  setUserAvatar({ avatar }) {
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

  addNewCard({ name, link }) {
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

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      }
    )
      .then(res => this._isOk(res))
  }

  toggleLikeCard(cardID, isLiked) {
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

export default class Api {
  constructor({ baseUrl, headers, apiCallback }) {
    this._baseUrl = baseUrl;
    // this._authorization = headers['authorization'];
    // this._contentType = headers['Content-Type'];
    this._headers = headers;
    this._apiCallback = apiCallback;
    console.log(this._headers['authorization']);
  }

  _catch(err) {
    return console.log(err);
  }

  _getPromise(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._getPromise(res))
      .catch(err => this._catch(err))

  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers
      }
    )
      .then(res => this._getPromise(res))
      .catch(err => this._catch(err))
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
      .then(res => this._getPromise(res))
      .catch(err => this._catch(err))
  }

  setNewCard({ name, link }) {
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
      .then(res => this._getPromise(res))
      .catch(err => this._catch(err))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      }
    )
      .then(res => this._getPromise(res))
      .catch(err => this._catch(err))
  }
}

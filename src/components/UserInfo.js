export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  // Метод сбора информации из профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileInfo.textContent
    };
  }

  // Метод вставки информации из формы в профиль
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileInfo.textContent = data.about;
  }

  setUserAvatar(url) {
    this._profileAvatar.src = url.avatar;
  }
}
export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
  }

  // Метод сбора информации из профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileInfo.textContent
    };
  }

  // Метод вставки информации из формы в профиль
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileInfo.textContent = data.job;
  }
}
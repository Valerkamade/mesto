//Массив данных для генерации карточек
const initialCards = [
  {
    name: 'Самара, Монумент славы',
    link: 'https://i.postimg.cc/rpGGWCpx/pavel-neznanov-a-Gqjrfb63-Ac-unsplash.jpg',
    alt: 'Человек на высоком постаменте с авиакрыльями над головой на фоне зимнего вида на Волгу.',
  },
  {
    name: 'Уфа, Салават Юлаев',
    link: 'https://i.postimg.cc/RZphYWby/ainur-khakimov-2y-v-Shgsjlk-unsplash.jpg',
    alt: 'Памятник, мужчина на коне в движении.',
  },
  {
    name: 'Москва, Собор Василия Блаженного',
    link: 'https://i.postimg.cc/V6gkj5MK/nikolay-vorobyev-QJ2-HGu-SSQz0-unsplash.jpg',
    alt: 'Соборв ночи с подсветкой.',
  },
  {
    name: 'Евпатория, море',
    link: 'https://i.postimg.cc/768Yp6pN/ahhaxeh-kya-De-Mw4-2-U-unsplash.jpg',
    alt: 'Закат, яхта, море.',
  },
  {
    name: 'Саратов, Кумысная поляна',
    link: 'https://i.postimg.cc/tJV0ytWZ/alexandr-safronov-YAv-Hb-Jbu-Js-Q-unsplash.jpg',
    alt: 'Однокалейная железная дорога уходящая к горизонту посреди леса.',
  },
  {
    name: 'Пенза, светофор',
    link: 'https://i.postimg.cc/w3KRqp4X/nikolai-eremin-ASid-J7-QAU4w-unsplash.jpg',
    alt: 'Дерево из светофоров.',
  },
];

// Данные для валидации
const objectData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

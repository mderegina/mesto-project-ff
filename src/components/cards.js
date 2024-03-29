import { cardTemplate, handleImageClick } from '/src/index.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки

export function createCard(name, link, onDeleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', link);

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', onDeleteCard);

  const cardName = cardElement.querySelector('.card__name');

  // Находим кнопку лайка в созданной карточке и добавляем обработчик события
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  //Открытие попапа с картинкой
  cardImage.addEventListener('click', function(evt) {
    handleImageClick(link, name);
  });

  return cardElement;
}

// @todo: Функция удаления карточки

export function onDeleteCard(event){
  const cardElement = event.target.closest('.card');
  cardElement.remove();
};

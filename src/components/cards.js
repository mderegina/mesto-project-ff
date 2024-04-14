import { cardTemplate, cardContainer, addNewCardPopup, popups } from '/src/index.js';
import { openModal, closeModal } from '/src/components/modal.js';


export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      alt: "Изображение горного района Архыз",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      alt: "Изображение реки Челябинской области"
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      alt: "Изобращение однотипных домой города Иваново",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      alt: "Изобращение земли на Камчатке",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      alt: "Изображение железнодорожных путей Холмогорского района",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      alt: "Изображение горы и озера Байкал",
    }
];

//Функция добавление лайка
export function onLike(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function onDeleteCard(event){
  const cardElement = event.target.closest('.card');
  cardElement.remove();
};

//Функция открытия картинки
export function handleImageClick(link, alt, name) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const nameInput = document.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = alt;
  nameInput.textContent = name;
  openModal(popupTypeImage);
}

// @todo: Функция создания карточки
export function createCard(name, link, alt, onDeleteCard, onLike, handleImageClick) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = alt;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', onDeleteCard);

  likeButton.addEventListener('click', onLike);

  cardImage.addEventListener('click', function(evt) {
    handleImageClick(link, alt, name);
  });

  return cardElement;
}

//Создание новой карточки
const formElementNewCard = document.forms['new-place'];

formElementNewCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const nameAddInput = formElementNewCard.elements['place-name'].value;
  const urlAddInput = formElementNewCard.elements['link'].value;
  const altAddInput = nameAddInput;
  const newCard = createCard(nameAddInput, urlAddInput, altAddInput, onDeleteCard, onLike, handleImageClick);
  cardContainer.prepend(newCard);
  formElementNewCard.reset();
  closeModal(addNewCardPopup, popups);
})


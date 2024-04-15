import { cardTemplate, cardContainer, addNewCardPopup, popups, handleImageClick } from '/src/index.js';
import { closeModal } from '/src/components/modal.js';

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

//Функция добавление лайка
export function onLike(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function onDeleteCard(event){
  const cardElement = event.target.closest('.card');
  cardElement.remove();
}

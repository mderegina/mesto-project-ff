// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы

const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(name, link, onDeleteCard){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', onDeleteCard);
  return cardElement;
}

// @todo: Функция добавления карточки в DOM

function addCard(cardElement){
  cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки

function onDeleteCard(event){
  const cardElement = event.target.closest('.card');
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card){
  const cardElement = createCard(card.name, card.link, onDeleteCard);
  addCard(cardElement);
})

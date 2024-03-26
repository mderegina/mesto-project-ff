import './pages/index.css';
import { initialCards, onDeleteCard, createCard } from '/src/components/cards.js'
import avatarImage from '/src/images/avatar.jpg';
import monasteryImage from '/src/images/card_1.jpg';
import sunsetImage from '/src/images/card_2.jpg';
import mountainImage from '/src/images/card_3.jpg';
import { openModal, closeModal } from '/src/components/modal.js'


const cardImport = [
  { name: 'Avatar', link: avatarImage },
  { name: 'Monastery', link: monasteryImage },
  { name: 'Sunset', link: sunsetImage },
  { name: 'Mountain', link: mountainImage },
];

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция добавления карточки в DOM
function addCard(cardElement){
  cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card){
  const cardElement = createCard(card.name, card.link, onDeleteCard);
  addCard(cardElement);
})

//Открытие модального окна
const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
export const popups = document.querySelectorAll('.popup');

function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

profileButton.addEventListener('click', openEditPopup);

// Закрытие модального окна
popups.forEach((popup) => {
  const closePopup = popup.querySelector('.popup__close');
  closePopup.addEventListener('click', () => {
    closeModal(popup);
  });
});

// Добавление обработчика на документ
document.addEventListener('mousedown', (evt) => {
  popups.forEach((popup) => {
    if (popup.classList.contains('popup_is-opened') && !popup.contains(evt.target)) {
      closeModal(popup);
    }
  });
});

// Находим форму в DOM
const formElement = profilePopup.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup, popups);
  evt.preventDefault();
}

formElement.addEventListener('submit', handleFormSubmit);

//Открытие модального окна
const addOpenButton = document.querySelector('.profile__add-button');
const addNewCardPopup = document.querySelector('.popup_type_new-card');

function openAddPopup() {
  openModal(addNewCardPopup);
}

addOpenButton.addEventListener('click', openAddPopup);

//Создание новой карточки
const formElementNewCard = document.forms['new-place'];

formElementNewCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const nameAddInput = formElementNewCard.elements['place-name'].value;
  const urlAddInput = formElementNewCard.elements['link'].value;
  const newCard = createCard(nameAddInput, urlAddInput, onDeleteCard);
  cardContainer.prepend(newCard);
  formElementNewCard.reset();
  closeModal(addNewCardPopup, popups);
})

//Функция открытия картинки
export function handleImageClick(link, name) {
  const popupImage = document.querySelector('.popup_type_image');
  const cardImage = document.querySelector('.popup__image');
  const nameInput = document.querySelector('.popup__caption')
  cardImage.src = link;
  nameInput.textContent = name;
  openModal(popupImage);
}

import './pages/index.css';
import { initialCards, onDeleteCard, createCard, onLike, handleImageClick } from '/src/components/cards.js';
import { openModal, closeModal, closeModalOverlay, closeModalEscape } from '/src/components/modal.js';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
export const cardContainer = document.querySelector('.places__list');

// @todo: Функция добавления карточки в DOM
function addCard(cardElement) {
  cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cardElement = createCard(card.name, card.link, card.alt, onDeleteCard, onLike, handleImageClick);
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

// Закрытие модального окна кликом по оверлею
document.addEventListener('mousedown', (evt) => closeModalOverlay(evt));

//Закрытие модального окна по нажатию на клавишу Esc
document.addEventListener('keydown', closeModalEscape);

// Находим форму в DOM
const profileEditForm = profilePopup.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы
function handleFormProdileSubmit(evt) {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup, popups);
  evt.preventDefault();
}

profileEditForm.addEventListener('submit', handleFormProdileSubmit);

//Открытие модального окна
const addOpenButton = document.querySelector('.profile__add-button');
export const addNewCardPopup = document.querySelector('.popup_type_new-card');

function openAddPopup() {
  openModal(addNewCardPopup);
}

addOpenButton.addEventListener('click', openAddPopup);





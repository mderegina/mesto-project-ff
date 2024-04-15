let isModalOpen = false;

// Функция для открытия модального окна
export function openModal(popupElement) {
    popupElement.classList.add('popup_is-animated');
    popupElement.classList.add('popup_is-opened');
    isModalOpen = true;
    document.addEventListener('keydown', closeModalEscape);
}

//Функция для закрытия модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  isModalOpen = false;
  document.removeEventListener('keydown', closeModalEscape);
}

// Функция для закрытия модальных окон кликом по оверлею
export function closeModalOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
     closeModal(evt.target)
  }
}

// Функция для обработки события нажатия клавиши "Esc"
export function findOpenedPopup() {
  const openedPopup = document.querySelector('.popup.popup_is-opened');
  return openedPopup;
}

export function closeModalEscape(evt) {
  if (evt.key === 'Escape' && isModalOpen) {
    const openedPopup = findOpenedPopup();
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

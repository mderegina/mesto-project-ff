import { popups } from '/src/index.js';


export function openModal(popupElement) {
  popups.forEach(popup => {
    popupElement.classList.add('popup_is-animated');
    popupElement.classList.add('popup_is-opened');
  });
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

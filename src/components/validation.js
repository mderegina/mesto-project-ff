// Функция показа сообщения об ошибке
function showInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  if (errorElement) {
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = getErrorMessage(inputElement);
  }
}

// Функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  if (errorElement) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  }
}

// Функция проверки валидности поля ввода
function checkInputValidity(formElement, inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

// Функция для получения кастомного сообщения об ошибке
function getErrorMessage(inputElement) {
  if (inputElement.validity.valueMissing) {
    return "Вы пропустили это поле.";
  }
  if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
    return "Длина текста должна быть от " + inputElement.minLength + " до " + inputElement.maxLength + " символов.";
  }
  if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
    return "Введите правильный URL.";
  }
  if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(inputElement.value)) {
    return "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.";
  }
  return inputElement.validationMessage;
}

// Функция переключения состояния кнопки отправки формы
function toggleButtonState(inputs, button, validationConfig) {
  if (inputs.some((inputElement) => !inputElement.validity.valid)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// Функция установки слушателей событий на форму
const setEventListeners = (formElement, validationConfig) => {
  const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputs, button, validationConfig);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputs, button, validationConfig);
    });
  });
}

// Функция включения валидации
export const enableValidation = (validationConfig) => {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

// Функция очистки ошибок валидации
export function clearValidation(formElement, validationConfig) {
  const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputs.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputs, button, validationConfig);
}



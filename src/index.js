import './index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal, closeByOverlay } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfoApi, getCardsApi, editProfileApi, addNewCardApi, editAvatarApi } from './components/api';

const cardsContainer = document.querySelector('.places__list');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

const buttonAddCard = document.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formEditProfileButton = formEditProfile.querySelector('.popup__button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formAddCard = document.forms['new-place'];
const placeInput = formAddCard.elements['place-name'];
const imageInput = formAddCard.elements.link;
const formAddCardButton = formAddCard.querySelector('.popup__button');

const cardImageModal = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const profileAvatar = document.querySelector('.profile__image');

const modalEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = document.forms['new-avatar'];
const avatarInput = formEditAvatar.elements['avatar-url'];
const formEditAvatarButton = formEditAvatar.querySelector('.popup__button');

const modalArray = Array.from(document.querySelectorAll('.popup'));

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let userId;

const getUserInfo = (data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.style.backgroundImage = `url('${data.avatar}'`;
};

const getCards = (cards) => {
    cards.forEach((card) => {
        const cardId = card._id;
        cardsContainer.append(createCard(card, userId, cardId, deleteCard, likeCard, openImage));
    });
};

Promise.all([getUserInfoApi(), getCardsApi()])
.then(([data, cards]) => {
    userId = data._id;
    getUserInfo(data);
    getCards(cards);
})
.catch((err) => {
    console.log(err);
});

const renderLoading = (isLoading, button) => {
    const loadingText = 'Сохранение...';
    const defaultText = button.textContent;
    if (isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = defaultText;
    };
};

buttonEditProfile.addEventListener('click', function() {
    openModal(modalEditProfile);

    clearValidation(formEditProfile, validationConfig);

    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent;
});

buttonAddCard.addEventListener('click', function() {
    openModal(modalAddCard);

    clearValidation(formAddCard, validationConfig);
});

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    clearValidation(formEditProfile, validationConfig);
    renderLoading(true, formEditProfileButton);
    editProfileApi(nameInput.value, jobInput.value)
    .then((data) => {
        getUserInfo(data);
        closeModal(modalEditProfile);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, formEditProfileButton);
    })
};

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: placeInput.value,
        link: imageInput.value
    };

    renderLoading(true, formAddCardButton);
    addNewCardApi(newCard.name, newCard.link)
    .then((card) => {
        const cardId = card._id;
        cardsContainer.prepend(createCard (card, userId, cardId, deleteCard, likeCard, openImage));

        formAddCard.reset();

        clearValidation(formAddCard, validationConfig);
        closeModal(modalAddCard);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, formAddCardButton);
    })
};

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

function openImage(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    imageCaption.textContent = cardData.name;

    openModal(cardImageModal);
};

profileAvatar.addEventListener('click', function() {
    openModal(modalEditAvatar);
    clearValidation(formEditAvatar, validationConfig);
});

function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();

    const newAvatar = avatarInput.value;

    renderLoading(true, formEditAvatarButton);
    editAvatarApi(newAvatar)
    .then(() => {
        profileAvatar.style.backgroundImage = `url('${newAvatar}'`;
        clearValidation(formEditAvatar, validationConfig);
        closeModal(modalEditAvatar);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, formEditAvatarButton);
    })
};

formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

closeByOverlay(modalArray);

enableValidation(validationConfig);
import './index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

const cardsContainer = document.querySelector('.places__list');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const modalEditProfile = document.querySelector('.popup_type_edit');

const buttonAddCard = document.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formAddCard = document.forms['new-place'];
const placeInput = formAddCard.elements['place-name'];
const imageInput = formAddCard.elements.link;

const cardImageModal = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

initialCards.forEach(function (item) {
    cardsContainer.append(createCard (item, deleteCard, likeCard, openImage));
});

buttonEditProfile.addEventListener('click', function() {
    openModal(modalEditProfile);

    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent;
});

buttonAddCard.addEventListener('click', function() {
    openModal(modalAddCard);
});

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(modalEditProfile);
};

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: placeInput.value,
        link: imageInput.value
    };

    cardsContainer.prepend(createCard (newCard, deleteCard, likeCard, openImage));

    formAddCard.reset();

    closeModal(modalAddCard);
};

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

function openImage(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    imageCaption.textContent = cardData.name;

    openModal(cardImageModal);
};
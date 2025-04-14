import { deleteCardApi, putLikeApi, removeLikeApi } from "./api";

export function createCard(cardData, userId, cardId, deleteCard, likeCard, openImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeNumber = cardElement.querySelector('.card__like-number');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    likeNumber.textContent = cardData.likes.length;

    if (userId !== cardData.owner._id) {
        deleteButton.remove();
    };

    if (cardData.likes.some((item) => item._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    };
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement, cardId));
    likeButton.addEventListener('click', (evt) => likeCard(evt.target, cardId, likeNumber));
    cardImage.addEventListener('click', () => openImage({ name: cardData.name, link: cardData.link}));

    return cardElement;
};

export function deleteCard (cardElement, cardId) {
    deleteCardApi(cardId)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.log(err);
    });
};

export function likeCard(evt, cardId, likeNumber) {
    if (evt.classList.contains('card__like-button_is-active')) {
        removeLikeApi(cardId)
        .then((card) => {
            evt.classList.toggle('card__like-button_is-active');
            likeNumber.textContent = card.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        putLikeApi(cardId)
        .then((card) => {
            evt.classList.toggle('card__like-button_is-active');
            likeNumber.textContent = card.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
    };
};
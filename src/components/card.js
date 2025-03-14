export function createCard(cardData, deleteCard, likeCard, openImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.card');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', openImage);

    return cardElement;
};

export function deleteCard (evt) {
    const cardItem = evt.target.parentElement;
    cardItem.remove();
};

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};
export function createCard(cardData, deleteCard, likeCard, openImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => openImage({ name: cardData.name, link: cardData.link}));

    return cardElement;
};

export function deleteCard (cardElement) {
    cardElement.remove();
};

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};
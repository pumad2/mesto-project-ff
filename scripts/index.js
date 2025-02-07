const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.card');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

function deleteCard (evt) {
    const cardItem = evt.target.parentElement;
    cardItem.remove();
};

initialCards.forEach(function (item) {
    cardsContainer.append(createCard (item, deleteCard));
});
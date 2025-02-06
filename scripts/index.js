const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardName, cardLink, deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.card');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = cardName;
    cardImage.src = cardLink;
    
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

function deleteCard (evt) {
    let cardItem = evt.target.parentElement;
    cardItem.remove();
};

initialCards.forEach(function (item) {
    placesList.append(createCard (item.name, item.link, deleteCard));
});
const modalArray = Array.from(document.querySelectorAll('.popup'));

function closeWithEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    };
};

modalArray.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
            closeModal(item);
        }
    })
});

export function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeWithEsc);
};

export function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeWithEsc);
};
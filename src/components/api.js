const main = {
    url: 'https://nomoreparties.co/v1/wff-cohort-35',
    auth: 'bc6c70a4-519d-4ef1-970e-47c124ee5aa0'
};

const getResStatus = (res) => {
    if (res.ok) {
        return res.json();
    };

    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfoApi = () => {
    return fetch(`${main.url}/users/me`, {
        headers: {
            authorization: main.auth
        },
    })
    .then(getResStatus);
};

export const getCardsApi = () => {
    return fetch(`${main.url}/cards`, {
        headers: {
            authorization: main.auth
        },
    })
    .then(getResStatus);
};

export const editProfileApi = (name, description) => {
    return fetch(`${main.url}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: main.auth,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
    .then(getResStatus);
};

export const addNewCardApi = (imageName, imageUrl) => {
    return fetch(`${main.url}/cards`, {
        method: 'POST',
        headers: {
            authorization: main.auth,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: imageName,
            link: imageUrl
        })
    })
    .then(getResStatus);
};

export const deleteCardApi = (cardId) => {
    return fetch(`${main.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: main.auth
        }
    })
    .then(getResStatus);
};

export const putLikeApi = (cardId) => {
    return fetch(`${main.url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: main.auth
        }
    })
    .then(getResStatus);
};

export const removeLikeApi = (cardId) => {
    return fetch(`${main.url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: main.auth
        }
    })
    .then(getResStatus);
};

export const editAvatarApi = (avatarUrl) => {
    return fetch(`${main.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: main.auth,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(getResStatus);
};
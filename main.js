(()=>{"use strict";function e(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image"),a=r.querySelector(".card__delete-button"),d=r.querySelector(".card__like-button");return r.querySelector(".card__title").textContent=e.name,c.src=e.link,c.alt=e.name,a.addEventListener("click",(function(){return t(r)})),d.addEventListener("click",n),c.addEventListener("click",(function(){return o({name:e.name,link:e.link})})),r}function t(e){e.remove()}function n(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target.classList.contains("popup_is-opened"))&&c(e)}))}));var a=document.querySelector(".places__list"),d=document.querySelector(".profile__edit-button"),i=document.querySelector(".popup_type_edit"),s=document.querySelector(".profile__add-button"),p=document.querySelector(".popup_type_new-card"),u=document.forms["edit-profile"],l=u.elements.name,m=u.elements.description,_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),f=document.forms["new-place"],v=f.elements["place-name"],k=f.elements.link,q=document.querySelector(".popup_type_image"),S=document.querySelector(".popup__image"),g=document.querySelector(".popup__caption");function L(e){S.src=e.link,S.alt=e.name,g.textContent=e.name,r(q)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){a.append(e(o,t,n,L))})),d.addEventListener("click",(function(){r(i),l.value=_.textContent,m.value=y.textContent})),s.addEventListener("click",(function(){r(p)})),u.addEventListener("submit",(function(e){e.preventDefault(),_.textContent=l.value,y.textContent=m.value,c(i)})),f.addEventListener("submit",(function(o){o.preventDefault();var r={name:v.value,link:k.value};a.prepend(e(r,t,n,L)),f.reset(),c(p)}))})();
import Card from './Model/Card.js';
import CardList from './Model/CardList.js';
import CardListView from './View/CardListView.js';

import PopupAddCard from './Model/PopupAddCard.js';
import PopupAddCardView from './View/PopupAddCardView.js';

import PopupEditProfile from './Model/PopupEditProfile.js';
import PopupEditProfileView from './View/PopupEditProfileView.js';

import PopupShowImage from './Model/PopupShowImage.js';
import PopupShowImageView from './View/PopupShowImageView.js';

import Profile from './Model/Profile.js';
import ProfileView from './View/ProfileView.js';

// PROFILE
const profile = new Profile('Jaques Causteau', 'Sailor, Researcher');
const profileView = new ProfileView(profile);

profileView.render();

// CARDS
const cards = [
  new Card('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'),
  new Card('Челябинская область', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'),
  new Card('Иваново', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'),
  new Card('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'),
  new Card('Холмогорский район', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'),
  new Card('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'),
  new Card('Нургуш', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'),
  new Card('Тулиновка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'),
  new Card('Остров Желтухина', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'),
  new Card('Владивосток', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'),
];

const cardList = new CardList(cards);
const cardListContainer = document.querySelector('.places-list');
const cardListView = new CardListView(cardListContainer, cardList);

cardListView.render();

// POPUPS
const containerPopup = document.querySelector('.popup-container');

const buttonOpenPopupAddCard = document.querySelector('.user-info__button');
const popupAddCard = new PopupAddCard('add-card');
const popupAddCardView = new PopupAddCardView(containerPopup, buttonOpenPopupAddCard, popupAddCard);

const buttonOpenPopupEditProfile = document.querySelector('.button.user-info__edit');
const popupEditProfile = new PopupEditProfile('profile', {...profile});
const popupEditProfileView = new PopupEditProfileView(containerPopup, buttonOpenPopupEditProfile, popupEditProfile);

const popupShowImage = new PopupShowImage('big-size-image');
const popupShowImageView = new PopupShowImageView(containerPopup, null, popupShowImage);
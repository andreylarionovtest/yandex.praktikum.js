import EventAggregator from '../Event/EventAggregator.js';

class CardView {
  _element = null;
  _btnLike = null;

  constructor(card) {
    this._card = card;

    this._bindListeners();
  }

  create() {
    //формируем все элементы
    this._element = document.createElement("div");
    this._element.classList.add("place-card");

    const imgCard = document.createElement("div");
    imgCard.classList.add("place-card__image");
    imgCard.style.backgroundImage = `url(${this._card.imageSrc})`;

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("place-card__delete-icon");
    btnRemove.addEventListener('click', this._handleBtnRemoveClick.bind(this));

    const descCard = document.createElement("div");
    descCard.classList.add("place-card__description");

    const h3Card = document.createElement("h3");
    h3Card.classList.add("place-card__name");
    h3Card.textContent = this._card.name;

    const btnLike = document.createElement("button");
    btnLike.classList.add("place-card__like-icon");
    btnLike.addEventListener('click', this._handleBtnLikeClick.bind(this));
    if (this._card.favorite) {
      btnLike.classList.add('place-card__like-icon_liked');
    }
    this._btnLike = btnLike;

    //сливаем их в один
    this._element.appendChild(imgCard);
        imgCard.appendChild(btnRemove);
    this._element.appendChild(descCard);
        descCard.appendChild(h3Card);
        descCard.appendChild(btnLike);

    return this._element;
  }

  toggleLike() {
    if (this._card.favorite) {
      this._btnLike.classList.add('place-card__like-icon_liked');
    } else {
      this._btnLike.classList.remove('place-card__like-icon_liked');
    }
  }

  _handleBtnLikeClick() {
    EventAggregator.publish('CardView.like', this._card);
  }

  _handleBtnRemoveClick() {
    EventAggregator.publish('CardView.remove', this._card);
  }

  _bindListeners() {
    EventAggregator.subscribe('Card.like', this._onCardLike.bind(this));
  }
  _onCardLike(card) {
    if (this._card === card) {
      this.toggleLike();
    }
  }
}

export default CardView;
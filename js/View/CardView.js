import Observer from '../Observer/Observer.js';

class CardView {
  constructor(card) {
    this._card = card;
    this._element = null;
    this._btnLike = null;

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

    const descCard = document.createElement("div");
    descCard.classList.add("place-card__description");

    const h3Card = document.createElement("h3");
    h3Card.classList.add("place-card__name");
    h3Card.textContent = this._card.name;

    const btnLike = document.createElement("button");
    btnLike.classList.add("place-card__like-icon");
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

    btnRemove.addEventListener('click', this._handleBtnRemoveClick.bind(this));
    btnLike.addEventListener('click', this._handleBtnLikeClick.bind(this));
    imgCard.addEventListener('click', this._handleImageCardClick.bind(this));

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
    Observer.notify('CardView.like', this._card);
  }
  _handleBtnRemoveClick() {
    Observer.notify('CardView.remove', this._card);
  }
  _handleImageCardClick(e) {
    if (e.target.classList.contains('place-card__image')) {
      Observer.notify('CardView.showImage', this._card.imageSrc)
    }
  }

  _bindListeners() {
    Observer.subscribe('Card.like', this._onCardLike.bind(this));
  }
  _onCardLike(card) {
    if (this._card === card) {
      this.toggleLike();
    }
  }
}

export default CardView;
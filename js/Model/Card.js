import Observer from '../Observer/Observer.js';

class Card {
  constructor(name, imageSrc, favorite) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.favorite = favorite;

    this._bindListeners();
  }

  toggleLike() {
    this.favorite = !this.favorite;
    Observer.notify('Card.like', this);
  }
  remove() {
    Observer.notify('Card.remove', this);
  }

  _bindListeners() {
    Observer.subscribe('CardView.remove', this._onCardViewRemove.bind(this));
    Observer.subscribe('CardView.like', this._onCardViewLike.bind(this));
  }
  _onCardViewRemove(card) {
    if (this === card) {
      this.remove();
    }
  }
  _onCardViewLike(card) {
    if (this === card) {
      this.toggleLike();
    }
  }
}

export default Card;
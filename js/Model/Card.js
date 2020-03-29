import EventAggregator from '../Event/EventAggregator.js';

class Card {
  constructor(name, imageSrc, favorite) {
    this._name = name;
    this._imageSrc = imageSrc;
    this._favorite = favorite;

    this._bindListeners();
  }

  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }

  getImageSrc() {
    return this._imageSrc;
  }
  setImageSrc(imageSrc) {
    this._imageSrc = imageSrc;
  }

  isFavorite() {
    return this._favorite;
  }

  toggleLike() {
    this._favorite = !this._favorite;
    EventAggregator.publish('Card.like', this);
  }
  remove() {
    EventAggregator.publish('Card.remove', this);
  }

  _bindListeners() {
    EventAggregator.subscribe('CardView.remove', this._onCardViewRemove.bind(this));
    EventAggregator.subscribe('CardView.like', this._onCardViewLike.bind(this));
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
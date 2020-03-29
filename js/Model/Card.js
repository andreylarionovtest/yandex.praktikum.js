import EventAggregator from '../Event/EventAggregator.js';

class Card {
  constructor(name, imageSrc, favorite) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.favorite = favorite;

    this._bindListeners();
  }

  toggleLike() {
    this.favorite = !this.favorite;
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
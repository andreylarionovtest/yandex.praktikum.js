import EventAggregator from '../Event/EventAggregator.js';

class Card {
  constructor(name, imageSrc, favorite) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.favorite = favorite;

    this._bindListeners();
  }
  like () {
    this.favorite = !this.favorite;
  }
  remove() {
    EventAggregator.publish('Card.remove', this);
  }

  _bindListeners() {
    EventAggregator.subscribe('CardView.remove', this._onCardViewRemove.bind(this));
  }
  _onCardViewRemove(card) {
    console.log('onCardViewRemove');
    if (this === card) {
      this.remove();
    }
  }
}

export default Card;
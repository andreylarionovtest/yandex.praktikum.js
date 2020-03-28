import EventAggregator from '../Event/EventAggregator.js';

class CardList {
  constructor(cards) {
    this._cards = cards;

    this._bindListeners();
  }

  addCard(card) {
    this._cards.push(card);
    EventAggregator.publish('CardList.update', this._cards);
  }
  removeCard(card) {
    const index = this._cards.indexOf(card);
    this._cards[index] = null;
    delete(this._cards[index]);
    EventAggregator.publish('CardList.update', this._cards);
  }

  _bindListeners() {
    EventAggregator.subscribe('Card.remove', this._onCardRemoved.bind(this));
  }
  _onCardRemoved(card) {
    this.removeCard(card);
  }
}

export default CardList;
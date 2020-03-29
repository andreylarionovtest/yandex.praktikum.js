import EventAggregator from '../Event/EventAggregator.js';

class CardList {
  constructor(cards) {
    this._cards = cards;

    this._bindListeners();
  }

  getCards() {
    return this._cards;
  }
  addCard(card) {
    this._cards.push(card);
    EventAggregator.publish('CardList.update');
  }
  removeCard(card) {
    this._cards = this._cards.filter(function (_card) {
      return _card !== card;
    });
    EventAggregator.publish('CardList.update');
  }

  _bindListeners() {
    EventAggregator.subscribe('Card.remove', this._onCardRemoved.bind(this));
    EventAggregator.subscribe('PopupAddCard.submit', this._onPopupAddCardSubmit.bind(this));
  }
  _onCardRemoved(card) {
    this.removeCard(card);
  }
  _onPopupAddCardSubmit(card) {
    this.addCard(card);
  }
}

export default CardList;
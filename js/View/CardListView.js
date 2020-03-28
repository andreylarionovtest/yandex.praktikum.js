import EventAggregator from '../Event/EventAggregator.js';
import CardView from './CardView.js';

class CardListView {
  constructor(element) {
    this._element = element;
    this._bindListeners();
  }

  render(cards) {
    this._element.innerHTML = '';
    cards.forEach((card) => {
      this._element.appendChild((new CardView(card)).create());
    });
  }

  _bindListeners() {
    EventAggregator.subscribe('CardList.update', this._onCardListUpdate.bind(this))
  }
  _onCardListUpdate(cards) {
    this.render(cards);
  }
}

export default CardListView;
import Observer from '../Observer/Observer.js';
import CardView from './CardView.js';

class CardListView {
  constructor(element, cardList) {
    this._element = element;
    this._cardList = cardList;

    this._bindListeners();
  }

  render() {
    this._element.innerHTML = '';
    this._cardList.getCards().forEach((card) => {
      this._element.appendChild((new CardView(card)).create());
    });
  }

  _bindListeners() {
    Observer.subscribe('CardList.update', this._onCardListUpdate.bind(this))
  }
  _onCardListUpdate() {
    this.render();
  }
}

export default CardListView;
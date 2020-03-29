import Popup from './Popup.js';
import Card from './Card.js';

class PopupAddCard extends Popup {
  _model = new Card();
  bindListeners() {
    super.bindListeners();
    this._eventAggregator.subscribe('PopupAddCardView.InputName.input', this._onInputNameInput.bind(this));
    this._eventAggregator.subscribe('PopupAddCardView.InputLink.input', this._onInputLinkInput.bind(this));
    this._eventAggregator.subscribe('PopupAddCardView.Form.submit', this._onFormSubmit.bind(this));
    this._eventAggregator.subscribe('CardList.update', this._onCardListUpdate.bind(this));
  }

  _onInputNameInput(value) {
    this._model.setName(value);
    this._validate()
  }
  _onInputLinkInput(value) {
    this._model.setImageSrc(value);
    this._validate()
  }
  _onFormSubmit() {
    this._eventAggregator.publish('PopupAddCard.submit', this._model);
  }
  _onCardListUpdate() {
    this.close();
  }
  open() {
    super.open();
    this._model = new Card();
  }

  _validate() {
    console.log(this._model);
    const errors = {
      name: 'Это обязательное поле',
      imageSrc: 'Здесь должна быть ссылка'
    };
    this._eventAggregator.publish('PopupAddCard.validate', errors);
  }
}

export default PopupAddCard;
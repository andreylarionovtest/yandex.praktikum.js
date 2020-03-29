import Popup from './Popup.js';
import Card from './Card.js';

class PopupAddCard extends Popup {
  _model = new Card();
  bindListeners() {
    super.bindListeners();
    this.getObserver().subscribe('PopupAddCardView.InputName.input', this._onInputNameInput.bind(this));
    this.getObserver().subscribe('PopupAddCardView.InputLink.input', this._onInputLinkInput.bind(this));
    this.getObserver().subscribe('PopupAddCardView.Form.submit', this._onFormSubmit.bind(this));
    this.getObserver().subscribe('CardList.update', this._onCardListUpdate.bind(this));
  }

  open() {
    super.open();
    this._model = new Card();
    this._validate();
  }

  _onInputNameInput(value) {
    this._model.name = value;
    this._validate()
  }
  _onInputLinkInput(value) {
    this._model.imageSrc = value;
    this._validate()
  }
  _onFormSubmit() {
    if (! this.isValid()) {
      return;
    }
    this.getObserver().notify('PopupAddCard.submit', this._model);
  }
  _onCardListUpdate() {
    this.close();
  }

  _validateUrl(propName, value) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    const isValid = !!pattern.test(value);

    if (! isValid) {
      this._errors[propName] = 'Здесь должна быть ссылка';
      return;
    }

    if (this._errors.hasOwnProperty(propName)) {
      delete(this._errors[propName]);
    }
  }

  _validate() {
    this.validateLength('name', this._model.name, 2, 30);
    this._validateUrl('imageSrc', this._model.imageSrc, 2, 30);
    this.getObserver().notify('PopupAddCard.validate');
  }
}

export default PopupAddCard;
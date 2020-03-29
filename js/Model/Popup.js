import EventAggregator from '../Event/EventAggregator.js';

class Popup {
  _visible = false;
  _model = null;
  _eventAggregator = EventAggregator;
  _errors = {};

  constructor(id) {
    this._id = id;
    this.bindListeners();
  }

  open() {
    this._visible = true;
    this._eventAggregator.publish('Popup.open', this);
  }
  close() {
    this._visible = false;
    this._eventAggregator.publish('Popup.close', this);
  }
  getId() {
    return this._id;
  }
  getModel() {
    return this._model;
  }
  getErrors() {
    return this._errors;
  }

  validateLength(propName, value, min, max) {
    if (! value) {
      this._errors[propName] = 'Это обязательное поле';
      return;
    }
    if (value.length < min || value.length > max) {
      this._errors[propName] = 'Должно быть от 2 до 30 символов';
      return;
    }
    if (this._errors.hasOwnProperty(propName)) {
      delete(this._errors[propName]);
    }
  }
  isValid() {
    return Object.entries(this._errors).length === 0;
  }

  bindListeners() {
    this._eventAggregator.subscribe('PopupView.open', this._onPopupViewOpen.bind(this));
    this._eventAggregator.subscribe('PopupView.close', this._onPopupViewClose.bind(this));
  }
  _onPopupViewOpen(popup) {
    if (this.getId() === popup.getId()) {
      this.open();
    }
  }
  _onPopupViewClose(popup) {
    if (this.getId() === popup.getId()) {
      this.close();
    }
  }
}

export default Popup;
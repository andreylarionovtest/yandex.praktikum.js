import Observer from '../Observer/Observer.js';

class Popup {
  constructor(id) {
    this._model = null;
    this._observer = Observer;
    this._errors = {};
    this._id = id;
    this.bindListeners();
  }

  open() {
    this.getObserver().notify('Popup.open', this);
  }
  close() {
    this.getObserver().notify('Popup.close', this);
  }
  getId() {
    return this._id;
  }
  getModel() {
    return this._model;
  }
  getObserver() {
    return this._observer;
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
    this.getObserver().subscribe('PopupView.open', this._onPopupViewOpen.bind(this));
    this.getObserver().subscribe('PopupView.close', this._onPopupViewClose.bind(this));
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
import EventAggregator from '../Event/EventAggregator.js';

class Popup {
  _visible = false;
  _model = null;
  _eventAggregator = EventAggregator;

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
  isVisible() {
    return this._visible;
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
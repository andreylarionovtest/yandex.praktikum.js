import EventAggregator from '../Event/EventAggregator.js';

class PopupView {
  _eventAggregator = EventAggregator;
  _root = null;
  _content = null;
  _openButton = null;
  _closeButton = null;

  constructor(container, openButton, state) {
    this._container = container;
    this._state = state;
    this._openButton = openButton;

    this._makePopupView();
    this.bindListeners();
    this.bindDOMListeners();
  }

  open() {
    this._root.classList.add('popup_is-opened');
  }
  close() {
    this._root.classList.remove('popup_is-opened');
  }
  render() {
    this._content.innerHTML = '';
    this._content.appendChild(this.getContent());
  }
  getContent() {
    const content = document.createElement('h1');
    content.textContent = 'PopupView';

    return content;
  }
  getState() {
    return this._state;
  }

  bindListeners() {
    this._eventAggregator.subscribe('Popup.open', this._onPopupOpen.bind(this));
    this._eventAggregator.subscribe('Popup.close', this._onPopupClose.bind(this));
  }
  bindDOMListeners() {
    if (this._openButton) {
      this._openButton.addEventListener('click', this._handleOpenButtonClick.bind(this));
    }
    this._closeButton.addEventListener('click', this._handleCloseButtonClick.bind(this));
  }

  _onPopupOpen(state) {
    if (state.getId() === this._state.getId()) {
      this.render();
      this.open();
    }
  }
  _onPopupClose(state) {
    if (state.getId() === this._state.getId()) {
      this.close();
    }
  }

  _handleOpenButtonClick() {
    this._eventAggregator.publish('PopupView.open', this._state);
  }
  _handleCloseButtonClick() {
    this._eventAggregator.publish('PopupView.close', this._state);
  }

  _makePopupView() {
    const popupView = document.createElement('div');
    popupView.classList.add('popup');
    if (this._state.isVisible()) {
      popupView.classList.add('popup_is-opened');
    }

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup__content');
    popupView.appendChild(popupContent);

    const popupClose = document.createElement('img');
    popupClose.classList.add('popup__close');
    popupClose.src = './images/close.svg';
    this._closeButton = popupClose;
    popupContent.appendChild(popupClose);

    const popupContentInner = document.createElement('div');
    popupContentInner.classList.add('popup__content-inner');
    this._content = popupContentInner;
    popupContent.appendChild(popupContentInner);

    this._root = popupView;
    this._container.appendChild(popupView);
  }
}

export default PopupView;
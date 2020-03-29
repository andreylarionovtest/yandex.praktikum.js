import Observer from '../Observer/Observer.js';

class PopupView {
  constructor(container, openButton, state) {
    this._container = container;
    this._state = state;
    this._observer = Observer;
    this._root = null;
    this._content = null;
    this._openButton = openButton;
    this._closeButton = null;

    this.makeRootElement();
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
  getObserver() {
    return this._observer;
  }

  bindListeners() {
    this.getObserver().subscribe('Popup.open', this._onPopupOpen.bind(this));
    this.getObserver().subscribe('Popup.close', this._onPopupClose.bind(this));
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
    this.getObserver().notify('PopupView.open', this._state);
  }
  _handleCloseButtonClick() {
    this.getObserver().notify('PopupView.close', this._state);
  }

  makeRootElement() {
    const root = document.createElement('div');
    root.classList.add('popup');

    root.innerHTML = `
      <div class="popup__content">
          <img src="./images/close.svg" alt="" class="popup__close">
          <div class="popup__content-inner"></div>
      </div>`;

    this._root = root;
    this._closeButton = this._root.querySelector('.popup__close');
    this._content = this._root.querySelector('.popup__content-inner');
    this._container.appendChild(root);
  }
}

export default PopupView;
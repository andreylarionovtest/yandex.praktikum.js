import PopupView from './PopupView.js';

class PopupShowImageView extends PopupView {
  makeRootElement() {
    const root = document.createElement('div');
    root.classList.add('popup');

    root.innerHTML = `
      <div class="popup__content-image">
          <img src="./images/close.svg" alt="" class="popup__close">
          <img class="popup__image">
      </div>`;

    this._root = root;
    this._closeButton = this._root.querySelector('.popup__close');
    this._img = this._root.querySelector('.popup__image');
    this._container.appendChild(root);
  }
  render() {
    this._img.src = this.getState().imageSrc;
  }
}

export default PopupShowImageView;
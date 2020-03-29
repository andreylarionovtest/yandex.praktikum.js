import Popup from './Popup.js';

class PopupShowImage extends Popup {
  imageSrc = null;
  bindListeners() {
    super.bindListeners();
    this._eventAggregator.subscribe('CardView.showImage', this._onCardViewShowImage.bind(this));
  }

  _onCardViewShowImage(imageSrc) {
    this.imageSrc = imageSrc;
    this.open();
  }
}

export default PopupShowImage;
import PopupView from './PopupView.js';

class PopupShowImageView extends PopupView {
  getContent() {
    const content = document.createElement('div');
    content.textContent = 'PopupShowImageView';

    return content;
  }
}

export default PopupShowImageView;
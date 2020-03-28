import PopupView from './PopupView.js';

class PopupAddCardView extends PopupView {
  getContent() {
    const content = document.createElement('div');
    content.textContent = 'PopupAddCardView';

    return content;
  }
}

export default PopupAddCardView;
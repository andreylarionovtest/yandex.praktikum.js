import PopupView from './PopupView.js';

class PopupEditProfileView extends PopupView {
  getContent() {
    const content = document.createElement('div');
    content.textContent = 'PopupEditProfileView';

    return content;
  }
}

export default PopupEditProfileView;
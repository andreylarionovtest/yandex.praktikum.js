import PopupView from './PopupView.js';

class PopupAddCardView extends PopupView {
  getContent() {
    const content = document.createElement('div');
    content.classList.add('popup__form-wrapper');

    content.innerHTML =
      `<h3 class="popup__title">Новое место</h3>
      <form class="popup__form" name="new">
          <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название">
          <div class="popup__input-error" aria-live="polite" id="error-card-name"></div>
          <input type="text" name="link" class="popup__input popup__input_type_link-url"
                 placeholder="Ссылка на картинку">
          <div class="popup__input-error" aria-live="polite" id="error-card-link"></div>
          <button type class="button popup__button">+</button>
      </form>`;

    const inputName = content.querySelector('.popup__input_type_name');
    inputName.addEventListener('input', this._handleInputNameInput.bind(this));

    const inputLink = content.querySelector('.popup__input_type_link-url');
    inputLink.addEventListener('input', this._handleInputLinkInput.bind(this));

    const form = content.querySelector('form');
    form.addEventListener('submit', this._handleFormSubmit.bind(this));

    return content;
  }

  bindListeners() {
    super.bindListeners();
    this._eventAggregator.subscribe('PopupAddCard.validate', this._onCardValidate.bind(this));
  }

  _onCardValidate(errors) {
    this._renderErrors(errors);
  }

  _handleInputNameInput(event) {
    this._eventAggregator.publish('PopupAddCardView.InputName.input', event.currentTarget.value);
  }
  _handleInputLinkInput(event) {
    this._eventAggregator.publish('PopupAddCardView.InputLink.input', event.currentTarget.value);
  }
  _handleFormSubmit(event) {
    event.preventDefault();
    this._eventAggregator.publish('PopupAddCardView.Form.submit');
  }

  _renderErrors(errors) {
    console.log(errors);
  }
}

export default PopupAddCardView;
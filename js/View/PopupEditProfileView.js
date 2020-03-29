import PopupView from './PopupView.js';

class PopupEditProfileView extends PopupView {
  getContent() {
    const content = document.createElement('div');
    content.classList.add('popup__form-wrapper');

    content.innerHTML =
      `<h3 class="popup__title">Редактировать профиль</h3>
      <form class="popup__form" name="profile">
          <input type="text" name="name" class="popup__input" placeholder="Имя">
          <div class="popup__input-error" aria-live="polite" id="error-profile-name"></div>
          <input type="text" name="job" class="popup__input" placeholder="О себе">
          <div class="popup__input-error" aria-live="polite" id="error-profile-job"></div>
          <button type class="button popup__button popup__button_text18">Сохранить</button>
      </form>`;

    const inputName = content.querySelector('input[name="name"]');
    inputName.addEventListener('input', this._handleInputNameInput.bind(this));

    const inputJob = content.querySelector('input[name="job"]');
    inputJob.addEventListener('input', this._handleInputJobInput.bind(this));

    const form = content.querySelector('form');
    form.addEventListener('submit', this._handleFormSubmit.bind(this));

    return content;
  }

  bindListeners() {
    super.bindListeners();
    this._eventAggregator.subscribe('PopupEditProfile.validate', this._onProfileValidate.bind(this));
  }

  _onProfileValidate(errors) {
    this._renderErrors(errors);
  }

  _handleInputNameInput(event) {
    this._eventAggregator.publish('PopupEditProfileView.InputName.input', event.currentTarget.value);
  }
  _handleInputJobInput(event) {
    this._eventAggregator.publish('PopupEditProfileView.InputJob.input', event.currentTarget.value);
  }
  _handleFormSubmit(event) {
    event.preventDefault();
    this._eventAggregator.publish('PopupEditProfileView.Form.submit');
  }

  _renderErrors(errors) {
    console.log(errors);
  }
}

export default PopupEditProfileView;
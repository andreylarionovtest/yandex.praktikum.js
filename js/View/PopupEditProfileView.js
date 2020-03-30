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
    inputName.value = this.getState().getModel().name;

    const inputJob = content.querySelector('input[name="job"]');
    inputJob.addEventListener('input', this._handleInputJobInput.bind(this));
    inputJob.value = this.getState().getModel().job;

    const form = content.querySelector('form');
    form.addEventListener('submit', this._handleFormSubmit.bind(this));

    return content;
  }

  bindListeners() {
    super.bindListeners();
    this.getObserver().subscribe('PopupEditProfile.validate', this._onProfileValidate.bind(this));
  }

  _onProfileValidate() {
    this.handleErrors();
  }

  _handleInputNameInput(event) {
    this.getObserver().notify('PopupEditProfileView.InputName.input', event.currentTarget.value);
  }
  _handleInputJobInput(event) {
    this.getObserver().notify('PopupEditProfileView.InputJob.input', event.currentTarget.value);
  }
  _handleFormSubmit(event) {
    event.preventDefault();
    this.getObserver().notify('PopupEditProfileView.Form.submit');
  }

  handleErrors() {
    this.toggleSubmitButton();
    this.renderErrors();
  }
  renderErrors() {
    const nameErrorElement = document.forms.profile.name.nextElementSibling;
    const jobErrorElement = document.forms.profile.job.nextElementSibling;
    const errors = this.getState().getErrors();

    nameErrorElement.textContent = errors.name || '';
    jobErrorElement.textContent = errors.job || '';
  }
}

export default PopupEditProfileView;
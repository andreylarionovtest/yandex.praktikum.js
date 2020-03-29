import PopupView from './PopupView.js';

class PopupAddCardView extends PopupView {
  getContent() {
    const content = document.createElement('div');
    content.classList.add('popup__form-wrapper');

    const title = document.createElement('h3');
    title.classList.add('popup__title');
    title.textContent = 'Новое место';
    content.appendChild(title);

    const form = document.createElement('form');
    form.classList.add('popup__form');
    form.name = 'new';
    content.appendChild(form);

    const inputName = document.createElement('input');
    inputName.classList.add('popup__input');
    inputName.classList.add('popup__input_type_name');
    inputName.placeholder = 'Название';
    inputName.type = 'text';
    inputName.name = 'name';
    form.appendChild(inputName);

    inputName.addEventListener('input', this._handleInputNameInput.bind(this));

    const inputLink = document.createElement('input');
    inputLink.classList.add('popup__input');
    inputLink.classList.add('popup__input_type_link-url');
    inputLink.placeholder = 'Ссылка на картинку';
    inputLink.type = 'text';
    inputLink.name = 'link';
    form.appendChild(inputLink);

    inputLink.addEventListener('input', this._handleInputLinkInput.bind(this));

    const btnSubmit = document.createElement('button');
    btnSubmit.textContent = '+';
    btnSubmit.classList.add('button');
    btnSubmit.classList.add('popup__button');
    form.appendChild(btnSubmit);

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
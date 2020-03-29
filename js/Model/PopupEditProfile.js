import Popup from './Popup.js';

class PopupEditProfile extends Popup {
  constructor(id, model) {
    super(id);
    this._model = model;
  }
  bindListeners() {
    super.bindListeners();
    this._eventAggregator.subscribe('PopupEditProfileView.InputName.input', this._onInputNameInput.bind(this));
    this._eventAggregator.subscribe('PopupEditProfileView.InputJob.input', this._onInputJobInput.bind(this));
    this._eventAggregator.subscribe('PopupEditProfileView.Form.submit', this._onFormSubmit.bind(this));
    this._eventAggregator.subscribe('Profile.update', this._onProfileUpdate.bind(this));
  }

  _onInputNameInput(value) {
    this._model.name = value;
    this._validate()
  }
  _onInputJobInput(value) {
    this._model.job = value;
    this._validate()
  }
  _onFormSubmit() {
    this._eventAggregator.publish('PopupEditProfile.submit', this._model);
    this.close()
  }
  _onProfileUpdate(model) {
    this._model = model;
  }
  close() {
    super.close();
    this._eventAggregator.publish('PopupEditProfile.close');
  }

  _validate() {
    console.log(this._model);
    const errors = {
      name: 'Это обязательное поле',
      job: 'Это обязательное поле'
    };
    this._eventAggregator.publish('PopupEditProfile.validate', errors);
  }
}

export default PopupEditProfile;
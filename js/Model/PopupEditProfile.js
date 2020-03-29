import Popup from './Popup.js';

class PopupEditProfile extends Popup {
  constructor(id, model) {
    super(id);
    this._model = model;
  }
  bindListeners() {
    super.bindListeners();
    this.getObserver().subscribe('PopupEditProfileView.InputName.input', this._onInputNameInput.bind(this));
    this.getObserver().subscribe('PopupEditProfileView.InputJob.input', this._onInputJobInput.bind(this));
    this.getObserver().subscribe('PopupEditProfileView.Form.submit', this._onFormSubmit.bind(this));
    this.getObserver().subscribe('Profile.update', this._onProfileUpdate.bind(this));
  }

  _onInputNameInput(value) {
    this._model.name = value;
    this._validate();
  }
  _onInputJobInput(value) {
    this._model.job = value;
    this._validate();
  }
  _validate() {
    this.validateLength('name', this._model.name, 2, 30);
    this.validateLength('job', this._model.job, 2, 30);
    this.getObserver().notify('PopupEditProfile.validate');
  }
  _onFormSubmit() {
    if (! this.isValid()) {
      return;
    }
    this.getObserver().notify('PopupEditProfile.submit', this._model);
    this.close()
  }
  _onProfileUpdate(model) {
    this._model = model;
  }
  close() {
    super.close();
    this.getObserver().notify('PopupEditProfile.close');
  }
  open() {
    super.open();
    this._validate();
  }
}

export default PopupEditProfile;
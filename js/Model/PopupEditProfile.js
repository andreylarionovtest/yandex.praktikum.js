import Popup from './Popup.js';
import Profile from './Profile.js';

class PopupEditProfile extends Popup {
  _model = new Profile();
  bindListeners() {
    super.bindListeners();
    this._eventAggregator.subscribe('PopupEditProfileView.InputName.input', this._onInputNameInput.bind(this));
    this._eventAggregator.subscribe('PopupEditProfileView.InputJob.input', this._onInputJobInput.bind(this));
    this._eventAggregator.subscribe('PopupEditProfileView.Form.submit', this._onFormSubmit.bind(this));
    this._eventAggregator.subscribe('Profile.update', this._onProfileUpdate.bind(this));
  }

  _onInputNameInput(value) {
    this._model.setName(value);
    this._validate()
  }
  _onInputJobInput(value) {
    this._model.setJob(value);
    this._validate()
  }
  _onFormSubmit() {
    this._eventAggregator.publish('PopupEditProfile.submit', this._model);
  }
  _onProfileUpdate() {
    this.close();
  }
  open() {
    super.open();
    this._model = new Profile();
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
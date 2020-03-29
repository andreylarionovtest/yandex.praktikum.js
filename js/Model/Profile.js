import Observer from '../Observer/Observer.js';

class Profile {
  constructor(name, job) {
    this.name = name;
    this.job = job;

    this._bindListeners();
  }

  _bindListeners() {
    Observer.subscribe('PopupEditProfile.submit', this._onPopupEditProfileSubmit.bind(this));
    Observer.subscribe('PopupEditProfile.close', this._onPopupEditProfileOpen.bind(this));
  }

  _onPopupEditProfileSubmit(profile) {
    this.name = profile.name;
    this.job = profile.job;

    Observer.notify('Profile.update', {...this});
  }
  _onPopupEditProfileOpen() {
    Observer.notify('Profile.update', {...this});
  }
}

export default Profile;
import EventAggregator from '../Event/EventAggregator.js';

class Profile {
  constructor(name, job) {
    this.name = name;
    this.job = job;

    this._bindListeners();
  }

  _bindListeners() {
    EventAggregator.subscribe('PopupEditProfile.submit', this._onPopupEditProfileSubmit.bind(this));
    EventAggregator.subscribe('PopupEditProfile.close', this._onPopupEditProfileOpen.bind(this));
  }

  _onPopupEditProfileSubmit(profile) {
    this.name = profile.name;
    this.job = profile.job;

    EventAggregator.publish('Profile.update', {...this});
  }
  _onPopupEditProfileOpen() {
    EventAggregator.publish('Profile.update', {...this});
  }
}

export default Profile;
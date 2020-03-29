import EventAggregator from '../Event/EventAggregator.js';

class Profile {
  constructor(name, job) {
    this._name = name;
    this._job = job;

    this._bindListeners();
  }

  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
  getJob() {
    return this._job;
  }
  setJob(job) {
    this._job = job;
  }

  _bindListeners() {
    EventAggregator.subscribe('PopupEditProfile.submit', this._onPopupEditProfileSubmit.bind(this));
  }

  _onPopupEditProfileSubmit(profile) {
    this.setName(profile.getName());
    this.setJob(profile.getJob());
    EventAggregator.publish('Profile.update');
  }
}

export default Profile;
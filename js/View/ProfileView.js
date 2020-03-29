import EventAggregator from '../Event/EventAggregator.js';

class ProfileView {
  _nameElement = document.querySelector('.user-info__name');
  _jobElement = document.querySelector('.user-info__job');

  constructor(profile) {
    this._profile = profile;

    this._bindListeners();
  }

  render() {
    this._nameElement.textContent = this.getProfile().getName();
    this._jobElement.textContent = this.getProfile().getJob();
  }
  getProfile() {
    return this._profile;
  }

  _bindListeners() {
    EventAggregator.subscribe('Profile.update', this._onProfileUpdate.bind(this));
  }

  _onProfileUpdate() {
    this.render();
  }

}

export default ProfileView;
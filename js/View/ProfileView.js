import EventAggregator from '../Event/EventAggregator.js';

class ProfileView {
  _nameElement = document.querySelector('.user-info__name');
  _jobElement = document.querySelector('.user-info__job');

  constructor(profile) {
    this._profile = profile;
  }

  render() {
    this._nameElement.textContent = this.getProfile().getName();
    this._jobElement.textContent = this.getProfile().getJob();
  }
  getProfile() {
    return this._profile;
  }

}

export default ProfileView;
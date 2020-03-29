import Observer from '../Observer/Observer.js';

class ProfileView {
  _nameElement = document.querySelector('.user-info__name');
  _jobElement = document.querySelector('.user-info__job');

  constructor(profile) {
    this._profile = profile;

    this._bindListeners();
  }

  render() {
    this._nameElement.textContent = this._profile.name;
    this._jobElement.textContent = this._profile.job;
  }

  _bindListeners() {
    Observer.subscribe('Profile.update', this._onProfileUpdate.bind(this));
  }

  _onProfileUpdate() {
    this.render();
  }

}

export default ProfileView;
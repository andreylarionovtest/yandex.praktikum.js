import EventAggregator from '../Event/EventAggregator.js';

class Profile {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getName() {
    return this._name;
  }
  getJob() {
    return this._job;
  }
}

export default Profile;
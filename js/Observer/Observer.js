import Event from './Event.js';

class Observer {
  constructor() {
    this._events = [];
  }
  notify(eventName, eventArgs) {
    let event = this._getEvent(eventName);

    if (!event) {
      event = new Event(eventName);
      this._events.push(event);
    }
    event.fire(eventArgs);
  }
  subscribe(eventName, handler) {
    let event = this._getEvent(eventName);

    if (!event) {
      event = new Event(eventName);
      this._events.push(event);
    }
    event.addHandler(handler);
  }

  _getEvent(eventName) {
    return this._events.filter(function (event) {
      return event.name === eventName;
    })[0];
  }
}

export default new Observer;
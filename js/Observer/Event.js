class Event {
  constructor(name) {
    this._handlers = [];
    this.name = name;
  }
  addHandler(handler) {
    this._handlers.push(handler);
  }
  removeHandler(handler) {
    for (let i = 0; i < this._handlers.length; i++) {
      if (this._handlers[i] === handler) {
        this._handlers.splice(i, 1);
        break;
      }
    }
  }
  fire(eventArgs) {
    this._handlers.forEach(function(h) {
      h(eventArgs);
    });
  }
}

export default Event;
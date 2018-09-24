// message class
class Message {
  // constructor
  constructor(key, value, language, status) {
    this._key = key
    this._value = value
    this._language = language
    this._status = status
  }

  // getters & setters
  get key() {
    return this._key
  }
  set key(key) {
    this._key = key
  }
  get value() {
    return this._value
  }
  set value(value) {
    this._value = value
  }
  get language() {
    return this._language
  }
  set language(language) {
    this._language = language
  }
  get status() {
    return this._status
  }
  set status(status) {
    this._status = status
  }

  // to string
  toString() {
    return `(
      key : ${this._key}, 
      value : ${this._value} , 
      language : ${this._language},
      status : ${this._status}
    )`
  }
}

export default Message
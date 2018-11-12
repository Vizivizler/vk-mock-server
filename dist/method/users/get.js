"use strict";

var _db = _interopRequireDefault(require("../../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

module.exports = function get() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cb = arguments.length > 1 ? arguments[1] : undefined;

  _db.default.get('users', function (err, value) {
    if (err) return console.log('Ooops!', err);
    var userIds = params['user_ids'].replace(/\s/g, '').split(',');
    var fields = ['id', 'first_name', 'last_name'];

    if (params['fields']) {
      var paramFields = params['fields'].replace(/\s/g, '').split(',');
      fields = _toConsumableArray(fields).concat(_toConsumableArray(paramFields));
    }

    var users = value.filter(function (e) {
      return userIds.indexOf(String(e['id'])) !== -1;
    });
    users = users.map(function (e, i) {
      var obj = {};
      fields.forEach(function (el) {
        if (e[el]) {
          obj[el] = e[el];
        }
      });
      return obj;
    });
    cb(users);
  });
};
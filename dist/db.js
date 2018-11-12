"use strict";

var _level = _interopRequireDefault(require("level"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _level.default)('./vkDB', {
  valueEncoding: 'json'
});
module.exports = db;
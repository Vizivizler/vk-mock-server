"use strict";

var users = _interopRequireWildcard(require("./users"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function ReqApi(method, query) {
    _classCallCheck(this, ReqApi);

    this.category = method[0];
    this.name = method[1];
    this.query = query;
  }
  /**
   * Верет в функцию результат запроса или ошибку
   * @param cb Function
   */


  _createClass(ReqApi, [{
    key: "getResult",
    value: function getResult(cb) {
      _db.default.get(this.category + "." + this.name, function (err, value) {
        console.log(value);
        return cb(value);
      }); // let data = null;
      //
      // switch (this.category) {
      //     case "users" :
      //         users[this.name](this.query, function (r) {
      //             return cb(r);
      //         });
      //         break;
      //     default:
      //         //nop
      // }

    }
  }]);

  return ReqApi;
}();
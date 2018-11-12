"use strict";

var _db = _interopRequireDefault(require("../db"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function Connect(method, query) {
    _classCallCheck(this, Connect);

    this.method = method;
    this.query = query;
  }
  /**
   * Верет в функцию результат запроса или ошибку
   * @param cb Function
   */


  _createClass(Connect, [{
    key: "getResult",
    value: function getResult(cb) {
      var _this = this;

      switch (this.method) {
        case "VKWebAppInit":
          cb({});
          break;

        case "VKWebAppGetUserInfo":
          _db.default.get('VKWebAppGetUserInfo', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppGetUserInfoFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppGetUserInfoResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppGetPhoneNumber":
          _db.default.get('VKWebAppGetPhoneNumber', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppGetPhoneNumberFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppGetPhoneNumberResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppGetEmail":
          _db.default.get('VKWebAppGetEmail', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppGetEmailFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppGetEmailResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppGetGeodata":
          _db.default.get('VKWebAppGetGeodata', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppGeodataFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppGeodataResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppGetAuthToken":
          if (!this.query['mkvk_app_id'] || !this.query['mkvk_user_id']) {
            return cb({
              type: "VKWebAppAccessTokenFailed",
              data: {
                error_type: 'api_error',
                error_data: {
                  error_code: 5,
                  error_msg: 'Не переданы параметры, для работы mocks сервера необходима настроить conncet и передать vk_user_id и vk_app_id',
                  request_params: []
                }
              }
            });
          }

          _db.default.get('all_tokens', function (err, value) {
            // Проверка, есть ли токен у юзера
            if (_this.query['mk_check']) {
              if (value && value[_this.query['mkvk_app_id']] && value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]) {
                var _obj = {
                  type: "VKWebAppAccessTokenReceived",
                  data: value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]
                };
                return cb(_obj);
              }

              return cb(null);
            }

            if (!value) {
              var val = {};
              val[_this.query['mkvk_app_id']] = {};
              val[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']] = {
                access_token: _crypto.default.randomBytes(48).toString('hex'),
                scope: _this.query['scope'] ? _this.query['scope'] : "",
                requested_scope: _this.query['mk_requested_scope'] ? _this.query['mk_requested_scope'] : ""
              };

              _db.default.put('all_tokens', val, function (err) {
                if (err) return console.log('Ooops!', err);
              });

              value = val;
            }

            if (value && !value[_this.query['mkvk_app_id']]) {
              value[_this.query['mkvk_app_id']] = {};
              value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']] = {
                access_token: _crypto.default.randomBytes(48).toString('hex'),
                scope: _this.query['scope'] ? _this.query['scope'] : "",
                requested_scope: _this.query['mk_requested_scope'] ? _this.query['mk_requested_scope'] : ""
              };

              _db.default.put('all_tokens', value, function (err) {
                if (err) return console.log('Ooops!', err);
              });
            }

            if (value && value[_this.query['mkvk_app_id']] && !value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]) {
              value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']] = {
                access_token: _crypto.default.randomBytes(48).toString('hex'),
                scope: _this.query['scope'] ? _this.query['scope'] : "",
                requested_scope: _this.query['mk_requested_scope'] ? _this.query['mk_requested_scope'] : ""
              };

              _db.default.put('all_tokens', value, function (err) {
                if (err) return console.log('Ooops!', err);
              });
            }

            if (value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]['scope'] !== _this.query['scope']) {
              value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]['access_token'] = _crypto.default.randomBytes(48).toString('hex');
              value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]['scope'] = _this.query['scope'];
              value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]['requested_scope'] = _this.query['mk_requested_scope'] ? _this.query['mk_requested_scope'] : "";

              _db.default.put('all_tokens', value, function (err) {
                if (err) return console.log('Ooops!', err);
              });
            }

            var obj = {
              type: "VKWebAppAccessTokenReceived",
              data: value[_this.query['mkvk_app_id']][_this.query['mkvk_user_id']]
            };
            cb(obj);
          });

          break;

        case "VKWebAppCallAPIMethod":
          // TODO
          // Уже делает запрос на прямую к методу, не нужно не чего
          break;

        case "VKWebAppShare":
          _db.default.get('VKWebAppShare', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppShareFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppShareResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppShowWallPostBox":
          _db.default.get('VKWebAppShowWallPostBox', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppShowWallPostBoxFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppShowWallPostBoxResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppGetClientVersion":
          _db.default.get('VKWebAppGetClientVersion', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppGetClientVersionResult",
                data: {
                  "platform": "android",
                  "version": "5.21"
                }
              });
            } // TODO платформа


            var obj = {
              type: "VKWebAppGetClientVersionResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppOpenPayForm":
          // TODO
          break;

        case "VKWebAppAllowNotifications":
          _db.default.get('VKWebAppAllowNotifications', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppAllowNotificationsFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppAllowNotificationsResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppDenyNotifications":
          _db.default.get('VKWebAppDenyNotifications', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppDenyNotificationsFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppDenyNotificationsResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppSetLocation":
          // TODO Достаточно на клиенте сделать
          break;

        case "VKWebAppAllowMessagesFromGroup":
          _db.default.get('VKWebAppAllowMessagesFromGroup', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppAllowMessagesFromGroupFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppAllowMessagesFromGroupResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppJoinGroup":
          _db.default.get('VKWebAppJoinGroup', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppJoinGroupFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppJoinGroupResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppOpenQR":
          _db.default.get('VKWebAppOpenQR', function (err, value) {
            if (err) {
              return cb({
                type: "VKWebAppOpenQRFailed",
                data: {
                  error_type: 'api_error',
                  error_data: {
                    error_code: 1,
                    error_msg: 'В базе нет данных для этого события',
                    request_params: []
                  }
                }
              });
            }

            var obj = {
              type: "VKWebAppOpenQRResult",
              data: value
            };
            cb(obj);
          });

          break;

        case "VKWebAppOpenApp":
          // TODO
          break;

        case "VKWebAppScroll":
          // TODO Достаточно на клиенте
          break;

        case "VKWebAppResizeWindow":
          // TODO
          break;

        default:
          cb({
            type: "NotMethod",
            data: {
              error_type: 'api_error',
              error_data: {
                error_code: 1,
                error_msg: this.method + ' Нет тактого события'
              }
            }
          });
      }
    }
  }]);

  return Connect;
}();
"use strict";

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadDB() {
  var arr = [{
    type: 'put',
    key: 'VKWebAppGetUserInfo',
    value: {
      "signed_user_id": "hlnJ8vnD2Q2fcjkHBZz8ERN7bYwFq4SO-tBEyU2uL4w",
      "id": 2314852,
      "first_name": "Ирина",
      "last_name": "Денежкина",
      "sex": 1,
      "city": {
        "id": 2,
        "title": "Санкт-Петербург"
      },
      "country": {
        "id": 1,
        "title": "Россия"
      },
      "photo_100": "https://pp.userapi.com/c836333/v836333553/5b138/2eWBOuj5A4g.jpg",
      "photo_200": "https://pp.userapi.com/c836333/v836333553/5b137/tEJNQNigU80.jpg",
      "timezone": 3
    }
  }, {
    type: 'put',
    key: 'VKWebAppGetPhoneNumber',
    value: {
      "sign": "Y1C99xnbEaR8Wred_LSicu7yUQnRdcrvL2-Lco96nqc",
      "phone_number": "79111234567"
    }
  }, {
    type: 'put',
    key: 'VKWebAppGetEmail',
    value: {
      "sign": "cAurdBfIW129oDaOamKNqVD9Ml7Qx2S_FsjWGAt1_7w",
      "email": "test@gmail.com"
    }
  }, {
    type: 'put',
    key: 'VKWebAppGetGeodata',
    value: {
      "available": 1,
      "lat": "-37",
      "long": "89"
    }
  }, {
    type: 'put',
    key: 'VKWebAppShare',
    value: {
      "post_id": "2314852_123456"
    }
  }, {
    type: 'put',
    key: 'VKWebAppShowWallPostBox',
    value: {
      "post_id": 123
    }
  }, {
    type: 'put',
    key: 'VKWebAppGetClientVersion',
    value: {
      "platform": "android",
      "version": "5.3.2"
    }
  }, {
    type: 'put',
    key: 'VKWebAppAllowNotifications',
    value: {
      "enabled": true
    }
  }, {
    type: 'put',
    key: 'VKWebAppDenyNotifications',
    value: {
      "disabled": true
    }
  }, {
    type: 'put',
    key: 'VKWebAppAllowMessagesFromGroup',
    value: {
      "result": true
    }
  }, {
    type: 'put',
    key: 'VKWebAppJoinGroup',
    value: {
      "result": true
    }
  }, {
    type: 'put',
    key: 'VKWebAppOpenQR',
    value: {
      "qr_data": "http://localhost/site"
    }
  }, {
    type: 'put',
    key: 'users.get',
    value: {
      "id": 210700286,
      "first_name": "Lindsey",
      "last_name": "Stirling",
      "city": {
        "id": 5331,
        "title": "Los Angeles"
      },
      "photo_50": "https://pp.vk.me/f6e/4-funfNRMwg.jpg",
      "verified": 1
    }
  }];

  _db.default.batch(arr, function (err) {
    if (err) return console.log('Ooops!', err);
  });

  _db.default.put('mk_loadedb', {
    "loaded": 1
  }, function (err) {
    if (err) return console.log('Ooops!', err);
  });
}

module.exports = loadDB;
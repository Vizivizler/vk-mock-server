"use strict";

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("./db"));

var _setDB = _interopRequireDefault(require("./setDB"));

var _index = _interopRequireDefault(require("./method/index"));

var _connect = _interopRequireDefault(require("./connect"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var upload = (0, _multer.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

_db.default.get('mk_loadedb', function (err, value) {
  if (!value || err) {
    (0, _setDB.default)();
  }
});

app.use('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Access-Control-Allow-Headers');
  next();
});
app.get('/', function (req, res) {
  res.send('Hello World!!!');
});
app.get('/clean_tokens', function (req, res) {
  _db.default.del('all_tokens', function (err) {
    // console.log(err);
    if (!err) {
      res.send({
        status: true
      });
    }
  });
});
app.get('/connect/:method', function (req, res) {
  var lol = new _connect.default(req.params.method, req.query);
  lol.getResult(function (data) {
    res.send(data);
  }); // db.del('all_tokens', function (err) {
  //     console.log(err);
  // });
  //
  // db.get('all_tokens', (err, value) => {
  //     console.log(err, value);
  // });
  // db.put('VKWebAppShare', {
  //     "post_id": "2314852_123456"
  // }, function (err) {
  //     if (err) return console.log('Ooops!', err);
  // });
  // db.put('VKWebAppOpenQR', {
  //     "qr_data": "http://:ocalhost/site"
  // }, function (err) {
  //     if (err) return console.log('Ooops!', err);
  // });
});
app.post('/connect/:method', upload.array(), function (req, res) {
  _db.default.put(req.params.method, JSON.parse(req.body.data), function (err) {
    if (err) return console.log('Ooops!', err);
  });

  res.send({
    status: true
  });
});
app.post('/method/:method', upload.array(), function (req, res) {
  _db.default.put(req.params.method, JSON.parse(req.body.data), function (err) {
    if (err) return console.log('Ooops!', err);
  });

  res.send({
    status: true
  });
});
app.get('/method/:method', function (req, res) {
  if (!req.query.access_token || !req.query.v) {
    res.send({
      error: {
        type: 1,
        message: !req.query.access_token ? "Нужно передавать access_token" : "Не указана версия api в запросе"
      }
    });
    return;
  }

  var methodSplit = req.params.method.split(".");

  if (!methodSplit[0] || !methodSplit[1]) {
    return new Error();
  }

  var lol = new _index.default(methodSplit, req.query);
  lol.getResult(function (r) {
    res.send(r);
  }); // db.put('users', [
  //     {
  //         id: 3884432,
  //         first_name: "Вася",
  //         last_name: "Петров"
  //     },
  //     {
  //         id: 23486,
  //         first_name: "Lindsey",
  //         last_name: "Stirling",
  //         "sex": 1,
  //         "bdate": "21.9.1986"
  //     }
  // ], function (err) {
  //     if (err) return console.log('Ooops!', err);
  // });
  // db.put('VKWebAppGetGeodata', {
  //     "available": 1,
  //     "lat": "-37",
  //     "long": "89"
  // }, function (err) {
  //     if (err) return console.log('Ooops!', err);
  // });
  // db.get('users', function (err, value) {
  //     if (err) return console.log('Ooops!', err);
  //     console.log(value);
  //
  //     res.send(value);
  // });
});
var DEFAULT_PORT = parseInt(process.env.PORT, 10) || 10879;
app.listen(DEFAULT_PORT, function () {
  console.log('Starting server on port ' + DEFAULT_PORT);
});
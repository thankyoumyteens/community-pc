let indexService = require('../service/IndexService');

module.exports = function (app) {
  app.get('/index', function (request, response) {
    response.render('index.html');
  });
};
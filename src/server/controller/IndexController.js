let indexService = require('../service/IndexService');

module.exports = function (app) {
  app.get('/index', function (request, response) {
    response.render('index.html');
  });

  app.get('/hello', function (request, response) {
    let rand = indexService.hello();
    response.render('hello.html', {
      msg: rand
    });
  })
};
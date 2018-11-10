let indexService = require('../service/IndexService');

module.exports = function (app) {
  app.post('/user/status', function (request, response) {
    response.send({
      status: 0,
      data: {
        isLogin: false,
        userInfo: {
          userId: 1,
          username: 'hehehe',
          avatar: ''
        }
      }
    });
  });
};
let userService = require('../service/UserService');

module.exports = function (app) {
  app.post('/user/status', function (request, response) {
    // todo
    let cookie = request.cookies;
    let data = userService.checkStatus();
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
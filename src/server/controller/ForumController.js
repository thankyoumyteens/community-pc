let forumService = require('../service/ForumService');

const urlPrefix = '/forum';
const prefix = 'forum-';

module.exports = function (app) {
  app.get(urlPrefix + '/index', function (request, response) {
    response.render(prefix + 'index.html');
  });
};
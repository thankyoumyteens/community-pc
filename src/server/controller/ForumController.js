let forumService = require('../service/ForumService');

const urlPrefix = '/forum';
const prefix = 'forum-';

module.exports = function (app) {
  /**
   * 论坛首页
   */
  app.get(urlPrefix + '/index', function (request, response) {
    response.render(prefix + 'index.html');
  });

  /**
   * 论坛文章list
   */
  app.get(urlPrefix + '/list', function (request, response) {
    let pageIndex = 1;
    let pageSize = 10;
    let params = request.query;
    if (params) {
      if (params.pageIndex) {
        pageIndex = params.pageIndex;
      }
      if (params.pageSize) {
        pageSize = params.pageSize;
      }
    }
    let data = forumService.getList(pageIndex, pageSize);
    response.send(data);
  });
};
const superAgent = require('superagent');

/**
 * use
 */
// const httpUtil = require('HttpUtil');
// httpUtil.get('http://test.com/test.do', {
//   pageNum: 1
// }).then(function (resp) {}).catch(function (e) {});

exports.get = function (url, params) {
  return new Promise((resolve, reject) => {
    superAgent.get(url).query(params).then(function (response) {
      // console.log('util', response);
      resolve(response.body);
    }).catch(function (error) {
      reject(error);
    });
  });
};

exports.post = function (url, params) {
  return new Promise((resolve, reject) => {
    superAgent.post(url).send(params).then(function (response) {
      resolve(response.body);
    }).catch(function (error) {
      reject(error);
    });
  });
};

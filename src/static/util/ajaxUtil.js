import axios from 'axios';

/**
 * use
 */
// import ajaxUtil from '../../../util/ajaxUtil';
// ajaxUtil.get('http://test.com/test.do', {
//   pageNum: 1
// }).then(function (resp) {}).catch(function (e) {});

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      let p;
      if (params) {
        p = axios.get(url, {params: params});
      } else {
        p = axios.get(url);
      }

      p.then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      let p;
      if (params) {
        p = axios.post(url, params);
      } else {
        p = axios.post(url);
      }
      p.then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}

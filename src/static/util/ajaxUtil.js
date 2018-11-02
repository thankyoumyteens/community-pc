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
      axios.get(url, {params: params}).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}

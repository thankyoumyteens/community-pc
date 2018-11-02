const fs = require('fs');
const path = require('path');

let commonJsFile = '';
let commonCssFile = '';

function start() {
  fixHtmlFile();
}

function fixHtmlFile() {
  const jsArray = getFileList(path.resolve(__dirname, '../../dist/static/js'));
  const htmlArray = getFileList(path.resolve(__dirname, '../../dist/views'));

  for (let i = 0; i < htmlArray.length; i++) {
    replaceHtmlFile(htmlArray[i], jsArray[i].name);
  }

  replaceHtmlHeader();

  setEnv();
}

/**
 * 将项目配置文件改为发布环境
 */
function setEnv() {
  const configPath = path.resolve(__dirname, '../../dist/community.json');
  const configFileContent = fs.readFileSync(configPath);
  let newConfigFileContent = configFileContent.toString();
  newConfigFileContent = newConfigFileContent.replace('dev', 'prod');
  // 将修改写入文件
  fs.writeFileSync(configPath, newConfigFileContent);
}

/**
 * 获取目录下的文件存入数组
 * @param directoryPath
 * @returns {Array}
 */
function getFileList(directoryPath) {
  const fileList = [];

  fs.readdirSync(directoryPath).forEach(function (name) {
    // 遍历该目录下的文件
    const filePath = path.format({dir: directoryPath, base: name});

    const stat = fs.statSync(filePath);
    // 不处理文件夹, 只处理文件
    if (!stat.isDirectory()) {
      if (/\.html$/.test(name)) {
        fileList.push({path: filePath, name: name});
      }
      if (/\.css$/.test(name)) {
        // common.css
        commonCssFile = name;
      }
      if (/\.js$/.test(name)) {
        if (name.indexOf('common') > -1) {
          // common.js
          commonJsFile = name;
        } else {
          if (name !== 'polyfill.js') {
            fileList.push({path: filePath, name: name});
          }
        }
      }
    }
  });

  return fileList;
}

/**
 * 修正html文件中js路径
 * @param htmlFile
 * @param jsFileNameWithHash
 */
function replaceHtmlFile(htmlFile, jsFileNameWithHash) {
  // 因为html与js文件名一致, 所以可以靠改后缀获得js文件名
  const jsFileName = htmlFile.name.replace(/html/g, 'js');
  const htmlFileContent = fs.readFileSync(htmlFile.path);
  let newHtmlFileContent = htmlFileContent.toString();
  // 相对路径替换成绝对路径
  // newHtmlFileContent = newHtmlFileContent.replace(/\/static/g, config.alioss.host + config.alioss.static);
  // 为html文件中引入的js文件添加哈希值: index.js -> index.74f30539c326d7e43ad6.js
  newHtmlFileContent = newHtmlFileContent.replace(RegExp(jsFileName, 'g'), jsFileNameWithHash);
  // 为html文件中引入的common.js文件添加哈希值: common.js -> common.74f30539c326d7e43ad6.js
  newHtmlFileContent = newHtmlFileContent.replace(RegExp('common.js', 'g'), commonJsFile);
  // 将修改写入文件
  fs.writeFileSync(htmlFile.path, newHtmlFileContent);
}

/**
 * 修正CSS文件路径
 */
function replaceHtmlHeader() {
  const htmlPath = path.resolve(__dirname, '../../dist/views/common/head-import.html');
  const htmlFileContent = fs.readFileSync(htmlPath);
  let newHtmlFileContent = htmlFileContent.toString();
  // 相对路径替换成绝对路径
  // newHtmlFileContent = newHtmlFileContent.replace(/\/static/g, config.alioss.host + config.alioss.static);
  // 为html文件中引入的css文件添加哈希值
  newHtmlFileContent = newHtmlFileContent.replace(RegExp('common.css', 'g'), commonCssFile);
  // 将修改写入文件
  fs.writeFileSync(htmlPath, newHtmlFileContent);
}

start();
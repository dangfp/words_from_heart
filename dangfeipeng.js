var fs = require('fs');
var jsonfile = require('jsonfile');

var dirPathString = '/Users/dfp/Downloads/words-from-the-heart/words/';

// 用于存放所有心里话
var allWordsPathString = './all_words.json';

// 用于存放格式错误的文件信息，包括文件类型不是 json 以及文件内容无法解析
var errorFilePathString = './error_files.json';

fs.readdir(dirPathString, function(err, files) {
  if (err) {
    console.log('扫描文件夹失败');
    return;
  }

  //  用于存放格式正确的文件名
  var jsonFileList = [];
  // 用于存放错误格式的文件名
  var errorFileList = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i].endsWith('.json')) {
      jsonFileList.push(files[i]);
    } else {
      errorFileList.push(files[i]);
    }
  }

  // 用于存放所有的开心话
  var jsonList = [];
  for (var i = 0; i < jsonFileList.length; i++) {
    var filePath = dirPathString + jsonFileList[i];

    try {
      jsonList.push(jsonfile.readFileSync(filePath));
    } catch (e) {
      // 如果读取失败就把对应文件名存入错误文件数组中
      errorFileList.push(jsonFileList[i]);
    }
  }

  // 将心里话全部写入指定的 json 文件中
  jsonfile.writeFileSync(allWordsPathString, jsonList);

  // 将错误文件名写入到指定的 json 文件中
  jsonfile.writeFileSync(errorFilePathString, errorFileList);
});

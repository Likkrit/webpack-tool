// 同步复制文件夹

// Created By likkrit
// http://likkrit.com
// 2016.12.31

/*
包含以下两个方法：
{
copyFolder(src,dst);
deleteFolder(path);
}
*/

var fs = require('fs');

var copyFolder = {
  copy: function(src, dst) {
    var that = this;
    var paths;
    // 读取目录中的所有文件/目录
    try {
      paths = fs.readdirSync(src);
    } catch (err) {
      throw err;
    }
    paths.forEach(function(path) {
      var _src = src + '/' + path,
        _dst = dst + '/' + path,
        readable, writable,
        st;
        try{
          st = fs.statSync(_src);
        }
        catch(err){
          throw err;
        }
        // 判断是否为文件
        if (st.isFile()) {
          console.log("创建文件：" + _dst);
          fs.writeFileSync(_dst, fs.readFileSync(_src));
          /*
          // 创建读取流
          readable = fs.createReadStream(_src);
          // 创建写入流
          writable = fs.createWriteStream(_dst);
          // 通过管道来传输流
          readable.pipe(writable);
          console.log("创建文件：" + _dst);
          readable.on('end', function () {
           console.log('copy end');
          });
          */
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          that.copyFolder(_src, _dst, that.copy);
        }
    });
  },

  copyFolder: function(src, dst, callback) {
    var that = this;
    var info;
    try {
      info = fs.statSync(dst);
    } catch (err) {
      fs.mkdirSync(dst);
      console.log("创建目录：" + dst);
    }
    that.copy(src, dst);
  },

  deleteFolder: function(path) {
    var files = [];
    var that = this;
    var info;
    try {
      info = fs.statSync(path);
    } catch (err) {}
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function(file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          that.deleteFolder(curPath);
        } else {
          console.log("删除文件：" + curPath);
          fs.unlinkSync(curPath);
        }
      });
      console.log("删除目录：" + path);
      fs.rmdirSync(path);
    }
  }
};


module.exports = copyFolder;

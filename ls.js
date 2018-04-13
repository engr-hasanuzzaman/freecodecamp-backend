var fs = require("fs")
var path = require("path")


module.exports = function (dir, ext, callback) {
  fs.readdir(dir, (error, list) => {
    if(error){
      return callback(error)
    }

    valid_files = list.filter((f) => {
      return valid_file_with_ext(f, ext)
    })

    return callback(null, valid_files)
  })
}


const valid_file_with_ext = function (file_path, file_ext){
  return path.extname(file_path).slice(1) == file_ext
}

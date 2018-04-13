var filetered_files = require('./ls.js')

dir_path = process.argv[2]
file_ext = process.argv[3]

filetered_files(dir_path, file_ext, (error, list) => {
  if(error){
    console.log(error);
  }

  list.forEach((f) => {
    console.log(f);
  })
})

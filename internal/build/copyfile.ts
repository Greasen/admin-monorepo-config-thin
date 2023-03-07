import fs from 'fs-extra'

fs.copy('./package/service/public', './public', function (err: any) {
  if (err) return console.error(err, '😟😟')
  console.log("copy success!")
}) //copies directory, even if it has subdirectories or files

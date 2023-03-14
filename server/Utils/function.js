const fs = require("fs")

exports.removeFile = (filename) =>{
    fs.unlinkSync('../public/',filename)
}

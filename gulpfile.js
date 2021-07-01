const fs = require('fs')

const { Transform } = require('stream')

exports.default = () => {
    const read = fs.createReadStream('normalize.css')
    const write = fs.createWriteStream('normalize.min.css')
    //文件转换流
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            //chunk拿到读取流中的内容 buffer
            const input = chunk.toString()
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, output)
        }
    })
    read
        .pipe(transform)
        .pipe(write)

    return read
}
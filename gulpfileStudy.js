//入口文件
//commonjs规范
//导出函数成员方式定义
const fs = require("fs")

const { series, parallel } = require('gulp')
exports.foo = (done) => {
    console.log('foo task working~')

    done() //标识任务结束
}

//default
exports.default = (done) => {
    console.log('default task working~~')
    done()
}


//4.0版本以前
// const gulp = require('gulp')
// gulp.task('bar', done => {
//     console.log('bar task working~~')
//     done()
// })

//多任务
const task1 = done => {
    setTimeout(() => {
        console.log('1')
        done()
    }, 1000)
}
const task2 = done => {
    setTimeout(() => {
        console.log('2')
        done()
    }, 1000)
}
//依次执行
exports.serietask = series(task1, task2)
//同步执行
exports.paralleltask = parallel(task1, task2)

//异步任务处理方式
//回调
exports.callback_error = done => {
    console.log('callback task~')
    done(new Error('task error'))
}

//promise
exports.promise_task = () => {
    console.log('promise task~')
    return Promise.resolve()

    //return Promise.reject(new Error('erro'))
}
//async
const timeout = time => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
exports.async = async () => {
    await timeout(1000)
    console.log('async task~')
}

//stream
exports.stream = () => {
    const readStream = fs.createReadStream("package.json")
    const writeStream = fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    return readStream
}
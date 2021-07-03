const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const bs = browserSync.create()

// const cleanCss = require('gulp-clean-css')
// const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'));

const data = {
    menus: [],
    pkg: require('./package.json'),
    date: new Date()
}

// exports.default = () => {
//     return src('src/*.css')
//         .pipe(cleanCss())
//         .pipe(rename({ extname: '.min.css' }))
//         .pipe(dest('dist'))
// }
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(dest('dist'))
}

const script = () => {
    return src('src/assets/scripts/*js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('dist'))
}

const html = () => {
    return src("src/*.html", { base: 'src' })
        .pipe(plugins.swig({ data }))
        .pipe(dest("dist"))
}

const image = () => {
    return src("src/assets/images/**", { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const font = () => {
    return src("src/assets/fonts/**", { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const extra = () => {
    return src("public/**", { base: "public" })
        .pipe(dest('dist'))
}

const clean = () => {
    return del(['dist'])
}

const serve = () => {
    watch('src/assets/styles/*.css', style)
    watch('src/assets/scripts/*js', script)
    watch("src/*.html", html)
    watch([
            "src/assets/images/**",
            'src/assets/fonts/**',
            'public/**'
        ], bs.reload)
        // watch("src/assets/images/**", image)
        // watch('src/assets/fonts/**', font)
        // watch('public/**', extra)

    bs.init({
        notify: false,
        port: 2080,
        files: 'dist/**', //自动更新浏览器监听文件
        open: false, //取消自动打开浏览器
        server: {
            baseDir: ['dist', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}
const compile = parallel(style, script, html)
const build = series(clean, parallel(compile, image, font, extra))
const dev = series(clean, compile, serve)

module.exports = {
    // style,
    // script,
    html,
    clean,
    compile,
    build,
    serve,
    dev
}
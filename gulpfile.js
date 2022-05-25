const fs = require("fs");

const {src, dest} = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const group_media = require("gulp-group-css-media-queries");
const del = require("del");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
// const sass = require("gulp-sass");

const distPath = require("path").basename(__dirname);
const srcPath = "#source";

const path = {
    build: {
        html: distPath + "/",
        css: distPath + "/css/",
        js: distPath + "/js/",
        jsLibs: distPath + "/js/libs",
        img: distPath + "/img/"
    },
    src: {
        html: srcPath + "/*.html",
        css: srcPath + "/css/*.css",
        js: srcPath + "/js/script.js",
        jsLibs: srcPath + "/js/libs/libs.js",
        img: srcPath + "/img/**/*.+(png|jpg|gif|ico|svg|webp)"
    },
    watch: {
        html: srcPath + "/**/*.html",
        css: srcPath + "/css/**/*.css",
        js: srcPath + "/js/**/*.js",
        img: srcPath + "/img/**/*.{jpg, png, svg, gif, ico, webp}"
    },
    clean:  "./" + distPath + "/"
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + distPath,
            index: "home.html"
        },
        port: 3000,
        notify: false
    })
}

function clean() {
    return del(path.clean)
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        // .pipe(sass({
        //         outputStyle: "expanded"
        //     }))
        .pipe(concat('style.css'))
        .pipe(dest(path.build.css))

        .pipe(concat('style.min.css'))
        .pipe(group_media())
        .pipe(autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            }))
        // .pipe(dest(path.build.css))
        .pipe(clean_css())
        // .pipe(
        //     rename({
        //         extname: ".min.css"
        //     })
        // )
        .pipe(dest(path.build.css))
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function jsLibs() {
    return src(path.src.jsLibs)
        .pipe(fileinclude())
        .pipe(dest(path.build.jsLibs))
}

function images() {
    return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, jsLibs, images));
const watch = gulp.parallel(build, watchFiles, browserSync);


exports.jsLibs = jsLibs;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;
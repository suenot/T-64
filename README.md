# Gulp bundle for frontend in de-core.net

## For development
### Install
#### In windows:
```
npm install browser-sync --force
npm install gulp gulp-sftp gulp-inject gulp-jade gulp-load-plugins gulp-newer gulp-plumber postcss gulp-postcss gulp-rename run-sequence gulp-sass gulp-stylus gulp-util autoprefixer require-dir gulp-webp async-each-series gulp-rimraf gulp-cached gulp-changed gulp-filter gulp-if gulp-jade-inheritance
bower install
```
if necessary ```--force``` (redownload packages and install them anyway)

#### In true OS:
```
npm install --development
```
### Start
```gulp```

## For production (+concat, minify, etc)
npm install --production - установка gulp пакетов для build
### Install
```
#npm install --force
##bower install
```
### Start
gulp - старт проекта с default задачами
gulp --open - старт проекта с открытием localhost в браузере
gulp --live - старт проекта с livereload(автоматическое обновление при изменении файла)
gulp --prefix - старт проекта с автопрефиксом (gulp build - запускается с автопрефиксом)
gulp build - старт билдовой части
gulp danger
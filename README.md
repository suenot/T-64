## Install
Пакеты ставим через:
npm instal --force
либо вручную для разработки
```
npm install bower browser-sync del gulp autoprefixer gulp-clean gulp-concat gulp-minify-css gulp-concat-css gulp-copy gulp-filesize gulp-if gulp-inject gulp-jade gulp-livereload gulp-load-plugins gulp-minify gulp-newer gulp-notify gulp-order gulp-plumber gulp-rev-append gulp-run-sequence gulp-streamify gulp-stylus gulp-uglify gulp-util require-dir run-sequence vinyl-paths vinyl-source-stream gulp-rename gulp-sass --force
```

## Bower
npm install bower -g установка bower
bower install установка компонентов bower
bower install <package-name>#<version> установка одного компонента
например:
	bower install <package-name> -D устанавливает последнюю версию компонента
	bower install jquery#1.11 -D если нужна определенная версия компонета
	bower install <package-name> если не нужно записывать компонент в bower.json

bower install <package1-name> <package2-name> <package3-name> <package4-name> установка компонентов группой
bower list проверка что установлено
bower update обновленить до последней версии
.bowerrc фаил в котором записана где находится директория bower_components
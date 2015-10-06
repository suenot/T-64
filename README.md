# Сборка
## Development
### Установка
Пакеты для разработки ставим в винде вручную:
```
npm install bower browser-sync del gulp gulp-inject gulp-jade gulp-load-plugins gulp-newer gulp-plumber gulp-postcss gulp-rename run-sequence gulp-sass gulp-stylus gulp-util autoprefixer require-dir gulp-webp --force
bower install
```
в нормальных ос:
```
npm install --development
```
при необходимости можно добавить флаг ```--force``` для npm (скачивает пакеты заново, а не использует из кэша)
### Запуск
```gulp```

## Production
### Установка
```
npm install --force
bower install
```
### Запуск
```gulp build```

# Bower
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
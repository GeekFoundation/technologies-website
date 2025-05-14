# Шаблоны и исходники

1. Собранная верстка находиться в папке `app`
2. Для шаблонизации используется движок **twig**, исходники тут `source/twig`

# Gulp 4 таск ранер

## Начало работы

1. Установить [Node.js](https://nodejs.org/en/) последнюю LTS версию
2. Обновить npm `npm install -g npm`
3. Установить [gulpjs 4](http://gulpjs.com/) `npm install -g gulp`
   и [browsersync](http://browsersync.io) `npm install -g browser-sync`
4. В консоли перейти в директорию с проектом с помощью команды cd путь/до/шаблона
5. Запустить команду npm install
6. После этого можно запустить дефолтную задачу командой gulp (в директории с шаблоном)

## Задачи

Все задачи находятся в папке [gulpfile.babel.js/tasks](gulpfile.babel.js/tasks),
файл [gulpfile.babel.js/app.js](gulpfile.babel.js/config/app.js) отвечает за конфигурацию задач.

### Список задач

1. `npm run start` - стандартная задача, запускает сборку проекта, а так же отслеживание файлов и локальный сервер, js
   собирается в dev режиме
2. `npm run build` - запускает только сборку проекта в css/js не добавляется карта исходников,
3. `npm run build-server` - запускает сборку проекта, а так же отслеживание файлов и локальный сервер, не добавляется
   карта исходников, js собирается в продакшен режиме
4. `npm run html` - файл [gulpfile.babel.js/tasks/html.js](gulpfile.babel.js/tasks/html.js) отвечает за сборку twig
   файлов, забирая исходники из этой папки **source/html**, собирает в один html файл и отправляет в папку **app**.
5. `npm run sass` - запускает генерацию из source/sass/*.scss файлов в css и отправляет их в папку **/css**,
   генерируются только файлы в корне и без префикса _ в имени (т.е. файл _test.scss останется нетронутым, а файл
   test.scss сгенерируется в файл test.css). Настройки сжатия генерируемых файлов находится в
   файле [gulpfile.babel.js/config/app.js](gulpfile.babel.js/config/app.js). Подробнее о типах сжатия на
   сайте [sass-lang.com](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style). Так же в папке *
   */css/map** создается карта css (source map), она помогает найти где находятся css свойства в оригинальных scss
   файлах (поддержку карт нужно выключить в настройках инструментов
   разработчиков [Chrome](https://developer.chrome.com/devtools/docs/settings)/[FireFox](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map)),
   поэтому имеет смысл загружать на сервер и css и исходники scss. Для шрифтов необходимо настроить их название и
   начертание.
   В [примере](gulpfile.babel.js/tasks/sass.js#L35)
   используется `Roboto` у него указано `sans-serif` (может быть sans-serif или serif), для него автоматически
   сгенерируется код в css с указанием нужных метрик, оно создаст правило со шрифтом `Название шрифта Fallback` в данном
   случае (`Roboto Fallback`), в вашем коде нужно будет указать полное название шрифтов
   т.е. `Roboto, Roboto Fallback, sans-serif` (Подробнее о технике [fontpie](https://github.com/pixel-point/fontpie))
6. `npm run images` - файл [gulpfile.babel.js/tasks/images.js](gulpfile.babel.js/tasks/images.js) отвечает за сжатие
   изображений, эта задаче берет файлы из папки **source/images/assets** сжимает их и переносит в папку **images/**
   структура папок сохраняется
7. `npm run sprite` - задача генерирует спрайты из svg в папке **source/images/sprite** и сохраняет их в папку *
   */images/** при этом генерирует файл с scss переменными
   в [source/sass/helpers/_sprite.scss](source/sass/helpers/_sprite.scss). Настройки в
   файле [gulpfile.babel.js/config/app.js](gulpfile.babel.js/config/app.js)
8. `npm run js` - задача генерирует javascript в dev режиме **source/js**
9. `npm run js-production` - задача генерирует javascript в продакшен режиме **source/js**

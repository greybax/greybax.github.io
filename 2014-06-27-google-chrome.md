---
layout: post
title: "Пишем расширение для браузера Google Chrome"
date: 2014-06-27
comments: true
categories:
 - javascript
 - userjs
 - frontend
 - Chromium
 - browser
---

В интернете много сайтов на которых реализована возможность пролистывать страницу вверх без помощи мыши или полосы прокрутки. Но в то же время еще есть сайты где такой реализации нет. "Почему бы не попробовать написать скрипт который бы добавлял такую кнопку на все сайты?" - подумал я и принялся за реализацию. Такие скрипты называются пользовательскими и имеют расширение ```*.user.js```. Почитать к примеру можно на [хабре](http://habrahabr.ru/post/129343/). К сожалению без "подводных камней" не обходится. Существуют некоторые различия в реализации ```userjs``` под разные браузеры. Я остановлюсь на описании реализации нашего ```userjs``` скрипта как расширения для браузера ```Google Chrome```.

### manifest.json
Обязательным для расширения ```Google Chrome``` является файл ***manifest.json*** в котором описываются параметры, пути к внешним файлам (```*.js, *.css``` и др.), поддержка версии и т.п. для расширения. Подробнее о файле можно почитать [тут](https://developer.chrome.com/extensions/manifest). В нашем случае файл ```manifest.json``` выглядит следующим образом:

```javascript
{
    "manifest_version": 2,
    "content_scripts": [ {
        "exclude_globs":    [  ],
        "include_globs":    [ "*" ],
        "js":               [ "jquery.js", "backTopUserJS.user.js" ],
        "css":              [ "css/style.css" ],
        "matches":          [   "http://*/*",
                                "https://*/*"
                            ],
        "run_at": "document_end"
    } ],
    "converted_from_user_script": true,
    "description":  "Back top userscript extension for google chrome",
    "name":         "backTopUserJS",
    "version":      "1"
}
```

Для удобства мы используем библиотеку ```JQuery``` которую положили рядом с файлом ```manifest.json``` и основным файлом скрипта (в нашем случае это ```backTopUserJS.user.js```). Его содержимое следующее:

```javascript
// ==UserScript==
// @name backTopUserJS
// @author Aleksandr Filatov
// @license MIT
// @version 1.0
// ==/UserScript==

function main() {
    var disp = $(window).scrollTop() > 400 ? 'block' : 'none';
    var $upButton = $('<div class="up-button" title="Наверх" style="display:' + disp + '">Наверх</div>');

    $(document).find('body').append($upButton);
    $upButton.click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) $upButton.fadeIn('slow');
        else $upButton.fadeOut('slow');
    });
};

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
```

Думаю скрипт достаточно понятен, чтобы его подробно рассматривать. Пояснить стоит лишь последние 3 строчки. На самом деле это мелкий хак, который вставляет наш скрипт в код страницы сайта. Если кто-то из вас найдет способ лучше можете написать к комментах свои фиксы :)

### Установка расширения в браузере
В ```Google Chrome``` можно устанавливать пользовательские скрипты, аналогично другим браузерам, но поскольку Google печется о нашей с вами безопасности, то их приходится оборачивать в расширения для браузера. Разберем установку по шагам.

#### Шаг 1
Создаем папку для нашего расширения например так ```C:\MyChromeExtensionUserJS```

#### Шаг 2
Для каждого расширения создаем свою директорию например в нашем случае назовем ее так ```C:\MyChromeExtensionUserJS\backTopUserJS```. Добавляем файлы расширения в эту директорию.

#### Шаг 3
Заходим "О браузере Google Chrome" -> вкладка "Расширения" или в адресной строке пишем ```chrome://extensions/```

#### Шаг 4
Ставим галочку "Режим разработчика"
![developer_mode](http://1.bp.blogspot.com/-bax0UMkP6dU/U60tEjgXiLI/AAAAAAAABCQ/MRKVYzCoHjc/s1600/qwerty.png)

#### Шаг 5
Нажимаем кнопку "Загрузить распакованное расширение" и выбираем директорию нашего расширения. Нажимаем "OK".

#### Шаг 6
Расширение установлено и готово к работе. Чтобы обновить расширения после того как вы внесли в него изменения достаточно просто нажать кнопку "Обновить расширение" или в режиме разработчика сочетание клавиш ```Ctrl+R```.

### Итог
Посмотреть исходники скрипта можно на [github](https://github.com/greybax/backTopUserJS). Скрипт не претендует на звание идеального, а служит лишь примером и толчком к написанию собственных пользовательских скриптов для ```Google Chrome```.
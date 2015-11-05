---
layout: post
title: "Debugging файлов TypeScript в браузере через эмулятор DevExtreme"
date: 2014-12-02 19:45:38 +0000
comments: true
categories: 
 - DevExtreme
 - configuration
 - debugging
 - typescript
 - javascript
---
Недавно встала задача добавить поддержку debugging'а файлов ```*.ts``` в браузере. В нашем случае это Google Chrome. 
Постараюсь как можно подробнее описать этот процесс.

1. Для начала нужно определить в какой директории находится DevExtreme сервер, который запускает приложение, когда мы нажимаем в VS кнопку ```Запустить в браузере Google Chrome```. Ответ на этот вопрос был найден в одном из тикетов на сайте [DevExpress](https://www.devexpress.com/Support/Center/Question/Details/Q523956). В случае Visual Studio 2012 это путь ```C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\Extensions\DevExtreme\WebServer ```

2. Добавляем в проект ```*.map файл```. Это необходимо для связи файлов ```js``` и ```ts```

3. Заключительный этап - добавление "символической ссылки" на проект в директории веб сервера DevExtreme. Можно просто скопировать проект в директорию указаную выше. В этом случае мы лишим сервер возможности автоматически подхватывать изменения в проекте. Чтобы это учесть, выполним команду [mklink](http://ss64.com/nt/mklink.html). Для этого:

    * Запускаем ```cmd``` под администратором
    * Переходим в каталог DevExpress WebServer
    * Выполняем команду ```mklink /D <project_link_name> <project_path>```. В моем случае это ```mklink /D Pos C:\Projects\Pos```
    * Символическая ссылка ```project_link_name``` создана в директории ```project_path```

Дополнительный ссылки:

* [Running, Debugging and Deploy DevExtreme applications](http://js.devexpress.com/Documentation/Howto/SPA_Framework/Application_Design/?version=14_1#Running)
* [Typescript in VS2012: (automatically) generating .js from .ts](http://stackoverflow.com/questions/12683820/typescript-in-vs2012-automatically-generating-js-from-ts)
* [An A-Z Index of the Windows CMD command line](http://ss64.com/nt/)
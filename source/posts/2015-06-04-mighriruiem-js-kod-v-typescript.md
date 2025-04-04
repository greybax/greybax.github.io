# Мигрируем Javascript код в TypeScript

#javascript, #typescript, #frontend, #migration, #russian;

_2015-06-05_

Не так давно стояла задача перевести один старый проект из кода на ```Javascript``` в ```TypeScript```. Хочу поделиться своим опытом такого перехода. Рассмотрим на примере разработки в Visual Studio.

Для начала стоит отметить, что такая миграция не является проблемой с точки зрения совместимости, т.к код на ```Javascript``` - это синтаксически корректный код на ```TypeScript```.

Итак, выделим основные этапы, после выполнения которых произойдет чудесное
превращение:

* Переименуем все ```.js``` файлы в ```.ts```
* Настраиваем компиляцию из ```.ts``` в ```.js```
  - Для этого нужно скачать и установить ```TypeScript``` плагин для студии с [официального сайта](https://www.typescriptlang.org/#Download), позволяющий компилировать ```.ts``` файлы в ```.js```.

* Устанавливаем определения для библиотек (```.d.ts```)
  - Коллекция определений библиотек находится в [открытом доступе](https://github.com/borisyankov/DefinitelyTyped). Определения для ```javascript``` библиотек можно установить через [tsd](https://definitelytyped.org/tsd/) - это аналог NuGet Package Manager.

* Пишем определения для своего кода
  - Это совсем не сложно и делается по аналогии с кучей примеров из [DefinitelyTyped on GitHub](https://github.com/borisyankov/DefinitelyTyped). Мой пример можно посмотреть [тут](https://github.com/greybax/DefinitelyTyped/tree/master/quixote), который я писал по [документации для библиотеки quixote](https://github.com/jamesshore/quixote/blob/master/docs/api.md)

* Рефакторим чтобы использовать язык ```TypeScript```
  - После компиляции проекта в вашем коде будут возникать ошибки, которые слудует исправлять в соответвии с семантикой ```TypeScript```. После исправления всех ошибок вы получите рабочий проект на ```TypeScript``` со всеми вытекающими отсюда удобствами.

**Итог**: Все, как оказалось невероятно просто, как досчитать до 5! :)
---
layout: post
title: "Пробуем ES2015(ES6) в действии"
date: 2015-06-29 12:49:59 +0000
comments: true
categories:
 - javascript
 - ES6/ES2015
 - babel
 - compilers
---

Буквально на днях (17 июня) свершилось то, чего ждали почти 6 лет в мире Javascript. Генеральное собрание Ecma International [официально одобрило](http://www.ecma-international.org/news/index.html) стандарт ECMA-262 6 версии, который является спецификацией языка ECMAScript 6 (ES6), который так же называют ECMAScript 2015. Предыдущий стандарт языка Javascript был одобрен в 2009 году (ES5).

Теперь дело за браузерами, которые начнут усиленно внедрять спецификацию языка в свои движки. Следить за поддержкой ES2015 удобно на сайте [kangax.github.io/compat-table/es6](http://kangax.github.io/compat-table/es6/).

### Некоторые термины:

* ECMAScript — это официальный стандарт языка JavaScript.
* TC39 — комитет, развивающий стандарт ECMAScript и принимающий решения по внедрению нового функционала.
* Внутри самого ECMAScript [много стандартов](http://www.ecma-international.org/publications/standards/Standard.htm). Самый популярный из них — ECMA-262.

### Немного истории

* 1995
    * Май - Brendan Eich реализовал Mocha в Nestcape
    * Сентябрь - Переименована в LiveScript
    * Декабрь - Переименован в JavaScript
* 1996
    * JavaScript берет стандартизацию в ECMA. Сейчас ECMA - это спецификация. JavaScript это одна из реализаций это спецификации (ActionScript другая реализация)
* Первая версия стандарта ECMA-262 вышла в 1997 году (спустя год после разработки).
* В июне 1998 года общим собранием ECMA была принята вторая редакция ECMA-262.
* В декабре 1999 вышла третья редакция спецификации. Она отличалась от предыдущей введением поддержки регулярных выражений, улучшением поддержки строк, введением новых управляющих конструкций, механизма исключений, форматирования при численном вводе и некоторые другие изменения.
* 2005
    * Mozilla и Macromedia начали работу над ECMAScript 4. Было внесено очень много изменений и добавлено много новых фич. Douglas Crockford (Yahoo) и Microsoft выступили против формализации этого стандарта.
    * ECMAScript 3.1 стал компромисным решением. Внесено множество изменений в версию 3. Добавлен режим ```strict mode```, добавлены новые фичи: get'еры и set'еры, поддержка JSON.
* В декабре 2009 состоялась встреча противоборствующих сторон в Осло, где было принято решение. ECMAScript 3.1 переименовали в ECMAScript 5. В знак мира и согласия новую версию стандарта JavaScript было решено назвать "Harmony"
* 5.1 версия cпецификации вышла в июне 2011, которая включает полную поддержку стандарта 3.0
* Июнь 2015 - версия ECMAScript 6.0 или ECMAScript 2015. Реализовано большое количество новых фич, которые не вышли в стандарте 4.0. В этом издании внесены самые большие изменения за историю спецификации.

Архив стандарта ECMA-262 можно посмотреть на [официальном сайте](http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm).

### Обзор нововведений в ECMAScript 6:

Здесь я постарался перечислить (с ссылкой на упоминания в спецификации) основные фичи который были приняты в финальной версии стандарта ECMAScript 2015.

* **Поддержка классов** [14.5](http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions).
* **Шаблоны строк** [12.2.9](http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals), [12.3.7](http://www.ecma-international.org/ecma-262/6.0/#sec-tagged-templates), предоставляющие удобные средства для форматирования строк.
* Поддержка **лексических объявлений переменных** [13.2.1](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-let-and-const-declarations) (Lexical Declarations), позволяющих ограничить текущим блоком область видимости ключевых слов, через их повторное определение при помощи оператора ```let``` вместо ```var```
* **Оператор const** [13.2.1](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-let-and-const-declarations) для определения переменных, доступных только для чтения
* **Сокращённый формат задания объектов** [13.2.1](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-let-and-const-declarations) (запись ```var a = {'obj1': obj1, 'obj2': obj2}``` теперь можно сократить до ```var a = {obj1, obj2}``` )
* **Модули** [15.2](http://www.ecma-international.org/ecma-262/6.0/#sec-modules). Для экспорта и импорта модулей введены операторы export и import, например, ```import * as mymodule from "lib/mymodule```. Предоставляются средства динамической загрузки модулей, пространства имён и изоляция состояния
* **Arrow-функции** [14.2](http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions) (синтаксис ```=>```) для быстрого определения анонимных функций (например, ```x.map(x => console.log(x * x));```)
* Добавлен новый тип **Symbol** [19.4](http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-objects), применимый для идентификаторов свойств объектов
* **Генераторы** [25.2](http://www.ecma-international.org/ecma-262/6.0/#sec-generatorfunction-objects), позволяющие организовать эффективное выполнение функций в асинхронном режиме. Генераторы представляют собой специальные функции, генерирующие итераторы. Использование выражения ```yield``` для генератора, позволяет приостановить его выполнение и вернуть управление вызвавшей генератор функции. Особенность генератора состоит в том, что последующие вызовы будут использовать предыдущее состояние и продолжат выполнение кода генератора с того места, где он был приостановлен
* Объект **WeakSet** [23.4](http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects), позволяющий определить множество из объектов, и объект **WeakMap** [23.3](http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects), определяет коллекцию пар ключ/значение в которых ключ является объектом, к которому может быть прикреплено произвольное значение. WeakSet и WeakMap отличаются использованием эффективных с точки зрения потребления памяти структур, использующих сборщик мусора для удаления неиспользуемых объектов (объект удаляется, если на него больше не осталось ссылок, кроме ссылки из текущей коллекции) и предотвращающих возникновение утечек памяти;
* **Механизм Promise** [25.4](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects), предназначенный для получения значений в асинхронном режиме. Позволяет определить значение, которое пока неизвестно, но будут определено через какое-то время
* **Значения по умолчанию для аргументов функций** [19.2](http://www.ecma-international.org/ecma-262/6.0/#sec-function-objects) (например, ```function myfunc(a='test', b=1)```)
* **Передача в функцию произвольной группы параметров в форме массива** [19.2](http://www.ecma-international.org/ecma-262/6.0/#sec-function-objects) (например, ```function myfunc(a, b, ...c)```)
* **Cтруктуры данных Map и Set** [23.1](http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects), [23.2](http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects), упрощающих работу со специфичными типами коллекций. Map позволяет определять коллекции наборов в формате ключ/значение, при том, что в качестве ключа и значения могут выступать любые выражения JavaScript. По аналогии Set позволяет задать множество любых выражений JavaScript;
* **Поддержка абстракции массивов** (Array comprehensions), дающих возможность создания нового массива на основе другого массива;
* Добавлено **множество методов для строк, массивов и математических операций**, в том числе:
    * Array.from() [22.1.2.1](http://www.ecma-international.org/ecma-262/6.0/#sec-array.from)
    * Array.prototype.keys [22.1.3.13](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.keys)
    * Array.prototype.entries [22.1.3.4](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.entries)
    * Array.prototype.copyWithin() [22.1.3.3](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.copywithin)
    * Number.isSafeInteger() [20.1.2.5](http://www.ecma-international.org/ecma-262/6.0/#sec-number.issafeinteger)
    * Math.fround() [20.2.2.17](http://www.ecma-international.org/ecma-262/6.0/#sec-math.fround)
    * String.prototype.startsWith() [21.1.3.18](http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.startswith)
    * String.prototype.endsWith() [21.1.3.6](http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.endswith)
    * Math.imul [20.2.2.19](http://www.ecma-international.org/ecma-262/6.0/#sec-math.imul)

В дополненение к списку хочу упомянуть хороший сайт [es6-features.org](http://es6-features.org/), поддерживаемый  [@engelschall](https://twitter.com/engelschall), на котором приводятся обзор и сравнение новых фич из ES6 c ES5.

А пока разработчики браузеров пишут свои движки с поддержкой ES2015, мы можем попробовать новый стандарт в действии уже сейчас. Например, сейчас большинство возможностей ES2015 в Chrome скрыто под флагом [chrome://flags/#enable-javascript-harmony](chrome://flags/#enable-javascript-harmony). Включив это свойство и перезапустив браузер, можно уже сейчас использовать [следующие](https://github.com/joyent/node/wiki/ES6-%28a.k.a.-Harmony%29-Features-Implemented-in-V8-and-Available-in-Node) функции ES2015.

У [@addyosmani](https://github.com/addyosmani) есть замечательный репозиторий, где он собрал коллекцию [es6-tools](https://github.com/addyosmani/es6-tools).
Первым в списке стоит Babel. Давайте разберем его подробнее и узнаем, как с помощью него можно уже сейчас писать код на ES6.

### Babel

[Babel](https://babeljs.io/) - это JavaScript транскомпилятор. Если кратко, то транскомпилятор отличается от компилятора тем, что он переводит код из новой версии в более старый - стабильный. Подробнее про транскомпиляторы можно почитать [тут](https://en.wikipedia.org/wiki/Source-to-source_compiler). Как написано на их сайте:

> By default, Babel ships with a set of ES2015 syntax transformers. These allow you to use new syntax, right now without waiting for browser support.

и это то, что нам нужно! Поиграться с этим транскомпилятором, не устанавливая его, можно прямо на сайте [babeljs.io/repl/](https://babeljs.io/repl/). Если мы хотим написать что-то серьезное, то нам нужно [установить и начать использовать](https://babeljs.io/docs/setup/) этот транскомпилятор.

### Пишем свой первый класс на ES2015

Используем сервис codepen.io и включим в настройках поддержку Babel. В своем примере я продемонстрировал новые возможности ES2015: классы, их наследование и шаблоны строк.

<div data-height="264" data-theme-id="16380" data-slug-hash="yNpWYY" data-default-tab="js" data-user="greybax" class='codepen'><pre><code>// Базовый класс Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  about() {
     console.log(`${this.name} is ${this.age} years old`);
  }
}

var jack = new Person(&quot;Jack&quot;, &quot;50&quot;);
jack.about();

// Класс Son - наследник
class Son extends Person {
  constructor(name, age) {
    super(name, age);
    this.son = true;
  }
}

var john = new Son(&quot;John&quot;, &quot;25&quot;);
john.about();
john.son;</code></pre>
<p>See the Pen <a href='http://codepen.io/greybax/pen/yNpWYY/'>yNpWYY</a> by Alex Filatov (<a href='http://codepen.io/greybax'>@greybax</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Ссылки

* [Официальная спецификация ES 2015 ](http://www.ecma-international.org/ecma-262/6.0/).
* [Exploring ES6: Upgrade to the next version of JavaScript](http://exploringjs.com/) - Отличная книга доктора Axel Rauschmayer по ES6. Axel также является автором книги [Speaking JavaScript: An In-Depth Guide for Programmers](http://speakingjs.com/), ведет свой блог [2ality.com](http://www.2ality.com/) и организатор [MunichJS User Group](http://www.munichjs.org/)
* [es6-features.org](http://es6-features.org/) - классный сайт, поддерживаемый [@engelschall](https://twitter.com/engelschall).  Приводится обзор и сравнение новых фич из ES6 c ES5.
* [JavaScript, ECMA–262, TC39, and ECMAScript Transpilers Explained](https://medium.com/innoarchitech-innovation-architecture-technology/javascript-ecma-262-tc39-and-ecmascript-transpilers-explained-adde38701bf7)
* [Цикл статей ES6 In Depth](https://hacks.mozilla.org/category/es6-in-depth/)
* [Моя презентация](http://alfilatov.com/presentations/index)
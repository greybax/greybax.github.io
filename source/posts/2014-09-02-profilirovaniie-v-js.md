# Профилирование в JS

#profilers, #browsers, #optimization, #javascript, #russian;

_2014-09-04_

Профилирование - это в первую очерель сбор и анализ информации, а уже потом программирование и работы по улучшению производительности программы.

## Зачем нужна оптимизация?
1. Загрузка страницы экономит нервы пользователя. Следствие из этого мы получаем лояльных пользователей.
2. Полезно разработчику, чтобы лучше понять "узкие места" своего сайта в которых его приложение подвисает.

Самый простой способ посмотреть время загрузки ```DOM``` не заморачиваясь на профилировании это конечно стандартные профайлеры такие как ```Chrome Inspector Network```, ```Firebug Net Panel``` и т.д. Итак, разберемся какие бывают способы оптимизировать работу своего приложения.

* Метод пристального взгляда
* Инструментальное (средствами исполняемой среды)
* Ручное (средствами языка)

Если с первым методом все понятно, то про другие два я хочу рассказать. 

## Инструментальное профилирование
Во все актуальные версии браузеров уже встроены инструменты разработчика, в которые входит ```profiler```. Так профайлеры есть в: ```Firefox```, ```IE```, ```Chrome```.

### Chrome Inspector Network
Версия ```Chrome```: 37.0.2062.103 m
![Chrome Profiler](/images/screenshots/ChromeProfiler.png)

Результат работы профайлера приведен выше. Есть таблица с общим и собственным временем выполнения загрузки скрипта

Плюсы:

+ Возможность профилировать как производительность так и утечки памяти
+ Варинт просмотра выполнения скриптов на странице графиком и деревом вызовов
+ Доступен фокус просмотра на конрктной функции или дереве вызова функций
+ Возможность перейти в участок кода функции
+ Дерево вызовов
+ Сортировка

Минусы:

- Слишком нагроможденный интерфейс в режиме просмотра Chart (В ```Firefox``` профайлере c этим дела обстоят лучше)
- Профилирует не саму страницу, а все что видит, т.е. в профайлер попадают куча плагинов и расширений
- Нет возможности выбрать конретный метод или конструктор который мы хотим профилировать 

Подробно о [Profiling JavaScript Performance](https://developer.chrome.com/devtools/docs/cpu-profiling) и о [Javascript Memory Profiling](https://developer.chrome.com/devtools/docs/javascript-memory-profiling)

### Firebug Net Panel
Версия ```Firefox```: 32.0
![Firebug Profiler](/images/screenshots/FirefoxProfiler.png)

Результат работы профайлера приведен выше. Здесь в интерфейс профайлера уже интегрирована диаграмма времени загрузки скриптов по умолчанию. Остальные элементы интерфейса аналогичны профайлеру в Хроме.

Плюсы:

+ Диаграмма времени вызова функций и удобная фильтрация по ней
+ Возможность перейти в участок кода функции
+ Дерево вызовов
+ Сортировка
+ Удобно выделять детально промежутки времени и детально наблюдать время загрузки

Минусы:

- Нет фильтрации по конретным функциям
- Нет возможности выбрать конретный метод или конструктор который мы хотим профилировать 

Подробно о [профайлере](https://developer.mozilla.org/en-US/docs/Tools/Profiler)

### Internet Explorer 11
![IE Profiler](/images/screenshots/IEProfiler.png)
Здесь аналогично Хрому есть профайлер CPU и профайлер памяти.

Плюсы и минусы профилировщика аналогичны тем что описаны выше. Наконец-то появилась возможность переходить прямо из профайлера в код скрипта. До ```IE 9``` эта функция отстутствовала.

## Ручное профилирование
Бывают задачи когда нужно посмореть время выполнения конкретных функций или конструкторов, использовать встроенные профилировщики и разбираться в дереве вызовов в поисках нужной функции бывает довольно неудобно. На эти случаи удобно использовать следующие конструкции языка ```javascript```:
```javascript
t = +new Date();
code_to_measure();
time = +new Date() - t;
```
Более удобный варинт реализует паттерн Декоратор:
```javascript
function profile(func) {
  var wrapper = function() {
    var start = +new Date();
    var result = func.apply(null, arguments);
    console.log(func.name, +new Date() - start, "ms");
    return result;
  }
  return wrapper;
}
```
Вызываем функцию профайлер так
```javascript
code_to_measure = profile(code_to_measure);
code_to_measure();
>code_to_measure 10 ms
```

## Итог
Идеального для себя профайлера я не нашел, довольно симпатичными выглядят встроенные в ```Chrome``` и в ```Firefox```, но они не имеют части функционала которая выделяла бы их из общей массы. Тем более, оптимузируя свое приложение под тот или иной браузер приходится сталкиваться с его встроенным профайлером. Не стоит забывать и про старые ручные методы которые часто помогают. 

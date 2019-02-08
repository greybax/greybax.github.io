# ASP.NET: События жизненного цикла страницы

#ASP.NET, #programming, #gist, #russian;

_May 12, 2014_

Эта статья является продолжением статьи "ASP.NET: Этапы жизненного цикла страницы". Сейчас я хочу более подробно рассказать о событийной модели в ASP.NET. Во время прохождения этапов жизненного цикла возникают события, подписавшись на которые, разработчик может выполнять свой собственный код. Зачастую, многие начинающие разработчики, путают порядок событий в ASP.NET приложении. 
Проверить trace загрузки страницы достаточно просто:

* Создадим простое ```ASP.NET Web Forms Application``` в студии
* Добавим атрибуты ```Trace``` и ```TraceMode``` директивы ```@Page``` и устанавливаем значения 'true' и 'SortByName' соответственно.

![example](http://2.bp.blogspot.com/-t8kJhuvsFzY/U2dzRQx22fI/AAAAAAAABA4/joxV8eAvuIE/s1600/Untitled.png)


* Запускаем наш сайт (нажимаем F5 в студии)
* Прямо в окне браузера вместе с сайтом загрузилась информации трассировки.

![example](http://4.bp.blogspot.com/-6tgWMi1IZHk/U2d3K3cYC7I/AAAAAAAABBE/vDJc1nhg8FU/s1600/22.png)

Во время трассировки не выводится событие ```Unload```, потому что оно происходит, когда весь код уже отработал. Из всех событий жизненного цикла страницы, разработчик может подписаться только на пять, помимо событий дочерних элементов управления. Эти события: 

* ```PreInit```
* ```Init```
* ```Load```
* ```PreRender```
* ```Unload```

Во время любого события можно использовать свойство IsPostBack, для того, чтобы определить вызвана ли эта страница в первый раз или в результате postback. Рассмотрим варианты использования этих событий.

| Событие | Использование |
| ------ | ----------- |
| PreInit | На данном этапе элементы управления еще не созданы и равны ```null```. Здесь разработчик может создать динамически элементы управления, динамически устанавливать шаблон дизайна или тему оформления, считывать или устанавливать свойства объекта ```Profile```. |
| Init | Здесь происходит начальная инициализация контролов, значения берутся из aspx файла. ```Tracking ViewState``` еще отключен. В случае, если разработчик самостоятельно установит свойства на этом этапе, то на следующем установленные значения могут быть изменены. На этом этапе разработчик может считывать или инициализировать свойства элементов управления. |
| Load | Загружаются данные из ресурсов. Если произошел Postback, элементы управления получают значения, которые были отправлены с формы. На этом этапе разработчик может считывать или изменять свойства элементов управления. |
| PreRender | Последняя возможность внести изменения во внешний вид страницы. |
| Unload | Освобождение занятых ресурсов (закрытие открытых соединений с базой данных, завершение работы с файлами и т.п.) Важно, что на этом этапе уже создано HTML представление страницы и попытка внести какие-либо изменения (например, вызвав метод ```Response.Write()```), приведет к исключению. Если на данном этапе изменить знамения элементов управления, они не попадут конечному пользователю. |

## Пример

<script src="https://gist.github.com/greybax/d4147fb046cf9b3cf7d3.js"></script> 

Результат работы скрипта приведен в таблице:

| Событие |||| IsPostBack |||||
| --------: | :------: | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
|||| **До** |||| **После** ||
|| Tracking ViewState | TextBox (на момент входа в функцию) | TextBox (на момент выхода из функции) | Response.Write | Tracking ViewState | TextBox (на момент входа в функцию) | TextBox (на момент выхода из функции) | Response.Write |
| ***OnPreInit*** | False | null | null | OnPreInit | False | null | null | OnPreInit |
| ***OnInit*** | False | Sample text | Sample text OnInit | OnInit | False | Sample text | Sample text OnInit | OnInit |
| ***OnPreLoad*** | True | Sample text OnInit | Sample text OnInit OnPreLoad | OnPreLoad | True | Sample text OnInit OnPreLoad OnPreRender | Sample text OnInit OnPreLoad OnPreRender OnPreLoad | OnPreLoad |
| ***OnPreRender*** | True | Sample text OnInit OnPreLoad | Sample text OnInit OnPreLoad OnPreRender | OnPreRender | True | Sample text OnInit OnPreLoad OnPreRender OnPreLoad | Sample text OnInit OnPreLoad OnPreRender OnPreLoad OnPreRender | OnPreRender |
| ***OnUnload*** | True | Sample text OnInit OnPreLoad OnPreRender | Sample text OnInit OnPreLoad OnPreRender OnUnload | Error | True | Sample text OnInit OnPreLoad OnPreRender OnPreLoad OnPreRender | Sample text OnInit OnPreLoad OnPreRender OnPreLoad OnPreRender OnUnload | Error |
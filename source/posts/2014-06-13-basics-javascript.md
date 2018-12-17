# Основы языка Javascript

_June 13, 2014_

#javascript, #frontend, #russian;

Статья посвящена в первую очередь изучающим Javascript. Некоторые из вещей могут показаться очевидными, но я надеюсь, что читатель найдет что-то интересное и для себя. Сам я прочитал достаточное количество статей в сети по этому языку. Но найти материал который бы кратко и просто излагал сущность языка я так и не нашел. Это меня вдохновило на написание собственной статьи.

## Javascript - это

* Прототипированный язык программирования
* Уже не только client-side технология, но и server-side (Node.js)
* Не Java :)
* Однопоточный, но асинхронный язык

## Объявление переменных

```javascript
var num;
num = 100500;
```
JS слабо типизированный язык, что демонстрирует следующий пример:

```javascript
var text = 'some text';
text = 42;	// there is 42 now
```

*Важно*:

* Не забывайте ставить ```;``` в конце каждой строки.
* Всегда используйте ```var``` при объявлении переменных.

## Типы данных

### Простые

* Number
* String
* Boolean
* Undefined
* Null

### Ссылочные

* Object

Разберем каждый тип подробнее:

#### Number

```javascript
var num = 100500;	// this is a number type
num = 0.0009;		// also this is a number type
```

Доступны все стандартные числовые операции: ``` + -  * / % ++ -- ``` 

```javascript
var thisIsInfinity = 999/0;					// Infinity
var thisIsNaN = "this is not number" * 3;	// NaN
```

#### String

Пример использования кавычек:

```javascript
var fooString = "I say: 'Yeah!' It's cool.";
fooString = 'He said: "Yeah!"’;
```

Конкатенация строк:

```javascript
var text = "a" + "b";	// text has value "ab"
```

Другие полезные методы:

* charAt()
* indexOf()
* slice()
* toLowerCase()
* toUpperCase()

#### Boolean, undefined and null

1. Boolean (true/false)

```javascript
var thisIsTrue = true;
```

2. Undefined - специальный тип, который означает, что переменная не определена

```javascript
var foo;	// foo is undefined
```

3. Null - специальный тип, означает буквально "ничего"

```javascript
var bar = null;	// foo is null
```

## Объекты в Javascript

Объекты в JS это стандартные ассоциативные массивы, другими словами "хэш".

```javascript
var obj = {
	name: "John",
	lastname: "Johnson"
}
```
Ассоциативный массив - абстрактный тип данных состоят из набора из пар <ключ>: <значение>. 

### Создание объектов

Оба способа эквивалентны:

```javascript
var obj = {};			// simple creating
var obj = new Object();	// standard syntax
```

Литеральный синтаксис:

```javascript
// creation with properties
var obj = {
	name: "John",
	lastname: "Johnson"
}
```

### Операции с объектами

```javascript
obj.name = "John";				// add property
obj[“lastName”] = "Johnson";
alert(obj.name);				// get property
alert(obj["lastName"]);
delete obj.name;				// delete property
```


#### Оператор ```in```

```javascript
var obj = new Object();
obj.prop = 'exists';
'prop' in obj;			// returns true
'toString' in obj;		// returns true
```

#### Метод ```hasOwnProperty```  

```javascript
var obj = new Object();
obj.prop = 'exists';
obj.hasOwnProperty('toString');	// returns false
```

В отличие от оператора in, метод hasOwnProperty не проверяет по объекту цепочку прототипов.

#### ```=== undefined```

```javascript
var obj = {};					// add property with undefined value
obj.test = undefined;
alert(obj.test === undefined);	// true
alert(obj.test2 === undefined);	// true
```

Вполне возможна ситуация, что свойство существует и является равно undefined

## Преобразование типов

### String

```javascript
var str1 = String(1);	// string '1'
var str2 = '' + 1;		// string '1'
```

### Numerical

```javascript
var num1 = Number('42');	// number 42
var num2 = +'42';			// number 42
```

### Boolean

```javascript
var bool1 = Boolean(null);	// false
var bool2 = !null;			// false
```

## Операторы сравнения

Приведение типов используется в операторах: ``` < > <= >= == != ``` 
Приведение типов НЕ используется в операторах: ``` === !== ```<

Советую использовать для более наглядного сравнения равенства/неравенства операторы ```===``` и ```!==``` соответственно.

Примеры для демонстрации:

```javascript
"" == "0"	// false
0 == ""		// true
0 == "0"	// true

false == "false"	// false
false == "0"		// true
false == undefined  // false
false == null 		// false

null == undefined  // true

"\t \r \n" == 0 	// true

"" === "0"	// false
0 === ""	// false
0 === "0"	// false
0 === "0"	// false

false === "false"		// false
false === "0"			// false
false === undefined		// false

false === null 		// false

null === undefined 	// false

"\t \r \n" === 0 	// false
```

## Массивы 

Одно из важных и отличительных свойств массивов в Javascript является то, что массивы могут содержать переменные разных типов.

```javascript
var emptyArray = [];
var numberArrray = [1, 2, 3];
var myCollection = [1, 'my_string', true];
myCollection[0];	// 1
```

Некоторые полезные функции работы с массивами:

* push/pop
* shift/unshift
* splice
* join/split
* sort
* reverse
* concat
* indexOf/lastIndexOf

Особое внимание хочется уделить свойству массива ```length```.

```javascript
var myArray = [1, 2, 3];
myArray.length;		// equals 3
myArray.length = 4;
myArray.length = 2;	// [1, 2]
myArray[1000000] = 4;
```

Таким образом * ```length``` = последний индекс массива + 1*. Если часть элементов массива не будут инициализированы, то они будут равны ```undefined```.

## Функции

Функции - это объекты в Javascript. Поэтому их можно присваивать переменным, передавать и, конечно, у них есть свойства. Существует 3 способа создать функцию. Основное отличие в результате их работы - в том, что именованная функция видна везде, а анонимная - только после объявления.

### Именнованные

```javascript
sayAnithing("Hi");
function(message) {
	alert(mesage);
}
```

### Анонимные

```javascript
var sayBonjour = function () {
	alert("Bonjour!");
}
sayBonjour();	// Says "Bonjour!"
```

### Аргументы функции

Функции можно запускать с любым числом параметров. Если функции передано меньше параметров, чем есть в определении, то отсутствующие считаются ```undefined```.

```javascript
foo(0, 1, 2, 3, 4);
function foo (a, b, c) { 
	arguments[0] = 2;
	a;				// 2
	b = 17;
	arguments[1];	// 17
	arguments[4];	// 4
}
```

Аргументы можно изменять.

Одной из любопытных функций является ```typeof()```, которая возвращает тип переменной.

```javascript
typeof undefined 	 // undefined
typeof 0 			 // number
typeof true 		 // boolean
typeof "foo" 		 // string
```

Специфика языка Javascript:

```javascript
typeof {}			 // object
typeof null 		 // object
typeof function() {} // function
```

## Scope и контекст выполнения

```javascript
typeof {}			 // object
typeof null 		 // object
typeof function() {} // function
```

Выполнение JavaScript представляет из себя стэк контекстов выполнения. Контекст, который активирует другой контекст, называется вызывающим контекстом (*caller*). Контекст, который вызывают, называется вызываемым контекстом (*callee*). При этом callee-контекст может являться caller’ом для другого callee, что частенько и происходит когда один из одной функции вызывается другая.

```javascript
var color = "blue";	// Global scope
function changeColor () {
	// changeColor scope
	var anotherColor = "red";
	function swapColors () {
		// swapColors scope
		var tempColor = anotherColor;
		anotherColor = color;
		color = tempColor;
	}
	swapColors(); // function call
}
changeColor();	// function call
```

Схема ниже иллюстрирует контекст выполнения функций:

![func_scope](http://2.bp.blogspot.com/-JkQD5nm6wtI/U5rkqe9m1_I/AAAAAAAABBY/JsYrX9EW0u8/s1600/2014-06-13+15-43-51+%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82+%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0.png)

Переменные видны внутри контекста функции не зависимо где они объявлены. Необычно для новичков в JS выглядит следующий пример:

```javascript
function myFunc () {
	If (true) {
		var localVar = "I’m local";
	}
	console.log(localVar);	//Shows "I’m local" in myFunc
}
```

## Замыкания 

Замыкание - внутренняя функция. Javascript позволяет создавать функции по ходу выполнения скрипта. И эти функции имеют доступ к переменным внешней функции.

Рассмотрим пример:

```javascript
function Counter () {
	var count = 0;
	return function () {
		return ++count;
	}
}

var increaseCount = Counter();
alert(increaseCount());	// Shows 1
alert(increaseCount());	// Shows 2
```

Внутренняя анонимная функция замыкает на себе функцию Counter. Это означает что когда заканчивает работать функция Counter, внутренняя функция остается жить, ее можно запускать в другом месте кода. В этой функции мы используем переменную count, т.е получается что внутренняя функция замыкает на себе переменную count внешней функции. 

## Прототипы

В Javascript все объекты наследуют Object, поэтому каждый объект имеет свойство prototype. Prototype это объект, которое позволяет шарить свойства с другими объектами.

![prototypes](http://3.bp.blogspot.com/-aE93elcAvL4/U5sBdhK_YUI/AAAAAAAABBo/SWEMu8srCJc/s1600/2014-06-13+17-49-12+%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82+%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0.png)

Например, когда у объекта свойство "jump", то интерпретатор языка ищет сначала это свойство у самого объекта, а потом спускаясь по цепочке прототипов ищет в них пока не найдет.

## "Классы"

В спецификации ECMAScript 5 нет понятия класса. Реализовать класс в привычном понятии для ООП можно путем создания конструктора с прототипом. Принадлежность к классу проверяет оператор ```instanceof```.

```javascript
function Animal (name) {
	//constructor
	this..name = name;
}

Animal.prototype.speed = 0;	//Property with value by default
Animal.prototype.run = function (speed) {
	//Method of prototype
	this.speed += speed;
	alert(this.name + ' run, speed is: ' + this.speed);
}
```

## ```this```

```this``` зависит от контекста вызова. Рассмотрим возможные варианты:

### ```this``` в простом вызове

В этом случае ```this``` - это глобальный объект

```javascript
function simpleFunction () {
	this;
}
simpleFunction();
```

### ```this``` в конструкторе 

В этом случае ```this``` - это новый объект

```javascript
function simpleConstructor () {
	this.someProperty = "This is some property";
}
var someObject = new simpleConstructor();
```

### ```this``` в методе объекта 

В данном примере ```this``` это объект country:

```javascript
var country = {
	name: "Sparta",
}

var say = function () {
	alert("This is " + this.country.sayName();
}

country.sayName = say;
country.sayName();
```

### ```this``` как первый аргумент в ```call/apply``` 

```javascript
function sum (a,b) {
	this.result = a + b;
}

var obj = {};
sum.call(obj, 1, 2);	// sum.apply(obj, [1, 2]);
alert(obj.result);		// Property was created. Result is 3
```

## Наследование 

В JS в отличие от других языков программирования реализация наследования как одного из принципов ООП, может быть реализовано несколькими способами. Думаю в данной статье будет излишне описывать каждый из способов, подробно о них можно прочитать в книге: "Professional JavaScript for Web Developers", N. Zakas.

* Prototype Chaining
* Object Masquerading inheritance
* Combination Inheritance
* Prototypal Inheritance
* Parasitic Inheritance
* Parasitic Combination Inheritance

## Литература
* [http://www.ecmascript.org](http://www.ecmascript.org/">http://www.ecmascript.org/)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* Larry Ulman "Modern JavaScript Develop and Design"
* David Flanagan "JavaScript: The Definitive Guide"
* Nicholas C. Zakas "Professional JavaScript for Web Developers"

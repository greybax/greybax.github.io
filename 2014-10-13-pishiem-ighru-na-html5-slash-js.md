---
layout: post
title: "Пишем игру на HTML5/JS"
date: 2014-10-13 08:34:07 +0000
comments: true
categories:
 - javascript
 - gamedev
 - html5
 - canvas
---

На выходных нашлось немного свободного времени и я решил попрактиковаться в ```gamedev``` разработке. Давно собирался написать какую-нибудь игрушку, но все руки не доходили. Бегло пробежался по сети в поисках как это делают настоящие гуру. Мне понравилась вот эта [статья](http://jlongster.com/Making-Sprite-based-Games-with-Canvas). За основу своей будущей игры я взял [фреймворк автора статьи](https://github.com/jlongster/canvas-game-bootstrap).

![Towers game 2D](/images/screenshots/towers_game2d.png)

## Начало
Фреймворк, который я стал использовать включает в себя 4 ```js``` файла 

- ```sprite.js``` - библиотечка работы со спрайтами
- ```resources.js``` - подгрузка ресурсов
- ```input.js``` - библиотека ввода с клавиатуры
- ```app.js``` - основной файл игры

Далее буду рассказывать только о файле ```app.js```. Разберем его содержимое.

Для плавности анимации будем использовать ```requestAnimationFrame```. Подробно о нем ознакомиться можно [здесь](https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/)
```javascript
var requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();
```

Разделим разработку нашей игры на несколько этапов:

1. Создание и инициализация холста (canvas) на странице
2. Добавление основной функции-цикла игры
3. Инициализация и рендер объектов и ресурсов игры
4. Обработка событий ввода пользователя
5. Математика и расчет столкновений объектов в игре
6. Окончание и перезагрузка игры

## Этап 1. Создание и инициализация холста
Первым делом что мы должны сделать - это создать ```canvas``` элемент и добавить его к тегу ```body``` основной страницы игры.
```javascript
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 520;
document.body.appendChild(canvas);
```

- Создаем объект ```canvas```
- Указываем, что мы создаем 2D игру (далее будем использовать везде в коде объект ```ctx```)
- Задаем размеры холста
- Добавляем холст к тегу ```body``` на странице

## Этап 2. Добавление основной функции-цикла
Основной цикл необходим для обновления и рендера игры.
```javascript
var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
}
```
Здесь вызываем функцию requestAnimFrame (к сожалению, [поддерживается](http://caniuse.com/#feat=requestanimationframe) не во всех браузерах), которая генерирует 60 фреймов/секунду (как это было описано выше).

## Этап 3. Инициализация и рендер объектов и ресурсов игры
Используем ```resource.js``` для загрузки ресурсов в игру. Хорошим правилом является добавить все изображения  в  1 спрайт, но т.к я рисовал не сам, а брал готовые картинки, поэтому я решил с этим на заморачиваться, тем более, что в данном случае это не столь критично. Так это выглядит [в коде](https://github.com/greybax/towers_game2d/blob/gh-pages/js/app.js#L57)
```javascript
resources.load([
  'img/tower.png',
	'img/sprites.png',
	'img/spider.png',
  'img/hero.png',
	'img/bullet.png',
  'img/terrain.png'
]);
resources.onReady(init);
```
В функции ```init``` загружаем мир и добавлеем хэндлер кнопки ```reset```, после game over.
```javascript
function init() {
    terrainPattern = ctx.createPattern(resources.get('img/terrain.png'), 'repeat');

	  document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });
	
    reset();
    lastTime = Date.now();
    main();
}
```
### Начальное состояние
```javascript
var player = {
    pos: [0, 0],
    sprite: new Sprite('img/hero.png', [0, 0], [48, 30], 5, [0, 1, 2, 1]),
	  down: new Sprite('img/hero.png', [0, 0], [48, 30], 5, [0, 1, 2, 1]),
	  up: new Sprite('img/hero.png', [0, 144], [48, 30], 5, [0, 1, 2, 1]),
	  left: new Sprite('img/hero.png', [0, 48], [48, 30], 5, [0, 1, 2, 1]),
	  right: new Sprite('img/hero.png', [0, 96], [48, 30], 5, [0, 1, 2, 1])
};

var towers = [];
var bullets = [];
var enemies = [];
var explosions = [];

var lastTower = 0;
var gameTime = 0;
var isGameOver;
var terrainPattern;

var score = 0;
var scoreEl = document.getElementById('score');
```

### Обновление состояния игрового процесса
По нашей задумке пауки должны вылезать со всех 4 сторон игрового поля. Для того чтобы это происходило случайным образом, используем функцию [getRandomInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).
```javascript
switch (getRandomInt(0,4)) {
		  case 0:	//left
			enemies.push({
				pos: [0, Math.random() * (canvas.height - 30)],
				sprite: new Sprite('img/spider.png', [0, 0], [40, 30], 5, [0, 1, 2, 1])
			});
			break;
		  case 1:	//top
			enemies.push({
				pos: [Math.random() * canvas.width, 0],
				sprite: new Sprite('img/spider.png', [0, 0], [40, 30], 5, [0, 1, 2, 1])
			});
			break;
			case 2:	//bottom
			enemies.push({
				pos: [Math.random() * canvas.width, canvas.height - 30],
				sprite: new Sprite('img/spider.png', [0, 0], [40, 30], 5, [0, 1, 2, 1])
			});
			break;
			default: //right
			enemies.push({
				pos: [canvas.width, Math.random() * (canvas.height - 30)],
				sprite: new Sprite('img/spider.png', [0, 0], [40, 30], 5, [0, 1, 2, 1])
			});
			break;
		}
```
Здесь же используем ```sprite.js```. Всю функцию можно посмотреть в [исходниках](https://github.com/greybax/towers_game2d/blob/gh-pages/js/app.js#L96).

## Этап 4. Обработка событий ввода пользователя
Наш герой должен уметь двигаться вверх, вниз, влево, вправо. Соответственно привожу ниже реализацию данного решения
```javascript
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
		    player.sprite = player.down;
    }

    if (input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
		    player.sprite = player.up;
	  }

    if (input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
		    player.sprite = player.left;
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
		    player.sprite = player.right;
    }
```
При клике на пробел по задумке должны ставиться башни которые будут стрелять случайным образом во все стороны. Чтобы немного усложнить процесс игры башни разрешается ставить на некоторм расстоянии друг от друга. В данном случае это ```50px```.
```javascript
    if (input.isDown('SPACE') && !isGameOver) {
		var isClosest = false;
		for (var i = 0; i < towers.length; i++) {
			if (Math.abs(player.pos[0] - towers[i].pos[0]) < 50 && 
				Math.abs(player.pos[1] - towers[i].pos[1]) < 50) {
				isClosest = true;
			}
		}
		
		if (!isClosest) {
			  towers[lastTower % 3] = {
				pos: [player.pos[0], player.pos[1]],
				lastFire: Date.now(),
				sprite: new Sprite('img/tower.png', [0, 0], [38, 35], 8, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
			  };
			  lastTower++;
		  }
    }
```

## Этап 5. Математика и расчет столкновений объектов в игре
Анимация персонажей, математика движения пуль, и логика движения NPC в игре описаны в функции ```updateEntities```. Вот тут как раз нам и потребуются базовые знания линейной алгебры.
```javascript
  // Update the towers sprite animation
	for(var i = 0; i < towers.length; i++) {
      var tower = towers[i];
      tower.sprite.update(dt);

      if (!isGameOver && Date.now() - tower.lastFire > 500) {
        var pi = Math.PI;
        var x = tower.pos[0] + tower.sprite.size[0] / 2;
        var y = tower.pos[1] + tower.sprite.size[1] / 2;

        bullets.push({
          pos: [x, y],
          k: getRandomArbitrary(-5 * pi, 5 * pi),
          sprite: new Sprite('img/bullet.png', [0, 0], [24, 24]) 
        });
        tower.lastFire = Date.now();
      }
	}
```
Логика обновления анимации спрайтов башни. И создаем патроны для каждой башни в своем массиве. 

Динамика пуль башни:
```javascript
    // Update all the bullets
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

		    var c = dt * bulletSpeed;
        var sin = Math.sin(bullet.k);		
        var cos = Math.cos(bullet.k);

        bullet.pos[0] += sin * c;
        bullet.pos[1] += cos * c;		

        // Remove the bullet if it goes offscreen
        if (bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
            bullet.pos[0] > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }
```  
Напомню, что нашей целью было чтобы башни стреляли случайным образом во всех направлениях.

Пауков мы наделили простым интелектом и поэтому они ползут всегда за нами, чтобы нас укусить.
```javascript
    // Update all the enemies
    for (var i = 0; i < enemies.length; i++) {
	    var x0 = enemies[i].pos[0];
      var y0 = enemies[i].pos[1];
      var x1 = player.pos[0];
      var y1 = player.pos[1];
      var c = enemySpeed * dt;
      var l = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
		
      enemies[i].pos[0] += (x1 - x0) * c / l;
      enemies[i].pos[1] += (y1 - y0) * c / l;

      enemies[i].sprite.update(dt);

          // Remove if offscreen
          if (enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
              enemies.splice(i, 1);
              i--;
          }
    }
```

Полный код функции ```updateEntities``` можно посмотреть в [исходникак на GitHub](https://github.com/greybax/towers_game2d/blob/gh-pages/js/app.js#L179).

Математика расчета столкновений хорошо [описана](http://jlongster.com/Making-Sprite-based-Games-with-Canvas) в статье автора (раздел Collision Detection) используемого мной 2d бутстрапа.

## Этап 6. Game Over и рестарт
Когда пауки доползают до нашего героя наступает конец ~~света~~ игры. 
```javascript
function gameOver() {
	  document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
}
```
Показываем окно GAME OVER и кнопку "Начать заного". Кликаем ее и все начинается сначала :)
```javascript
function reset() {
	  document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    gameTime = 0;
	  lastTower = 0;
    score = 0;

	  towers = [];
    enemies = [];
    bullets = [];

    player.pos = [canvas.width / 2, canvas.height / 2];
}
```

## Заключение
В итоге, я для себя понял, что в ```gamedev``` много плюсов:

- Весело и интересно проводишь время
- Повторяешь курс школьной геометрии. Если игра серьезней, то и универ вспоминаешь :)
- Практика программирования игр
- Удовлетворение от проделанной работы

Посмотреть исходники можно [тут](https://github.com/greybax/towers_game2d/), поиграть [здесь](http://greybax.github.io/towers_game2d).

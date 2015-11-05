---
layout: post
title: "Используем Fiddler в качестве прокси"
date: 2014-10-01 10:05:46 +0000
comments: true
categories: 
 - fiddler
 - proxy
 - configuration
 - debugging
---

[Fiddler](http://www.telerik.com/fiddler) - мощный инструмент для веб дебагинга, мониторинга веб трафика, манипуляций с сессией и т.п. Кроме того в ```Fiddler``` есть еще одна мощная фича - это возможность его использования как самостоятельный proxy сервер на машине где он запущен.

Мне эта фича пригодилась когда пришлось подключаться с моего iPhone девайса через ```VPN``` к серверу, который находится на другом конце планеты. Аналогично, вместо iPhone мог быть любой девайс, планшет или десктоп.

Постараюсь описать процесс настройки максимально детально. Версия установленного ```Fiddler``` у меня - ```Fiddler Web Debugger (v4.4.8.0)```. ```Built: Wednesday, April 23, 2014```

## Конфигурация Fiddler
1. Переходим Tools > Fiddler Options > Connections.
2. Ставим галку Allow remote computers to connect.
![Check "Allow remote computers to connect"](/images/screenshots/allow_remote_to_connect.png)

3. Перезапускаем ```Fiddler```
4. Следует проверить что в ```firewall``` разрешены входящие соединения для Fiddler
![Income conections for fiddler process](/images/screenshots/fiddler_income_connections.png)

5. В правом верхнем углу ```Fiddler``` находим ```Online Indicator``` и смотрим в нем по какому ip орудует наш ```Fiddler```. Нам нужен локальный адрес машины. Этот ip адрес мы будем указывать в настройках интернет соединения  нашего девайса на вкладке ```Proxy```.
![Online Indicator](/images/screenshots/indicator_ip_address.png)

После выполнения этих пунктов наш ```Fiddler``` готов принимать входящие соединения с внешних устройств. Соответственно может использоваться как прокси, обрабатывая через себя все запросы, которые приходят с нашего внешнего устройства.

## Конфигурация iPhone
1. Переходим 'Настройки' > 'Wi-Fi'
2. Переходим в настройки Wi-Fi соединения
3. Выбираем раздел 'Вручную' в секции HTTP прокси
4. В поле Сервер, вводим IP адрес машины где запущен ```Fiddler```
5. Порт - 8888
6. Аутентификацию отключаем

![iPhone proxy settings](/images/screenshots/iPhone_proxy_settings.png)

Теперь после перехода на любой сайт со своего iPhone можно мониторить все request/response в ```Fiddler```

# HTTPS для Github Pages через CloudFare (Free)

_December 9, 2015_

#https, #cloudfare

Наверно многие хотят видеть у своего сайта зеленый значок защищенного соединения (https).
К сожалению, существет ряд причин по которым это бывает сделать довольно не просто. Например, GitHub Pages до сих 
пор не поддерживают HTTPS для кастомных доменов 
([Add HTTPS support to Github Pages](https://github.com/isaacs/github/issues/156) - это неофициальный багтрекинг Github Pages).

Есть 2 возможности обойти это ограничение:
* использовать собсвтенный сервер для хостинга вашего сайта. Способ настройки https в данном случае хорошо описан [Hosting GitHub Pages with HTTPS](https://outcoldman.com/en/archive/2015/08/30/hosting-github-pages-with-https/)
* использовать сервисы (например CloudFare).

О втором варианте я и хочу рассказать в этой заметке.

Подразумевается, что вы знакомы с Githab Pages и знаете как хостить там свой сайт.


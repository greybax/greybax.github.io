# How to use Unsplash in your projects?

#css, #configuration, #unsplash, #english;

_June 18, 2019_

## Intro

Recently I've explored for yourself great photo stock service [Unsplash.com](https://unsplash.com/). 

> The internet’s source of freely useable images. Powered by creators everywhere

Service has tons of high quality photos grouped by collections and categories. So you can find photo about everything literally.

So in this post I want to share one pretty interesting thing which I've done with this service. But I believe you could already noticed it on the main page of this blog.

## Dynamic background image

For a long time the main page of this blog has mono color grey background. It was bored and depressed. So I thought to change it on photo image or something similar. But couldn't to decide to which actually one. Hard choice. Agree? :) And it was great to explore for myself **unsplash.com**. I think it would be great to make background image dynamically changing. First I've went to [licence for unsplash](https://unsplash.com/license):

> All photos published on Unsplash can be used for free. You can use them for commercial and noncommercial purposes. You do not need to ask permission from or provide credit to the photographer or Unsplash, although it is appreciated when possible. 
More precisely, Unsplash grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. This license does not include the right to compile photos from Unsplash to replicate a similar or competing service.

Great! That means that I can use all photos from this service for free for my use. 

After that check the [Unpslash source](https://source.unsplash.com/). This is awesome powerful service which allows you to embed Unsplash photos wherever you want. In my case I've done it with one `CSS` string:

```css
background: url(https://source.unsplash.com/1600x900/?seattle,sunrise) no-repeat center;
```

That's it! No any Javascript code at all ;)

This string gets random photo from unsplash with size **_1600x900px_** and tags including **_seattle_** and **_sunrise_**. The result how it works you can find on the main page of this blog.

And you can play with parameters in this form:

<p class="codepen" data-height="300" data-theme-id="16380" data-default-tab="css,result" data-user="greybax" data-slug-hash="BgQrmx" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Unsplash dynamic background">
  <span>See the Pen <a href="https://codepen.io/greybax/pen/BgQrmx/">
  Unsplash dynamic background</a> by Alex Filatov (<a href="https://codepen.io/greybax">@greybax</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

For a more advanced integration, see [Unsplash API](https://unsplash.com/developers).

## More ideas how to use it

Using powerful API you can get photos based on a lot of parameters which is actually represents as a tags on the unsplash service. 

For example, you can show photos for group of people based on their geoposition or time of the day. You can show images from specific collections or setup daily or weekly update for the image (not on each request).

Happy unsplashing! :y:

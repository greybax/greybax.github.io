# cyrillic-to-translit-js - library for converting cyrillic symbols to translit and vice versa

#cyrillic, #translit, #converter, #symbols, #javascript, #js-library, #github, #english;

_December 01, 2019_

## Intro

At this post, I would like to promote another my javascript tool which is growing popular on Github for the last couple of years. I believe that topics that GitHub introduced [31 January 2017](https://github.blog/2017-01-31-introducing-topics/) really help to promote your project on Github. I believe that almost all my projects gained a lot of starts because of this awesome feature.

I've already wrote about [awesome-it-films](/posts/lets-make-awesome-it-films-popular-again) and [cordova-plugin-proguard](/posts/how-to-setup-proguard-in-cordova-application) which I'm proud of. And that's time for another js library tool. Welcome [cyrillic-to-translit-js](https://github.com/greybax/cyrillic-to-translit-js)!

## cyrillic-to-translit-js

> _**cyrillic-to-translit-js**_ - is **ultra-lightweight** JavaScript library for converting Cyrillic symbols to Translit and vice versa.

Originally I've developed it as a converter for article titles for my blog. But for more than 5 years lot of [awesome contibutors](https://github.com/greybax/cyrillic-to-translit-js#credits) made their impact on this tool and now it support presets for Ukranian and Russian language.

_(P.S. Support for other languages are also welcome. Do not hesitate to send your PRs.)_

```js
// Russian
cyrillicToTranslit().transform('Привет Мир!');

// output:
>Privet Mir!
```

and starting from v2.0.0 was added Typescript support.

Now with the support of open source community, we've reached the awesome release of v3.0 which introduced **translit to cyrillic** converter:

```js
// Russian
cyrillicToTranslit().reverse("ulitsa Soyuza Pechatnikov")

// output:
>улица Союза Печатников
```

```js
// Ukranian
cyrillicToTranslit({ preset: "uk" }).reverse("Rozghon Uliana i Harashchenko Khrystyna")

// output:
>Розгон Уляна і Гаращенко Христина
```

I'm so proud that [my repos](https://github.com/greybax) become popular on Github and definitely let's move on and keep going to create new awesome stuff!

If you want to contribute feel free to take any [open issues](https://github.com/greybax/cyrillic-to-translit-js/issues) from the list.

Stay tuned and try [demo page](https://greybax.github.io/cyrillic-to-translit-js) :)

Happy converting your cyrillic/translit symbols! :y:

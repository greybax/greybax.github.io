# How to add dynamic data badges from Shields.io

#awesome-it-films, #json, #badges, #endpoint, #markdown, #frontend, #english;

_March 21, 2019_

## Intro

As I wrote in my recent post [Let's make "Awesome IT Films" popular again!](/posts/lets-make-awesome-it-films-popular-again/) I've got a nice achievement which stimulate me to do more features for this project.

One of this was born in discussion in thread issue [More useful badges?](https://github.com/greybax/awesome-IT-films/issues/24) and in one day I've got PR with interesting idea [Added badges for number of movies,tv-series and documentaries.](https://github.com/greybax/awesome-IT-films/pull/28) but implementation could much to be desired. 

So here I would like to describe how to achieve it without any pain. 

## Shields.IO

![Shields.io Logo](/images/how-to-add-dynamic-data-badges-from-shields-io/shields_io_logo.svg)

I believe everybody knows about [shields.io](https://shields.io/) and how to create find and **create** nice badge there. If you still didn't know about this service check it now. It provides also nice feature to create dynamic badges based on your endpoint via [their API](https://shields.io/endpoint). That's exactly what I want for my task.

## Endpoint

In my case I just count javascript objects for each entities: movies, shows, documentaries and create [badge_endpoint.json](https://github.com/greybax/awesome-IT-films/blob/master/badge_endpoint.json) in gulp task. 

> **Important:** ```badge_endpoint.json``` have to be with required and proper fields how id describes in [Shields.io endpoint manual](https://shields.io/endpoint).

After that on the same page you need to validate ```endpoint.json``` file. For that you need to put a link on raw json file and shields.io will generate link for badge which you can use wherever you want.

In my case I'm putting it in readme.md file like this

```markdown
![Awesome-IT-Films Badge](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fgreybax%2Fawesome-IT-films%2Fmaster%2Fbadge_endpoint.json)
```

![Awesome-IT-Films Badge](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fgreybax%2Fawesome-IT-films%2Fmaster%2Fbadge_endpoint.json)

_Happy creating badges!_ :v:

# How we have validated the theory of 6 handshakes (six degrees of separation) via social network?

#javascript, #jquery, #d3, #vk, #vk-api, #social-network, #big-data, #english;

_June 01, 2017_

## Intro

Couple days ago we've presented our application for big data contest (**battvelon** like mix of 2 words "**batt**le" & "ak**velon**") which was held in our company. On this contest we've took 2nd place with our application for russian social network [vk.com](https://vk.com). Here I would like to describe what was the purpose for developing this app and how we've done it. 

The main idea of contest was to develop application which worked with big data. Also I had an idea to implement some app for social network before.

## Idea

The idea of our application is to answer on question are there any connections between two people or not? We've decided to make an assumption to based on one famous theory that all people around the world are friends with no more than 6 handshakes or between each other in chain row. More about this theory you can read on [Wikipedia](https://en.wikipedia.org/wiki/Six_degrees_of_separation). Also we could try to investigate this theory practically with our app.

## Competitors

Before implementing our app we've investigated competitors and found some them:

* 2 are based on flash player
* 1 has too many ads
* only 1 app we've found pretty good and competitive with us.

So we have to make our app better than these 4. So, ready! Set! **GO!**

## Tech stack

* VanillaJS (because we wouldn't to make our app too heavy)
* jQuery (for DOM manipulation, but of course we could avoid it)
* D3 (for svg - vector graphic, draw lines, ellipses, foreign objects)
* VK API (because we've developed our app based on vk.com platform)
  - **Methods** which we've used:
    - [users.get](https://vk.com/dev/users.get)
    - [execute](https://vk.com/dev/execute)
    - [friends.get](https://vk.com/dev/friends.get)
    - [friends.getMutual](https://vk.com/dev/friends.getMutual)
  - **Restrictions**
    - execute: 25 calls
    - max 3 request per second
    - max length of request is 100k symbols
    - users.get: array has more than 10 elements 

## Algorithm

The main idea of algorithm which we've used in our app is ["divide and conquer"](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm). 

* If me and destination person are friends - return OK
* Else find mutual friends between us.
* Else find connections between all my friends and our mutual friends.
* Else find connections between all my friends and all destination person friends.
* Else find connections between mutual friends of my and destination person friends.
* Else find connections between friends of my friends and mutual friends of my and destination person friends.

So as you can notice on each step we are dividing our search in depth. And trying to find connections between friends of friends.
As result the connections search takes just 2 seconds. Our competitors have the same result for 5-15 seconds.

More clearly you can see this in the presentation.

## Presentation

<iframe src="//www.slideshare.net/slideshow/embed_code/key/gPIs1JlvUsWrRg" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/AlexFilatov3/six-handshakes-theory" title="Six Handshakes Theory" target="_blank">Six Handshakes Theory</a> </strong> from <strong><a href="https://www.slideshare.net/AlexFilatov3" target="_blank">Alex Filatov</a></strong> </div>

[App Link](https://vk.com/app4793565_8859451)

Actually I believe that this app could be ported to facebook too, and may be in one day I will do it.

_Happy socializing!_ :v:

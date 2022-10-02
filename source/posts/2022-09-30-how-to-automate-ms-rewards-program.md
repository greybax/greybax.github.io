# How to automate MS Rewards Program

#swags, #free, #microsoft, #redeem, #rewards, #github, #clicker, #english;

_September 30, 2022_

## Intro

I already have written about [MS Rewards Program](/posts/getting-cool-free-swags-via-microsoft-rewards-program/) quite ago. In this post, I'd like to write about how you can automate getting points.

Pretty obvious solution is:

 1. Login into your account via MS Edge browser
 2. open via iframe `https://www.bing.com/search?q=${YOUR_SEARCH_STRING_HERE}`
 3. repeat it
    * 150 / 5 = 30 for browser search
    * 20 / 5 = 4 for Edge browser specific search
    * 100 / 5 = 20 for mobile search

_**Please note**_: these numbers only for US region.

To run the mobile simulation you can use Dev Tools (press **F12**) and click `Toggle device emulation`.

![mobile simulation](/images/how-to-automate-ms-rewards-program/1.jpg "mobile simulation")

## MSEdgeSearchClicker

So that's [how this project was born on Github](https://github.com/greybax/MSEdgeSearchClicker).

If you want to see it in action you can check it [here](https://alfilatov.com/MSEdgeSearchClicker/). 
But for a better experience, open this link via MS Edge. It allows you to earn extra 20 points on Edge search.

You may notice another solution on Github and are curious why this one is better. I have 2 options here:
 * it's pretty handy and doesn't require you any extra actions. Just open a link in the browser.
 * It's not a bot, so your account will not be blocked.

For now, it supports search automation only. But feel free to send [fork and send your PRs](https://github.com/greybax/MSEdgeSearchClicker/fork) or suggest improvements via [issues page](https://github.com/greybax/MSEdgeSearchClicker/issues) 

Happy your routine automation! ✌🏼

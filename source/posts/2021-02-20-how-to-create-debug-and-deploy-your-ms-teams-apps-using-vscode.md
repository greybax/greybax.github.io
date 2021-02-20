# How to create, debug and deploy your MS Teams apps using VSCode

#microsoft, #teams, #msteams, #debug, #deploy, #vscode, #extension, #react, #english;

_February 20, 2021_

## Intro

In this post, I'd like to conclude all my experience in creating a VSCode extension using ReactJS. I've worked on the creation extension for MSTeams from the scratch and twitted the post into Twitter every time once it reached 5/10/20k downloads. I'm so proud of it :)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">So proud! The <a href="https://twitter.com/hashtag/MSTeams?src=hash&amp;ref_src=twsrc%5Etfw">#MSTeams</a> Toolkit where I&#39;ve worked on from the very beginning finally in preview and available on <a href="https://twitter.com/hashtag/vscode?src=hash&amp;ref_src=twsrc%5Etfw">#vscode</a> <a href="https://twitter.com/hashtag/marketplace?src=hash&amp;ref_src=twsrc%5Etfw">#marketplace</a> today <a href="https://t.co/REwVPaOwaP">pic.twitter.com/REwVPaOwaP</a></p>&mdash; Aleksandr Filatov 🇷🇺 🇳🇱 🇺🇸 (@greybax) <a href="https://twitter.com/greybax/status/1262865082511286272?ref_src=twsrc%5Etfw">May 19, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

At the moment while I'm writing this post [Microsoft Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) already reached out 26k downloads!

While our team has been developing this product we've faced with a pretty lot of issues related to the integration of ReactJS and internal VSC API. I've tried to describe process some of the common issues in my recent posts:

* [How to use React Routing into Webview for VSCode extensions?](/posts/how-to-use-react-routing-into-webview-for-vscode-extensions/)
* [How to pass data between iframe and parent window](/posts/how-to-pass-data-between-iframe-and-parent-window/)
* [How to open links from iframe](/posts/how-to-open-links-from-iframe/)
* [How to pass file into an iframe and convert it to Blob for further AJAX request](/posts/how-to-pass-file-into-an-iframe-and-convert-it-to-blob-for-further-ajax-request/)

## Microsoft Teams Toolkit

> The Microsoft Teams Toolkit extension enables you to create, debug and deploy Teams apps directly from Visual Studio Code.

MS Teams Platform is one of the fast-growing products, so if you want to create something which will be used by a lot of people, so you definitely should try to use this platform.

This VSCode extension will helps you to start and rump up with your app pretty fast. I'm going to try to create something for this platform in near future too. I have some ideas for my new apps, so probably will post about my whole lifecycle experience here :)

Microsoft Teams supports developers who are creating new apps for the platform, so you can check this [MS Teams dedicated DevPost resource](https://microsoftteams.devpost.com/) and participate in new challenges as well.

_Happy creating/debugging/deploying new Microsoft Teams apps!_ :)

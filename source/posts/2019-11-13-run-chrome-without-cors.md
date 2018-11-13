# Run Chrome browser without CORS

#chrome, #browser, #cors, #debug, #development, #english;

_November 13, 2018_

I use this sometimes, for posting a localhost frontend app to a localhost backend API. 
I created a separate shortcut on my Windows 10 laptop (but this case will works with any OS I believe), so that it never is used for normal browsing, only for debugging locally. 
Just do follow steps:

* Right click on desktop, add new shortcut
* Add the target as `"[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`
* Click OK.

_**NOTE**_: On Windows 10 command will be:
`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`

You will get a warning on load of this browser, that it is not secure, just take care with what you browser on it.

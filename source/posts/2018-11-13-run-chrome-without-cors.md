# Run Chrome browser without CORS

#chrome, #browser, #cors, #debug, #development, #english;

_November 13, 2018_

I use this sometimes, for posting a localhost frontend app to a localhost backend API. 
I created a separate shortcut on my Windows 10 laptop, so that it never is used for normal browsing, only for debugging locally.

## Windows

Just do follow steps:

* Right click on desktop, add new shortcut
* Add the target as `"[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`
* Click OK.

> _**NOTE**_: On Windows command will be:
`"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp`

## OSX

`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

## Linux

`google-chrome --disable-web-security`

If you need access to local files for dev purposes like AJAX or JSON, you can use `-–allow-file-access-from-files` flag.

## Remark

Since Chrome 22+ you will get an error message that says:

> You are using an unsupported command-line flag: `--disable-web-security`. Stability and security will suffer.

However you can just ignore that message while developing.

## Links

* [Disable same origin policy in Chrome](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome)
* [Disable-web-security in Chrome 48+](https://stackoverflow.com/questions/35432749/disable-web-security-in-chrome-48)

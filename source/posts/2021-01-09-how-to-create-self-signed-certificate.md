# How to create self-signed certificate

#certificate, #ssl, #localhost, #debug, #windows, #osx, #english;

_January 09, 2021_

## Intro

Based on experience in some scenarios you would debug your applications with certificate using https on your localhost. 

If you are using latest version of `react-script` you are good, since its automatically creates self-signed certificate. But in another scenarios you would want to install it manually. Please read my tutorial below if you want to generate and install cert for **Windows/OSX**.

To debug your app locally for web client/desktop environments using secure protocol https you will need to add a certificate for localhost to `Trusted Root Certification Authorities` catalog.

## Trusting the SSL certificate

1. Open the Chrome Developer Tools window (`ctrl + shift + i` / `cmd + option + i`).
2. Click on the `Security` tab
3. Click on `View certificate` and you’ll have the option to download the certificate — either by dragging it to your desktop in OS X, or by clicking on the `Details` tab in Windows and clicking `Copy to File…`

## Install/trust certificate on **Windows**

1. Choose the `DER encoded binary X.509 (.CER)` option (the first one) and save it.
2. Double click on the certificate and install it.
3. Choose `Local Machine`
4. Select `Place all certificates in the following store`
5. Choose `Trusted Root Certification Authorities`
6. Confirm your installation

## Install/trust certificate on **Mac OS X**

1. On OS X, open the Keychain Access utility and select `System` from the menu on the left. Click the lock icon to enable changes.
2. Click the plus button near the bottom to add a new certificate, and select the `localhost.cer` file you dragged to the desktop. Click `Always Trust` in the dialog that appears.
3. After adding the certificate to the system keychain, double-click the certificate and expand the `Trust` section of the certificate details. Select `Always Trust` for every option.

**P.S.** if you still have certificate warning issue in browser, you should to reboot your machine.

_Happy creating self-signed certificate!_ :)

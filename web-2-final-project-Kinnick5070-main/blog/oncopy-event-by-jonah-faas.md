---
title: oncopy events
author: Jonah Faas
description: This article will summarize the uses and abilities of the oncopy event
published: 1/21/2025
---

# The oncopy event

There are four notable cases in which oncopy is necessary to use

before going into the examples I've filled out the boiler-plate code so you can copy and paste the examples into the script tag:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Boiler-Plate Code for oncopy Event</title>
    </head>
    <script>
        window.addEventListener("load", () => { 
            //paste code here


        });
    </script>
    <body>
        <p id= "text" class= "text track">
            Copy this text to see the pasted code in action (you might have to paste the text to see the result)
        </p>
    </body>
</html>
```


## 1. Modify Clipboard Content
You can use oncopy to modify clipboard content by getting a handle on the element you want to check is being copied and then listening for the copy event. Next you have to prevent the default copy action. You then create a variable or object to hold whatever you want to put into the clipboard instead.
```js
document.querySelector("#text").addEventListener("copy", (event) => {
            event.preventDefault();
            const modifiedText = "This is the modified clipboard content";
            event.clipboardData.setData("text/plain", modifiedText);
            alert("Paste the text to see the result");
});
```

## 2. Tracking Most Copied Parts of a Website
This next example uses some more complex features of a website including some server side stuff, so I had Copilot generate some for me and explain how it works to me. The first thing we always do is get a handle on the things we want to track, and this time they are text with the class of "track". Next we listen for a copy event and then set a variable equal to the selected text. After that we run some code that I don't really understand, however it runs a function that sends the string that was copied to our server
```js
document.querySelectorAll("#track").forEach(element => {
    element.addEventListener("copy", event => {
        const copiedText = window.getSelection().toString();
        console.log("Copied text: ${copiedText}");
    });
});
//This is the part I don't understand, but I guess it sends the copied text to the server
sendCopiedTextToServer(text) => {
    fetch('/track-copy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ copiedText: text })
    });
}
```
## 3. Adding Security Features to Coppied Content




## 4. User Feedback



Sources Cited
---
1. GitHub Copilot. (2023). Assistance with JavaScript `oncopy` event. Retrieved from Visual Studio Code.
2. [W3Schools](https://www.w3schools.com/jsref/event_oncopy.asp)
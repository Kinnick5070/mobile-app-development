---
title: Drag and drop events
author: Niall Kader
published: 2/15/2025
---

You can make use of the following events in JavaScript to allow you to drag and drop elements 
in a web page:
1. **dragstart**
1. **dragover**
1. **drop**

There are quite a few other 'drag' events, but for this example we just need these three.

Here are the articles I found that helped me figure out how to get a working code sample up and running:
1. <a href="https://jenkov.com/tutorials/html5/drag-and-drop.html" target="_blank">https://jenkov.com/tutorials/html5/drag-and-drop.html</a>
1. <a href="https://www.w3schools.com/HTML/html5_draganddrop.asp" target="_blank">https://www.w3schools.com/HTML/html5_draganddrop.asp</a>
1. <a href="https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js" target="_blank">https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js</a>

Here's the starter code (create a file named **drag-and-drop-events.html** and paste this code into it):
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Drag and Drop Events</title>
	<style type="text/css">
		
	#div1{
		height: 50px;
		width: 150px;
		background-color: green;
	} 

	#div2{
		height: 150px;
		width:150px;
		background-color: red;
		padding:20px;
	}

	</style>

	<script type="text/javascript">
	window.addEventListener("load", ()=>{

		/*WE'LL BE ADDING JAVASCRIPT CODE HERE*/		
	
	}); // end of window load handler
	</script>
</head>
<body>
	<div id="div1" draggable="true"></div>
	<div id="div2"></div>
</body>
</html>
```
Here are some things you need to know about this code:
1. When we're done, you'll be able to drag **div1**, and drop it into **div2**
1. To make an element draggable, you need to set it's **draggable** attribute to true. 
So, you'll see that this attribute has been added to **div1**.


Now let's add some JavaScript (inside the event handler function for the window load event).
First, get a handle on each div:
```js
const dragableDiv = document.querySelector("#div1")
const dropDiv = document.querySelector("#div2");
``` 

Next add this code:
```js
dragableDiv.addEventListener('dragstart', (evt)=>{
	event.currentTarget.style.backgroundColor = 'yellow';
})
```
This code simply changes the background color of **div1** when you start to drag it.

Now add this code, which will append **div1** to **div2** when **div1** is dropped on **div2**.
(we'll be talking about the **appendChild()** method soon in this class)
```js
dropDiv.addEventListener('drop', (evt)=>{
	dropDiv.appendChild(dragableDiv);
})
```
Things won't quite work just yet! For some reason, if you want an element to allow other elements to be dropped on it,
then you have to prevent the default behavior of the **dragover** event. Apparently the default
behavior is to not allow things to be dragged over an element.

So we need to add this code:
```js
// by default, elements don't allow other elements to be dragged over them,
// so we need to prevent this
dropDiv.addEventListener('dragover', (evt)=>{
	evt.preventDefault();
});
```

Now, if you run the code, you should be able to drag **div1** and drop it into **div2**!



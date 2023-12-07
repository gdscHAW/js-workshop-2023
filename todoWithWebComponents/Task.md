# Create a Todo Item Web Component

We want to create a Web Component which represents a Todo Item. 
The Todo Item should have a checkbox and a label. 
The checkbox should be used to mark the Todo Item as done.
The label should display the text of the Todo Item. 
We also want to save the state of the Todo Item in the session storage of the browser.
So when we reload the page, the Todo Item should still be marked as done.
The save should happen when the checkbox is clicked.


## Useful functions

### Creates a new element in the DOM
```js
document.createElement("typeOfElement"); 
```

### Gets the value of an attribute of an element
```js
getAttribute("nameOfTheAttributeOnTheElement");
```
### Gets the first element which matches the given selector
```js
querySelector("nameOfTheElement");
```

### Adds an event listener to an element
```js
addEventListener("nameOfTheEvent", () { console.log("something happend here") });
```

### Saves an item in the session storage
```js
sessionStorage.setItem("nameOfTheItem", "valueOfTheItem");
```

### Gets an item from the session storage
```js
sessionStorage.getItem("nameOfTheItem");
```


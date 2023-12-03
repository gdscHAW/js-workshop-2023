# Create a Todo Item Web Component

We want to create a Web Component which represents a Todo Item. 
The Todo Item should have a checkbox and a label. 
The checkbox should be used to mark the Todo Item as done.
The label should display the text of the Todo Item. 
We also want to save the state of the Todo Item in the session storage of the browser.
So when we reload the page, the Todo Item should still be marked as done.
The save should happen when the checkbox is clicked.


## Useful functions

```js
document.createElement("typeOfElement"); // creates a new element in the DOM
getAttribute("nameOfTheAttributeOnTheElement"); // gets the value of an attribute of an element
querySelector("nameOfTheElement"); // gets the first element which matches the given selector
addEventListener("nameOfTheEvent", () { console.log("something happend here") }); // adds an event listener to an element
sessionStorage.setItem("nameOfTheItem", "valueOfTheItem"); // saves an item in the session storage
sessionStorage.getItem("nameOfTheItem"); // gets an item from the session storage
```


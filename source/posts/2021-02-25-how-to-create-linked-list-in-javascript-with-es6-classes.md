# How to create linked list in javascript with ES6 classes

#javascript, #data-structure, #interview, #es6, #linked-list, #english;

_February 25, 2021_

## Intro

In this post, I'd like to share my implementation of `LinkedList` in JavaScript using mechanism of ES6 Classes.

## LinkedList

```js
class LinkedList {
	constructor() {
    this.head = new Node("", null);
  }
  
  addNode(node) {
    let curr = this.head;
    while(curr.next) {
      curr = curr.next;
    }
    curr.next = node;
  }
}
```

## Node

```js
class Node {
	constructor(data, node) {
  	this.data = data;
    this.next = node;
  }
}
```

## How to use it

```js
let linkedList = new LinkedList();

// add some nodes
linkedList.addNode(new Node("1", null));
linkedList.addNode(new Node("2", null));
linkedList.addNode(new Node("3", null));

// console.log nodes, just to verify that everything works fine ;)
let current = linkedList.head;
while(current.next) {
	console.log(current);
 	current = current.next;
}
```

## JSFiddle

<iframe width="100%" height="300" src="//jsfiddle.net/r7nx0sda/embedded/js,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

_Happy creating your own linked lists!_ :)

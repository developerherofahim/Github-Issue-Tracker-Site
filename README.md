<h1>1. What is the difference between var, let, and const?</h1>

```
var is function-scoped and can cause bugs because it ignores block boundaries and is hoisted with undefined.  

let is Modern, block-scoped variable. Use it when you know the value will change later.

const is Modern, block-scoped constant. Use it by default. You cannot reassign it, but you can still modify objects or arrays declared with it.
```

<h1>2. What is the spread operator (...)?</h1>

```
The spread operator (...) is a powerful feature in JavaScript (and TypeScript) that allows you to expand (or "spread") elements of an iterable (like arrays, strings, or objects) into individual elements.

Example: 

1.  const arr1 = [1, 2, 3];
    const arr2 = [...arr1];        
    console.log(arr2);             //Output: [1, 2, 3]

2.  const person = { name: "Fahim", age: 25 };
    const copy = { ...person };


3.  function sum(a, b, c) {
        return a + b + c;
    }

    const numbers = [10, 20, 30];

    console.log(sum(...numbers));   //Output: 60
    
```

<h1>4. What is an arrow function?</h1>

```
An arrow function is a shorter, more concise way to write functions in JavaScript, introduced in ES6 (2015).

It uses the => (fat arrow) syntax instead of the traditional function keyword.

Example:

// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```
<h1>5. What are template literals?</h1>

```
Template Literals (also called Template Strings) are a modern way to work with strings in JavaScript, introduced in ES6 (2015).
They are created using backticks ` instead of single (' ') or double quotes (" ").

Example:

// Old way (string concatenation)
const name = "Md Fahim";
const city = "Chattogram";
console.log("Hello, my name is " + name + " and I live in " + city + ".");

// New way: Template Literal
const message = `Hello, my name is ${name} and I live in ${city}.`;
console.log(message);
```
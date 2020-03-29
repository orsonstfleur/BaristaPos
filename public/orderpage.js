var enterButton = document.getElementById("enter");
var drinkBtn = document.querySelectorAll('.drink')
var sizeBtn = document.querySelectorAll('.size');
var hotBtn = document.getElementById('hot');
var coldBtn = document.getElementById('cold');
var nameInput = document.querySelector('#name');

// CREDIT TO YASIN and SHEY FOR ASSISTING WITH FUNCTIONALITY
//es6 constructor
//class constructor of an object- setting up the properties and features of the object
class Order {
  constructor(size, drink, nameOfClient, completion) {
    this.size = size;
    this.drink = drink;
    this.name = nameOfClient;
    this.completion = false;
    this.isIced = false;
  }
}
let currentOrder = new Order("medium", "latte", "")
//instances- the order of the drink, the feactures from the constructor
let mOrder = new Order("large", "latte", "Brad", false)
let vOrder = new Order("large", "tea", "Victor", false)

// es5 constructor
// function Order2 (size, drink, nameOfClient, completion){
//     this.size = size;
//     this.drink = drink;
//     this.nameOfClient = nameOfClient;
//     this.completion = completion;
// }
//Button to active
//we want to get info from the dom to add. We want to use this info to create a instances.
// we want to look into how to have
//be able to get info from the buttons to create a post request
// use routes to do a post request
// phase two - get the data from the front end and adding it to the profile list of completed and non-completed list
enterButton.addEventListener('click', function() {
  currentOrder.name = nameInput.value
  console.log(`Thank you ${nameInput.value}`)
  fetch('/vieworders', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentOrder)
    })
    .then(response => {
      currentOrder = new Order("medium", "latte", "");
    });
    location.reload();
})

drinkBtn.forEach((button, i) => { //using a foreach loop because the querySelectorAll puts the classes in an array
  button.addEventListener('click', function(event) { //add the addEventListener to each class class button
    currentOrder.drink = event.target.textContent
    console.log(currentOrder.drink);
  })
});


sizeBtn.forEach((button, i) => {
  button.addEventListener('click', function(event) {
    currentOrder.size = event.target.textContent
    console.log(currentOrder.size);
  })
});

hotBtn.addEventListener('click', function() {
  currentOrder.isIced = false;
  console.log('hot');
})

coldBtn.addEventListener('click', function() {
  currentOrder.isIced = true;
  console.log('cold');
})

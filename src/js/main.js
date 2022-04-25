// Get the elements
var colorCards = document.querySelectorAll(".color-card");
colorCards.forEach((colorCard) => {
  var hex = colorCard.querySelector(".hex");
  var color = colorCard.querySelector(".color");

  var name = colorCard.querySelector(".name");
  console.log(hex.innerText);
  console.log(name.innerText);
  console.log(color.style.backgroundColor);
});

var button = document.querySelector("button");

// Define the action

fetch("../colors-list.json");

// Wire up the event with the action

const base = window.location.href.includes("github.io")
  ? `/${window.location.pathname.split("/")[1]}`
  : "";

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

fetch("../colors")
  .then((response) => response.json())
  .then((data) => console.log(data));

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getFiveRandomNumber(min, max) {
  var numbers = [];
  while (numbers.length < 5) {
    var number = getRandomNumber(min, max);
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  return numbers;
}
function getColors() {
  var promises = getFiveRandomNumber(0, 14156).map((n) => {
    return fetch(`${base}/colors/${n}.json`);
  });
  console.log(promises);
  //Wait for all responses of the colors
  Promise.all(promises).then((responses) => {
    //Wait until all of the colors are parsed
    Promise.all(responses.map((response) => response.json())).then((data) => {
      console.log(data);
      data.forEach((color, index) => {
        console.log(color);
        updateColorCard(color, index);
      });
    });
  });
}

function updateColorCard(color, index) {
  console.log(color.name);
  var colorCard = colorCards[index];
  var hex = colorCard.querySelector(".hex");
  var backgroundColor = colorCard.querySelector(".color");
  var name = colorCard.querySelector(".name");
  name.innerText = color.name;
  backgroundColor.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
  hex.innerText = rgbToHex(color.red, color.green, color.blue);
}

function componentToHex(hex) {
  var hexidecimal = hex.toString(16);
  return hexidecimal.length == 1 ? "0" + hexidecimal : hexidecimal;
}

function rgbToHex(red, green, blue) {
  return (
    "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue)
  );
}

button.addEventListener("click", getColors);
getColors();

const body = document.querySelector("body");

const IMG_NUMBER = 5;
function genNumber() {
  return Math.floor(Math.random() * IMG_NUMBER) + 1;
}
function setImage(imgNum) {
  const image = new Image();
  image.src = `images/${imgNum}.jpg`;
  image.classList.add("bg-image");
  body.prepend(image); //prepend or appendChild 
}
function init() {
  setImage(genNumber());
}

init();

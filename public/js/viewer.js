console.log("JS file loaded...");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "#F00";
ctx.fillRect(5, 5, 90, 90);
ctx.closePath();

function testClick(e){
  console.log("Clicked button!");
  ctx.fillStyle = "#00F";
  ctx.beginPath();
  ctx.fillRect(10, 10, 80, 80);
  ctx.closePath();
}

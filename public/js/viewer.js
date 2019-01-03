console.log("JS file loaded...");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var socket = io().connect('http://localhost');
var counter = 0;
var chatText = document.getElementById('counter');

class Ent {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random()*2)-1;
    this.vy = (Math.random()*2)-1;
  }

  update(){
    this.x+=this.vx;
    this.y+=this.vy;
    if(this.x<0 || this.x>400){ this.vx*=-1; }
    if(this.y<0 || this.y>300){ this.vy*=-1; }
  }

  draw(){
    ctx.fillStyle = "#22F";
    ctx.beginPath();
    ctx.arc(this.x,this.y,10,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

let entList = [];

for(let i=0;i<10;i++){
  entList.push(new Ent(Math.random()*400,Math.random()*300));
}

socket.on('updateVal',(data)=>{
  //console.log("UpdateVal Event");
  //chatText.innerHTML = "<p>"+data+"</p>";
  counter = +data;
  ctx.beginPath();
  ctx.font = "30px Georgia";
  ctx.fillStyle = "#00F";
  ctx.fillText(""+counter, 10, 30);
  ctx.closePath();
});

var mainLoop= function(){

  ctx.fillStyle = "rgba(255,255,255,0)";
  ctx.clearRect(0, 0, 400, 300);
  for(let i=0;i<entList.length;i++){
    entList[i].update();
    entList[i].draw();
  }
  socket.emit('update');
}

setInterval(mainLoop,10);

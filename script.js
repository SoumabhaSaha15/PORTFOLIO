const MENU = document.getElementById("menu");
const NAVBAR = document.getElementById("navBar");
const MODE = document.getElementById("mode"); 
const TYPER = document.getElementById("typer");
const ABOUT = document.getElementById("abt");
var HEADING = new Typewriter(TYPER,100);
HEADING.RepeatType(10);
var ABT = new Typewriter(ABOUT,50);
ABT.RepeatType(1.8);
MENU.addEventListener('click',()=>{
    if(MENU.classList.contains("fa-bars")){
      MENU.classList.replace("fa-bars","fa-close");
      NAVBAR.style.display="block";
    }
    else if(MENU.classList.contains("fa-close")){
      MENU.classList.replace("fa-close","fa-bars");
      NAVBAR.style.display="none";
    }
    window.addEventListener("resize",()=>{
      if(window.innerWidth>640){
      	MENU.classList.replace("fa-bars","fa-close");
        NAVBAR.style.display="block";
      }
      else if(window.innerWidth<=640){
        NAVBAR.style.display="none";
        MENU.classList.replace("fa-close","fa-bars");
      }
    });
});
MODE.addEventListener('click',function (){
    if(MODE.classList.contains("fa-sun")){
        MODE.classList.replace("fa-sun","fa-moon");
        document.body.style.backgroundColor="#111111";
        document.body.style.color="#ffffff";
        MODE.style.color="#ffffff";
        MENU.style.color="#ffffff";
    }
    else if(MODE.classList.contains("fa-moon")){
        MODE.classList.replace("fa-moon","fa-sun");
        document.body.style.backgroundColor="#dddddd";
        document.body.style.color="#000000";
        MODE.style.color="#000000";
        MENU.style.color="#000000";
}});
const Canvas = document.querySelector("#cnv");
const Ctx = Canvas.getContext("2d");
function RS(){
    Canvas.width=innerWidth;
    Canvas.height=innerHeight
}

let Particles=[];
let mouse={
  x:null,
  y:null,
  radius:100
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x + Canvas.clientLeft/2; 
    mouse.y = event.y + Canvas.clientTop/2; 
});

function drawImage(){
  let imageWidth=png.width;
  let imageHeight=png.height;
  const data=Ctx.getImageData(0,0,imageWidth,imageHeight);
  Ctx.clearRect(0,0,Canvas.width,Canvas.height);
  class Particle{
    constructor(x,y,color,size){
      this.x=x+(Canvas.width/2)-(png.width*2);
      this.y=y+(Canvas.height/2)-(png.height*2);
      this.color=color;
      this.size=size;
      this.baseX=x+(Canvas.width/2)-(png.width*2);
      this.baseY= y+(Canvas.height/2)-(png.height*2);
      this.density = (Math.random()*10)+2;
    }
    draw(){
      Ctx.beginPath();
      Ctx.arc(this.x,this.y,this.size,0,(Math.PI*2))
      Ctx.closePath();
      Ctx.fill();
    }
    update(){
      Ctx.fillStyle = this.color;
      let dx = mouse.x-this.x; 
      let dy = mouse.y-this.y;
      let distance = Math.sqrt((dx*dx)+(dy*dy));
      let FDX=dx/distance;
      let FDY=dy/distance;
      const MD=400;//MD=MAX distance
      let force=(MD-distance)/MD;
      if(force<0)
      force=0;
      let directionX = (FDX*force*this.density*0.6);
      let directionY = (FDY*force*this.density*0.6);
      if(distance < mouse.radius+this.size){
        this.x-=directionX;
        this.y-=directionY;
      }
      else{
        if(this.x !== this.baseX){
          let dx = this.x -this.baseX;
          this.x-=dx/20;
        }
        if(this.y !== this.baseY){
          let dy = this.y -this.baseY;
          this.y-=dy/20;
        }
      }
      this.draw();
    }
  }
  function init(){
    Particles=[];
    for (let y = 0,y2=data.height; y < y2; y++) {
      for (let x = 0,x2=data.height; x < x2; x++){
        if(data.data[(y*4*data.width)+(x*4)+3]>128){
          let positionX=x;
          let positionY=y;
          let color = 'rgb('+data.data[(y*4*data.width)+(x*4)]+','+data.data[(y*4*data.width)+(x*4)+1]+','+data.data[(y*4*data.width)+(x*4)+2]+')';
          Particles.push(new Particle(2*positionX,2*positionY,color,1));
        }
      }
    }
  }
  function animate(){
    requestAnimationFrame(animate);
    Ctx.fillStyle='rgba(0,0,0,0.05)';
    Ctx.fillRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<Particles.length;i++){
      Particles[i].update();
    }
  }
  init();
  animate();
  window.addEventListener('resize',function(){
    location.reload();
  }) ;
}
window.addEventListener('load',function(){
  RS();
  Ctx.drawImage(png,0,0);
  drawImage();
}) ;
window.addEventListener('orientationchange',function(){
  location.reload();
}) ;
window.addEventListener('focus',function(){
  location.reload();
}) ;
const png =new Image();
// png.height=png.height*2
// png.width=png.width*2
const MENU = document.getElementById("menu");
const NAVBAR = document.getElementById("navBar");
const MODE = document.getElementById("mode"); 
const TYPER = document.getElementById("typer");
const ABOUT = document.getElementById("abt");
const ANCHORS = [...document.querySelectorAll("a")];
class Typewriter{
	constructor(element,interval){
		this.Element = element;
		this.Text = element.innerHTML;
		this.Interval = interval;
		this.Index = 0;
		this.Time =(this.Text.length*this.Interval) ;
        this.Repeatation=false;
	}
	Print(){
			if(this.Index<this.Text.length){
				this.Element.innerHTML += this.Text[this.Index];
				this.Index++;
				if(this.Index==this.Text.length){
					clearInterval(this.Set);
					this.Index=0;
				}
			}
	}
	Type(){
		this.Element.innerHTML = '';
		this.Set=setInterval(()=>{this.Print();},this.Interval);
	}
	RepeatType(TimeFactor=1.1){
        this.Repeatation=true;
		if(TimeFactor>1){
            this.TF=TimeFactor;
            this.Cycle=setInterval(() => {this.Type()}, this.Time*TimeFactor);
        }
        else{
            this.TF=1.1;
            this.Cycle=setInterval(() => {this.Type()}, this.Time*1.1);
        }
	}
    Stop(Loop=1){
       if (this.Repeatation){
        setTimeout(()=>{clearInterval(this.Cycle);
				console.log(this,"end")
		},(Loop+1)*this.Time*this.TF);
		this.Element.innerHTML= this.Text;
        }
    }
}
		const T = new Typewriter(TYPER,120);
		T.RepeatType(2);

		const A = new Typewriter(ABOUT,100);
		A.RepeatType(1.2);

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
MODE.addEventListener('click',()=>{
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
const canvas = document.querySelector("#cnv");
const ctx = canvas.getContext("2d");
canvas.style.backgroundColor='#00000000';
let w, h, balls = [];
let mouse = {
	x: undefined,
	y: undefined
}
let rgb = [
	"teal",
	"goldenrod",
	"slateblue",
	"bisque",
	"pink",
	"coral",
	"yellowgreen",
	"tomato"
]

function init() {
	resizeReset();
	animationLoop();
		var T = new Typewriter(TYPER,200);
		T.Type();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	ctx.globalCompositeOperation = 'lighter';
	drawBalls();

	let temp = [];
	for (let i = 0; i < balls.length; i++) {
		if (balls[i].time <= balls[i].ttl) {
			temp.push(balls[i]);
		}
	}
	balls = temp;
	requestAnimationFrame(animationLoop);
}

function drawBalls() {
	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
		balls[i].draw();
	}
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;

	for (let i = 0; i < 3; i++) {
		balls.push(new Ball());
	}	
}

function mouseout() {
	mouse.x = undefined;
	mouse.y = undefined;
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuart(x) {
	return 1 - Math.pow(1 - x, 4);
}

class Ball {
	constructor() {
		this.start = {
			x: mouse.x + getRandomInt(-20, 20),
			y: mouse.y + getRandomInt(-20, 20),
			size: getRandomInt(30, 40)
		}
		this.end = {
			x: this.start.x + getRandomInt(-300, 300),
			y: this.start.y + getRandomInt(-300, 300)
		}

		this.x = this.start.x;
		this.y = this.start.y;
		this.size = this.start.size;

		this.style = rgb[getRandomInt(0, rgb.length - 1)];

		this.time = 0;
		this.ttl = 120;
	}
	draw() {
		ctx.fillStyle = this.style;
		ctx.beginPath();
		ctx.fillRect(this.x, this.y,(window.innerWidth/25),(window.innerHeight/25));
		ctx.closePath();
		ctx.fill();
	}
	update() {
		if (this.time <= this.ttl) {
			let progress = 1 - (this.ttl - this.time) / this.ttl;

			this.size = this.start.size * (1 - easeOutQuart(progress));
			this.x = this.x + (this.end.x - this.x) * 0.01;
			this.y = this.y + (this.end.y - this.y) * 0.01;
		}
		this.time++;
	}
}
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
function reload(){
  window.location.reload();
}
//window.matchMedia("(orientation: portrait)").addEventListener('change',reload);
window.addEventListener("focus",reload);

var g=Object.defineProperty;var p=(o,t,e)=>t in o?g(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var s=(o,t,e)=>(p(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();class f{constructor(t,e){s(this,"direction","right");s(this,"nextDirection","right");s(this,"ctx");s(this,"headNode",{x:500,y:500});s(this,"body",[this.headNode]);s(this,"width",25);s(this,"speed",this.width);s(this,"canvasHeight");s(this,"canvasWidth");s(this,"fruitX",400);s(this,"fruitY",400);s(this,"interval");s(this,"score",0);const c=t.getContext("2d");if(!c)throw Error("snake class error: cant get canvas context");this.canvasHeight=t.height,this.canvasWidth=t.width,this.ctx=c,this.interval=e}draw(){for(const t of this.body)this.ctx.fillStyle="rgb(0, 150, 0)",this.ctx.fillRect(t.x,t.y,this.width,this.width);this.ctx.fillStyle="rgb(255, 210, 0)",this.ctx.fillRect(this.fruitX,this.fruitY,this.width,this.width)}update(){let t={x:this.body[0].x,y:this.body[0].y};switch(this.direction=this.nextDirection,this.direction){case"up":t.y-=this.speed;break;case"down":t.y+=this.speed;break;case"left":t.x-=this.speed;break;case"right":t.x+=this.speed;break}var e=this.body.pop();e.x=t.x,e.y=t.y,this.body.unshift(e)}detectCollisions(){const t=this.body[0];(t.x>=this.canvasWidth||t.y>=this.canvasHeight||t.x<=-1||t.y<=-1)&&this.gameOver();for(let e=1;e<this.body.length;e++)this.detectGridCollision({x:t.x,y:t.y},{x:this.body[e].x,y:this.body[e].y})&&this.gameOver();this.detectGridCollision({x:t.x,y:t.y},{x:this.fruitX,y:this.fruitY})&&(this.generateFruit(),this.body.push({x:t.x,y:t.y}),this.score+=10)}gameOver(){clearInterval(this.interval),this.ctx.fillStyle="red",this.ctx.font="48px georgia",this.ctx.fillText(`Game Over. Score: ${this.score}`,250,150),this.ctx.font="35px georgia",this.ctx.fillText("space bar to restart",320,350)}setDirection(t){t==="down"&&this.direction!=="up"&&(this.nextDirection="down"),t==="up"&&this.direction!=="down"&&(this.nextDirection="up"),t==="right"&&this.direction!=="left"&&(this.nextDirection="right"),t==="left"&&this.direction!=="right"&&(this.nextDirection="left")}generateFruit(){const t=this.canvasHeight/this.width,e=this.canvasWidth/this.width;this.fruitX=Math.floor(Math.random()*(e-1))*this.width,this.fruitY=Math.floor(Math.random()*(t-1))*this.width}detectGridCollision(t,e){return t.x===e.x&&t.y===e.y}}const u=1e3,y=1e3;let a;const h=document.querySelector("canvas");if(!h)throw Error("cant find html canvas element");window.addEventListener("keydown",o=>{const{key:t}=o;t==="ArrowUp"&&n.setDirection("up"),t==="ArrowDown"&&n.setDirection("down"),t==="ArrowLeft"&&n.setDirection("left"),t==="ArrowRight"&&n.setDirection("right"),t===" "&&(clearInterval(a),a=setInterval(()=>{x()},100),n=new f(h,a))});const l=h.getContext("2d");h.width=y;h.height=u;a=setInterval(()=>{x()},100);let n=new f(h,a);const x=()=>{l&&(l.clearRect(0,0,y,u),n.update(),n.draw(),n.detectCollisions())};

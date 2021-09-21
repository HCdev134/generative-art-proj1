// increase edge and size of loops for bigger sized effect

const canvas = document.getElementById("canvas-one");
const ctx = canvas.getContext("2d");

// Canvas matches innerHeight and innerWidth property of window
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

// area where particles grow 
const edge = 130; 

const mouse = {
    x: null,
    y: null
}

window.addEventListener("mousemove", function(event){
    // console.log(event); 
    mouse.x = event.x; 
    mouse.y = event.y; 
    // console.log(`Mouse Obj: ${mouse} \n`); 
    // console.log(`mouse coords - X:${mouse.x} Y:${mouse.y} \n`); 
})

// Tree Drawing, Distance Between 2 points (centerX, centerY)
class rootDrawing{
    constructor(x, y, color, centerX, centerY){
        this.x = x;
        this.y = y;
        this.color = color;
        // Other Properties, Speed of particle Growth & Shrink(x,y)
        this.speedX = 0;
        this.speedY = 0; 
        this.centerX = centerX;
        this.centerY = centerY; 
    }
    // Function to draw particle on canvas 
    draw(){
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;
        // treeRoot class (this.x,this.y) values equal to speedX and speedY
        this.x += this.speedX;
        this.y += this.speedY;
        // Size of particle, relates to edge 
        const distanceX = this.x - this.centerX; 
        const distanceY = this.y - this.centerY; 
        // Distance Between 2 points 
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        // Radius of Particle (-distance / edge + 1) * edge / 10; 
        const radius = (-distance / edge + 1) * edge / 10; 

        // if radius is less than 0, less than edge value 
        if (radius > 0){
            // passing draw function to requestAnimationFrame
            // draw function out of scope, binding. so we have access to our "this" as set within draw()
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath(); 
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI); 
            ctx.fillStyle = this.color; 
            ctx.fill();

            // Theme Styles found in CSS
            ctx.strokeStyle = "#ecec31c7";
            ctx.stroke();
        }
    }
}

// Draws "tree branch" part of particles
function branchOut(){
    // Assigning center of particles to mouse coords(x,y)
    const centerX = mouse.x;
    const centerY = mouse.y; 
    // loop for more particles to grow from center, Draw 3 Originally
    for(let i =0; i < 7; i++){
        // passing class to root variable 
        const root = new rootDrawing(mouse.x, mouse.y, "#0000002d", centerX, centerY);
        root.draw()
    }
}

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}); 

window.addEventListener("mousemove", function(){


    // Gives Fading Particles when matched with background color and opacity 
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    branchOut()
});

// function pythagoreanExample(){
//     const a = x1 - x2; 
//     const b = y1 - y2; 
    
//     const hypotenuse = Math.sqrt(a*a + b*b); 
// }

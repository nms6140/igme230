/*
IGME-101
Nicole Simone
Project 2
10/26/17
*/

var arrayHouse = []; //makes array of houses
var sun1;
mouseP = false;
var cloud1;

function setup() {
    createCanvas(800, 600);
    background(120);
    for (var i = 0; i < 5; i++) {
        arrayHouse.push(new House (i * 200, 500));
        arrayHouse[i].display();
     }
    sun1 = new Sun();
    strokeWeight(2);
    cloud1 = new Cloud ();
   /* cloud2 = new Cloud (x, y);
    cloud3 = new Cloud (x, y); */
}

function draw() {
    background(120);
    noStroke();
    sun1.display();
    sun1.panicMode();
    sun1.utterPanic();
    fill(49, 51, 53);
    rect(0, 570, 800, 30);
    cloud1.display();

    for (var i = 0; i < 5; i++) {
        arrayHouse[i].move();
        arrayHouse[i].display();

        if(arrayHouse[i].fuse==true){
            arrayHouse[i].houseExplode();
            }
        arrayHouse[i].houseReset();

        if (arrayHouse[i].x > 950)
            {
                arrayHouse[i].x = -60;
            }
    }
}

function mouseClicked(){
    if(dist(sun1.x, sun1.y, mouseX, mouseY)<= 100){//if in circle, changes color
        sun1.changeSunColor();
        sun1.display();
    }
    else{
        for (var i = 0; i < arrayHouse.length; i++)
        arrayHouse[i].houseClicked();
        console.log("uhhuhboiii");
    }
}

function mouseMove(){
}

class House { //class for object house//
    constructor(x, y) {
        this.x = x;
        this.y = y ;
        this.deltaX = 3;
        this.deltaY = 0;
        this.color = color(random(100, 255), random(200, 255), random(100, 175));
        this.x1=0;
        this.y1=0;
        this.x2=0;
        this.fuse=false;
    }
    move() { //moves houses to the right //
        this.x += this.deltaX;
    }

    display() { //displays houses
        fill(this.color);
        stroke(1);
        strokeWeight(4);
        rect(this.x, this.y, 25, 50);
        ellipse(this.x + 18, this.y + 25, 2, 2);
        line(this.x+60 , this.y-60-this.y1, this.x-40, this.y-60-this.y1 ); //middle line
        line(this.x+15-this.x1, this.y-100-this.y1, this.x-40-this.x1, this.y-60-this.y1) //left roof
        line (this.x+15+this.x1, this.y-100-this.y1, this.x+60+this.x1, this.y-60-this.y1); //right roof
        line (this.x + 60+this.x2, this.y - 60, this. x+60+this.x2, this.y + 50); //right wall
        line (this.x-40-this.x2, this.y -60, this.x-40-this.x2, this. y +50); //left wall
        line (this.x-40, this.y+50, this.x+60, this.y+50); //floor
    }
    houseClicked(){ //makes doors look like opening and closing
        if( mouseX<=this.x+25 && mouseX>=this.x && mouseY<=this.y+50 && mouseY>=this.y){
            fill(120);
            rect(this.x, this.y, 27, 50);
            fill(this.color);
            rect(this.x, this.y, 5, 50);
            console.log ("ahhem");
        } //makes lines of house extend out each frame by a certain amount x and y
        else if(mouseY>=this.y-100 && mouseX<this.x+60 && mouseY<this.y+50 && mouseX>this.x-40) {
            this.fuse=true;
        }
    } //the rate at which the lines extend out each frame
    houseExplode(){
        this.y1+=0.2;
        this.x1+=0.2;
        this.x2+=0.2;
    }
    houseReset(){ // after the house is off screen it resets to lines origin points before they expanded//
        if(this.x-40>850) {
            this.x1=0;
            this.y1=0;
            this.x2=0;
            this.fuse=false;
        }
    }
}
class Cloud{
  constructor(x, y, width, height){
  }
    display(){
        fill(255);
        ellipse(290, 265, 120, 70);
        ellipse(220, 270, 120, 70);
        ellipse(250, 250, 130, 90);
    }
}

class Sun { // class for object sun
    constructor(){
        this.rColor = 0;
        this.gColor = 244;
        this.bColor = 158;
        this.x = 750;
        this.y = 10;
        this.width = 200;
        this.height = 200;
    }
    display(){//draws elipse for "sun"
        fill(this.rColor, this.gColor, this.bColor);
        ellipse(this.x, this.y, this.width, this.height);
    }
    changeSunColor(){ //changes sun color by certain rate each frame
        this.rColor += 15;
            if(this.rColor >=255){
                this.rColor=255;
            }
        this.gColor -= 20;
        this.bColor -= 12;
    }
    panicMode(){// sun goes full red, panic goes aross screen
        if(this.rColor>=255){
            mouseP=true;
            textSize(265);
            fill("red");
            text ("PANIC", 0, 350);
             for (var i = 0; i < arrayHouse.length; i++) {
            arrayHouse[i].color= color("red");
            arrayHouse[i].deltaX = 0;
            }
        }
    }
    utterPanic(){ // panic goe across y of screen sporatically
        if( mouseP==true){
            textSize(265);
            fill("red");
            text("PANIC", 0, int(random(0, 600)));
        }
    }
}

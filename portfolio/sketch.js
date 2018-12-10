/*
IGME-102
Nicole Simone
Final Project (3)
4/23/18
*/

//main sketch file, holds Sun class as well


var sun1; //sun object
var imgMap; //map to hold all external images, text files, and font files
var arrayCollection = []; //2D array that holds arrayHouse, arrayDrop, arrayLeaf, and arrayCloud

function preload() {
    imgMap = new Map();
    imgMap.set('springImg', loadImage("assets/raindrop.png"), fallImage);
    imgMap.set('summerImg', loadImage("assets/summer.png"), fallImage);
    imgMap.set('fallImg', loadImage("assets/leaf.png"), fallImage);
    imgMap.set('winterImg', loadImage("assets/cloud.png"), fallImage);
    imgMap.set('fine', loadStrings('text.txt'), fallText);
    imgMap.set('bFont', loadFont('assets/BlackHanSans-Regular.ttf'), fallFont);
}
//callback function for failure to load external font file
function fallFont(helvetica) {
    textFont(font);
}
//callback function for failure to load external text file
function fallText() {
    text("whoopsie-Daisy", 10, 590);
}
//callback function for failure to load external image files
function fallImage() {
    text("error loading image", 400, 300);
}

function setup() {
    let arrayHouse = []; //array of house instances
    let arrayDrop = []; //array of Raindrop instances
    let arrayLeaf = []; //array of leaf instances
    let arrayCloud = []; //array of cloud instances
    createCanvas(800, 600);
    background(120);
    for (var i = 0; i < 5; i++) { //creates new house instances
        arrayHouse.push(new House(i * 200, 500));
        arrayHouse[i].display();
    }
    for (var i = 0; i < 15; i++) { //creates new raindrop instances
        arrayDrop.push(new RainDrop(random(0, 700), random(0, 300)));
    }
    for (var i = 0; i < 10; i++) { //creates new leaf instances
        arrayLeaf.push(new Leaf(random(0, 700), random(0, 300)));
    }
    for (var i = 0; i < 10; i++) { //creates new cloud instances
        arrayCloud.push(new Cloud(random(-100, 500), random(0, 200)));
    }
    //pushes each 1D array into arayCollection (2D array)
    arrayCollection.push(arrayHouse);
    arrayCollection.push(arrayDrop);
    arrayCollection.push(arrayLeaf);
    arrayCollection.push(arrayCloud);
    //new sun object
    sun1 = new Sun();
    strokeWeight(2);
    //creates new DOM select element and sets its dropdown options to the 4 seasons
    select = createSelect();
    select.position(12, 50);
    select.option('spring');
    select.option('summer');
    select.option('fall');
    select.option('winter');
    createElement("p"); //for spacing
    //creates new DOM slider element and sets its min and max values and start value
    slider = createSlider(0, 360, 60);
    slider.position(10, 10);


}

function draw() {
    //sets background color based on slider
    let val = slider.value();
    background(val, 100, 100);
    noStroke();
    sun1.display();
    sun1.changeSunColor();
    sun1.panicMode();
    fill(49, 51, 53);
    rect(0, 570, 800, 30);

    for (var i = 0; i < 5; i++) {
        arrayCollection[0][i].move();
        arrayCollection[0][i].display(val, 100, 100);
        if (arrayCollection[0][i].fuse == true) {
            arrayCollection[0][i].houseExplode();
        }
        arrayCollection[0][i].houseReset();
        if (arrayCollection[0][i].x > 950) {
            arrayCollection[0][i].x = -60;
        }
    }
    console.log(sun1.rcolor);
    //makes it so if panic mode is off, then you can cycle between the seasons using the dropdown menu and certain pictures will appear based on the season
    if (sun1.rColor < 255) {
        text(imgMap.get('fine'), 10, 590);
        switch (select.value()) {
            case 'spring':
                for (var i = 0; i < arrayCollection[1].length; i++) {
                    arrayCollection[1][i].display();
                    arrayCollection[1][i].move();
                }
                break;
            case 'summer':
                image(imgMap.get('summerImg'), 698, 15, 70, 70);
                break;
            case 'fall':
                for (var i = 0; i < arrayCollection[2].length; i++) {
                    arrayCollection[2][i].display();
                    arrayCollection[2][i].move();
                }
                break;
            case 'winter':
                for (var i = 0; i < arrayCollection[3].length; i++) {
                    arrayCollection[3][i].display();
                    arrayCollection[3][i].move();
                }
        }
    }
}

function mouseClicked() {
    //when mouse clicks, checks if within bounds of the houses in house array and acts accordingly
    for (var i = 0; i < arrayCollection[0].length; i++) {
        arrayCollection[0][i].isWithinHouse();
    }
}

class Sun { // class for object sun
    constructor() {
        this.rColor = 0;
        this.gColor = 244;
        this.bColor = 158;
        this.x = 750;
        this.y = 10;
        this.width = 200;
        this.height = 200;
    }
    display() { //draws elipse for "sun"
        fill(this.rColor, this.gColor, this.bColor);
        ellipse(this.x, this.y, this.width, this.height);
    }
    changeSunColor() { //changes sun color by certain rate each frame
        this.rColor += .3;
        if (this.rColor >= 255) {
            this.rColor = 255;
        }
        this.gColor -= 10;
        this.bColor -= 10;
    }
    panicMode() { // sun goes full red, panic goes aross screen
        if (this.rColor >= 255) {
            let button;
            if (button == undefined) {
                button = createButton('Dont Panic');
                button.position(12, 90);
            }
            button.mousePressed(this.resetPanic); //refreshes page if click button
            textSize(265);
            fill("red");
            textFont(imgMap.get('bFont'));
            text("PANIC", 0, 350);
            textSize(265);
            fill("red");
            textStyle(NORMAL);
            text("PANIC", 0, int(random(0, 600)));
            text("PANIC", 0, int(random(0, 600)));
            text("PANIC", 0, int(random(0, 600)));
            noTint();
            //sets door colors to red and makes them all explode on their own
            for (var i = 0; i < arrayCollection[0].length; i++) {
                arrayCollection[0][i].color = color("red");
                arrayCollection[0][i].houseExplode();
            }
        }
    }
    resetPanic() {
        location.reload();
    }



}

var dragging = false;
var draggedpattern;
var gliderpattern;
var glider;
var herschelpattern;
var herschel;
var ak47pattern;
var ak47;
var gosperglidergunpattern;
var gosperglidergun;
var RLEpattern;
var cellsize = 20;
var mrow = 0;
var mcol = 0;
var ruleset = 1;
var rulesetstring = "Conway's Game of Life";
var rows;
var columns;
var grid;
var temp;
var a = false;
var mx;
var my;
var redv = 200;
var greenv = 200;
var xsize = 0;
var ysize = 0;
var isAlive = false;
var n = 0;
var auto = false;
var x = 0;
var isDragging = false;
var easteregg = false;
var eggstage = 1;
var shakeyx = 0;
var shakeyy = 0;
var RLEstring;
let stringinput;
let xinput;
let yinput;
function setup() {
xsize = 2600;
ysize = 2000;
createCanvas(xsize+500,ysize+20);

rows = floor(xsize/cellsize);
columns = floor(ysize/cellsize);
grid = new Array(rows);
for(i = 0; i < rows; i++) {
    grid[i] = new Array(columns);
}
temp = new Array(rows);
for(i = 0; i < rows; i++) {
    temp[i] = new Array(columns);
}
ticker = createSlider(0,100,15);
ticker.position(40,ysize+15);
evolver = createButton("evolve");
evolver.position(10,ysize+20);
evolver.mousePressed(evolve);
start = createCheckbox("autoevolve", false);
start.changed(myCheckedEvent);
rulebutton = createButton("Ruleset change");
rulebutton.position(490,ysize+20);
rulebutton.mousePressed(changeRule);
soupbutton = createButton("make soup");
soupbutton.position(400,ysize+20);
soupbutton.mousePressed(createSoup);
clearbutton = createButton("Clear");
clearbutton.position(590,ysize+20);
clearbutton.mousePressed(clearGrid);
stringinput = createInput().attribute('placeholder','RLE pattern');
stringinput.position(xsize+50,800);
stringinput.size(400);
xinput = createInput().attribute('placeholder','x');
xinput.position(xsize+50,820);
xinput.size(15);
yinput = createInput().attribute('placeholder','y');
yinput.position(xsize+80,820);
yinput.size(15);

//presets
//glider
gliderpattern=[
    ".O.",
    "..O",
    "OOO"]
glider = new Array(3);
for(i = 0;i<3;i++)
{
    glider[i] = new Array(3);
}
for(i = 0; i<3;i++){
    for(j = 0;j<3;j++) {
        if(gliderpattern[j].charAt(i)=='O')
        {
            glider[i][j] = 1;
        }
        else
        {
            glider[i][j] = 0;
        }
    }
}
//herschel
herschelpattern=[
    "O..",
    "OOO",
    "O.O",
    "..O"]
    herschel = new Array(3);
    for(i = 0;i<3;i++)
    {
        herschel[i] = new Array(4);
    }
    for(i = 0; i<3;i++){
        for(j = 0;j<4;j++) {
            if(herschelpattern[j].charAt(i)=='O')
            {
                herschel[i][j] = 1;
            }
            else
            {
                herschel[i][j] = 0;
            }
        }
    }
//ak47
ak47pattern=[
    ".....O....",
    "....O.O...",
    "...O...O..",
    "...O...O..",
    "...O...O..",
    "....O.O...",
    ".....O....",
    "..........",
    "..OO......",
    "...O......",
    "OOO.....OO",
    "O.......OO",
]
ak47 = new Array(10);
for(i = 0;i<10;i++)
{
    ak47[i] = new Array(12);
}
for(i = 0; i<10;i++){
    for(j = 0;j<12;j++) {
        if(ak47pattern[j].charAt(i)=='O')
        {
            ak47[i][j] = 1;
        }
        else
        {
            ak47[i][j] = 0;
        }
    }
}
//gosper glider gun, 36 x 9 y
gosperglidergunpattern=[
    "........................O...........",
    "......................O.O...........",
    "............OO......OO............OO",
    "...........O...O....OO............OO",
    "OO........O.....O...OO..............",
    "OO........O...O.OO....O.O...........",
    "..........O.....O.......O...........",
    "...........O...O....................",
    "............OO......................"
]
gosperglidergun = new Array(36);
for(i = 0;i<36;i++)
{
    gosperglidergun[i] = new Array(9);
}
for(i = 0; i<36;i++){
    for(j = 0;j<9;j++) {
        if(gosperglidergunpattern[j].charAt(i)=='O')
        {
            gosperglidergun[i][j] = 1;
        }
        else
        {
            gosperglidergun[i][j] = 0;
        }
    }
}







}
function RLEinterpret(rlex,rley,RLEstring) {
RLEstr = RLEstring.replace(" ","");
RLEstr = RLEstr.replace("!","");
print(RLEstr);
h = 0;
g = 0;
currenth = 0;
tempnumber1 = 0;
tempnumber2 = 0;
numberpresence = false;
concanumber = 0;
RLEsplit = split(RLEstr,'$');
for(i=0;i<=RLEsplit.length;i++){
    print(i+": "+RLEsplit[i]);
}
RLEpattern = new Array(rlex);
for(i=0;i<rlex;i++){
    RLEpattern[i] = new Array(rley);
}
for(i=0;i<RLEsplit.length;i++){
    h = 0;
    for(j=0;j<RLEsplit[i].length;j++){
        print("i: "+i+" j: "+j);
        if(numberpresence && j == 0){
            g = g+concanumber-1;
            numberpresence = false;
        }
        if(unchar(RLEsplit[i].charAt(j)) > 47 && unchar(RLEsplit[i].charAt(j)) < 58){
            if(!numberpresence){
            tempnumber1 = int(RLEsplit[i].charAt(j));
            numberpresence = true;
            tempnumber2 = '';
            concanumber = tempnumber1;
            }
            else{
            tempnumber2 = int(RLEsplit[i].charAt(j));
            concanumber = int(join([nf(tempnumber1),nf(tempnumber2)],''));
            }
            
        }
        else if(RLEsplit[i].charAt(j) == 'b') {
            if(numberpresence){
                currenth = h;
                for(h;h<currenth+concanumber;h++) {
                    RLEpattern[h][i+g] = 0;
                
                }
                numberpresence = false;
            }
            else {
                RLEpattern[h][i+g] = 0;
                h++;
            }

        }
        else if(RLEsplit[i].charAt(j) == 'o') {
            if(numberpresence){
                currenth = h;
                for(h;h<currenth+concanumber;h++) {
                    RLEpattern[h][i+g] = 1;
                
                }
                numberpresence = false;
            }
            else {
                RLEpattern[h][i+g] = 1;
                h++;
            }


        }
    }

}



return(RLEpattern);
}
function clearGrid() {
    for(i = 0; i < rows; i++) {
        for(j = 0; j < columns; j++) {
            grid[i][j] = 0;
            temp[i][j] = 0;
        }
    }

}
function createSoup() {
    for(i = 0; i < rows; i++) {
        for(j = 0; j < columns; j++) {
            if(Math.round(Math.random())==1) {
                grid[i][j] = 1;
                temp[i][j] = 1;
            }
            else {
                grid[i][j] = 0;
                temp[i][j] = 0;
            }
        }
    
    }

}
function changeRule() {
    if(ruleset < 5) {
        ruleset = ruleset+1;
    }
    else {ruleset = 1}
    if(ruleset == 1) {rulesetstring = "Conway's Game of Life"}
    if(ruleset == 2) {rulesetstring = "Pedestrian Life, B38/S23"}
    if(ruleset == 3) {rulesetstring = "2x2, B36/S125"}
    if(ruleset == 4) {rulesetstring = "Seeds, B2/S"}
    if(ruleset == 5) {rulesetstring = "Life Without Death, B2/S012345678"}

}
function myCheckedEvent() {
auto = this.checked();

}
function draw() {
if(auto){
x=x+ticker.value();
}
if(x>100){
    x = 0;
    evolve();
}

background(200);
for(i = 0; i < rows; i++) {
    for(j = 0; j < columns; j++) {
        redv = (Math.random()*25)+230; //farveværdi = 255; random = 0..1; dvs, redv = 230..255
        greenv = (Math.random()*25)+230;
        shakeyx = 0;
        shakeyy = 0;
        if(easteregg){
            redv = Math.random()*255;
            greenv = Math.random()*255;
            shakeyx = Math.random()*2;
            shakeyy = Math.random()*2;
        }
        if(grid[i][j] == 1) { 

            fill(redv,greenv,0);
        }
        else { fill(50) }
        rect(cellsize*i+(shakeyx*2),cellsize*j+(shakeyy*2),cellsize-2+shakeyx,cellsize-2+shakeyy);
    }

}
fill(0,0,0);
text("x: "+mrow+" y: "+mcol,300,ysize+10);
text("sigurd :-)",xsize-100,ysize+10);
text("Ruleset: "+rulesetstring, 750,ysize+10);
textAlign(LEFT);
text("Large text field is for RLE patterns." ,xsize+20,750);
text("Patterns can be found on the LifeWiki: conwaylife.com/wiki",xsize+20,760);
text("The lower two text fields are x and y, the bounds of the pattern in width and height.",xsize+20,770);
text("Use 'SHIFT' to place the pattern you have entered in the input.",xsize+20,780)
if(mouseIsPressed && (mouseX < xsize && mouseY < ysize) && !dragging) {
mx = mouseX;
my = mouseY;
mrow = floor(mx/cellsize);
mcol = floor(my/cellsize);
if(mouseButton === LEFT) {
    grid[mrow][mcol] = 1;
    temp[mrow][mcol] = 1;
}
if(mouseButton === RIGHT) {
    grid[mrow][mcol] = 0;
    temp[mrow][mcol] = 0;
}

}

//glider box, bounds = xsize - (xsize+250); 0 - 250;
stroke(2);
fill(240);
rect(xsize,0,250,250);
fill(0);
textAlign(CENTER);
text('Glider',xsize+100,230);
for(i=0;i<glider.length;i++){
    for(j=0;j<glider[i].length;j++){
        if(glider[i][j] == 1) { 
            
            
            fill(255,255,0)}
        else { fill(50) }
        rect(xsize+100+cellsize*i,100+cellsize*j,cellsize-2,cellsize-2);

    }


}
//herschel box, bounds = (xsize+250) - (xsize+500); 0-250
stroke(2);
fill(240);
rect(xsize+250,0,250,250);
fill(0);
textAlign(CENTER);
text('herschel',xsize+350,230);
for(i=0;i<herschel.length;i++){
    for(j=0;j<herschel[i].length;j++){
        if(herschel[i][j] == 1) { fill(255,255,0)}
        else { fill(50) }
        rect(xsize+350+cellsize*i,100+cellsize*j,cellsize-2,cellsize-2);

    }


}
//ak47 box, bounds = xsize - xsize+250; 250 - 650;
stroke(2);
fill(240);
rect(xsize,250,250,400);
fill(0);
textAlign(CENTER);
text('ak47',xsize+125,640);
for(i=0;i<ak47.length;i++){
    for(j=0;j<ak47[i].length;j++){
        if(ak47[i][j] == 1) { fill(255,255,0)}
        else { fill(50) }
        rect(xsize+25+cellsize*i,300+cellsize*j,cellsize-2,cellsize-2);

    }
}
//gosper box, bounds = xsize+250 - xsize+500;250-650
stroke(2);
fill(240);
rect(xsize+250,250,250,400);
fill(0);
textAlign(CENTER);
text('gosper glider gun',xsize+375,640);
for(i=0;i<gosperglidergun.length;i++){
    for(j=0;j<gosperglidergun[i].length;j++){
        if(gosperglidergun[i][j] == 1) { fill(255,255,0)}
        else { fill(50) }
        rect(xsize+270+5*i,500+5*j,5-1,5-1);

    }

}

if(dragging) {
for(i=0;i<draggedpattern.length;i++) {
    for(j=0;j<draggedpattern[i].length;j++){
        if(draggedpattern[i][j]==1) {fill(255,255,0,128)}
        else{ fill(50,50,50,128)}
        mx = mouseX;
        my = mouseY;
        mrow = floor(mx/cellsize);
        mcol = floor(my/cellsize);
        rect(mx+cellsize*i,my+cellsize*j,cellsize-2,cellsize-2);
    }

}
}
}


function evolve() {

for(i = 0; i < rows; i++) {
    for(j = 0; j < columns; j++) {
        if(grid[i][j] == 1) {isAlive = true}
        else {isAlive = false}
        temp[i][j] = 0;
        if(ruleset == 1) //normal game of life
        {
            if(isAlive && (neighbours(i,j) == 2))
            {
                temp[i][j] = 1;
            }
            if(neighbours(i,j) == 3)
            {
                temp[i][j] = 1;
            }
        }
        if(ruleset == 2) //pedestrian life , B38S23
        {
            if(isAlive && (neighbours(i,j) == 2))
            {
                temp[i][j] = 1;
            }
            if(neighbours(i,j) == 3)
            {
                temp[i][j] = 1;
            }
            if(!isAlive && neighbours(i,j) == 8) {
                temp[i][j] = 1;
            }
        }
        if(ruleset == 3) // 2x2, B36S125
        {
            if(isAlive && (neighbours(i,j) == 1))
            {
                temp[i][j] = 1;
            }
            if(isAlive && (neighbours(i,j) == 2))
            {
                temp[i][j] = 1;
            }
            if(isAlive && (neighbours(i,j) == 5))
            {
                temp[i][j] = 1;
            }
            if(!isAlive && neighbours(i,j) == 3) {
                temp[i][j] = 1;
            }
            if(!isAlive && neighbours(i,j) == 6) {
                temp[i][j] = 1;
            }


        }
        if(ruleset == 4) // seeds, B2/S
        {
            if(!isAlive && (neighbours(i,j)==2))
            {
                temp[i][j] = 1;
            }
        }
        if(ruleset == 5) //Life Without Death, B2/S012345678
        {
        if(!isAlive && neighbours(i,j)==2) {
            temp[i][j] = 1;
        }
        if(isAlive){
            temp[i][j] = 1;
        }
    }




    }


}
let next = grid;
grid = temp;
temp = next;


}
function neighbours(row,col) {

n = 0;
if(!(row == 0) && !(col == 0))
{
    if(grid[row-1][col-1]==1){n++} //Nordvest
}
if(!(row == 0) && !(col == columns-1))
{
    if(grid[row-1][col+1]==1){n++} //Sydvest
}
if(!(row==0))
{
    if(grid[row-1][col]==1){n++} //vest
}
if(!(col==0))
{
    if(grid[row][col-1]==1){n++} //Nord
}
if(!(col==0) && !(row==rows-1))
{
    if(grid[row+1][col-1]==1){n++} //Nordøst
}
if(!(row==rows-1) && !(col==columns-1))
{
    if(grid[row+1][col+1]==1){n++} //Sydøst
}
if(!(row==rows-1))
{
    if(grid[row+1][col]==1){n++} //øst
}
if(!(col==columns-1))
{
    if(grid[row][col+1]==1){n++} //syd
}
    return n;
}
function mousePressed() {
    if(dragging) {
        createPattern(draggedpattern);
    }
    dragging = false;
if(checkBounds(xsize,xsize+250,0,250))
{
    dragging = true;
    draggedpattern = glider;
}
if(checkBounds(xsize+250,xsize+500,0,250)) {

    dragging = true;
    draggedpattern = herschel;

}
if(checkBounds(xsize,xsize+250,250,640)) {
    dragging = true;
    draggedpattern = ak47;
}
if(checkBounds(xsize+250,xsize+500,250,640)) {
    dragging = true;
    draggedpattern = gosperglidergun;

}



}
function mouseReleased() {
    
if(dragging) {
createPattern(draggedpattern);
dragging = false;

}
}
function checkBounds(boundx1,boundx2,boundy1,boundy2) {
a = false;
if(((mouseX > boundx1) && (mouseX < boundx2)) && ((mouseY > boundy1) && (mouseY < boundy2))){
a = true;
}
return a;
}

function keyPressed() {
    if(keyCode === SHIFT)
    {
        var temppattern2 = RLEinterpret(xinput.value(),yinput.value(),stringinput.value());
        createPattern(temppattern2);
    }
    if(keyCode === CONTROL)
    {
        createPattern(gosperglidergun);
    }

    //easteregg
    easteregg = false;
    if(eggstage == 1){
        if(keyCode === 83){
            eggstage = 2;
        }
    }
    if(eggstage == 2){
        if(keyCode === 73){
            eggstage = 3;
        }
    }
    if(eggstage == 3){
        if(keyCode === 71){
            eggstage = 4;
        }
    }
    if(eggstage == 4){
        if(keyCode === 85){
            eggstage = 5;
        }
    }
    if(eggstage == 5){
        if(keyCode === 82){
            eggstage = 6;
        }
    }
    if(eggstage == 6){
        if(keyCode === 68){
            eggstage = 1;
            easteregg = true;
        }
    }

}
function createPattern(pattern) {
    mx = mouseX;
    my = mouseY;
    mrow = floor(mx/cellsize);
    mcol = floor(my/cellsize);
    for(i=0;i<pattern.length;i++)
    {
        for(j=0;j<pattern[i].length;j++){
            grid[mrow+i][mcol+j]=pattern[i][j];
        }
    }



}


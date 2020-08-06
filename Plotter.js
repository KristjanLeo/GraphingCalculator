
let ctx = document.getElementById("Plotter").getContext("2d");
var Xmax = null;
var Ymax = null;
var Xmin = null;
var Ymin = null;
var xValues = [];
var yValues = [];
var canvas = document.getElementById('Plotter');
var width = canvas.width;
var height = canvas.height;

// Drawing the y axis
ctx.beginPath();
ctx.moveTo(width/10, height);
ctx.lineTo(width/10, 0);
ctx.lineTo(width/10-width/100, height*0.02);
ctx.moveTo(width/10, 0);
ctx.lineTo(width/10+width/100, height*0.02);
ctx.stroke();


//Drawing the x axis
ctx.beginPath();
ctx.moveTo(0, height - height/10);
ctx.lineTo(width, height - height/10);
ctx.lineTo(width-0.01*width, height - height/10 - height*0.02);
ctx.moveTo(width, height - height/10);
ctx.lineTo(width-0.01*width, height - height/10 + height*0.02);
ctx.stroke();

function PlotPoints() {
ctx.fillStyle = "black";
ctx.clearRect(0 , 0, width, height);
// Drawing the y axis
ctx.beginPath();
ctx.moveTo(width/10, height);
ctx.lineTo(width/10, 0);
ctx.lineTo(width/10-width/100, height*0.02);
ctx.moveTo(width/10, 0);
ctx.lineTo(width/10+width/100, height*0.02);
ctx.stroke();


//Drawing the x axis
ctx.beginPath();
ctx.moveTo(0, height - height/10);
ctx.lineTo(width, height - height/10);
ctx.lineTo(width-0.01*width, height - height/10 - height*0.02);
ctx.moveTo(width, height - height/10);
ctx.lineTo(width-0.01*width, height - height/10 + height*0.02);
ctx.stroke();
//Initializing variables
xValues = [];
yValues = [];
Xmax = null;
Ymax = null;
Xmin = null;
Ymin = null;
var counter = 0;

// Creating the coordinates
for(var i = 1; i<=15; i++){
	if(document.getElementById("X"+ i).value !== "" && document.getElementById("Y"+ i).value !== ""){
	xValues.push(parseInt(document.getElementById("X" + i).value));
	yValues.push(parseInt(document.getElementById("Y" + i).value));}}


//Finding the maxium and minimum x,y values to create the axes
for(var i = 0; i<xValues.length; i++){
if(counter<1){
Xmax = xValues[i];
Ymax = yValues[i];
Xmin = xValues[i];
Ymin = yValues[i];
counter++;
}
if(counter>=1 && xValues[i]>Xmax){
Xmax = xValues[i];
}
if(counter>=1 && xValues[i]<Xmin){
Xmin = xValues[i];
}
if(counter>=1 && yValues[i]>Ymax){
Ymax = yValues[i];
}
if(counter>=1 && yValues[i]<Ymin){
Ymin = yValues[i];
}
}

//Coordinates for the axes 
ctx.font = "20px Arial";
// Y
for(var i = 0; i<10; i++){
	ctx.beginPath();
	ctx.moveTo(0.08*width, (0.05+i/10)*height);
	ctx.lineTo(0.12*width, (0.05+i/10)*height);
	ctx.stroke();
	ctx.fillText((Ymax-((Ymax-Ymin)/9)*i).toFixed(2), 0.01*width, (0.06+i/10)*height);
}
// X 
for(var i = 0; i<9; i++){
	ctx.beginPath();
	ctx.moveTo((0.15+i/10)*width, 0.88*height);
	ctx.lineTo((0.15+i/10)*width, 0.92*height);
	ctx.stroke();
	ctx.fillText((Xmin+((Xmax-Xmin)/8)*i).toFixed(2), (0.13+i/10)*width, 0.98*height);
}
ctx.fillStyle = "red";
for(var i = 0; i<xValues.length; i++){
    ctx.beginPath();
    ctx.arc(((xValues[i]-Xmin)/(Xmax-Xmin)*0.8+0.15)*width, height - height*(0.05+((yValues[i]-Ymin)/(Ymax-Ymin)*0.9)), 3, 0, Math.PI * 2, true);
    ctx.fill();
}
}




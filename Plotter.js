
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

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

// Draws a Quadratic Equation : 

var ADraw = 0;
var BDraw = 0;
var CDraw = 0;
function QuadradicEquation() {
		console.log("Success");
        var L = 0.0001;
        var Tries = 1000000;
        var YPred = 0;
        var A = 0;
        var B = 0;
        var C = 0;
        var Da = 0;
        var Db = 0;
        var Dc = 0;
        var Maximum = (17*Xmax/16 - Xmin/16);
        var Minimum = (19*Xmin/16 - 3*Xmax/16);
        for (var i = 0; i < Tries; i++) {
        /*if(i%1000 == 0){
        ctx.beginPath();
        ctx.moveTo(0, height*(0.95 - ((A*i*i+B*i+C-Ymin)*0.9)/(Ymax-Ymin)));
        for(var j = Minimum; j <= Maximum; j = j + 0.001){
		ctx.lineTo(width*(0.15+0.8*((j-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*j*j+B*j+C-Ymin)/(Ymax-Ymin))));
		}
		ctx.stroke();
           }*/
           	Da = 0;
            Db = 0;
            Dc = 0;
            for (var z = 0; z < xValues.length; z++) {
                YPred = A * xValues[z] * xValues[z] + B * xValues[z] + C;
                Da = Da + (yValues[z] - YPred) * xValues[z] * xValues[z];
                Db = Db + (yValues[z] - YPred) * xValues[z];
                Dc = Dc + (yValues[z] - YPred);
            }
            Da = Da * (-2.0 / xValues.length);
            Db = Db * (-2.0 / xValues.length);
            Dc = Dc * (-2.0 / xValues.length);
            A = A - L * Da;
            B = B - L * Db;
            C = C - L * Dc;

     
    }

        ADraw = A;
        BDraw = B;
        CDraw = C;
        // Draw
        ctx.beginPath();
        ctx.moveTo(0, height*(0.95 - ((A*i*i+B*i+C-Ymin)*0.9)/(Ymax-Ymin)));
        for(var i = Minimum; i <= Maximum; i = i + 0.001){
		ctx.lineTo(width*(0.15+0.8*((i-Xmin)/(Xmax-Xmin))), height*(0.95-0.9*((A*i*i+B*i+C-Ymin)/(Ymax-Ymin))));
}
		ctx.stroke();
}






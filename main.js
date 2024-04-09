song="";
leftwristX=0
leftwristY=0
rightwristX=0
rightwristY=0
scoreleft=0
scoreright=0
function preload(){
    song=loadSound("Peppa Pig Theme Tune - The Remix (Official Music Video).mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}
function gotPoses(results){
         if(results.length>0){
            console.log(results);
            leftwristX=results[0].pose.leftWrist.x;
            leftwristY=results[0].pose.leftWrist.y;
            rightwristX=results[0].pose.rightWrist.x;
            rightwristY=results[0].pose.rightWrist.y;
            scoreleft=results[0].pose.keypoints[9].score;
            scoreright=results[0].pose.keypoints[10].score;
            console.log("x= "+leftwristX+"y= "+leftwristY);
            console.log("rx= "+rightwristX+"ry= "+rightwristY);
         }
}
function modelLoaded(){
    console.log('model loaded');
}
function draw(){
    image(video,0,0,600,500);
    if(scoreleft>0.2){
        fill("blue");
        circle(leftwristX,leftwristY,20);
        hello=Number(leftwristY);
        hi=floor(hello);
        yo=hi/500;
        song.setVolume(yo);
        document.getElementById("volume").innerHTML="volume = "+ yo;
        
    }
     if(scoreright>0.2){

    
    fill("red");
        circle(rightwristX,rightwristY,20);
        if(rightwristY>0 && rightwristY<=100){
            document.getElementById("speed").innerHTML="Speed=0.5X";
            song.rate(0.5);
        }
       else if(rightwristY>100 && rightwristY<=200){
            document.getElementById("speed").innerHTML="Speed=1X";
            song.rate(1);
        }
       else if(rightwristY>200 && rightwristY<=300){
            document.getElementById("speed").innerHTML="Speed=1.5X";
            song.rate(1.5);
        }
       else if(rightwristY>300 && rightwristY<=400){
            document.getElementById("speed").innerHTML="Speed=2X";
            song.rate(2);
        }
       else if(rightwristY>400 && rightwristY<=500){
            document.getElementById("speed").innerHTML="Speed=2.5X";
            song.rate(2.5);
        }
    }
}

function playbtn(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

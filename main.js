song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
score_leftwrist = 0;
score_rightwrist = 0;
function preload ()
{
    song = loadSound("music.mp3");
    
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pn = poseNet(video,modelLoaded)
    pn.on('pose',gotPoses)
}
function modelLoaded()
{
    console.log('model has been loaded')
}
function gotPoses(results)
{
    if(results.length>0)
    {
    console.log(results)
    score_leftwrist = results[0].pose.keypoints[9].score;
    score_rightwrist = results[0].pose.keypoints[10].score;
    console.log("leftwrist score = "+score_leftwrist+"rightwrist score = "+score_rightwrist);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    }
    
}
function draw()
{
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(score_rightwrist > 0.2)
    {
        circle(rightwristX,rightwristY,20)
        if(rightwristY >= 0 & rightwristY <=100)
        {
            document.getElementById("speed").innerHTML = "Speed : 50%";
            song.rate(0.5);
        }
        else if(rightwristY > 100  & rightwristY <= 200)
        {
        document.getElementById("speed").innerHTML = "Speed : 100%";
        song.rate(1);
        }
        else if(rightwristY >200 & rightwristY <=300)
        {
            document.getElementById("speed").innerHTML = "Speed : 150%";
            song.rate(1.5);
        }
        else if(rightwristY>300 & rightwristY<=400)
        {
        document.getElementById("speed").innerHTML = "Speed : 200%";
        song.rate(2);
        }
        else if(rightwristY >400 & rightwristY<=500)
        {
        document.getElementById("speed").innerHTML = "Speed : 250%";
        song.rate(2.5);
        }
    }
    

    if(score_leftwrist>0.2)
    {
    circle(leftwristX,leftwristY,20);
    leftwrist_y_number = Number(leftwristY);
    leftwrist_floored = floor(leftwrist_y_number);
    volume = leftwrist_floored/500;
    document.getElementById('volume').innerHTML = "Volume = "+volume;
    song.setVolume(volume);
    }
    
}
function pbtn()
{
    song.play();
    song.setVolume(1.0);
    song.rate(1.0);
}
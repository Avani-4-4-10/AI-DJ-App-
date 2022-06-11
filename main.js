song=""
leftWristX=0
rightWristX=0
leftWristY=0
rightWristY=0
scoreLeftWristy=0


function preload(){
    song=loadSound("music.mp3")
}

function setup(){
canvas= createCanvas(500 , 400)
canvas.center()
video= createCapture(VIDEO)
video.hide()

posenet = ml5.poseNet(video , modelLoaded)
posenet.on("pose" , gotPoses)
}

function draw(){
    image(video , 0 , 0 , 500 , 400 )

    fill("red")
    stroke("blue")

   if(scoreLeftWristy > 0.2){
       circle(leftWristX , leftWristY , 20)

       leftWristY_number= Number(leftWristY)
       remove_decimals = Math.floor(leftWristY_number)
       volume = remove_decimals/500
       song.setVolume(volume)

       document.getElementById("volume").innerHTML="volume = " + volume
   }
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function modelLoaded(){
    console.log("Posenet is initialized!")

}

function gotPoses(results){

    if(results.length > 0){

        console.log(results)

        leftWristX= results[0].pose.leftWrist.x
        rightWristX= results[0].pose.rightWrist.x
        leftWristY= results[0].pose.leftWrist.y
        rightWristY= results[0].pose.rightWrist.y
        scoreLeftWristy=results[0].pose.leftWrist.confidence

        console.log(leftWristX , leftWristY)
        console.log(rightWristX , rightWristY)
        console.log(scoreLeftWristy)
    }
}

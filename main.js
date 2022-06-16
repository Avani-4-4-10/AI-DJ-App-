song=""
leftWristX=0
rightWristX=0
leftWristY=0
rightWristY=0
scoreLeftWristy=0
scoreRightWrist= 0 


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

    if(scoreRightWrist > 0.2){
        circle(rightWristX , rightWristY , 20)

        if(rightWristY > 0 && rightWristY <= 100){
            song.rate(0.5)
            document.getElementById("speed").innerHTML="Speed= 0.5x "
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            song.rate(1)
            document.getElementById("speed").innerHTML = "Speed= 1x"
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            song.rate(1.5)
            document.getElementById("speed").innerHTML = "Speed =1.5x"
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            song.rate(2)
            document.getElementById("speed").innerHTML= "Speed =2x"

        }
        else if(rightWristY > 400 && rightWristY <= 500){
            song.rate(2.5)
            document.getElementById("speed").innerHTML= "Speed= 2.5x "
        }

    }

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
        scoreRightWrist=results[0].pose.rightWrist.confidence

        console.log(leftWristX , leftWristY)
        console.log(rightWristX , rightWristY)
        console.log(scoreLeftWristy)
        console.log(scoreRightWrist)

    }
}

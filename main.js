result = [];
objecttofind = "";
status = "";

function preload(){
}

function setup(){
     canvas = createCanvas(400 , 300);
     canvas.position(555 , 350);

     video = createCapture(VIDEO)
     video.hide();

}

function start(){
     objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
     document.getElementById('status').innerHTML = "Object is being detected";

     objecttofind = document.getElementById('objecttofind').innerHTML;
     console.log(objecttofind);
}

function modelLoaded(){
     console.log('modelloaded');
     status = true;
}

function draw(){
     image(video , 0 , 0 , 400 , 300);

     if(status != ""){
          for(i = 0; i<result; i++){
               percent = floor(result[i].confidence * 100);
               label = result[i].label;
               
               fill('red');
               text(label , result[i].x , result[i].y);
               noFill();
               stroke('red');
               rect(result[i].x , result[i].y , result[i].width , result[i].height);

               if(result[i].label = objecttofind){
                    objectDetector.detect(gotResult);
                    document.getElementById('status') = "object found";
                    document.getElementById('objecttofind').innerHTML = objecttofind + " has been found";

               }

          }
     }
}

function gotResult(results , error){

     if(error){
          console.error(error);
     }

     result = results;
}
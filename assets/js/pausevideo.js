/*
*   For each video on the page, only play them if they are in focus.
*/

let vids;

document.onload = function(){
    vids = document.getElementsByTagName("video");
}

function checkPageFocus(){
    if (document.hasFocus()){
        for (var vid of vids){
            vid.play();
        }
    } else{
        for (var vid of vids){
            vid.pause();
        }
    }
}

setInterval(checkPageFocus, 5000);
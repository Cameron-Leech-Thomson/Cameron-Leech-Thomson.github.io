/*
*   For each video on the page, only play them if they are in focus.
*/

let vids;

document.onload = function(){
    vids = document.getElementsByTagName("video");
    console.log("got videos: " + vids);
    setInterval(checkPageFocus, 5000);

    document.onfocus = function(){
        console.log("Focus regained, playing videos.");
        for (var vid of vids){
            vid.play();
        }
    }
}

function checkPageFocus(){
    console.log("Checking focus..." + document.hasFocus());
    if (!document.hasFocus()){
        console.log("Focus lost, pausing videos.");
        for (var vid of vids){
            vid.pause();
        }
    }
}

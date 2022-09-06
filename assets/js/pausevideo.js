/*
*   For each video on the page, only play them if they are in focus.
*/

let vids;

function setupVids(){
    vids = document.getElementsByTagName("video");

    // Only bother checking for focus if there are any videos on the page:
    if (vids.length > 0){
        setInterval(checkPageFocus, 5000);

        document.onfocus = function(){
            for (var vid of vids){
                vid.play();
            }
        }
    }
}

function checkPageFocus(){
    if (!document.hasFocus()){
        for (var vid of vids){
            vid.pause();
        }
    }
}

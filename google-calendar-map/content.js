//Handle windows resize
//http://stackoverflow.com/questions/13141072/how-to-get-notified-on-window-resize-in-chrome-browser
var timeoutId = 0;
window.addEventListener('resize', function() {
  //console.log("browser resizing ......");
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(function() {
    Start();
    timeoutId = 0;
  }, 100);
}, false);


//Messages from backend
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  //tab loaded
  if (msg.action == 'start') {
      	//console.log("tabs loaded ....");
        Start();
  }
  //console.log message from backend     
  if (msg.action == 'console') {
    console.log(msg.consolelog);
  };
 //Is the extension working? polling from backend
 if (msg.action == 'checking') {
    //console.log("backend checking status ....");
    sendResponse({message: "alive"});
  };
});


function Start(){
    var today = document.getElementsByClassName('lv-location');
		for (i=0;i<today.length;i++) {
      var mapDiv = document.createElement("span");
      var t1 = "myclass";
      var t2 = t1.concat(i);
      var t3 = "#" + t2
      mapDiv.setAttribute('id', t2); 
      var a = document.createElement('a');
      var b = today[i].innerText;
      b = b.replace(/^\s-\s/,''); 
      a.href =  'https://www.google.com/maps/place/' + b;
      a.innerHTML = b;
      mapDiv.appendChild(a);
      today[i].innerText = " - ";     
      today[i].appendChild(mapDiv);
    }
};

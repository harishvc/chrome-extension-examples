var DEBUG=false  //true or false

//Handle windows resize
//http://stackoverflow.com/questions/13141072/how-to-get-notified-on-window-resize-in-chrome-browser
var timeoutId = 0;
window.addEventListener('resize', function() {
  if (DEBUG === true) { console.log("browser resizing ......");}
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
      	if (DEBUG === true) { console.log("tab loaded");}
        Start();
  }
  //console.log message from backend     
  if (msg.action == 'console') {
    if (DEBUG === true) {console.log(msg.consolelog);}
  }
 //Is the extension working? polling from backend
 if (msg.action == 'checking') {
    var t1 = document.getElementsByClassName('lv-location');
    var t2 = document.getElementsByClassName('calendar-clicksaver-maplink');
    if (DEBUG === true) { console.log(msg.now, ": checking....");}
    if (t1.length != t2.length){
      if (DEBUG === true) { console.log("links missing ... updating DOM");}
      Start();
    }
  }
});

//hyperlink location!
function Start(){
    var today = document.getElementsByClassName('lv-location');
		for (i=0;i<today.length;i++) {
      var mapDiv = document.createElement("span");
      mapDiv.setAttribute('class', "calendar-clicksaver-maplink"); 
      var a = document.createElement('a');
      var b = today[i].innerText;
      b = b.replace(/^\s-\s/,''); 
      a.href =  'https://www.google.com/maps/place/' + b;
      a.innerHTML = b;
      mapDiv.appendChild(a);
      //Replace all existing content
      today[i].innerText = " - ";     
      today[i].appendChild(mapDiv);
    }
};

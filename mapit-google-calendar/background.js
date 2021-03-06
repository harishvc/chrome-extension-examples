var match = 'https://calendar.google.com/calendar/render'

chrome.runtime.onInstalled.addListener(
  function () {
    chrome.alarms.create("gcgmalarm",{when: Date.now() + 10*1000,periodInMinutes: 2});
  });

//All content loaded in the Google Calendar browser tab!
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
   if (changeInfo.status == 'complete') {   
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
         chrome.tabs.sendMessage(tabs[0].id, {action: "start"}, function(response) {});  
      });
   };
});

//http://stackoverflow.com/questions/18162644/adding-a-listener-that-fires-whenever-the-user-changes-tab
//When Google Calendar browser tab is active again!!!
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        //chrome.tabs.sendMessage(activeInfo.tabId, {action: "tabactive", consolelog: tab.url.substring(0, match.length)},function(response) {});
        if (tab.url.substring(0, match.length) === match) {
          chrome.tabs.sendMessage(activeInfo.tabId, {action: "start"}, function(response) {}); 
        }
    });
});


//http://stackoverflow.com/questions/33135273/how-to-set-chrome-alarms-getall-callback-to-a-variable
function alarmcount(callback) {
    var count; 
    chrome.alarms.getAll(function(alarms) { callback(alarms.length) }); 
}

function myDate() {
  var now = new Date();
  var now2 = now.getMonth()+1 + "/" + now.getDate() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  return now2;  
}

//Periodically check extension
chrome.alarms.onAlarm.addListener(function (){ AreYouAround();});
function AreYouAround() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "checking", now:myDate()}, function(response) {});
    //Alarm count
    //alarmcount(function(count) { 
      //var numAlarms = count;
      //var msg = "alarm count=" + numAlarms;
      //chrome.tabs.sendMessage(tabs[0].id, {action: "console",consolelog:msg}, function(response) {}); 
    //});
  });
};


//References
//1. https://developer.chrome.com/extensions/event_pages
//2. https://books.google.com/books?id=4SHbBQAAQBAJ&lpg=PA189&ots=UvMsQ9HEeK&dq=chrome.runtime.onInstalled.addListener%20chrome.alarms.create&pg=PA189#v=onepage&q=chrome.runtime.onInstalled.addListener%20chrome.alarms.create&f=false
//3. https://developer.chrome.com/webstore/branding
//4. https://developer.chrome.com/webstore/images
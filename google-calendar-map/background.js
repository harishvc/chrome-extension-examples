var match = 'https://calendar.google.com/calendar/render'

//var id = setInterval('AreYouAround();', 10000); //30 seconds
//chrome.alarms.create("My First Alarm",{delayInMinutes:0.25,periodInMinutes:0.125 });
//chrome.alarms.get("My First Alarm",function(AreYouAround){});


chrome.alarms.onAlarm.addListener(function (){ AreYouAround();});

chrome.runtime.onInstalled.addListener(
  function () {
    chrome.alarms.create("Test",{when: Date.now() + 10*1000,periodInMinutes: 20});
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

//http://stackoverflow.com/questions/18422987/detect-if-chrome-extension-content-script-has-been-injected-content-script-inc
function AreYouAround() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "checking"}, function(response) {
        if (response) {
            //chrome.tabs.sendMessage(tabs[0].id, {action: "console", consolelog: "Yah!"}, function(response){});
            chrome.tabs.sendMessage(tabs[0].id, {action: "start"}, function(response) {}); 
        }
        //does not get invoked!!!
        else {
             //chrome.tabs.sendMessage(tabs[0].id, {action: "console", consolelog: "starting ..."}, function(response){});
             chrome.tabs.sendMessage(tabs[0].id, {action: "start"}, function(response) {}); 
        }
    });
 });
}


//References
//1. https://developer.chrome.com/extensions/event_pages
//2. https://books.google.com/books?id=4SHbBQAAQBAJ&lpg=PA189&ots=UvMsQ9HEeK&dq=chrome.runtime.onInstalled.addListener%20chrome.alarms.create&pg=PA189#v=onepage&q=chrome.runtime.onInstalled.addListener%20chrome.alarms.create&f=false

var match = 'https://calendar.google.com/calendar/render'

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //All content loaded in the Google Calendar browser tab!
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


//References
//https://developer.chrome.com/extensions/event_pages
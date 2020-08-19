const DETECTION_INTERVAL = 15;
const TAKE_BREAK_INTERVAL_MINUTES = 1;
chrome.idle.setDetectionInterval(DETECTION_INTERVAL);


let data = {
  time: 0,
  activeSince: new Date()
};

chrome.alarms.create("notify", {delayInMinutes: TAKE_BREAK_INTERVAL_MINUTES});

function UpdateTimeActive() {
  let newActiveSince = new Date();
  data.time += newActiveSince - data.activeSince;
  data.activeSince = newActiveSince;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  console.log("Got message");
  UpdateTimeActive();
  sendResponse(data.time);
});

chrome.idle.onStateChanged.addListener((newState) => {
  if(newState == "idle" || newState == "locked") {
    console.log("User became inactive");
    data.time = 0;
    chrome.alarms.clear("notify");
  }
  else {
    console.log("User became active");
    data.activeSince = new Date();
    chrome.alarms.create("notify", {delayInMinutes: TAKE_BREAK_INTERVAL_MINUTES});
  }
});

chrome.alarms.onAlarm.addListener(()=>{
  console.log("Alarm trigerred")
  UpdateTimeActive();
  let time = data.time;
  if(time < TAKE_BREAK_INTERVAL_MINUTES * 60 * 1000) return;

  let dateObj = new Date(time);
  let timeString = dateObj.getUTCHours().toString().padStart(2, '0') +
                    ":" + dateObj.getUTCMinutes().toString().padStart(2, '0') +
                    ":" + dateObj.getSeconds().toString().padStart(2, '0');
  chrome.notifications.create(null, {
    type: "basic",
    iconUrl: "images/Time.png",
    title: "Take a break!",
    message: "You've been active for " + timeString
  });
});

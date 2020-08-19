const DETECTION_INTERVAL = 15;
chrome.idle.setDetectionInterval(DETECTION_INTERVAL);


let data = {
  time: 0,
  activeSince: new Date()
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  console.log("Got message");
  let newActiveSince = new Date();
  data.time += newActiveSince - data.activeSince;
  data.activeSince = newActiveSince;
  sendResponse(data.time);
});

chrome.idle.onStateChanged.addListener((newState) => {
  if(newState == "idle" || newState == "locked") {
    console.log("User became active");
    data.activeSince = new Date();
  }
  else {
    console.log("User became inactive");
    data.time = 0;
  }
});

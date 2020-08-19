window.onload = function() {
  chrome.runtime.sendMessage({}, (time)=>{
    let div = document.createElement("div");
    let dateObj = new Date(time);
    let timeString = dateObj.getUTCHours().toString().padStart(2, '0') +
                      ":" + dateObj.getUTCMinutes().toString().padStart(2, '0') +
                      ":" + dateObj.getSeconds().toString().padStart(2, '0');
    let text = document.createTextNode("You have been active on the web for " + timeString);
    div.appendChild(text);
    document.body.appendChild(div);
  });
};

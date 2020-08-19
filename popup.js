window.onload = function() {
  chrome.runtime.sendMessage({}, (time)=>{
    let div = document.createElement("div");
    let text = document.createTextNode("You have been active on the web for " + Math.round(time/1000) + "s");
    div.appendChild(text);
    document.body.appendChild(div);
  });
};

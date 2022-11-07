checkInSource = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "http://127.0.0.1:5000/?name=" + query});
};

check_InSource = function(link){
  var query = link.query;
  chrome.tabs.create({url: "http://127.0.0.1:5000/?name=" + query});
};

chrome.contextMenus.create({
  title: "Check url in InSource Spam Detector",
  contexts:["selection"],
  onclick: checkInSource
});


chrome.contextMenus.create({
  title: "Check in InSource Spam Detector",
  contexts:["link"],
  onclick: check_InSource
});

check_btn_click = function(){
  var tab_url = document.getElementById("las").innerHTML;
  chrome.tabs.create({url: "http://127.0.0.1:5000/?name=" + tab_url});
}
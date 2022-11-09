checkInSource = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "http://127.0.0.1:8800/search/?name=" + query});
};

chrome.contextMenus.create({
  title: "Check url in InSource Spam Detector",
  contexts:["selection"],
  onclick: checkInSource
});

check_btn_click = function(){
  var tab_url = document.getElementById("las").innerHTML;
  chrome.tabs.create({url: "http://127.0.0.1:8800/search/?name=" + tab_url});
}
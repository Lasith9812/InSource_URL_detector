checkInSource = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "http://34.124.227.193:8800/?name=" + query});
};

checkInSourceL = function(word){
  var query = word.linkUrl;
  chrome.tabs.create({url: "http://34.124.227.193:8800/?name=" + query});
};

chrome.contextMenus.create({
  title: "Check selected url in InSource Spam Detector",
  contexts:["selection"],
  onclick: checkInSource
});

chrome.contextMenus.create({
  title: "Check url in InSource Spam Detector",
  contexts:["link"],
  onclick: checkInSourceL
});
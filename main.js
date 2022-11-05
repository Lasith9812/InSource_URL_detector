checkInSource = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
};

chrome.contextMenus.create({
  title: "Check url in InSource Spam Detector",
  contexts:["selection"],
  onclick: checkInSource
});



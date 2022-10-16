chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    // Do something
    var tab = tabs[0];
    const sender = document.getElementsByClassName("go");
    document.getElementById("pl1").innerHTML = tab.url;
    document.getElementById("linkUrl").setAttribute("href",tab.url)
});

searchUrbanDict = function(word){
    var query = word.selectionText;
    chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
};
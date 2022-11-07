chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var tab = tabs[0];
    document.getElementById("las").innerHTML = tab.url;
});
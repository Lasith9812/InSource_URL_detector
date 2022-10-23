chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    // Do something
    var tab = tabs[0];
    const sender = document.getElementsByClassName("go");
    document.getElementById("las").value = tab.url;
});


var script = document.createElement('script');
script.src = "assets/jq.js";
document.getElementsByTagName('head')[0].appendChild(script);

var url = $.get("http")
document.getElementById("pl1").innerHTML = url;
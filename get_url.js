chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    tab = tabs[0];
    glo_var.ctab = tab.url 
    document.getElementById("las").innerHTML = tab.url;
});
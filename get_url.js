var tab = "hello"
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var tab = tabs[0];
    document.getElementById("las").innerHTML = tab.url;
});

var script = document.createElement('script');
script.src = "assets/jq.js";
document.getElementsByTagName('head')[0].appendChild(script);

document.getElementById("check_a").addEventListener("click", check_a());
function check_a(){
  console.log(tab);
}
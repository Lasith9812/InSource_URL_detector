from flask import Flask, request
from urllib.parse import urlparse
import requests
import base64


app = Flask(__name__)

@app.route('/')

def hello():
    nam = request.args
    print(nam)
    ouy = vir(nam)
    print(ouy)

    if str(ouy["status"]) == "safe":
        return "<h1>Site: "+ str(ouy["ip"]) + "<br>" + "Status: " + str(ouy["status"]) + "</h1>\n<h2>Safe detections: " + str(ouy["safe_detections"]) + " out of " + str(ouy["total_engines"]) + " engines</h2>\n"
    elif str(ouy["status"]) == "unsafe":
        return "<h1>Site: "+ str(ouy["ip"]) + "<br>" + "Status: " + str(ouy["status"]) + "</h1>\n<h2>Unsafe detections: " + str(ouy["unsafe_detections"]) + " out of " + str(ouy["total_engines"]) + " engines</h2>\n"
    elif str(ouy["status"]) == "unsafe-Suspicious":
        return "<h1>Site: "+ str(ouy["ip"]) + "<br>" + "Status: " + str(ouy["status"]) + "</h1>\n<h2>Suspicious detections: " + str(ouy["suspicious"]) + " out of " + str(ouy["total_engines"]) + " engines</h2>\n"
    elif str(ouy["status"]) == "nourl":
        return "<h1>The url you selected is not supporting</h1>"

def vir(host):
    ip_addr = str(host["name"])
    print(ip_addr)
    r_value = {}
    r_value["ip"] = str(host["name"])
    
    if ip_addr.startswith("http") or ip_addr.startswith("https"):
        ip_addr = ip_addr
    else:
        ip_addr = "http://" + str(ip_addr)    

    ip_addr = urlparse(ip_addr).hostname
    # Send URL to scan
    url = "https://www.virustotal.com/api/v3/urls"
    payload = "url=%s" % ip_addr
    headers = {
        "accept": "application/json",
        "x-apikey": "181c9d952550907cbc33fd764bc205e8ff8cabe8889d01f0c0809e8b6b2ce910",
        "content-type": "application/x-www-form-urlencoded"
    }
    print(requests.post(url, data=payload, headers=headers))
   

    #Get scan report
    url_id = base64.urlsafe_b64encode(ip_addr.encode()).decode().strip("=")
    print(url_id)
    req_url = "https://www.virustotal.com/api/v3/urls/%s" % url_id
    head = {
        "accept": "application/json",
        "x-apikey": "181c9d952550907cbc33fd764bc205e8ff8cabe8889d01f0c0809e8b6b2ce910"
    }
    r = requests.get(req_url, headers=head).json()

    r_value["suspicious"] = r["data"]["attributes"]["last_analysis_stats"]["suspicious"]

    count = r["data"]["attributes"]["last_analysis_stats"]

    r_value["total_engines"] = int(count["harmless"]) + int(count["malicious"]) + int(count["suspicious"]) + int(count["undetected"]) + int(count["timeout"])

    if int(r["data"]["attributes"]["last_analysis_stats"]["malicious"]) > 0:
        r_value["status"] = "unsafe"
        r_value["unsafe_detections"] = int(count["malicious"]) + int(count["suspicious"]) + int(count["undetected"])
        return r_value
    elif int(r["data"]["attributes"]["last_analysis_stats"]["malicious"]) >= 0 and int(r["data"]["attributes"]["last_analysis_stats"]["suspicious"]) > 0:
        r_value["status"] = "unsafe-Suspicious"
        r_value["unsafe_detections"] = int(count["malicious"]) + int(count["suspicious"])
        return r_value
    else:
        r_value["status"] = "safe"
        r_value["safe_detections"] = int(count["harmless"])
        return r_value
    

if __name__=="__main__":
    app.run(host='0.0.0.0',port=8800)
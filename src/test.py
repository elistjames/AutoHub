from urllib import response
import requests

BASE = "http://127.0.0.1:5000/"

##response = requests.put(BASE + "car/BD90177", {"topSpeed" : 100, "weight" : 4000})
response = requests.get(BASE + "car/BD 90177")
print(response.json())
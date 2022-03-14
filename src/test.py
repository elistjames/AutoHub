from urllib import response
import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "car/1", {"plateNum" : "BD 90177", "topSpeed" : 100, "weight" : 4000})
input()
response = requests.get(BASE + "car/1")
print(response.json())

from urllib import response
import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "car/BD90177", {"topSpeed" : 1000, "weight" : 3000})
input()
response = requests.get(BASE + "car/BD90177")
print(response.json())
input()
response = requests.get(BASE + "car/BD901111")
print(response.json())
input()
response = requests.patch(BASE + "car/BD 90177", {"topSpeed" : 10})
print(response.json())

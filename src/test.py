from urllib import response
import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "car/3", {"plateNum" : "BD 90177", "topSpeed" : 100, "weight" : 4000})
response = requests.put(BASE + "car/1", {"plateNum" : "BD Test", "topSpeed" : 100, "weight" : 400120})
response = requests.put(BASE + "car/2", {"plateNum" : "BD For I", "topSpeed" : 100, "weight" : 1221})
input()
response = requests.get(BASE + "car/1")
print(response.json())
input()
response = requests.get(BASE + "car/2")
print(response.json())
input()
response = requests.get(BASE + "car/3")
print(response.json())
input()
response = requests.get(BASE + "car/4")
print(response.json())
input()
response = requests.delete(BASE + "car/1")
print(response)
input()
response = requests.delete(BASE + "car/1")
print(response)


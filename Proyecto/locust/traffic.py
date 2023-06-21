import json
import random
from random import randrange
from locust import HttpUser, between, task

class readFile():
    def __init__(self):
        self.data = []

    def getData(self): 
        size = len(self.data) 
        if size > 0:
            index = randrange(0, size - 1) if size > 1 else 0
            return self.data.pop(index)
        else:
            print("size -> 0")
            return None
    
    def loadFile(self):
        print("===Leer JSON===")
        try:
            with open("MOCK_DATA.json", 'r') as file:
                self.data = json.loads(file.read())
        except Exception as error:
            print('Error init:',error)

class trafficData(HttpUser):
    wait_time = between(3.5, 4.0) #Tiempo de espera entre registros
    reader = readFile()
    reader.loadFile()
    endpoint1 = "/NewMessage"
    endpoint2 = "/NewMessages"
    #HOST: http://localhost:
    #HOST: http://35.225.22.102:
    def on_start(self):
        print("On Start")
    
    @task
    def sendMessage(self):
        data = self.reader.getData()
        if data is not None:
            endpoint = random.choice([self.endpoint1, self.endpoint2])
            res = self.client.post(endpoint, json=data)
            response = {"endpoint": endpoint, "response": res}
            print(response)
        else:
            print("Empty") 
            self.stop(True)

            #locust -f traffic.py
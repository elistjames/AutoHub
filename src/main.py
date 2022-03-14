from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort

app = Flask(__name__)
api = Api(app)

car_put_args = reqparse.RequestParser()
car_put_args.add_argument ("plateNum", type = str, help = "plateNum needs to be a string", required=True)
car_put_args.add_argument ("topSpeed", type = int, help = "topSpeed is an int", required=True)
car_put_args.add_argument ("weight", type = int, help = "weight is an int", required=True)

cars = {}

def abort_if_carID_invalid (plateNo):
        if plateNo not in cars:
                abort(404, message = "Car id not valid")

class CAR(Resource):
        def get(self, plateNo):
                abort_if_carID_invalid(plateNo)
                return cars[plateNo]
        def put(self, plateNo):
                args = car_put_args.parse_args()
                cars[plateNo] = args
                return cars[plateNo], 201

api.add_resource(CAR, "/car/<int:plateNo>")

if __name__ == "__main__":
        app.run(debug=True)
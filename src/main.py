from dataclasses import field
from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class CAR(db.Model):
        plateNum = db.Column(db.String,primary_key = True)
        topSpeed = db.Column(db.Integer, nullable = False)
        weight = db.Column(db.Integer, nullable = False)

        def __repr__(self):
                return f"Car(plateNum = {plateNum}, topSpeed = {topSpeed}, weight = {weight})"


car_put_args = reqparse.RequestParser()
car_put_args.add_argument ("plateNum", type = str, help = "plateNum needs to be a string", required=True)
car_put_args.add_argument ("topSpeed", type = int, help = "topSpeed is an int", required=True)
car_put_args.add_argument ("weight", type = int, help = "weight is an int", required=True)

resource_fields = {
        'plateNum' : fields.String,
        'topSpeed' : fields.Integer,
        'weight' : fields.Integer
}


class CARS(Resource):
        @marshal_with(resource_fields)
        def get(self, plateNo):
                result = CAR.query.filter_by(plateNum = plateNo).first()
                return result

        @marshal_with(resource_fields)
        def put(self, plateNo):
                args = car_put_args.parse_args()
                car = CAR(plateNum = plateNo, topSpeed = args['plateNum'] , weight = args['weight'])
                db.session.add(car)
                db.session.commit()
                return car, 201

        def delete(self, plateNo):
                del cars[plateNo]
                return '', 204

api.add_resource(CARS, "/car/<string:plateNo>")

if __name__ == "__main__":
        app.run(debug=True)
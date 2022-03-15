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
car_put_args.add_argument ("topSpeed", type = int, help = "topSpeed is an int", required=True)
car_put_args.add_argument ("weight", type = int, help = "weight is an int", required=True)

car_update_args = reqparse.RequestParser()
car_update_args.add_argument ("topSpeed", type = int, help = "topSpeed is an int", required=False)
car_update_args.add_argument ("weight", type = int, help = "weight is an int", required=False)

resource_fields = {
        'plateNum' : fields.String,
        'topSpeed' : fields.Integer,
        'weight' : fields.Integer
}


class CARS(Resource):
        @marshal_with(resource_fields)
        def get(self, plateNo):
                result = CAR.query.filter_by(plateNum = plateNo).first()
                if not result:
                        abort(404, message="Could not find plate number")
                return result

        @marshal_with(resource_fields)
        def put(self, plateNo):
                args = car_put_args.parse_args()
                result = CAR.query.filter_by(plateNum = plateNo)
                if result:
                        abort(409, message="Plate Number taken...")

                car = CAR(plateNum = plateNo, topSpeed = args['topSpeed'] , weight = args['weight'])
                db.session.add(car)
                db.session.commit()
                return car, 201

        @marshal_with(resource_fields)
        def patch(self, plateNo):
                args = car_update_args.parse_args()
                result = CAR.query.filter_by(plateNum = plateNo).first()
                if not result:
                        abort(404, message="Could not find plate number")
                if args["topSpeed"]:
                        result.topSpeed = args['topSpeed']
                if args["weight"]:
                        result.weight = args['weight']
                db.session.commit()
                return result

        def delete(self, plateNo):
                del cars[plateNo]
                return '', 204

api.add_resource(CARS, "/car/<string:plateNo>")

if __name__ == "__main__":
        app.run(debug=True)
from dataclasses import field
from unicodedata import category
from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

#api setup
app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

#setup vehicle model
class VEHICLE(db.Model):
        plateNum = db.Column(db.String,primary_key = True) 
        numSeats = db.Column(db.Integer, nullable = False)
        colour = db.Column(db.String, nullable = True)
        make = db.Column(db.String, nullable = False)
        price = db.Column(db.Float, nullable = False)
        year = db.Column(db.Integer, nullable = True)
        depNum = db.Column(db.Integer, nullable = False)
        weight = db.Column(db.Integer, nullable = True)
        topSpeed = db.Column(db.Integer, nullable = True)
        category = db.Column(db.String, nullable = False)

        #return format
        def __repr__(self):
                return f"Vehicle(plateNum = {self.plateNum}, numSeats = {self.numSeats}, colour = {self.colour}, make = {self.make}, price = {self.price}, year = {self.year}, weight = {self.weight}, topSpeed = {self.topSpeed} , category = {self.category})"


#setup post argument parser
vehicle_post_args = reqparse.RequestParser()
vehicle_post_args.add_argument ("plateNum", type = str, help = "plateNum is an string", required = True)
vehicle_post_args.add_argument ("numSeats", type = int, help = "numSeats is an int", required = True)
vehicle_post_args.add_argument ("colour", type = str, help = "colour is an string", required = False)
vehicle_post_args.add_argument ("make", type = str, help = "make is a string", required = True)
vehicle_post_args.add_argument ("price", type = float, help = "price is a float", required = True)
vehicle_post_args.add_argument ("year", type = int, help = "year is an int", required = False)
vehicle_post_args.add_argument ("depNum", type = int, help = "depNum is an int", required = True)
vehicle_post_args.add_argument ("weight", type = int, help = "weight is an int", required = False)
vehicle_post_args.add_argument ("topSpeed", type = int, help = "topSpeed is an int", required = False)
vehicle_post_args.add_argument ("category", type = str, help = "category is a string", required = True)

#setup put argument parser
vehicle_put_args = reqparse.RequestParser()
vehicle_put_args.add_argument ("numSeats", type = int, help = "numSeats is an int", required = False)
vehicle_put_args.add_argument ("colour", type = str, help = "colour is an string", required = False)
vehicle_put_args.add_argument ("make", type = str, help = "make is a stringt", required = False)
vehicle_put_args.add_argument ("price", type = float, help = "price is a float", required = False)
vehicle_put_args.add_argument ("year", type = int, help = "year is an int", required = False)
vehicle_put_args.add_argument ("depNum", type = int, help = "depNum is an int", required = False)
vehicle_put_args.add_argument ("weight", type = int, help = "weight is an int", required = False)
vehicle_put_args.add_argument ("topSpeed", type = int, help = "topSpeed is an int", required = False)
vehicle_put_args.add_argument ("category", type = str, help = "category is a string", required = False)

#set path resource fields
resource_fields = {
        'plateNum' : fields.String,
        'numSeats' : fields.Integer,
        'colour' : fields.String,
        'make' : fields.String,
        'price' : fields.Float,
        'year' : fields.Integer,
        'depNum' : fields.Integer,
        'weight' : fields.Integer,
        'topSpeed' : fields.Integer,
        'category' : fields.String
}

#create vehicle resource
class VEHICLES(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self):
                result = VEHICLE.query.all()
                return result
                #filter_by(plateNum = plateNo).first() #find vehicle
                #if not result:
                #        abort(404, message = "Could not find plate number") #give error
                #return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self):
                args = vehicle_post_args.parse_args() #parse arguemnts
                result = VEHICLE.query.filter_by(plateNum = args['plateNum']).first() ##check to see if plateNum exists already
                if result != None: #if result is not there
                        abort(409, message = "Plate Number taken...")

                vehicle = VEHICLE(plateNum = args['plateNum'], numSeats = args['numSeats'], colour = args['colour'], make = args['make'], price = args['price'], year = args['year'], depNum = args['depNum'], weight = args['weight'], topSpeed = args['topSpeed'],  category = args['category']) #create vehicle object
                db.session.add(vehicle) #add vehicle
                db.session.commit() #commit changes
                return vehicle, 201

        @marshal_with(resource_fields) #marshal with resource fields
        def put(self, plateNo):
                args = vehicle_put_args.parse_args() #parse arguments 
                result = VEHICLE.query.filter_by(plateNum = plateNo).first() #find the vehicle
                if not result:
                        abort(404, message = "Could not find plate number") #display error message
                #arguments are passed in, update them
                if args["numSeats"]:
                        result.numSeats = args['numSeats']
                if args["colour"]:
                        result.colour = args['colour']        
                if args["make"]:
                        result.make = args['make']        
                if args["price"]:
                        result.price = args['price']        
                if args["year"]:
                        result.year = args['year']      
                if args["weight"]:
                        result.weight = args['weight']       
                if args["topSpeed"]:
                        result.topSpeed = args['topSpeed']                                                                   
                if args["category"]:
                        result.category = args['category']
                db.session.commit() #commit session
                return result

        @marshal_with(resource_fields)
        def delete(self, plateNo):
                VEHICLE.query.filter_by(plateNum = plateNo).delete() #find plate number
                db.session.commit() #commit changes
                return '', 204
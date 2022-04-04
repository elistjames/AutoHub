from dataclasses import field
from unicodedata import category
from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#api setup
app = Flask(__name__)
app.config['CORS_HEADERS'] = '*'
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
cors = CORS(app)

#setup APPOINTMENT model
class APPOINTMENT(db.Model):
        cust_email = db.Column(db.String,primary_key = True) 
        date = db.Column(db.String, nullable = False)
        time = db.Column(db.Integer, nullable = False)
        depNum = db.Column(db.Integer, nullable = False)
        description = db.Column(db.String, nullable = False)

        #return format
        def __repr__(self):           
                return f"Appointment(cust_email = {self.cust_email}, date = {self.date}, time = {self.time}, depNum = {self.depNum}, description = {self.description})"

#setup post argument parser
appointment_post_args = reqparse.RequestParser()
appointment_post_args.add_argument ("cust_email", type = str, help = "cust_email is an string", required = True)
appointment_post_args.add_argument ("date", type = str, help = "date is an string", required = True)
appointment_post_args.add_argument ("time", type = int, help = "time is an int", required = True)
appointment_post_args.add_argument ("depNum", type = int, help = "depNum is an int", required = True)
appointment_post_args.add_argument ("description", type = str, help = "description is a string", required = True)

#setup put argument parser
appointment_put_args = reqparse.RequestParser()
appointment_put_args.add_argument ("cust_email", type = str, help = "cust_email is an string", required = True)
appointment_put_args.add_argument ("date", type = str, help = "date is an string", required = False)
appointment_put_args.add_argument ("time", type = int, help = "time is an int", required = False)
appointment_put_args.add_argument ("depNum", type = int, help = "depNum is an int", required = False)
appointment_put_args.add_argument ("description", type = str, help = "description is a string", required = False)

#set path resource fields
resource_fields = {
        'cust_email' : fields.String,
        'date' : fields.String,
        'time' : fields.Integer,
        'depNum' : fields.Integer,
        'description' : fields.String
}

#create APPOINTMENT resource
class APPOINTMENTS(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self, cust_email):
                result = APPOINTMENT.query.all() #return all vehicles to front end for querying
                return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self, cust_email):
                args = appointment_post_args.parse_args() #parse arguemnts
                result = APPOINTMENT.query.filter_by(cust_email = args['cust_email']).first() ##check to see if cust_email exists already
                if result != None: #if result is not there
                        abort(409, message = "Customer Already has appointment...")

                appointment = APPOINTMENT(cust_email = args['cust_email'], date = args['date'], time = args['time'], depNum = args['depNum'], description = args['description']) #create APPOINTMENT object
    
                db.session.add(appointment) #add APPOINTMENT
                db.session.commit() #commit changes
                return appointment, 201

        @marshal_with(resource_fields) #marshal with resource fields
        def put(self, cust_email):
                args = appointment_put_args.parse_args() #parse arguments 
                result = APPOINTMENT.query.filter_by(cust_email = args['cust_email']).first() #find the APPOINTMENT
                if not result:
                        abort(404, message = "Could not find part number") #display error message

                #arguments are passed in, update them
                if args["date"]:
                        result.date = args['date']
                if args["time"]:
                        result.time = args['time']               
                if args["depNum"]:
                        result.depNum = args['depNum']
                if args["description"]:
                        result.description = args['description']          
                db.session.commit() #commit session
                return result

        @marshal_with(resource_fields)
        def delete(self, cust_email):
                APPOINTMENT.query.filter_by(cust_email = cust_email).delete() #find appointment
                db.session.commit() #commit changes
                return APPOINTMENT.query.all()
        
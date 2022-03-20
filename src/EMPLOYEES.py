from dataclasses import field
from unicodedata import category
from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import base64
import uuid
import hashlib

#api setup
app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

#setup employee model
class EMPLOYEE(db.Model):
        ssn = db.Column(db.String,primary_key = True) 
        l_name = db.Column(db.String, nullable = False)
        f_name = db.Column(db.String, nullable = False)
        email = db.Column(db.String, nullable = False)
        password = db.Column(db.String, nullable = False)
        depNum = db.Column(db.Integer, nullable = False)
        isManager = db.Column(db.Boolean, nullable = False)

        #return format
        def __repr__(self):           
                return f"Employee(ssn = {self.ssn}, l_name = {self.l_name}, f_name = {self.f_name}, email = {self.email}, password = {self.password}, depNum = {self.depNum}, isManager = {self.isManager})"


#setup post argument parser
employee_post_args = reqparse.RequestParser()
employee_post_args.add_argument ("l_name", type = str, help = "l_name is an string", required = True)
employee_post_args.add_argument ("f_name", type = str, help = "f_name is an string", required = True)
employee_post_args.add_argument ("email", type = str, help = "email is a string", required = True)
employee_post_args.add_argument ("password", type = str, help = "password is a string", required = True)
employee_post_args.add_argument ("depNum", type = int, help = "depNum is an int", required = True)
employee_post_args.add_argument ("isManager", type = bool, help = "isManager is a bool", required = True)


#setup put argument parser
employee_put_args = reqparse.RequestParser()
employee_put_args.add_argument ("l_name", type = str, help = "l_name is an string", required = False)
employee_put_args.add_argument ("f_name", type = str, help = "f_name is an string", required = False)
employee_put_args.add_argument ("email", type = str, help = "email is a string", required = False)
employee_put_args.add_argument ("password", type = str, help = "password is a string", required = False)
employee_put_args.add_argument ("depNum", type = int, help = "depNum is an int", required = False)
employee_put_args.add_argument ("isManager", type = bool, help = "isManager is a bool", required = False)

#set path resource fields
resource_fields = {
        'ssn' : fields.String,
        'l_name' : fields.String,
        'f_name' : fields.String,
        'email' : fields.String,
        'password' : fields.String,
        'depNum' : fields.Integer,
        'isManager' : fields.Boolean,
}

def unEncode(stringPass):

        #decode password
        base64_message = stringPass
        base64_bytes = base64_message.encode('ascii')
        message_bytes = base64.b64decode(base64_bytes)
        message = message_bytes.decode('ascii')
        return  message

#create employee resource
class EMPLOYEES(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self, ssn):
                result = EMPLOYEE.query.filter_by(ssn = ssn).first() #find employee
                print(unEncode(result.password))
                if not result:
                        abort(404, message = "Could not find employee ssn") #give error
                return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self, ssn):
                args = employee_post_args.parse_args() #parse arguemnts
                result = EMPLOYEE.query.filter_by(ssn = ssn).first() ##check to see if ssn exists already
                if result != None: #if result is not there
                        abort(409, message = "Ssn number taken...")

                #encode password
                message_bytes = args['password'].encode('ascii')
                base64_bytes = base64.b64encode(message_bytes)
                base64_message = base64_bytes.decode('ascii')

                employee = EMPLOYEE(ssn = ssn, l_name = args['l_name'], f_name = args['f_name'], email = args['email'], password = base64_message, depNum = args['depNum'], isManager = args['isManager']) #create employee object
                
                #reset variables
                base64_message = None
                base64_bytes = None
                message_bytes = None
                message = None

                db.session.add(employee) #add employee
                db.session.commit() #commit changes
                return employee, 201

        @marshal_with(resource_fields) #marshal with resource fields
        def put(self, ssn):
                args = employee_put_args.parse_args() #parse arguments 
                result = EMPLOYEE.query.filter_by(ssn = ssn).first() #find the employee
                if not result:
                        abort(404, message = "Could not find ssn number") #display error message

                #arguments are passed in, update them
                if args["l_name"]:
                        result.l_name = args['l_name']
                if args["f_name"]:
                        result.f_name = args['f_name']        
                if args["email"]:
                        result.email = args['email']        
                if args["password"]:
                        result.password = args['password']        
                if args["depNum"]:
                        result.depNum = args['depNum']      
                if args["isManager"]:
                        result.isManager = args['isManager']       
                db.session.commit() #commit session
                return result

        @marshal_with(resource_fields)
        def delete(self, ssn):
                EMPLOYEE.query.filter_by(ssn = ssn).delete() #find ssn number
                db.session.commit() #commit changes
                return '', 204
        
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

#setup customer model
class CUSTOMER(db.Model):
        email = db.Column(db.String, nullable = False)
        password = db.Column(db.String, primary_key = True)
        f_name = db.Column(db.String, nullable = False)
        l_name = db.Column(db.String, nullable = False)

        #return format
        def __repr__(self):           
                return f"Customer(email = {self.email}, password = {self.password}, f_name = {self.f_name}, l_name = {self.l_name})"

#setup post argument parser
customer_post_args = reqparse.RequestParser()
customer_post_args.add_argument ("f_name", type = str, help = "f_name is an string", required = True)
customer_post_args.add_argument ("l_name", type = str, help = "l_name is an string", required = True)

#setup put argument parser
customer_put_args = reqparse.RequestParser()
customer_put_args.add_argument ("email", type = str, help = "email is a string", required = False)
customer_put_args.add_argument ("f_name", type = str, help = "f_name is an string", required = False)
customer_put_args.add_argument ("l_name", type = str, help = "l_name is an string", required = False)

#set path resource fields
resource_fields = {
        'email' : fields.String,
        'password' : fields.String,
        'f_name' : fields.String,
        'l_name' : fields.String
}

def unEncode(stringPass):

        #decode password
        base64_message = stringPass
        base64_bytes = base64_message.encode('ascii')
        message_bytes = base64.b64decode(base64_bytes)
        message = message_bytes.decode('ascii')
        return  message

#create customer resource
class CUSTOMERS(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self, password, email):
                print(unEncode("SEBja2V5MDA="))
                #decode password
                message_bytes = password.encode('ascii')
                base64_bytes = base64.b64encode(message_bytes)
                base64_message = base64_bytes.decode('ascii')

                result = CUSTOMER.query.filter_by(password = base64_message, email = email).first() #find customer
                
                #reset variables
                base64_message = None
                base64_bytes = None
                message_bytes = None
                message = None

                if not result:
                        abort(404, message = "Invalid password") #give error
                print(unEncode(result.password))
                return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self, password, email):

                #encode password
                message_bytes = password.encode('ascii')
                base64_bytes = base64.b64encode(message_bytes)
                base64_message = base64_bytes.decode('ascii')

                args = customer_post_args.parse_args() #parse arguemnts
                result = CUSTOMER.query.filter_by(password = base64_message, email = email).first() ##check to see if account exists already
                if result != None: #if result is not there
                        abort(409, message = "Email taken...")

                customer = CUSTOMER(email = email, password = base64_message, f_name = args['f_name'], l_name = args['l_name']) #create customer object
                
                #reset variables
                base64_message = None
                base64_bytes = None
                message_bytes = None
                message = None

                db.session.add(customer) #add customer
                db.session.commit() #commit changes
                return customer, 201

        @marshal_with(resource_fields) #marshal with resource fields
        def put(self, password, email):

                #encode password
                message_bytes = password.encode('ascii')
                base64_bytes = base64.b64encode(message_bytes)
                base64_message = base64_bytes.decode('ascii')

                args = customer_put_args.parse_args() #parse arguments 
                result = CUSTOMER.query.filter_by(password = base64_message).first() #check to see if account exists already
                if not result:
                        abort(404, message = "Could not find account") #display error message

                #arguments are passed in, update them
                if args["email"]:
                        result.email = args['email']    
                if args["f_name"]:
                        result.f_name = args['f_name']  
                if args["l_name"]:
                        result.l_name = args['l_name']                  

                db.session.commit() #commit session
                return result

        @marshal_with(resource_fields)
        def delete(self, password, email):

                #encode password
                message_bytes = password.encode('ascii')
                base64_bytes = base64.b64encode(message_bytes)
                base64_message = base64_bytes.decode('ascii')

                CUSTOMER.query.filter_by(password = base64_message).delete() ##delete this tuple
                db.session.commit() #commit changes
                return '', 204
        
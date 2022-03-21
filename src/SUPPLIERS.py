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

#if __name__ == "__main__":
#    app.run(debug=True)

#setup SUPPLIER model
class SUPPLIER(db.Model):
        id = db.Column(db.Integer,primary_key = True) 
        name = db.Column(db.String, nullable = False)

        #return format
        def __repr__(self):           
                return f"Supplier(id = {self.id}, name = {self.name})"

#setup post argument parser
supplier_post_args = reqparse.RequestParser()
supplier_post_args.add_argument ("name", type = str, help = "name is a string", required = True)

#setup put argument parser
supplier_put_args = reqparse.RequestParser()
supplier_put_args.add_argument ("name", type = str, help = "name is a string", required = False)

#set path resource fields
resource_fields = {
        'id' : fields.Integer,
        'name' : fields.String
}

#create SUPPLIER resource
class SUPPLIERS(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self, id):
                result = SUPPLIER.query.filter_by(id = id).first() #find SUPPLIER
                if not result:
                        abort(404, message = "Could not find supplier id") #give error
                return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self, id):
                args = supplier_post_args.parse_args() #parse arguemnts
                result = SUPPLIER.query.filter_by(id = id).first() ##check to see if id exists already
                if result != None: #if result is not there
                        abort(409, message = "Supplier id taken...")

                supplier = SUPPLIER(id = id, name = args['name']) #create SUPPLIER object
    
                db.session.add(supplier) #add SUPPLIER
                db.session.commit() #commit changes
                return supplier, 201

        @marshal_with(resource_fields) #marshal with resource fields
        def put(self, id):
                args = supplier_put_args.parse_args() #parse arguments 
                result = SUPPLIER.query.filter_by(id = id).first() #find the SUPPLIER
                if not result:
                        abort(404, message = "Could not find supplier id") #display error message

                #arguments are passed in, update them
                if args["name"]:
                        result.name = args['name']         
                db.session.commit() #commit session
                return result

        @marshal_with(resource_fields)
        def delete(self, id):
                SUPPLIER.query.filter_by(id = id).delete() #find supplier id
                db.session.commit() #commit changes
                return '', 204
        
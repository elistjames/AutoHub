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

#setup PART model
class PART(db.Model):
        partNo = db.Column(db.Integer,primary_key = True) 
        price = db.Column(db.Float, nullable = False)
        make = db.Column(db.String, nullable = False)
        plateNum = db.Column(db.String, nullable = False)
        depNum = db.Column(db.Integer, nullable = False)

        #return format
        def __repr__(self):           
                return f"Part(partNo = {self.partNo}, price = {self.price}, make = {self.make}, plateNum = {self.plateNum}, depNum = {self.depNum})"

#setup post argument parser
part_post_args = reqparse.RequestParser()
part_post_args.add_argument ("price", type = float, help = "l_name is an string", required = True)
part_post_args.add_argument ("make", type = str, help = "make is a string", required = True)
part_post_args.add_argument ("plateNum", type = str, help = "plateNum is a string", required = True)
part_post_args.add_argument ("depNum", type = int, help = "depNum is an int", required = True)

#setup put argument parser
part_put_args = reqparse.RequestParser()
part_put_args.add_argument ("price", type = float, help = "l_name is an string", required = False)
part_put_args.add_argument ("make", type = str, help = "make is a string", required = False)
part_put_args.add_argument ("plateNum", type = str, help = "plateNum is a string", required = False)
part_put_args.add_argument ("depNum", type = int, help = "depNum is an int", required = False)

#set path resource fields
resource_fields = {
        'partNo' : fields.Integer,
        'price' : fields.Float,
        'make' : fields.String,
        'plateNum' : fields.String,
        'depNum' : fields.Integer
}

#create PART resource
class PARTS(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self, partNo):
                result = PART.query.filter_by(partNo = partNo).first() #find PART
                if not result:
                        abort(404, message = "Could not find partNo") #give error
                return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self, partNo):
                args = part_post_args.parse_args() #parse arguemnts
                result = PART.query.filter_by(partNo = partNo).first() ##check to see if partNo exists already
                if result != None: #if result is not there
                        abort(409, message = "Part number taken...")

                part = PART(partNo = partNo, price = args['price'], make = args['make'], plateNum = args['plateNum'], depNum = args['depNum']) #create PART object
    
                db.session.add(part) #add PART
                db.session.commit() #commit changes
                return part, 201

        @marshal_with(resource_fields) #marshal with resource fields
        def put(self, partNo):
                args = part_put_args.parse_args() #parse arguments 
                result = PART.query.filter_by(partNo = partNo).first() #find the PART
                if not result:
                        abort(404, message = "Could not find part number") #display error message

                #arguments are passed in, update them
                if args["price"]:
                        result.price = args['price']
                if args["make"]:
                        result.make = args['make']        
                if args["plateNum"]:
                        result.plateNum = args['plateNum']        
                if args["depNum"]:
                        result.depNum = args['depNum']           
                db.session.commit() #commit session
                return result

        @marshal_with(resource_fields)
        def delete(self, partNo):
                PART.query.filter_by(partNo = partNo).delete() #find part number
                db.session.commit() #commit changes
                return '', 204
        
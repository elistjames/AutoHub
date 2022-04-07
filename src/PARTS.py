from dataclasses import field
from unicodedata import category
from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#api setup
app = Flask(__name__)
api = Api(app)
app.config['CORS_HEADERS'] = '*'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
cors = CORS(app)

#setup PART model
class PART(db.Model):
        partNo = db.Column(db.String,primary_key = True) 
        price = db.Column(db.Float, nullable = False)
        make = db.Column(db.String, nullable = False)
        plateNum = db.Column(db.String, nullable = False)
        depNum = db.Column(db.Integer, nullable = False)
        image = db.Column(db.String, nullable = True)
        supplierID = db.Column(db.Integer, nullable = False)
        qty = db.Column(db.Integer, nullable = False)

        #return format
        def __repr__(self):           
                return f"Part(partNo = {self.partNo}, price = {self.price}, make = {self.make}, plateNum = {self.plateNum}, depNum = {self.depNum}, image = {self.image}, supplierID = {self.supplierID}, qty = {self.qty})"

#setup post argument parser
part_post_args = reqparse.RequestParser()
part_post_args.add_argument ("partNo", type = str, help = "part is a string", required = True)
part_post_args.add_argument ("price", type = float, help = "price is a float", required = True)
part_post_args.add_argument ("make", type = str, help = "make is a string", required = True)
part_post_args.add_argument ("plateNum", type = str, help = "plateNum is a string", required = True)
part_post_args.add_argument ("depNum", type = int, help = "depNum is an int", required = True)
part_post_args.add_argument ("image", type = str, help = "image is a string", required = False)
part_post_args.add_argument ("supplierID", type = int, help = "image is a int", required = True)
part_post_args.add_argument ("qty", type = int, help = "qty is an int", required = True)

#setup put argument parser
part_put_args = reqparse.RequestParser()
part_put_args.add_argument ("price", type = float, help = "price is a float", required = False)
part_put_args.add_argument ("make", type = str, help = "make is a string", required = False)
part_put_args.add_argument ("plateNum", type = str, help = "plateNum is a string", required = False)
part_put_args.add_argument ("depNum", type = int, help = "depNum is an int", required = False)
part_put_args.add_argument ("qty", type = int, help = "qty is an int", required = False)

#set path resource fields
resource_fields = {
        'partNo' : fields.String,
        'price' : fields.Float,
        'make' : fields.String,
        'plateNum' : fields.String,
        'depNum' : fields.Integer,
        'image' : fields.String,
        'supplierID' : fields.Integer,
        'qty' : fields.Integer
}

#create PART resource
class PARTS(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self, partNo):
                result = PART.query.all() #return all parts to front end for querying
                return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self, partNo):
                args = part_post_args.parse_args() #parse arguemnts
                result = PART.query.filter_by(partNo = args['partNo']).first() ##check to see if partNo exists already
                if result != None: #if result is not there
                        abort(409, message = "Part number taken...")

                part = PART(partNo = args['partNo'], price = args['price'], make = args['make'], plateNum = args['plateNum'], depNum = args['depNum'], image = args['image'], supplierID = args['supplierID'], qty = args['qty']) #create PART object
    
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
        
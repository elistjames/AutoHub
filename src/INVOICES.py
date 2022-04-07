from dataclasses import field
from datetime import datetime
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

#setup INVOICE model
class INVOICE(db.Model):
        Invoice_num = db.Column(db.Integer,primary_key = True) 
        Amount = db.Column(db.Float, nullable = False)
        custEmail = db.Column(db.String, nullable = False)
        depNum = db.Column(db.Integer, nullable = False)
        notes = db.Column(db.String, nullable = False)
        date = db.Column(db.String, nullable = False)

        #return format
        def __repr__(self):           
                return f"Invoice(Invoice_num = {self.Invoice_num}, Amount = {self.Amount}, custEmail = {self.custEmail}, depNum = {self.depNum}, notes = {self.notes})"

#setup post argument parser
invoice_post_args = reqparse.RequestParser()
invoice_post_args.add_argument ("Amount", type = float, help = "Amount is a float", required = True)
invoice_post_args.add_argument ("custEmail", type = str, help = "custEmail is a string", required = True)
invoice_post_args.add_argument ("depNum", type = int, help = "depNum is an int", required = True)
invoice_post_args.add_argument ("notes", type = str, help = "notes is an string", required = True)
invoice_post_args.add_argument ("date", type = str, help = "date is an date", required = True)

#setup put argument parser
invoice_put_args = reqparse.RequestParser()
invoice_put_args.add_argument ("Amount", type = float, help = "Amount is a float", required = False)
invoice_put_args.add_argument ("custEmail", type = str, help = "custEmail is a string", required = False)
invoice_put_args.add_argument ("depNum", type = int, help = "depNum is an int", required = False)
invoice_put_args.add_argument ("notes", type = str, help = "notes is an string", required = False)
invoice_put_args.add_argument ("date", type = str, help = "date is an date", required = False)

#set path resource fields
resource_fields = {
        'Invoice_num' : fields.Integer,
        'Amount' : fields.Float,
        'custEmail' : fields.String,
        'depNum' : fields.Integer,
        'notes' : fields.String,
        'date' : fields.String
}

#create INVOICE resource
class INVOICES(Resource):
        @marshal_with(resource_fields) #marshal with resource fields
        def get(self, Invoice_num):
                result = INVOICE.query.all() #find all from INVOICE
                return result

        @marshal_with(resource_fields) #marshal with resource fields
        def post(self, Invoice_num):
                args = invoice_post_args.parse_args() #parse arguemnts
                result = INVOICE.query.filter_by(Invoice_num = Invoice_num).first() #check to see if Invoice_num exists already
                if result != None: #if result is not there
                        abort(409, message = "Invoice number taken...")

                invoice = INVOICE(Invoice_num = Invoice_num, Amount = args['Amount'], custEmail = args['custEmail'], depNum = args['depNum'], notes = args['notes'], date = args['date']) #create INVOICE object
    
                db.session.add(invoice) #add INVOICE
                db.session.commit() #commit changes
                return invoice, 201

        @marshal_with(resource_fields) #marshal with resource fields
        def put(self, Invoice_num):
                args = invoice_put_args.parse_args() #parse arguments 
                result = INVOICE.query.filter_by(Invoice_num = Invoice_num).first() #find the INVOICE
                if not result:
                        abort(404, message = "Could not find invoice number") #display error message

                #arguments are passed in, update them
                if args["Amount"]:
                        result.Amount = args['Amount']      
                if args["custEmail"]:
                        result.custEmail = args['custEmail']        
                if args["depNum"]:
                        result.depNum = args['depNum']
                if args["notes"]:
                        result.notes = args['notes']  
                if args["date"]:
                        result.date = args['date']             
                db.session.commit() #commit session
                return result

        @marshal_with(resource_fields)
        def delete(self, Invoice_num):
                INVOICE.query.filter_by(Invoice_num = Invoice_num).delete() #find invoice number
                db.session.commit() #commit changes
                return '', 204
        
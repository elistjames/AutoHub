from dataclasses import field
from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from VEHICLES import VEHICLES
from EMPLOYEES import EMPLOYEES
from PARTS import PARTS
from SUPPLIERS import SUPPLIERS
from INVOICES import INVOICES
from APPOINTMENTS import APPOINTMENTS
from CUSTOMERS import CUSTOMERS
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = '*'
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
cors = CORS(app)

api.add_resource(VEHICLES, "/vehicle/<string:plateNum>")
api.add_resource(EMPLOYEES, "/employee/<string:password>/<string:email>")
api.add_resource(PARTS, "/part/")
api.add_resource(CUSTOMERS, "/customer/<string:password>/<string:email>")
api.add_resource(APPOINTMENTS, "/appointment/<string:cust_email>")
api.add_resource(SUPPLIERS, "/supplier/<int:id>")
api.add_resource(INVOICES, "/invoice/<int:Invoice_num>")

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
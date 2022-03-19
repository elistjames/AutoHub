from dataclasses import field
from flask import Flask, request;
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from VEHICLES import VEHICLES

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

api.add_resource(VEHICLES, "/vehicle/<string:plateNo>")

if __name__ == "__main__":
        app.run(debug = True)
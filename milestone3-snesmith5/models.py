# from app import db
from flask import Flask
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db = SQLAlchemy(app)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)


class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String(200))
    username = db.Column(db.String(80))
    movie_id = db.Column(db.Integer)


# class storing user id, name, and comments
class user_input(db.Model):
    __tablename__ = "comments"
    # database tables to store values of userinput
    user_id = db.Column(db.Integer, nullable=False)

    user_comment = db.Column(db.String(120), nullable=False)

    comment_id = db.Column(db.Integer, primary_key=True)

    movie_id = db.Column(db.Integer, nullable=False)


db.create_all()

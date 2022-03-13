from xml.etree.ElementTree import Comment
import flask
import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import find_dotenv, load_dotenv
from models import Rating, User, user_input
from flask import request, render_template
from tmdb import get_movie_data

load_dotenv(find_dotenv())

app = flask.Flask(__name__)
# Point SQLAlchemy to your Heroku database
db_url = os.getenv("DATABASE_URL")

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://exozioajliuutv:f28ee490e6bc8fc6aa9863a7d50982da1f028f08d946269ed23c291f23cce94c@ec2-52-45-83-163.compute-1.amazonaws.com:5432/d3jc7pfdmt1gt0"

# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = b"I am a secret key!"  # don't defraud my app ok?

db = SQLAlchemy(app)


@app.route("/rate", methods=["POST"])
# by create-react-app/npm run build.
def setData():
    rates = Rating.query.filter_by(username=user_input.username).all()
    rate_data = []
    for rate in rates:
        rate_data.append(
            {
                "id": rate.id,
                "rating": rate.rating,
                "comment": rate.comment,
                "username": rate.username,
                "movie_id": rate.movie_id,
            }
        )
        return flask.jsonify(rate_data)
    # movie_id = []
    # comment = []
    # rating = []
    # title = []
    # for i in rate:
    #     movie_id.append(i.movie_id)
    #     title.append(i.title)
    #     comment.append(i.comment)
    #     rating.append(i.rating)

    #     db.session.begin()
    #     db.session.add(comment)
    #     db.session.commit()
    #     db.session.begin()
    #     db.session.add(rate)
    #     db.session.commit()

    # # print(comments/ratings)
    # return flask.jsonify(
    #     {"movie_id": movie_id},
    #     {"comment": comment},
    #     {"rating": rating},
    #     {"title": title},
    # )


def main():
    # if we give server info it will store the info in variable 'data'
    if request.method == "POST":
        # catching what user is throwing for the form function with "/" route
        data = request.form

        rate = Rating(rating=data["rating"])
        data2 = request.form
        comment = user_input(comment=data2["comment"])
        db.session.begin()
        db.session.add(comment)
        db.session.commit()
        db.session.begin()
        db.session.add(rate)
        db.session.commit()

        rates = Rating.query.all()

        comments = User.query.all()

    return render_template(
        "index.html",
        moviename=get_movie_data["name"],
        movietag=get_movie_data["tagline"],
        moviepicture=get_movie_data["poster_image"],
        moviegenre=get_movie_data["genre"],
        # piclink=get_movie_data["piclink"],
        wiki=get_movie_data["wiki"],
        movie_id=get_movie_data["movie_id"],
        rates=rates,
        # rates_num=rates_num,
        comments=comments,
    )

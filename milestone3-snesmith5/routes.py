from app import app, db
import random
import os

import flask
from flask_login import login_user, current_user, LoginManager, logout_user
from flask_login.utils import login_required
from models import User, Rating, user_input

from wikipedia import get_wiki_link
from tmdb import get_movie_data

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_name):
    return User.query.get(user_name)


@app.route("/signup")
def signup():
    return flask.render_template("../templates/signup.html")


@app.route("/signup", methods=["POST"])
def signup_post():
    username = flask.request.form.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        pass
    else:
        user = User(username=username)
        db.session.add(user)
        db.session.commit()

    return flask.redirect(flask.url_for("login"))


@app.route("/login")
def login():
    return flask.render_template("../templates/login.html")


@app.route("/login", methods=["POST"])
def login_post():
    username = flask.request.form.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        login_user(user)
        return flask.redirect(flask.url_for("index"))

    else:
        return flask.jsonify({"status": 401, "reason": "Username or Password Error"})


MOVIE_IDS = [
    157336,  # actually IDK what this is
]


@app.route("/rate")
# @app.add_url_rule("/rate", methods=["GET", "POST"])
# by create-react-app/npm run build.
def setData():
    rates = Rating.query.filter_by(username=current_user.username).all()
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


@app.route("/rate", methods=["POST"])
def rate():
    data = flask.request.form
    rating = data.get("rating")
    comment = data.get("comment")
    movie_id = data.get("movie_id")
    # title = data.get("title")

    new_rating = Rating(
        username=current_user.username,
        rating=rating,
        comment=comment,
        movie_id=movie_id,
        # title=title,
    )

    db.session.add(new_rating)
    db.session.commit()
    return flask.redirect("index")


@app.route("/")
def landing():
    if current_user.is_authenticated:
        return flask.redirect("index")
    return flask.redirect("login")


@app.route("/logout")
def logout():
    logout_user()
    return flask.redirect("login")


@app.route("/index")
@login_required
def index():
    movie_id = random.choice(MOVIE_IDS)

    # API calls
    (title, tagline, genre, poster_image) = get_movie_data(movie_id)

    wikipedia_url = get_wiki_link(title)

    ratings = Rating.query.filter_by(movie_id=movie_id).all()
    print(ratings)
    return flask.render_template(
        "index.html",
        title=title,
        tagline=tagline,
        genre=genre,
        poster_image=poster_image,
        wiki_url=wikipedia_url,
        ratings=ratings,
        movie_id=movie_id,
    )


@app.route("/<string:movie_id>", methods=["GET", "POST"])
def movie(movie_id):
    rate_values = Rating.query.filter_by(movie_id=int(movie_id))
    comments = user_input.query.filter_by(movie_id=int(movie_id))
    (title, tagline, genre, poster_image) = get_movie_data(movie_id)
    wikipedia_url = get_wiki_link(title)

    if current_user.is_authenticated == False:
        return flask.redirect(flask.url_for("login"))

    if flask.request.method == "POST":
        data = flask.request.form
        user_id = current_user.id
        comment = user_input(
            user_comment=data["comment"], movie_id=int(movie_id), user_id=user_id
        )

        rating = Rating(
            rate_num=int(data["rate"]), movie_id=int(movie_id), user_id=user_id
        )

        db.session.add(comment)
        db.session.add(rating)
        db.session.commit()

    return flask.render_template(
        "index.html",
        title=title,
        tagline=tagline,
        genre=genre,
        poster_image=poster_image,
        wiki_url=wikipedia_url,
        movie_id=movie_id,
        rate_values=rate_values,
        comments=comments,
    )


bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
@bp.route("/route")
def index():
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    return flask.render_template("index.html")


app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 4444)),
        debug=True,
    )

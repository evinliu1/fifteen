import flask
import os
app = flask.Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
print("hello world")
tv_shows = ["Black Mirror", "The Office", "Queer Eye", "Big Mouth", "Big Brother"]



@app.route("/") #root of web server
def list():
    return flask.render_template("index.html", len = len(tv_shows), tv_shows = tv_shows)
app.run(
    host=os.getenv("IP", "0.0.0.0"),
    port=int(os.getenv("PORT", 8080)),
    debug=True
)
    

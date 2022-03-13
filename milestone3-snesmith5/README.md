## Setup Instructions
1. `pip3 install -r requirements.txt`
2. Create a `.env` file in the top-level directory and enter the following as its contents:
```
export TMDB_API_KEY="<YOUR API KEY>"
export DATABASE_URL="<YOUR POSTGRESQL DB URL>"
```


## To run the app
1. Run `python3 routes.py`

add, delete, edit comments
https://youtu.be/N8kYlimhuLw

useEffect with fetch function
https://youtu.be/k0WnY0Hqe5c

Helped with getting started
https://reactjs.org/docs/hooks-effect.html

Benefits of useEffect: lets us express different kinds of side effects after a component renders

Error:
1. Traceback (most recent call last):
  File "/Users/user/milestone3-snesmith5/routes.py", line 136, in <module>
    app.run(
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages/flask/app.py", line 920, in run
    run_simple(t.cast(str, host), port, self, **options)
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages/werkzeug/serving.py", line 984, in run_simple
    s.bind(server_address)
OSError: [Errno 48] Address already in use
Fix: https://stackoverflow.com/questions/34457981/trying-to-run-flask-app-gives-address-already-in-use 
Simply changing the route number in app.run 

2. AttributeError: 'NoneType' object has no attribute 'drivername'
Referring to line 50 in routes.py -->  user = User.query.filter_by(username=username).first()
https://stackoverflow.com/questions/55667117/db-create-all-nonetype-object-has-no-attribute-drivername

3. Error: Key Error: 'title' 
Line 104 in routes.py --  (title, tagline, genre, poster_image) = get_movie_data(movie_id)
tmdb.py line 23 -- title = json_response["title"]
Turned out the .env file was linting a type script file. In order to undo this event, I deleted the .env file and recreated it and placed same URLs in the file. However, I was still getting a key error. I did some research and saw the suggestion to use `json.dumps()` instead of `response.json() ` (https://stackoverflow.com/questions/65396538/python-requests-jsondecodeerror) So I used json.dumps() along with json.load() in attempts to resolve the error. Neither of those worked. I then returned back to response.json() and the web app ran perfectly.

4. App.py file line 30: rates = Rating.query.filter_by(username=user_input.username).all()
AttributeError: type object 'user_input' has no attribute 'username'
I realized that I was querying from the wrong table. Once I changed the table name it was able to recognize the 'username' attribute.
In doing so I was presented with:
'AssertionError: View function mapping is overwriting an existing endpoint function: setData'